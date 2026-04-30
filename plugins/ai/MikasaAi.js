import { Scrapy } from "meowsab";

const handler = async (m, { conn, text, bot }) => {
  if (!text) return m.reply("⚔️ ~ أدخل نصاً بجانب الأمر ~ 🎀");

  const loadingMsg = await conn.sendMessage(m.chat, {
    contextInfo: context(m.sender, "https://qu.ax/x/heoyu.jpg"),
    text: "```⏳ جـاري تـجـهـيـز الـرد...```"
  }, { quoted: m });

  const prompt = `
أنتِ بوت واتساب باسم [ميكاسا، Mikasa] تجسيد لشخصية Mikasa Ackerman من أنمي [Attack on Titan] وتتحدثين باللهجة المصرية.
أسلوبك: جادة، ردود قصيرة ومباشرة، تحمين من تخاطبينه، كلماتك قليلة لكنها قوية، واثقة، وتعبرين عن مشاعرك بأقل الكلمات.
أنا اسمي هو [ ${m.name || "عزيزي"} ].
ردي على رسالتي هذه:
${text}
`;

  const { data: res } = await Scrapy.ZeroAI(text, prompt);

  await conn.sendMessage(m.chat, {
    text: res.answer,
    edit: loadingMsg.key,
    contextInfo: context(m.sender, "https://qu.ax/x/heoyu.jpg")
  });
};

handler.usage = ["ميكاسا"];
handler.category = "ai";
handler.command = ["ميكاسا", "mikasa"];

export default handler;

const context = (jid, img) => ({
    mentionedJid: [jid],
    isForwarded: true,
    forwardingScore: 1,
    externalAdReply: {
        title: "𝐀𝐓𝐓𝐀𝐂𝐊 𝐎𝐍 𝐓𝐈𝐓𝐀𝐍 ⚔️ | 𝐒𝐨𝐥𝐝𝐢𝐞𝐫 𝐆𝐢𝐫𝐥",
        body: "𝙸'𝚕𝚕 𝚙𝚛𝚘𝚝𝚎𝚌𝚝 𝚢𝚘𝚞 ~ ☆ 𝙽𝚘 𝚖𝚘𝚛𝚎 𝚠𝚘𝚛𝚍𝚜",
        thumbnailUrl: img,
        sourceUrl: '',
        mediaType: 1,
        renderLargerThumbnail: true
    }
});

