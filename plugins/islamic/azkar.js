const handler = async (m, { conn, usedPrefix, command }) => {
    const azkarList = [
        "اللهم أنت ربي لا إله إلا أنت، خلقتني وأنا عبدك، وأنا على عهدك ووعدك ما استطعت، أعوذ بك من شر ما صنعت، أبوء لك بنعمتك علي، وأبوء بذنبي فاغفر لي فإنه لا يغفر الذنوب إلا أنت.",
        "أصبحنا وأصبح الملك لله، والحمد لله، لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير.",
        "رضيت بالله رباً، وبالإسلام ديناً، وبمحمد صلى الله عليه وسلم نبياً. (3 مرات)",
        "يا حي يا قيوم برحمتك أستغيث أصلح لي شأني كله ولا تكلني إلى نفسي طرفة عين.",
        "حسبي الله لا إله إلا هو عليه توكلت وهو رب العرش العظيم. (7 مرات)",
        "بسم الله الذي لا يضر مع اسمه شيء في الأرض ولا في السماء وهو السميع العليم. (3 مرات)",
        "سُبحان الله وبحمده: عدد خلقه، ورضا نفسه، وزنة عرشه، ومداد كلماته. (3 مرات)",
        "اللهم إني أسألك العفو والعافية في الدنيا والآخرة، اللهم إني أسألك العفو والعافية في ديني ودنياي وأهلي ومالي.",
        "لا إله إلا أنت سبحانك إني كنت من الظالمين.",
        "اللهم صل وسلم وبارك على نبينا محمد وعلى آله وصحبه أجمعين. (10 مرات)"
    ];

    await m.reply(`⏳ جاري إرسال جميع الأذكار...`);

    // إرسال كل ذكر في القائمة بشكل متتابع
    for (const zikr of azkarList) {
        const caption = `
╭─┈─┈─┈─⟞🕋⟝─┈─┈─┈─╮
┃    『 *ذِكْـرٌ وَدُعَـاء* 』
╰─┈─┈─┈─⟞🕋⟝─┈─┈─┈─╮

${zikr}

╭─┈─┈─┈─⟞🕋⟝─┈─┈─┈─╮
┃ *⌯︙𝐓𝐎𝐉𝐈 𝐈𝐍 ~ 𝐒𝐘𝐒𝐓𝐄𝐌*
╰─┈─┈─┈─⟞🕋⟝─┈─┈─┈─╯
> *أَلا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ*`.trim();

        await conn.sendMessage(m.chat, {
            text: caption,
            contextInfo: context(m.sender, "🕋 الأذكار اليومية", "تذكير بذكر الله | 𝐓𝐎𝐉𝐈 𝐈𝐍")
        }, { quoted: m });
        
        // تأخير بسيط جداً بين الرسائل لتجنب الحظر أو ضغط الإرسال
        await new Promise(resolve => setTimeout(resolve, 500));
    }
};

handler.help = ['اذكار'];
handler.tags = ['islamic'];
handler.command = /^(اذكار|أذكار|zikr)$/i;
handler.category = "islamic";

export default handler;

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
        sourceUrl: 'https://whatsapp.com/channel/0029VbD2uOa6rsQqt4yQQW0Y',
        mediaType: 1,
        renderLargerThumbnail: true
    }
});
