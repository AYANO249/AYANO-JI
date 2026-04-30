import axios from 'axios';
import FormData from 'form-data';

let handler = async (m, { conn }) => {
  try {
    // التحقق من الرد على صورة
    if (!m.quoted) return m.reply("*❲ ⚠️ ❳ ~ يرجى الرد على الصورة التي ترغب في استخراج النص منها (⁠ ⁠╹⁠▽⁠╹⁠ ⁠)*");
    
    const buffer = await m.quoted.download();
    const form = new FormData();
    form.append('image', buffer, { filename: 'image.jpg', contentType: 'image/jpeg' });

    // إرسال الصورة للمحرك لاستخراج النص
    const res = await axios.post('https://emam-api.web.id/home/sections/Tools/api/ocr-image', form, {
      headers: form.getHeaders()
    });

    // التأكد من وجود نتيجة قبل الإرسال
    if (!res.data.result) return m.reply("*❲ ❌ ❳ ~ عذراً، لم أتمكن من العثور على أي نص في هذه الصورة.*");

    await conn.sendMessage(m.chat, { text: res.data.result }, { quoted: m });
  } catch (error) {
    await conn.sendMessage(m.chat, { text: `*❲ ❌ ❳ ~ حدث خطأ أثناء المعالجة:*\n${error.message}` }, { quoted: m });
  }
};

handler.usage = ["نسخ"];
handler.command = ["نسخ", "ocr"];
handler.category = "tools";

export default handler;

