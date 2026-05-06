import axios from 'axios';

// ذاكرة مؤقتة لحفظ حالة السؤال والنقاط
if (!global.quizData) global.quizData = {};
if (!global.quizPoints) global.quizPoints = {};

const handler = async (m, { conn, usedPrefix, command }) => {
    let id = m.chat;

    // منع تكرار الأسئلة في نفس الوقت
    if (id in global.quizData) {
        return conn.reply(m.chat, '⚠️ هناك سؤال نشط بالفعل! أجب عليه أولاً أو انتظر انتهاء الوقت.', global.quizData[id].msg);
    }

    try {
        // جلب السؤال من المصدر
        const response = await axios.get('https://raw.githubusercontent.com/HoussamE/islamic-quiz-api/main/questions.json');
        const q = response.data[Math.floor(Math.random() * response.data.length)];

        const caption = `
╭─┈─┈─┈─⟞🕋⟝─┈─┈─┈─╮
┃    『 *مُسـابَقَـة دِيـنِـيَّـة* 』
╰─┈─┈─┈─⟞🕋⟝─┈─┈─┈─╮

❓ *السؤال:*
${q.question}

⏱️ *الوقت:* 60 ثانية للإجابة.
💰 *الجائزة:* 1 نقطة.
🏆 *الهدف:* 10 نقاط للفوز باللقب.

╭─┈─┈─┈─⟞🕋⟝─┈─┈─┈─╮
┃ *⌯︙𝐓𝐎𝐉𝐈 𝐈𝐍 ~ 𝐒𝐘𝐒𝐓𝐄𝐌*
╰─┈─┈─┈─⟞🕋⟝─┈─┈─┈─╯`.trim();

        // 1. إرسال الهوية (كأنها محولة)
        let msg = await conn.sendMessage(m.chat, {
            text: caption,
            contextInfo: context(m.sender, "❓ تحدي المعلومات الإسلامية", "أجب الآن لتجمع النقاط! | 𝐓𝐎𝐉𝐈 𝐈𝐍")
        }, { quoted: m });

        // 2. إرسال استطلاع الرأي
        let pollOptions = [q.answer, ...q.options].slice(0, 4).sort(() => Math.random() - 0.5);
        let pollMsg = await conn.sendMessage(m.chat, {
            poll: {
                name: `🕋 ما هي الإجابة الصحيحة؟`,
                values: pollOptions,
                selectableCount: 1
            }
        });

        // 3. ضبط المؤقت (دقيقة واحدة)
        global.quizData[id] = {
            msg: msg,
            answer: q.answer,
            timeout: setTimeout(async () => {
                if (global.quizData[id]) {
                    await conn.sendMessage(m.chat, { 
                        text: `⌛ *انتهى الوقت!* لعدم وجود تفاعل كافٍ.\n\n✅ الإجابة الصحيحة: *${q.answer}*`,
                        edit: msg.key 
                    });
                    delete global.quizData[id];
                }
            }, 60000) 
        };

    } catch (e) {
        console.error(e);
        delete global.quizData[id];
        m.reply("❌ حدث خطأ، حاول مجدداً.");
    }
};

handler.help = ['سؤال'];
handler.tags = ['islamic'];
handler.command = /^(سؤال|quiz)$/i;

export default handler;

// دالة التنسيق الموحدة لهوية 𝐓𝐎𝐉𝐈 𝐈𝐍
const context = (jid, title, body) => ({
    mentionedJid: [jid],
    forwardingScore: 999,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
        newsletterJid: '120363425314431422@newsletter',
        newsletterName: '𝐓𝐎𝐉𝐈 𝐈𝐍 🏮',
        serverMessageId: 143
    },
    externalAdReply: {
        title: title,
        body: body,
        thumbnailUrl: 'https://i.ibb.co/r2CKLTLT/a27eefa4ae6dce04e9a0a7bd506e2a7f.jpg',
        sourceUrl: 'https://whatsapp.com/channel/0029VbD3UpkG3R3aq6V1DW2X',
        mediaType: 1,
        renderLargerThumbnail: true
    }
});
