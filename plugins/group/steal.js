const handler = async (m, { conn, usedPrefix, command }) => {
    let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : null;
    
    if (!who) return m.reply(`⚠️ يرجى الرد على الشخص لسرقة بياناته!`);

    try {
        let pp, bio;
        try { pp = await conn.profilePictureUrl(who, 'image'); } catch { pp = 'https://i.ibb.co/r2CKLTLT/a27eefa4ae6dce04e9a0a7bd506e2a7f.jpg'; }
        try { bio = (await conn.fetchStatus(who)).status; } catch { bio = "لا توجد حالة"; }

        let caption = `
╭─┈─┈─┈─⟞👤⟝─┈─┈─┈─╮
┃    『 *سَرِقَة الـبُروفَايل* 』
╰─┈─┈─┈─⟞👤⟝─┈─┈─┈─╮

👤 *الاسم:* ${conn.getName(who)}
📝 *الحالة:* ${bio}
🔗 *الرابط:* wa.me/${who.split`@`[0]}

╭─┈─┈─┈─⟞🕋⟝─┈─┈─┈─╮
┃ *⌯︙𝐓𝐎𝐉𝐈 𝐈𝐍 ~ 𝐒𝐘𝐒𝐓𝐄𝐌*
╰─┈─┈─┈─⟞🕋⟝─┈─┈─┈─╯`.trim();

        await conn.sendMessage(m.chat, {
            image: { url: pp },
            caption: caption,
            mentions: [who],
            contextInfo: contextInfo("🕵️ نظام السرقة", "تم استخراج البيانات | 𝐓𝐎𝐉𝐈 𝐈𝐍")
        }, { quoted: m });
    } catch (e) { m.reply('❌ حدث خطأ.'); }
};

handler.help = ['سرقة'];
handler.tags = ['group']; // لظهورها في قسم المجموعات
handler.command = /^(سرقة|steal)$/i;

export default handler;

const contextInfo = (title, body) => ({
    forwardingScore: 999,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
        newsletterJid: '120363425314431422@newsletter',
        newsletterName: '𝐓𝐎𝐉𝐈 𝐈𝐍 🏮',
        serverMessageId: 1
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

