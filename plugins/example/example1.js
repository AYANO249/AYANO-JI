/* 
by: VA ~ 𝐓𝐎𝐉𝐈
*/

const example = async (m, { conn }) => {

conn.msgUrl(m.chat,
  '*𝐓𝐎𝐉𝐈 𝐁𝐎𝐓 𝐈𝐒 𝐖𝐎𝐑𝐊𝐈𝐍𝐆 𝐍𝐎𝐖*',
  {
    img: 'https://example.com/promo.jpg',
    title: '50% OFF',
    body: 'Limited time𝐓𝐎𝐉𝐈 𝐁𝐎𝐓 𝐈𝐒 𝐁𝐄𝐒𝐓 || 𝐅𝐀𝐒𝐓',
    big: true,
    mentions: ['249906024672@s.whatsapp.net', '2250778788908@s.whatsapp.net'],
    newsletter: {
      name: '𝐓𝐎𝐉𝐈 𝐃𝐄𝐕',
      jid: '120363425314431422@newsletter'
    }
  },
  m
)

};

example.usage = ["تست1"]


/* ↓ قسم الأمر ↓ */
example.category = "example"


/* ↓ استخدم الأوامر ↓ */
example.command = ["تست1"] 


/* ↓ بتعمل ايقاف ل الأمر ↓ */
example.disabled = false // لو عملتها true الأمر كده مش هيشتغل

/* ↓ استخدام الأمر بعد ثانيه من الاستخدام لمنع الاسبام ↓ */
example.cooldown = 1000; // تقدر تزود الثواني 


/* ↓ استخدام الأمر ب بدايه أو لا ↓ */
example.usePrefix = false; // لو عملتها true الأمر هيبقي من غير بدايه 

export default example;
