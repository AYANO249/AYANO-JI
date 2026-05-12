import axios from 'axios';

const handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `⚠️ يرجى كتابة اسم السورة ورقم الآية\nمثال: *${usedPrefix + command} الإخلاص 1*`;

    try {
        // ذكاء اصطناعي بسيط: استخراج الرقم من النص تلقائياً
        let match = text.match(/(\d+)/); 
        if (!match) throw `⚠️ يرجى تحديد رقم الآية.. مثال: *${usedPrefix + command} الفاتحة 2*`;

        let ayaNumber = match[0]; // الرقم المستخرج
        let surahName = text.replace(ayaNumber, '').trim(); // اسم السورة هو كل النص ما عدا الرقم

        if (!surahName) throw `⚠️ يرجى كتابة اسم السورة.. مثال: *${usedPrefix + command} الكوثر 1*`;

        await m.reply(`⏳ جاري جلب الآية والتفسير لسورة *${surahName}*...`);

        // البحث عن رقم السورة
        const searchRes = await axios.get(`https://quran-endpoint.vercel.app/search?query=${encodeURIComponent(surahName)}`);
        if (!searchRes.data.results.length) return m.reply("❌ لم أتمكن من العثور على سورة بهذا الاسم، تأكد من الكتابة الصحيحة.");

        const surahId = searchRes.data.results[0].number;
        
        // جلب التفسير والآية
        const tafsirRes = await axios.get(`https://quran-api-arab.vercel.app/ayats/${surahId}/${ayaNumber}`);
        const data = tafsirRes.data;

        const msg = `
╭─┈─┈─┈─⟞🕋⟝─┈─┈─┈─╮
┃    『 *تفسير القرآن الكريم* 』
╰─┈─┈─┈─⟞🕋⟝─┈─┈─┈─╮

📖 *الآية (${data.aya}):*
「 ${data.text} 」

📝 *التفسير الميسر:*
${data.tafsir}

╭─┈─┈─┈─⟞🕋⟝─┈─┈─┈─╮
┃ *⌯︙𝐀𝐘𝐀𝐍𝐎 𝐉𝐈 𝐈𝐍 ~ 𝐒𝐘𝐒𝐓𝐄𝐌*
╰─┈─┈─┈─⟞🕋⟝─┈─┈─┈─╯
> *أَفَلَا يَتَدَبَّرُونَ الْقُرْآنَ*`.trim();

        await conn.sendMessage(m.chat, {
            text: msg,
            contextInfo: context(m.sender, `✨ تفسير سورة ${surahName}`, `آية رقم: ${ayaNumber} | 𝐀𝐘𝐀𝐍𝐎 𝐉𝐈 𝐈𝐍`)
        }, { quoted: m });

    } catch (e) {
        console.error(e);
        m.reply("❌ حدث خطأ.. تأكد من أن رقم الآية موجود في هذه السورة.");
    }
};

handler.help = ['تفسير'];
handler.tags = ['islamic'];
handler.command = /^(تفسير|tafsir)$/i;
handler.category = "islamic";

export default handler;

// دالة التنسيق الموحدة لهوية 𝐀𝐘𝐀𝐍𝐎 𝐉𝐈 𝐈𝐍 كرسالة محولة
const context = (jid, title, body) => ({
    mentionedJid: [jid],
    forwardingScore: 999,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
        newsletterJid: '120363425314431422@newsletter',
        newsletterName: '𝐀𝐘𝐀𝐍𝐎 𝐉𝐈 𝐈𝐍 🏮',
        serverMessageId: 143
    },
    externalAdReply: {
        title: title,
        body: body,
        thumbnailUrl: 'https://i.ibb.co/r2CKLTLT/a27eefa4ae6dce04e9a0a7bd506e2a7f.jpg',
        sourceUrl: 'https://whatsapp.com/channel/0029VbD3UpkG3R3aq6V1DW2X',
        mediaType: 1,
        renderLargerThumbnail: true
    }
});
