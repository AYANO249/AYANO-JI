const test = async (m, { conn, bot }) => {
  // رقم المؤسس الخاص بك
  const ownerNumber = "249906024672@s.whatsapp.net";

  // التحقق مما إذا كان مرسل الأمر هو المؤسس حصراً
  if (m.sender !== ownerNumber) {
    return m.reply(`*─── ❲ صـلاحـيـة الـمـطور ❳ ───*\n\nالـوصـول مـرفـوض، هـذا الأمـر مـخـصـص لـمـؤسـس الـبـوت فـقـط.\n\n*─── 𝐈𝐍 ⁝|⁝ 𝐀𝐘𝐀𝐍𝐎 𝐉𝐈 ʚɞ ───*`);
  }

  m.react("🟢");
  
  conn.msgUrl(m.chat, "ʚɞ Stop the bot...", { 
    title: "𝐀𝐘𝐀𝐍𝐎 𝐉𝐈 𝐈𝐒 𝐀 𝐖𝐇𝐀𝐓𝐒𝐀𝐏𝐏 𝐁𝐎𝐓",
    body: "𝐓𝐇𝐄 𝐁𝐎𝐓 𝐈𝐒 𝐒𝐈𝐌𝐏𝐋𝐄 𝐓𝐎 𝐌𝐎𝐃𝐈𝐅𝐘",
    img: "https://i.ibb.co/0p8MT7kS/bfe2f787dae49dd9efe465d5c1203ecc.jpg", // تم تغيير رابط الصورة هنا
    big: false 
  });
  
  setTimeout(() => {
    bot.stop();
  }, 1000); 
};

test.category = "owner";
test.command = ["ايقاف", "stop"];
test.owner = true; 
export default test;
