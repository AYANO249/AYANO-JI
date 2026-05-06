const handler = async (m, { conn, usedPrefix, command }) => {
    const azkarList = [
        "1️⃣ اللهم أنت ربي لا إله إلا أنت، خلقتني وأنا عبدك، وأنا على عهدك ووعدك ما استطعت، أعوذ بك من شر ما صنعت، أبوء لك بنعمتك علي، وأبوء بذنبي فاغفر لي فإنه لا يغفر الذنوب إلا أنت.",
        "2️⃣ أصبحنا وأصبح الملك لله، والحمد لله، لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير.",
        "3️⃣ رضيت بالله رباً، وبالإسلام ديناً، وبمحمد صلى الله عليه وسلم نبياً. (3 مرات)",
        "4️⃣ يا حي يا قيوم برحمتك أستغيث أصلح لي شأني كله ولا تكلني إلى نفسي طرفة عين.",
        "5️⃣ حسبي الله لا إله إلا هو عليه توكلت وهو رب العرش العظيم. (7 مرات)",
        "6️⃣ بسم الله الذي لا يضر مع اسمه شيء في الأرض ولا في السماء وهو السميع العليم. (3 مرات)",
        "7️⃣ سُبحان الله وبحمده: عدد خلقه، ورضا نفسه، وزنة عرشه، ومداد كلماته. (3 مرات)",
        "8️⃣ اللهم إني أسألك العفو والعافية في الدنيا والآخرة، اللهم إني أسألك العفو والعافية في ديني ودنياي وأهلي ومالي.",
        "9️⃣ لا إله إلا أنت سبحانك إني كنت من الظالمين.",
        "🔟 اللهم صل وسلم وبارك على نبينا محمد وعلى آله وصحبه أجمعين. (10 مرات)"
    ];

    // دمج مصفوفة الأذكار في نص واحد مع فواصل
    const allAzkar = azkarList.join('\n\n─── ⋆⋅⭐⋅⋆ ───\n\n');

    const caption = `
╭─┈─┈─┈─⟞🕋⟝─┈─┈─┈─╮
┃    『 *جَمِـيعُ الأَذْكَـار* 』
╰─┈─┈─┈─⟞🕋⟝─┈─┈─┈─╮

${allAzkar}

╭─┈─┈─┈─⟞🕋⟝─┈─┈─┈─╮
┃ *⌯︙𝐓𝐎𝐉𝐈 𝐈𝐍 ~ 𝐒𝐘𝐒𝐓𝐄𝐌*
╰─┈─┈─┈─⟞🕋⟝─┈─┈─┈─╯
> *أَلا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ*`.trim();

    await conn.sendMessage(m.chat, {
        text: caption,
        contextInfo: context(m.sender, "🕋 الأذكار اليومية كاملة", "تذكير بذكر الله | 𝐓𝐎𝐉𝐈 𝐈𝐍")
    }, { quoted: m });
};

handler.help = ['اذكار'];
handler.tags = ['islamic'];
handler.command = /^(اذكار|أذكار|zikr)$/i;
handler.category = "islamic";

export default handler;

// دالة التنسيق الموحدة (Context) مع بيانات القناة والرسالة المحولة
const context = (jid, title, body) => ({
    mentionedJid: [jid],
    isForwarded: true,
    forwardingScore: 999,
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
