import axios from 'axios';

const API = 'https://raw.githubusercontent.com/nawafalqari/azkar-api/56dfa3d132646487e41b9d4e51147f711846b0a7/azkar.json';

// كاش بسيط لتسريع الأداء
let cache = null;

const sections = {
  morning: { name: 'أذكار الصباح', key: 'أذكار الصباح' },
  evening: { name: 'أذكار المساء', key: 'أذكار المساء' },
  after: { name: 'أذكار بعد الصلاة', key: 'أذكار بعد الصلاة' },
  sleep: { name: 'أذكار النوم', key: 'أذكار النوم' }
};

const handler = async (m, { conn, usedPrefix, command }) => {

  // تحميل البيانات مرة واحدة فقط
  if (!cache) {
    const { data } = await axios.get(API);
    cache = data;
  }

  // أزرار اختيار القسم
  const buttons = [
    { buttonId: `${usedPrefix + command} morning`, buttonText: { displayText: "☀️ الصباح" }, type: 1 },
    { buttonId: `${usedPrefix + command} evening`, buttonText: { displayText: "🌙 المساء" }, type: 1 },
    { buttonId: `${usedPrefix + command} after`, buttonText: { displayText: "🕌 بعد الصلاة" }, type: 1 },
    { buttonId: `${usedPrefix + command} sleep`, buttonText: { displayText: "😴 النوم" }, type: 1 }
  ];

  if (!m.text || !sections[m.text.trim()]) {
    return conn.sendMessage(m.chat, {
      image: { url: 'https://i.ibb.co/r2CKLTLT/a27eefa4ae6dce04e9a0a7bd506e2a7f.jpg' },
      caption: "🕋 اختر قسم الأذكار الذي تريده:",
      buttons,
      headerType: 4
    }, { quoted: m });
  }

  const section = sections[m.text.trim()];
  const azkar = cache?.[section.key];

  if (!azkar) return m.reply("❌ لا توجد بيانات حالياً");

  // إرسال ذكر واحد مع زر التالي
  const index = 0;

  const sendZikr = async (i) => {
    const item = azkar[i];

    const text = `
╭───🕋───╮
 ${section.name}
╰───🕋───╯

📿 ${item.zekr}

🔁 التكرار: ${item.repeat}
📊 ${i + 1} / ${azkar.length}
`;

    const buttons = [
      {
        buttonId: `${usedPrefix + command} ${m.text} ${i + 1}`,
        buttonText: { displayText: "➡️ التالي" },
        type: 1
      },
      {
        buttonId: `${usedPrefix + command}`,
        buttonText: { displayText: "🔙 القائمة" },
        type: 1
      }
    ];

    await conn.sendMessage(m.chat, {
      image: { url: 'https://i.ibb.co/r2CKLTLT/a27eefa4ae6dce04e9a0a7bd506e2a7f.jpg' },
      caption: text,
      buttons,
      headerType: 4
    }, { quoted: m });
  };

  // أول ذكر
  return sendZikr(0);
};

handler.command = /^(اذكار|أذكار|zikr)$/i;
export default handler;
