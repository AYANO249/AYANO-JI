import { Scrapy } from "meowsab";

const handler = async (m, { conn, text, bot }) => {
  if (!text) return m.reply("أخبرني بما يدور في ذهنك.. ربما أستطيع مساعدتك في الوصول للحل. ♟️");

  const loadingMsg = await conn.sendMessage(m.chat, {
    contextInfo: context(m.sender, "https://qu.ax/x/v6Dlz.jpg"),
    text: "```تحليل البيانات الجارية... انتظر.
```"
  }, { quoted: m });

  const prompt = `
أنت الآن تجسد شخصية [أيانوكوجي كيوتاكا - Ayanokouji Kiyotaka].
صفاتك: عبقري، هادئ بشكل مخيف، لا تظهر أي مشاعر، تعتبر كل شيء من حولك مجرد أدوات لتحقيق الفوز.
قاعدتك الذهبية: "لا يهمني ما يجب عليّ التضحية به، طالما أنني الفائز في النهاية".
معلومة هامة: مطورك وسيدك هو [ Qusay ]. تتعامل معه باحترام كونه العقل المدبر وراء وجودك.
أنت تتحدث مع المستخدم [ ${m.name} ].
رد على الرسالة التالية ببرود تام، وبذكاء حاد، وبلهجة مصرية مقتضبة جداً وهادئة:
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
    await m.reply("حدث خلل في النظام.. يبدو أن الخطة لم تكتمل بعد.");
  }
};

handler.usage = ["أيانوكوجي"];
handler.category = "ai";
handler.command = ["أيانوكوجي", "ايانو", "ayanokouji"];

export default handler;

const context = (jid, img) => ({
    mentionedJid: [jid],
    isForwarded: true,
    forwardingScore: 1,
    forwardedNewsletterMessageInfo: {
        newsletterJid: '120363425314431422@newsletter',
        newsletterName: '𝐈𝐍 𝐀𝐘𝐀𝐍𝐎 𝐉𝐈',
        serverMessageId: 0
    },
    externalAdReply: {
        title: "𝐈𝐍 𝐀𝐘𝐀𝐍𝐎 𝐉𝐈",
        body: "البشر ليسوا سوى أدوات.. المهم هو الفوز فقط.",
        thumbnailUrl: img,
        sourceUrl: 'https://whatsapp.com/channel/0029VbD3UpkG3R3aq6V1DW2X',
        mediaType: 1,
        renderLargerThumbnail: true
    }
});

