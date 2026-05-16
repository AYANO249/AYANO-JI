export default async function before(m, { conn }) {

  const owner = "249906024672@s.whatsapp.net";
  const botName = "𝐀𝐘𝐀𝐍𝐎 𝐉𝐈";

  // ===== تنظيف ذكي وقوي =====
  const normalize = (t) =>
    (t || "")
      .toLowerCase()
      .replace(/[^\p{L}\p{N}\s]/gu, "") // الحفاظ على الحروف والأرقام والمسافات وفلترة الزخارف
      .replace(/[\u064B-\u0652]/g, ""); // إزالة التشكيل والحركات

  // ===== التقاط النص بدقة =====
  const text = (
    m.text ||
    m.message?.conversation ||
    m.message?.extendedTextMessage?.text ||
    ""
  ).trim();

  const cleanText = normalize(text);

  // إزالة المسافات تماماً لمنع التهرب المتباعد (ك س م)
  const compactText = cleanText.replace(/\s+/g, "");

  // ===== رياكشن تست =====
  if (cleanText.trim() === "تست") {
    return await conn.sendMessage(m.chat, {
      react: {
        text: "✅",
        key: m.key
      }
    });
  }

  // ===== الكلمات الممنوعة =====
  const forbiddenWords = [
    "كسم",
    "انيك",
    "لوطي",
    "نجاو"
  ];

  // ===== فحص الكلمات الصارم =====
  const isForbidden = forbiddenWords.some(word => {
    const cleanWord = normalize(word).replace(/\s+/g, "");
    return (
      text.includes(word) ||
      cleanText.includes(cleanWord) ||
      compactText.includes(cleanWord)
    );
  });

  // ===== نظام الحذف والطرد داخل المجموعات =====
  if (isForbidden && m.isGroup) {
    const sender = m.sender;

    try {
      // ===== جلب بيانات المجموعة حية من السيرفر =====
      const groupMetadata = await conn.groupMetadata(m.chat).catch(() => null);
      if (!groupMetadata) return false;

      const groupParticipants = groupMetadata.participants || [];

      // ===== جلب معرف البوت الحقيقي وتصفيته =====
      const botJid = conn.user.id ? (conn.user.id.split(":")[0] + "@s.whatsapp.net") : conn.user.jid;

      // ===== التأكد أن البوت يمتلك صلاحية الإشراف أولاً =====
      const botData = groupParticipants.find(p => p.id === botJid);
      const botAdmin = botData?.admin === "admin" || botData?.admin === "superadmin";
      if (!botAdmin) return false;

      // ===== [إجراء فوري] حذف الرسالة المخالفة من الجروب للجميع =====
      await conn.sendMessage(m.chat, {
        delete: m.key
      });

      const userNumber = sender.split("@")[0];

      // ===== التحقق من رتبة المرسل (المطور أو الأدمن) =====
      const isOwner = sender === owner || m.fromMe;
      const senderData = groupParticipants.find(p => p.id === sender);
      const isAdmin = senderData?.admin === "admin" || senderData?.admin === "superadmin";

      // ===== حالة المشرف أو المطور: اكتفِ بالحذف وأرسل تقرير تفصيلي =====
      if (isOwner || isAdmin) {
        const warnMessage = `*─── ❲ تـنـبـيـه ❳ ───*\n\n👤 الـمـسـتـخـدم:\n@${userNumber}\n\n📍 الـمـجـمـوعـة:\n${groupMetadata.subject}\n\n💬 الـرسـالـة:\n${text}\n\n⚠️ الـحـالـة:\nتـم حـذف الـرسـالـة فـقـط\nلأن الـعـضـو أدمن أو مؤسس\n\n*─── 𝐈𝐍 ⁝|⁝ ${botName} ʚɞ ───*`;

        await conn.sendMessage(owner, {
          text: warnMessage,
          mentions: [sender]
        });

        return false;
      }

      // ===== حالة العضو العادي: تنفيذ الطرد النهائي =====
      await conn.groupParticipantsUpdate(
        m.chat,
        [sender],
        "remove"
      );

      // ===== تقرير الطرد النهائي للمطور =====
      const report = `*─── ❲ تـنـبـيـه ❳ ───*\n\n👤 الـمـسـتـخـدم:\n@${userNumber}\n\n📍 الـمـجـمـوعـة:\n${groupMetadata.subject}\n\n💬 الـرسـالـة:\n${text}\n\n🧹 الـحـالـة:\nتـم حـذف الـرسـالـة وطـرد الـعـضـو بـنـجـاح\n\n*─── 𝐈𝐍 ⁝|⁝ ${botName} ʚɞ ───*`;

      await conn.sendMessage(owner, {
        text: report,
        mentions: [sender]
      });

    } catch (e) {
      console.error("حدث خطأ داخل نظام الحذف والطرد المحسن:", e);
    }
  }

  return false;
}
