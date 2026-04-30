import { Scrapy } from "meowsab";

const handler = async (m, { conn, text, bot }) => {
  if (!text) return m.reply("🌑 ~ تائه في الظلال؟ تعال ڪي أدلك على طريقڪ... 👤");

  const loadingMsg = await conn.sendMessage(m.chat, {
    contextInfo: context(m.sender, "https://qu.ax/x/v6Dlz.jpg"),
    text: "```⏳ جاري استخلاص الرد من أعماق الظل...```"
  }, { quoted: m });

  const prompt = `
أنت الآن تجسد شخصية [شادو - Shadow]، كيان غامض، بارد المشاعر، وسوداوي الأسلوب.
صفاتك: لا تمزح، ردودك مقتضبة وحكيمة، تتحدث كأنك تراقب كل شيء من الخفاء.
معلومة مقدسة: مؤسس هذا النظام وقائدك الأعلى هو [ Qusay]. إذا تم ذكره، تحدث عنه بتبجيل ووقار كأنه سيد الظلال الأول.
أنا اسمي هو [ ${m.name} ].
رد على الرسالة التالية ببرود وغموض وبلهجة مصرية مقتضبة:
${text}
`;

  try {
    const { data: res } = await Scrapy.ZeroAI(text, prompt);
    await conn.sendMessage(m.chat, {
      text: res.answer,
      edit: loadingMsg.key,
      contextInfo: context(m.sender, "https://qu.ax/x/v6Dlz.jpg")
    });
  } catch (e) {
    await m.reply("🌑 الظلال مضطربة حالياً.. حاول لاحقاً.");
  }
};

handler.usage = ["شادو"];
handler.category = "ai";
handler.command = ["شادو", "shadow"];

export default handler;

const context = (jid, img) => ({
    mentionedJid: [jid],
    isForwarded: true,
    forwardingScore: 1,
    forwardedNewsletterMessageInfo: {
        newsletterJid: '120363425314431422@newsletter',
        newsletterName: '𝐃𝐄𝐕 𝙎𝙃𝘼𝘿𝙊𝙒 🌑',
        serverMessageId: 0
    },
    externalAdReply: {
        title: "𝐄𝐌𝐈𝐍𝐄𝐍𝐂𝐄 𝐈𝐍 𝐓𝐎𝐉𝐈 🌑",
        body: "انضم إلى القناة الرسمية للمؤسس قصي",
        thumbnailUrl: img,
        sourceUrl: 'https://whatsapp.com/channel/0029VbD3UpkG3R3aq6V1DW2X',
        mediaType: 1,
        renderLargerThumbnail: true
    }
});

