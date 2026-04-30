import axios from 'axios';
import cheerio from 'cheerio';
import FormData from 'form-data';
import { Convert } from "meowsab";

let handler = async (m, { conn, text, command }) => {
 
 // التحقق من الرد على ملصق
 if (!m.quoted) return m.reply('*❲ ⚠️ ❳ ~ يرجى الرد على الملصق الذي تود تحويله إلى فيديو.*');

 // التأكد من أن الملف بصيغة ملصق (webp)
 if (!/webp/.test(m.quoted.mimetype)) return m.reply('*❲ ❌ ❳ ~ هذا الملف ليس ملصقاً.*');

 try {
   const buffer = await m.quoted.download();
   
   // تحويل الملصق المتحرك إلى فيديو mp4
   let smp4 = await Convert.WebpToMp4(buffer);
   
   await conn.sendMessage(m.chat, {
        video: { url: smp4 },
        caption: `*✅ ~ تمت عملية التحويل بنجاح*`,
      }, { quoted: m });
      
 } catch (error) {
   console.error(error);
   return m.reply('*❲ ❌ ❳ ~ عذراً، فشل تحويل هذا الملصق إلى فيديو.*');
 }
}

handler.usage = ["لفيديو"];
handler.category = "tools";
handler.command = /^(tovideo|tovid|tomp4|لفيديو)$/i;

export default handler;

