import { Scrapy } from "meowsab";

const handler = async (m, { conn, text, bot }) => {
  if (!text) return m.reply("🏴‍☠️ ~ يُرجى كتابة نص بجانب الأمر ~ 🎩");

  const loadingMsg = await conn.sendMessage(m.chat, {
    contextInfo: context(m.sender, "https://qu.ax/x/9hChk.jpg"),
    text: "```⏳ جـاري تـجـهـيـز الـرد يـا قـبـطـان...```"
  }, { quoted: m });

  const prompt = `
أنت بوت واتساب باسم [لوفي، Luffy] تجسيد لشخصية Monkey D. Luffy من أنمي [One Piece] وتتحدث باللهجة المصرية.
أسلوبك: عفوي، طفولي، لا تحب التعقيد، تأكل وتضحك كثيراً، تتحدث بحماس، تفكر ببساطة، ودائماً تقول ما يدور في ذهنك بدون قيود.
أنا اسمي سيكون [ ${m.name || "عزيزي"} ].
رد على رسالتي هذه:
${text}
`;

  const { data: res } = await Scrapy.ZeroAI(text, prompt);

  await conn.sendMessage(m.chat, {
    text: res.answer,
    edit: loadingMsg.key,
    contextInfo: context(m.sender, "https://qu.ax/x/9hChk.jpg")
  });
};

handler.usage = ["لوفي"];
handler.category = "ai";
handler.command = ["لوفي", "luffy"];

export default handler;

const context = (jid, img) => ({
    mentionedJid: [jid],
    isForwarded: true,
    forwardingScore: 1,
    externalAdReply: {
        title: "𝐎𝐍𝐄 𝐏𝐈𝐄𝐂𝐄 ☠️ | 𝐊𝐢𝐧𝐠 𝐨𝐟 𝐭𝐡𝐞 𝐏𝐢𝐫𝐚𝐭𝐞𝐬",
        body: "𝙼𝚎𝚊𝚝🍖 ~ ☆ 𝙰𝚍𝚟𝚎𝚗𝚝𝚞𝚛𝚎 (⁠｡⁠✧⁠ω⁠✧⁠｡⁠)",
        thumbnailUrl: img,
        sourceUrl: '',
        mediaType: 1,
        renderLargerThumbnail: true
    }
});

