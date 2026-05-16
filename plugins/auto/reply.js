export default async function before(m, { conn, participants }) {

  const owner = "249906024672@s.whatsapp.net";
  const botName = "𝐀𝐘𝐀𝐍𝐎 𝐉𝐈";

  // ===== تنظيف ذكي وقوي (مع الحفاظ على المسافات لمنع التداخل) =====
  const normalize = (t) =>
    (t || "")
      .toLowerCase()
      .replace(/[^\p{L}\p{N}\s]/gu, "") // تم إضافة \s للاحتفاظ بالمسافات الأصلية بين الكلمات
      .replace(/[\u064B-\u0652]/g, ""); // إزالة التشكيل والحركات

  // ===== التقاط النص بدقة =====
  const text = (
    m.text ||
    m.message?.conversation ||
    m.message?.extendedTextMessage?.text ||
    ""
  ).trim();

  const cleanText = normalize(text);

  // ===== رياكشن تست =====
  // نستخدم .trim() هنا للتأكد من أن الكلمة هي "تست" فقط بدون إضافات ثانية
  if (cleanText.trim() === "تست") {
    return await conn.sendMessage(m.chat, {
      react: {
        text: "✅",
        key: m.key
      }
    });
  }

  // ===== كلمات ممنوعة =====
  const forbiddenWords = [
    "كسم",
    "انيك",
    "لوطي",
    "نجاو"
  ];

  // الفحص الآن أصبح آمناً؛ يبحث عن الكلمة الممنوعة ككلمة مستقلة أو مدمجة برموز
  const isForbidden = forbiddenWords.some(word =>
    cleanText.includes(normalize(word))
  );

  // ===== نظام الطرد =====
  if (isForbidden && m.isGroup) {

    const sender = m.sender;

    // ===== حماية المطور والبوت =====
    const isOwner = sender === owner || m.fromMe;
    if (isOwner) return false;

    // ===== حماية المشرفين =====
    const senderData = participants.find(p => p.id === sender);
    const isAdmin = senderData?.admin === "admin" || senderData?.admin === "superadmin";
    if (isAdmin) return false;

    // ===== جلب معرف البوت الحقيقي =====
    const botJid = conn.user.id ? (conn.user.id.split(":")[0] + "@s.whatsapp.net") : conn.user.jid;

    // ===== التأكد أن البوت مشرف =====
    const botData = participants.find(p => p.id === botJid);
    const botAdmin = botData?.admin === "admin" || botData?.admin === "superadmin";
    if (!botAdmin) return false;

    try {

      // ===== حذف الرسالة =====
      await conn.sendMessage(m.chat, {
        delete: m.key
      });

      // ===== طرد العضو =====
      await conn.groupParticipantsUpdate(
        m.chat,
        [sender],
        "remove"
      );

      const userNumber = sender.split("@")[0];
      let groupName = "المجموعة";

      try {
        const groupMetadata = await conn.groupMetadata(m.chat);
        groupName = groupMetadata.subject;
      } catch (err) {
        console.error("فشل جلب اسم الروم:", err);
      }

      // ===== تقرير للمطور =====
      const report = `*─── ❲ تـنـبـيـه ❳ ───*\n\n👤 الـمـسـتـخـدم: @${userNumber}\n\n📍 الـمـجـمـوعـة: ${groupName}\n\n💬 الـرسـالـة:\n${text}\n\n🧹 الـحـالـة:\nتـم حـذف الـرسـالـة وطـرد الـعـضـو بـنـجـاح\n\n*─── 𝐈𝐍 ⁝|⁝ ${botName} ʚɞ ───*`;

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
