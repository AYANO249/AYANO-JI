import axios from 'axios';

const handler = async (m, { conn, usedPrefix, command }) => {
    try {
        // جلب حديث عشوائي من API موثوق
        const response = await axios.get('https://ahadith-api.herokuapp.com/api/ahadith/random/ar');
        const hadith = response.data.Hadith;

        const caption = `
╭─┈─┈─┈─⟞🕋⟝─┈─┈─┈─╮
┃    『 *حَـدِيثٌ شَـرِيف* 』
╰─┈─┈─┈─⟞🕋⟝─┈─┈─┈─╮

📜 *قال رسول الله ﷺ:*
"${hadith}"

╭─┈─┈─┈─⟞🕋⟝─┈─┈─┈─╮
┃ *⌯︙𝐓𝐎𝐉𝐈 𝐈𝐍 ~ 𝐒𝐘𝐒𝐓𝐄𝐌*
╰─┈─┈─┈─⟞🕋⟝─┈─┈─┈─╯
> *مَنْ يُرِدِ اللَّهُ بِهِ خَيْرًا يُفَقِّهْهُ فِي الدِّينِ*`.trim();

    await conn.sendMessage(m.chat, {
        text: caption,
        contextInfo: context(m.sender, "📜 حديث نبوي شريف", "تزود بالسنة النبوية | 𝐓𝐎𝐉𝐈 𝐈𝐍")
    }, { quoted: m });

    } catch (e) {
        console.error(e);
        m.reply("❌ حدث خطأ أثناء جلب الحديث، حاول مجدداً.");
    }
};

handler.help = ['حديث'];
handler.tags = ['islamic'];
handler.command = /^(حديث|hadith)$/i;
handler.category = "islamic";

export default handler;

// دالة التنسيق الموحدة المعتمدة في بوت TOJI-BOT بعد التعديلات الأخيرة
const context = (jid, title, body) => ({
    mentionedJid: [jid],
    isForwarded: true,
    forwardingScore: 1,
    forwardedNewsletterMessageInfo: {
        newsletterJid: '120363425314431422@newsletter',
        newsletterName: '𝐈𝐍 𝐓𝐎𝐉𝐈🏮',
        serverMessageId: 0
    },
    externalAdReply: {
        title: title,
        body: body,
        thumbnailUrl: 'https://i.ibb.co/1y4gGJC/b53f9668d1cf2b6783c65fb3d940f79d.jpg',
        sourceUrl: 'https://whatsapp.com/channel/0029VbD3UpkG3R3aq6V1DW2X',
        mediaType: 1,
        renderLargerThumbnail: true
    }
});

