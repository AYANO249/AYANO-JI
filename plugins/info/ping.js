const handler = async (m, { conn }) => {
  const start = process.hrtime.bigint();
  await conn.sendMessage(m.chat, { text: "𝐓𝐞𝐬𝐭 𝐛𝐨𝐭" });
  const end = process.hrtime.bigint();
  const ping = Number(end - start) / 1e6;
  
  await conn.msgUrl(m.chat, `⚡ سرعة البوت: ${ping.toFixed(2)}ms`, {
    img: "https://i.ibb.co/ksw2TCDQ/bfe2f787dae49dd9efe465d5c1203ecc.jpg",
    title: "𝐒𝐩𝐞𝐞𝐝 / 𝐓𝐞𝐬𝐭",
    body: "𝐓𝐞𝐬𝐭𝐢𝐧𝐠 𝐭𝐡𝐞 𝐛𝐨𝐭'𝐬 𝐬𝐩𝐞𝐞𝐝: 𝐈𝐬 𝐢𝐭 𝐟𝐚𝐬𝐭 𝐨𝐫 𝐧𝐨𝐭?",
    newsletter: {
      name: '𝐈𝐍 𝐀𝐘𝐀𝐍𝐎 𝐉𝐈',
      jid: '120363425314431422@newsletter'
    },
    big: false
  }, global.reply_status);
};

handler.command = ["بنج", "ping"];
handler.category = "info";
handler.usage = ["بنج"];
export default handler;
