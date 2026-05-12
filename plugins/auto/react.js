export default async function before(m, { conn, bot }) {

  const targetNumber = "249906024672@s.whatsapp.net";

  const text = (m.text || "").trim();

  // 1) تفاعل خاص للمطور فقط
  if (m.sender === targetNumber && text === "") {
    await m.react("🍭");
    return false;
  }

  // 2) إذا الرسالة = 😂 فقط بدون أي شيء
  if (text === "😂") {
    await m.react("😂");
    return false;
  }

  // 3) إذا فيها نص + 😂 ما يتفاعل
  if (text.includes("😂") && text.length > 1) {
    return false;
  }

  return false;
}
