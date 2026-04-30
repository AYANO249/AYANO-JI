const toGif = async (m, { conn }) => {
  try {
    // التحقق من الرد على فيديو
    if (!m.quoted) {
      return m.reply("*❲ ⚠️ ❳ ~ يرجى الرد على مقطع فيديو لتحويله إلى جيف.*");
    }

    const buffer = await m.quoted.download();
    
    // إرسال الفيديو كملف GIF
    await conn.sendMessage(m.chat, { 
      video: buffer, 
      gifPlayback: true 
    });
  } catch (e) {
    await conn.sendMessage(m.chat, { text: `*❲ ❌ ❳ ~ حدث خطأ:* ${e.message}` });
  }
};

toGif.usage = ["لجيف"];
toGif.category = "tools";
toGif.command = ["لجيف", "togif", "لچيف"];

export default toGif;

