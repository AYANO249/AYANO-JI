/* 
by: 𝐀𝐘𝐀𝐍𝐎 𝐉𝐈
*/

const example = async (m, { conn }) => {

conn.msgUrl(m.chat,
  '*𝐀𝐘𝐀𝐍𝐎 𝐉𝐈 𝐁𝐎𝐓 𝐈𝐒 𝐖𝐎𝐑𝐊𝐈𝐍𝐆 𝐍𝐎𝐖*',
  {
    img: 'https://i.ibb.co/DPbNTZK1/IMG-20260429-WA0039.jpg',
    title: '𝐀𝐘𝐀𝐍𝐎 𝐉𝐈 𝐃𝐄𝐕 ',
    body: '𝐀𝐘𝐀𝐍𝐎 𝐉𝐈 𝐒𝐘𝐒𝐓𝐄𝐌 𝐈𝐒 𝐀𝐂𝐓𝐈𝐕𝐄.\nhttps://whatsapp.com/channel/0029VbD3UpkG3R3aq6V1DW2X',
    big: true,
    mentions: ['249906024672@s.whatsapp.net', '2250778788908@s.whatsapp.net'],
    newsletter: {
      name: '𝐀𝐘𝐀𝐍𝐎 𝐉𝐈 𝐃𝐄𝐕 ',
      jid: '120363425314431422@newsletter'
    }
  },
  m
)

};

example.usage = ["تست2"]


/* ↓ قسم الأمر ↓ */
example.category = "example"


/* ↓ استخدم الأوامر ↓ */
example.command = ["تست2"] 


/* ↓ بتعمل ايقاف ل الأمر ↓ */
example.disabled = false


/* ↓ منع السبام ↓ */
example.cooldown = 1000;


/* ↓ بدون بادئة ↓ */
example.usePrefix = false;

export default example
