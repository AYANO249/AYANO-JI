const handler = async (m, { conn, args }) => {
  // جلب قائمة طلبات الانضمام
  const req = await conn.groupRequestParticipantsList(m.chat);
  
  if (!req?.length) return m.reply("📭 مفيش طلبات معلقة حالياً");

  // تحديد عدد الطلبات المراد قبولها (الكل افتراضياً)
  const limit = args[0] && !isNaN(args[0]) ? parseInt(args[0]) : req.length;
  const list = req.slice(0, limit);

  for (let r of list) {
    await conn.groupRequestParticipantsUpdate(
      m.chat,
      [r.jid], // استخدام jid لضمان الدقة
      "approve"
    );
  }

  m.reply(`✅ تم قبول ${list.length} عضو بواسطة 𝐓𝐎𝐉𝐈`);
};

handler.command = ["اقبل"]; // الكلمة المطلوبة فقط
handler.admin = true;
handler.group = true;
handler.botAdmin = true;

export default handler;

