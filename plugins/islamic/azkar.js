import axios from 'axios';

const handler = async (m, { conn, usedPrefix, command, text }) => {
    // مصفوفة الأقسام والروابط الخاصة بها من الـ API
    const sections = {
        '1': { name: 'أذكار الصباح', api: 'https://raw.githubusercontent.com/nawafalqari/azkar-api/56dfa3d132646487e41b9d4e51147f711846b0a7/azkar.json', key: 'أذكار الصباح' },
        '2': { name: 'أذكار المساء', api: 'https://raw.githubusercontent.com/nawafalqari/azkar-api/56dfa3d132646487e41b9d4e51147f711846b0a7/azkar.json', key: 'أذكار المساء' },
        '3': { name: 'أذكار بعد الصلاة', api: 'https://raw.githubusercontent.com/nawafalqari/azkar-api/56dfa3d132646487e41b9d4e51147f711846b0a7/azkar.json', key: 'أذكار بعد الصلاة' },
        '4': { name: 'أذكار النوم', api: 'https://raw.githubusercontent.com/nawafalqari/azkar-api/56dfa3d132646487e41b9d4e51147f711846b0a7/azkar.json', key: 'أذكار النوم' }
    };

    // إذا لم يحدد المستخدم قسماً، نرسل له القائمة
    if (!text) {
        const menuMsg = `
╭─┈─┈─┈─⟞🕋⟝─┈─┈─┈─╮
┃    『 *قائمة الأذكار الذكية* 』
╰─┈─┈─┈─⟞🕋⟝─┈─┈─┈─╮

الرجاء اختيار رقم القسم المطلوب:

1️⃣ ☀️ أذكار الصباح
2️⃣ 🌑 أذكار المساء
3️⃣ 🕌 أذكار بعد الصلاة
4️⃣ 🛌 أذكار النوم

📌 مثال للطلب: *${usedPrefix + command} 1*

╭─┈─┈─┈─⟞🕋⟝─┈─┈─┈─╮
┃ *⌯︙𝐓𝐎𝐉𝐈 𝐈𝐍 ~ 𝐒𝐘𝐒𝐓𝐄𝐌*
╰─┈─┈─┈─⟞🕋⟝─┈─┈─┈─╯`.trim();

        return await conn.sendMessage(m.chat, {
            image: { url: 'https://i.ibb.co/r2CKLTLT/a27eefa4ae6dce04e9a0a7bd506e2a7f.jpg' },
            caption: menuMsg,
            contextInfo: context(m.sender, "🕋 اختر ذكرك اليومي", "نور حياتك بذكر الله | 𝐓𝐎𝐉𝐈 𝐈𝐍")
        }, { quoted: m });
    }

    // جلب البيانات بناءً على الرقم المختار
    const selection = sections[text.trim()];
    if (!selection) return m.reply("⚠️ رقم القسم غير صحيح، اختر من 1 إلى 4.");

    try {
        await m.reply(`⏳ جاري جلب *${selection.name}* من السيرفر...`);
        const res = await axios.get(selection.api);
        const azkar = res.data[selection.key];

        // تنسيق الأذكار في رسالة واحدة
        let result = azkar.map((v, i) => `*(${i + 1})* ${v.zekr}\n✨ _التكرار: ${v.repeat}_`).join('\n\n─── ⋆⋅⭐⋅⋆ ───\n\n');

        const caption = `
╭─┈─┈─┈─⟞🕋⟝─┈─┈─┈─╮
┃    『 *${selection.name}* 』
╰─┈─┈─┈─⟞🕋⟝─┈─┈─┈─╮

${result}

╭─┈─┈─┈─⟞🕋⟝─┈─┈─┈─╮
┃ *⌯︙𝐓𝐎𝐉𝐈 𝐈𝐍 ~ 𝐒𝐘𝐒𝐓𝐄𝐌*
╰─┈─┈─┈─⟞🕋⟝─┈─┈─┈─╯`.trim();

        await conn.sendMessage(m.chat, {
            image: { url: 'https://i.ibb.co/r2CKLTLT/a27eefa4ae6dce04e9a0a7bd506e2a7f.jpg' }, // يمكنك تغيير الصورة حسب القسم
            caption: caption,
            contextInfo: context(m.sender, `✨ ${selection.name}`, "تم الجلب بنجاح | 𝐓𝐎𝐉𝐈 𝐈𝐍")
        }, { quoted: m });

    } catch (e) {
        console.error(e);
        m.reply("❌ حدث خطأ في الاتصال بالسيرفر، حاول مجدداً.");
    }
};

handler.help = ['اذكار'];
handler.tags = ['islamic'];
handler.command = /^(اذكار|أذكار|zikr)$/i;

export default handler;

const context = (jid, title, body) => ({
    mentionedJid: [jid],
    forwardingScore: 999,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
        newsletterJid: '120363425314431422@newsletter',
        newsletterName: '𝐓𝐎𝐉𝐈 𝐈𝐍 🏮',
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
