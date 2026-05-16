const handler = async (m, { conn }) => {
    let who =
        m.quoted?.sender ||
        (m.mentionedJid && m.mentionedJid[0]) ||
        m.sender;

    // استخراج الرقم الصحيح النظيف تماماً بدون أي إضافات للمنشن والرابط
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

    const caption = `*─── 𓆩 📂 بـيـانـات الـهـوِيَّـة 𓆪 ───*

👤 *الاسـم :* @${number}
📝 *الـحـالـة :* ${bio}
📞 *الـرّقـم :* @${number}
🔗 *الـرّابـط :* wa.me/${number}

*─── 𝐈𝐍 ⁝|⁝ 𝐀𝐘𝐀𝐍𝐎 𝐉𝐈 ʚɞ ───*`.trim();

    await conn.sendMessage(m.chat, {
        image: { url: pp },
        caption,
        mentions: [who], // لتفعيل المنشن الأزرق في النص
        contextInfo: {
            externalAdReply: {
                title: "𓆩 📂 سِـجِـل الـهـوِيَّـة 𓆪",
                body: "𝐀𝐘𝐀𝐍𝐎 𝐉𝐈 ~ 𝐒𝐘𝐒𝐓𝐄𝐌",
                thumbnailUrl: pp,
                sourceUrl: "https://whatsapp.com",
                mediaType: 1,
                renderLargerThumbnail: true
            }
        }
    }, { quoted: m });
};

handler.usage = ["هوية"];
handler.category = "group";
handler.command = /^(هوية|بروفايل|id)$/i;

export default handler;
