const handler = async (m, { conn }) => {
    let who =
        m.quoted?.sender ||
        (m.mentionedJid && m.mentionedJid[0]) ||
        null;

    if (!who) {
        return m.reply("⚠️ رد على الشخص أو منشنه أولاً!");
    }

    const number = who.split("@")[0];

    let pp;
    try {
        pp = await conn.profilePictureUrl(who, "image");
    } catch {
        pp = "https://i.ibb.co/r2CKLTLT/a27eefa4ae6dce04e9a0a7bd506e2a7f.jpg";
    }

    let bio = "لا توجد حالة متوفرة";
    try {
        const status = await conn.fetchStatus(who);
        bio = status?.status || bio;
    } catch {}

    let name;
    try {
        name = await conn.getName(who);
    } catch {
        name = number;
    }

    const caption = `
╭─⟞ 🕵️‍♂️ كَشْفُ البروفايل ⟝─╮

👤 الاسم: ${name}
📝 الحالة: ${bio}
📞 الرقم: +${number}
🔗 الرابط: wa.me/${number}

╭─⟞ 𝐓𝐎𝐉𝐈 𝐈𝐍 𝐒𝐘𝐒𝐓𝐄𝐌 ⟝─╮
✨ تم استخراج البيانات بنجاح
`.trim();

    await conn.sendMessage(m.chat, {
        image: { url: pp },
        caption,
        mentions: [who],
        contextInfo: {
            externalAdReply: {
                title: "🕵️ كشف البروفايل",
                body: "عرض بيانات المستخدم",
                thumbnailUrl: pp,
                sourceUrl: "https://whatsapp.com",
                mediaType: 1,
                renderLargerThumbnail: true
            }
        }
    }, { quoted: m });
};

handler.help = ["كشف"];
handler.tags = ["group"];
handler.command = /^(كشف|بروفايل|kashf)$/i;

export default handler;
