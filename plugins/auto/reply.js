export default async function before(m, { conn, participants }) {

  const owner = "249906024672@s.whatsapp.net";

  const botName = "𝐀𝐘𝐀𝐍𝐎 𝐉𝐈";

  const triggers = {
    "السلام عليكم": ["وعليكم السلام ورحمة الله وبركاته 🤍", "أهلاً وسهلاً بك 🌹", "نورت المكان ✨"],
    "هلا": ["ياهلا وغلا 🤍", "منور يا غالي ✨"],
    "مرحبا": ["مرحباً بك 🤍", "ياهلا فيك ✨"],
    "صباح الخير": ["صباح النور ☀️", "صباحك ورد 🌹"],
    "مساء الخير": ["مساء النور 🌙", "مساء الورد 🌹"],
    "بوت": ["لبيك 💮", `معك ${botName} ✨`, "تفضل 🤍", "أنا حاضر ✨"],
    "أيانو": ["عيون أيانو 🤍", `نعم معك ${botName} 💮`],
    "مين انت": [`أنا ${botName} 💮`, "بوت ذكي لخدمتكم ✨"],
    "تمام": ["دوم 🤍", "الحمدلله ✨"],
    "اوكي": ["تمام ✅", "أوكي 🤍"],
    "باي": ["في أمان الله 🤍", "نشوفك على خير ✨"]
  };

  // ===== تنظيف ذكي =====
  const normalize = (t) =>
    (t || "")
      .toLowerCase()
      .replace(/[\s._,*/+=\-]/g, "")
      .replace(/[\u064B-\u0652]/g, "");

  const text = (m.text || "").trim();
  const cleanText = normalize(text);

  // ===== رياكشن =====
  if (cleanText === "تست") {
    return await conn.sendMessage(m.chat, {
      react: {
        text: "✅",
        key: m.key
      }
    });
  }

  // ===== الردود =====
  const cleanTriggers = {};

  for (let key in triggers) {
    cleanTriggers[normalize(key)] = triggers[key];
  }

  if (cleanTriggers[cleanText]) {
    const replies = cleanTriggers[cleanText];
    const reply = replies[Math.floor(Math.random() * replies.length)];
    return m.reply(reply);
  }

  // ===== كلمات ممنوعة =====
  const forbiddenWords = ["كسم", "انيك", "لوطي", "نجاو"];

  const isForbidden = forbiddenWords.some(w => cleanText.includes(w));

  if (isForbidden && m.isGroup) {

    const sender = m.sender;
    const isOwner = sender === owner || m.fromMe;

    const senderData = participants.find(p => p.id === sender);
    const isAdmin = senderData?.admin;

    if (isOwner || isAdmin) return false;

    const botData = participants.find(p => p.id === conn.user.jid);
    const botAdmin = botData?.admin;

    if (!botAdmin) return false;

    try {
      await conn.groupParticipantsUpdate(m.chat, [sender], "remove");

      const userNumber = sender.split("@")[0];
      const groupMetadata = await conn.groupMetadata(m.chat);

      const report = `
🚨 طرد صامت - ${botName}

👤 المستخدم: @${userNumber}
📍 المجموعة: ${groupMetadata.subject}
💬 الرسالة: ${text}
🧹 الحالة: تم الطرد بنجاح
`;

      await conn.sendMessage(owner, {
        text: report,
        mentions: [sender]
      });

    } catch (e) {
      console.error("Kick Error:", e);
    }
  }

  return false;
    }
