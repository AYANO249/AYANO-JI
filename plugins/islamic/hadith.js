import axios from 'axios';

const handler = async (m, { conn, usedPrefix, command }) => {
    try {
        await m.reply(`⏳ جاري جلب حديث شريف...`);

        // جلب حديث عشوائي من مكتبة الأحاديث
        const res = await axios.get('https://ahadith-api.herokuapp.com/api/ahadith/all/ar-notashkeel');
        const data = res.data.AllAhadith;
        const randomHadith = data[Math.floor(Math.random() * data.length)];

        const msg = `
╭─┈─┈─┈─⟞🕋⟝─┈─┈─┈─╮
┃    『 *الـحَدِيثُ النَّـبَوِي* 』
╰─┈─┈─┈─⟞🕋⟝─┈─┈─┈─╮

📖 *الحديث:*
"${randomHadith.Ar_Text}"

📝 *الراوي/المصدر:*
${randomHadith.Ar_Text_Without_Tashkeel.split(' ').slice(0, 5).join(' ')}...

╭─┈─┈─┈─⟞🕋⟝─┈─┈─┈─╮
┃ *⌯︙𝐓𝐎𝐉𝐈 𝐈𝐍 ~ 𝐒𝐘𝐒𝐓𝐄𝐌*
╰─┈─┈─┈─⟞🕋⟝─┈─┈─┈─╯
> *مَنْ يُرِدِ اللَّهُ بِهِ خَيْرًا يُفَقِّهْهُ فِي الدِّينِ*`.trim();

        await conn.sendMessage(m.chat, {
            text: msg,
            contextInfo: context(m.sender, "✨ حديث نبوي شريف", "قَالَ رَسُولُ اللَّهِ ﷺ | 𝐓𝐎𝐉𝐈 𝐈𝐍")
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

// دالة التنسيق الموحدة (Context) لهوية 𝐓𝐎𝐉𝐈 𝐈𝐍 كرسالة محولة
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
