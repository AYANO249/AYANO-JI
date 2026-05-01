import { uploadToCatbox } from "../../system/utils.js";

let handler = async (m, { conn, bot, text }) => {
  try {
    // تحقق من الرد
    if (!m.quoted) 
      return m.reply("❌ يجب الرد على صورة أولاً");

    if (!m.quoted.mimetype || !m.quoted.mimetype.startsWith("image/")) 
      return m.reply("❌ الملف المرفق ليس صورة");

    if (!text) 
      return m.reply("💬 يرجى كتابة وصف التعديل المطلوب");

    await m.react("⚡");

    // تحميل الصورة
    const buffer = await m.quoted.download().catch(() => null);
    if (!buffer) 
      return m.reply("❌ فشل في تحميل الصورة");

    // رفع الصورة
    const imageUrl = await uploadToCatbox(buffer).catch(() => null);
    if (!imageUrl) 
      return m.reply("❌ فشل في رفع الصورة");

    // طلب التعديل
    const editRes = await bot.Api.tools.editImage({
      imageUrl,
      prompt: text
    }).catch(() => null);

    if (!editRes?.status || !editRes?.recordId) {
      return m.reply("❌ فشل في بدء عملية التعديل");
    }

    await m.reply("🎨 جارٍ تعديل الصورة، يرجى الانتظار...");

    // انتظار النتيجة
    let result = null;
    let attempts = 0;
    const maxAttempts = 24;

    while (attempts < maxAttempts) {
      await new Promise(r => setTimeout(r, 5000));

      const check = await bot.Api.tools.checkResult({
        rid: editRes.recordId
      }).catch(() => null);

      if (check?.completed && check?.resultUrl) {
        result = check.resultUrl;
        break;
      }

      attempts++;
    }

    if (!result) {
      return m.reply("❌ استغرقت العملية وقتاً طويلاً ولم تكتمل");
    }

    // إرسال الصورة
    await conn.sendMessage(m.chat, {
      image: { url: result },
      caption: `✅ تم تعديل الصورة بنجاح\n\n📝 التعديل: ${text}`
    }, { quoted: m });

  } catch (err) {
    console.error("EditImage Error:", err);
    m.reply("❌ حدث خطأ غير متوقع أثناء تعديل الصورة");
  }
};

handler.usage = ["تعديل <وصف>"];
handler.command = ["editimage", "تعديل"];
handler.category = "tools";

export default handler;
