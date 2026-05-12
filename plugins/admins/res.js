const handler = async (m, { conn }) => {

  const req = await conn.groupRequestParticipantsList(m.chat);
  if (!req?.length) return m.reply("📭 لا توجد  طلبات حالياً");

  let text = req.map((r, i) =>
    `${i + 1}- @${r.jid.split("@")[0]}`
  ).join("\n");

  await conn.sendMessage(m.chat, {
    text: `📥 قائمة الطلبات:\n\n${text}\n\nللموافقة على أول طلب اكتب: .اقبل`,
    mentions: req.map(r => r.jid)
  }, { quoted: m });

};

handler.before = async (m, { conn }) => {
  // تم الاستغناء عن معالج الأزرار لضمان الظهور في كل نسخ واتساب
  if (m.text.toLowerCase() === "اقبل" && m.isAdmin) {
    const req = await conn.groupRequestParticipantsList(m.chat);
    if (!req?.length) return;

    const user = req[0].jid;

    await conn.groupRequestParticipantsUpdate(
      m.chat,
      [user],
      "approve"
    );

    return conn.sendMessage(m.chat, {
      text: `✅ تم قبول @${user.split('@')[0]} بواسطة 𝐀𝐘𝐀𝐍𝐎 𝐉𝐈`,
      mentions: [user]
    }, { quoted: m });
  }
};

handler.command = ["اقبل"]; // أمر واحد فقط كما طلبت
handler.admin = true;
handler.group = true;
handler.botAdmin = true;

export default handler;

