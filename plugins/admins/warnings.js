const handler = async (m, { conn }) => {
  const g = db.groups?.[m.chat] || {};
  const w = g.warnings || {};
  const id = m.sender;
  const count = w[id] || 0;

  if (!w[id] || count === 0) {
    return conn.sendMessage(m.chat, {
      text: `📜 @${id.split("@")[0]}، ليس لديك أي إنذارات مسجلة حالياً.`,
      mentions: [id]
    }, { quoted: global.reply_status });
  }

  await conn.sendMessage(m.chat, {
    text: `📜 @${id.split("@")[0]}، سجل إنذاراتك: ${count} / 3\n⚠️ تنبيه: عند بلوغ 3 إنذارات سيتم طردك من المجموعة تلقائياً.`,
    mentions: [id]
  }, { quoted: global.reply_status });
};

handler.command = ["انذاراتي", "warns", "warnings", "الانذارات"];
handler.usage = ['انذاراتي'];
handler.category = "admin";

export default handler;

