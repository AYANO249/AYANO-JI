const test = async (m, { conn, bot }) => {
  // رقم المؤسس الخاص بك
  const ownerNumber = "249906024672@s.whatsapp.net";

  // التحقق مما إذا كان مرسل الأمر هو المؤسس حصراً
  if (m.sender !== ownerNumber) {
    return m.reply(`*─── ❲ صـلاحـيـة الـمـطور ❳ ───*\n\nالـوصـول مـرفـوض، هـذا الأمـر مـخـصـص لـمـؤسـس الـبـوت فـقـط.\n\n*─── 𝐈𝐍 ⁝|⁝ 𝐀𝐘𝐀𝐍𝐎 𝐉𝐈 ʚɞ ───*`);
  }

  m.react("🟢");
  
  conn.msgUrl(m.chat, "♡゙ Stop the bot...", { 
    title: "𝐀𝐘𝐀𝐍𝐎 𝐉𝐈 𝘪𝘴 𝘢 𝘞𝘩𝘢𝘵𝘴𝘈𝘱𝘱 𝘣𝘰𝘵",
    body: "𝑇𝒉𝑒 𝑏𝑜𝑡 𝑖𝑠 𝑠𝑖𝑚𝑝𝑙𝑒 𝑡𝑜 𝑚𝑜𝑑𝑖𝑓𝑦",
    img: "https://g.top4top.io/p_3700yob0b1.jpg",
    big: false 
  });
  
  setTimeout(() => {
    bot.stop();
  }, 1000); 
};

test.category = "owner";
test.command = ["ايقاف", "stop"];
test.owner = true; // ميزة التحقق الافتراضية للمطورين
export default test;
