import axios from 'axios';

// تخزين بيانات المسابقة والنقاط عالمياً
if (!global.quizData) global.quizData = {};
if (!global.quizPoints) global.quizPoints = {};

const handler = async (m, { conn, usedPrefix, command }) => {
    let id = m.chat;

    // 1. التحقق إذا كان هناك سؤال "قديم" لا يزال نشطاً في هذه الدردشة
    if (id in global.quizData) {
        return conn.reply(m.chat, '⚠️ هناك سؤال قيد الانتظار بالفعل! أجب عليه أولاً أو انتظر انتهاء الوقت.', global.quizData[id].msg);
    }

    try {
        // جلب سؤال عشوائي
        const response = await axios.get('https://raw.githubusercontent.com/HoussamE/islamic-quiz-api/main/questions.json');
        const questions = response.data;
        const q = questions[Math.floor(Math.random() * questions.length)];

        const caption = `
╭─┈─┈─┈─⟞🕋⟝─┈─┈─┈─╮
┃    『 *مُسـابَقَـة دِيـنِـيَّـة* 』
╰─┈─┈─┈─⟞🕋⟝─┈─┈─┈─╮

❓ *السؤال:*
${q.question}

⏱️ *الوقت:* 60 ثانية للإجابة.
💰 *الجائزة:* 1 نقطة.
🏆 *الهدف:* أول من يجمع *10 نقاط* يفوز!

╭─┈─┈─┈─⟞🕋⟝─┈─┈─┈─╮
┃ *⌯︙𝐓𝐎𝐉𝐈 𝐈𝐍 ~ 𝐒𝐘𝐒𝐓𝐄𝐌*
╰─┈─┈─┈─⟞🕋⟝─┈─┈─┈─╯`.trim();

        // إرسال كابشن الهوية
        let msg = await conn.sendMessage(m.chat, {
            text: caption,
            contextInfo: context(m.sender, "❓ تحدي المعلومات الإسلامية", "أجب بسرعة لتفوز بالمسابقة! | 𝐓𝐎𝐉𝐈 𝐈𝐍")
        }, { quoted: m });

        let pollOptions = [q.answer, ...q.options].slice(0, 4).sort(() => Math.random() - 0.5);
        
        // إرسال استطلاع الرأي
        let pollMsg = await conn.sendMessage(m.chat, {
            poll: {
                name: `🕋 ما هي الإجابة الصحيحة؟`,
                values: pollOptions,
                selectableCount: 1
            }
        });

        // 2. إعداد ميكانيكية "الإيقاف بعد دقيقة"
        global.quizData[id] = {
            msg: msg,
            poll: pollMsg,
            answer: q.answer,
            timeout: setTimeout(async () => {
                if (global.quizData[id]) {
                    // إذا مرّت دقيقة (60 ثانية) ولم يجاوب أحد
                    await conn.sendMessage(m.chat, { 
                        text: `⌛ *انتهى الوقت (60 ثانية)!*\nتم إيقاف المسابقة لعدم وجود تفاعل.\n\n✅ الإجابة الصحيحة كانت: *${q.answer}*`,
                        edit: msg.key 
                    });
                    
                    // تنظيف البيانات للسماح بسؤال "جديد"
                    delete global.quizData[id];
                }
            }, 60000) // 60 ثانية
        };

    } catch (e) {
        console.error(e);
        delete global.quizData[id];
        m.reply("❌ حدث خطأ أثناء تشغيل المسابقة.");
    }
};

handler.help = ['سؤال'];
handler.tags = ['islamic'];
handler.command = /^(سؤال|quiz)$/i;
handler.category = "islamic";

export default handler;

// دالة التنسيق الموحدة (Context) مع بيانات القناة والـ JID الجديد
const context = (jid, title, body) => ({
    mentionedJid: [jid],
    isForwarded: true,
    forwardingScore: 1,
    forwardedNewsletterMessageInfo: {
        newsletterJid: '120363425314431422@newsletter',
        newsletterName: '𝐓𝐎𝐉𝐈 𝐈𝐍 🏮',
        serverMessageId: 0
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
