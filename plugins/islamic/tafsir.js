import axios from 'axios';

const handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `⚠️ يرجى كتابة اسم السورة ورقم الآية\nمثال: *${usedPrefix + command} الإخلاص | 1*`;

    try {
        let [surahName, ayaNumber] = text.split('|').map(v => v.trim());
        if (!surahName || !ayaNumber) throw `⚠️ التنسيق خاطئ.. مثال: *${usedPrefix + command} الفاتحة | 2*`;

        await m.reply(`⏳ جاري جلب الآية والتفسير...`);

        // البحث عن رقم السورة بناءً على اسمها (باستخدام API للبحث)
        const searchRes = await axios.get(`https://quran-endpoint.vercel.app/search?query=${encodeURIComponent(surahName)}`);
        if (!searchRes.data.results.length) return m.reply("❌ لم أتمكن من العثور على هذه السورة.");

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
┃ *⌯︙𝐓𝐎𝐉𝐈 𝐈𝐍 ~ 𝐒𝐘𝐒𝐓𝐄𝐌*
╰─┈─┈─┈─⟞🕋⟝─┈─┈─┈─╯
> *أَفَلَا يَتَدَبَّرُونَ الْقُرْآنَ*`.trim();

        await conn.sendMessage(m.chat, {
            text: msg,
            contextInfo: context(m.sender, `✨ تفسير سورة ${surahName}`, `آية رقم: ${ayaNumber} | 𝐓𝐎𝐉𝐈 𝐈𝐍`)
        }, { quoted: m });

    } catch (e) {
        console.error(e);
        m.reply("❌ حدث خطأ.. تأكد من كتابة اسم السورة ورقم الآية بشكل صحيح.");
    }
};

handler.help = ['تفسير'];
handler.tags = ['islamic'];
handler.command = /^(تفسير|tafsir)$/i;
handler.category = "islamic";

export default handler;

// دالة التنسيق الموحدة لهوية TOJI IN
const context = (jid, title, body) => ({
    mentionedJid: [jid],
    isForwarded: true,
    forwardingScore: 1,
    forwardedNewsletterMessageInfo: {
        newsletterJid: '120363425314431422@newsletter',
        newsletterName: '𝐓𝐎𝐉𝐈 𝐈𝐍 🏮',
        serverMessageId: 0
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

