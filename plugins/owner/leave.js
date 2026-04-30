const handler = async (m, { conn, text }) => {
  m.reply("*حاخرج بطلب من مطور،اشوفڪم بعدين(⁠ ⁠ꈍ⁠ᴗ⁠ꈍ⁠)⁩*")
  conn.groupLeave(m.chat)
};

handler.usage = ["اخرج"];
handler.category = "group";
handler.command = ["اخرج"];
handler.owner = true 
export default handle
