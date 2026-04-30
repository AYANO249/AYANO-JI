import { exec } from "child_process";
import fs from "fs";
import path from "path";
import { promisify } from "util";

const execAsync = promisify(exec);

const toAudio = async (m, { conn }) => {
  try {
    // التحقق من الرد على مقطع فيديو
    if (!m.quoted) {
      return m.reply("*❲ ⚠️ ❳ ~ يرجى الرد على مقطع فيديو لتحويله إلى ملف صوتي.*")
    }

    const tmp = path.join(process.cwd(), "tmp");
    if (!fs.existsSync(tmp)) fs.mkdirSync(tmp);

    const video = path.join(tmp, `${Date.now()}.mp4`);
    const audio = path.join(tmp, `${Date.now()}.mp3`);

    // حفظ الفيديو مؤقتاً
    fs.writeFileSync(video, await m.quoted.download());

    // عملية التحويل باستخدام ffmpeg
    await execAsync(`ffmpeg -i "${video}" -vn -acodec libmp3lame "${audio}" -y`);

    // إرسال الملف الصوتي الناتج
    await conn.sendMessage(m.chat, { 
      audio: fs.readFileSync(audio), 
      mimetype: "audio/mpeg" 
    }, { quoted: m });

    // تنظيف الملفات المؤقتة من الجهاز
    fs.unlinkSync(video);
    fs.unlinkSync(audio);
    
  } catch (e) {
    await conn.sendMessage(m.chat, { text: `*❲ ❌ ❳ ~ حدث خطأ أثناء التحويل:* ${e.message}` });
  }
};

toAudio.usage = ["لصوت"];
toAudio.category = "tools";
toAudio.command = ["لصوت", "tomp3"];

export default toAudio;

