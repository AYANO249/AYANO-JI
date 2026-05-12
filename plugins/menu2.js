const CATEGORIES = [
    [1, 'الـتـحـمـيـل', 'downloads', 'ʚɞ'],
    [2, 'الـمـجـمـوعـات', 'group', 'ʚɞ'],
    [3, 'الـمـلـصـقـات', 'sticker', 'ʚɞ'],
    [4, 'الـمـطـوريـن', 'owner', 'ʚɞ'],
    [5, 'الأمـثـلـة', 'example', 'ʚɞ'],
    [6, 'الأدوات', 'tools', 'ʚɞ'],
    [7, 'الـبـحـث', 'search', 'ʚɞ'],
    [8, 'الـمـشـرفـيـن', 'admin', 'ʚɞ'],
    [9, 'الألـعـاب', 'games', 'ʚɞ'],
    [10, 'الـجـيـف', 'gif', 'ʚɞ'],
    [11, 'الـبـنـك', 'bank', 'ʚɞ'],
    [12, 'الـذكـاء الاصـطـنـاعـي', 'ai', 'ʚɞ'],
    [13, 'الـبـوتـات الـفـرعـيـة', 'sub', 'ʚɞ'],
    [14, 'مـعـلومـات الـبـوت', 'info', 'ʚɞ'],
    [15, 'أقـسـام أخــرى', 'other', 'ʚɞ']
];

const getCat = n => CATEGORIES.find(c => c[0] === n);

const getImg = (bot) => {
    const images = bot?.config?.info?.images;

    return Array.isArray(images)
        ? images[Math.floor(Math.random() * images.length)]
        : images || 'https://i.ibb.co/ymYdcdNF/f14281b39364343a3ac05c8ed58f0c29.jpg';
};

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
        title: "𝐈𝐍 𝐀𝐘𝐀𝐍𝐎 𝐉𝐈 | 𝐁𝐨𝐭 𝐢𝐬 𝐛𝐮𝐢𝐥𝐭 𝐨𝐧 𝐭𝐡𝐞 𝐖𝐒/𝐕𝐈𝐈 𝐟𝐫𝐚𝐦𝐞𝐰𝐨𝐫𝐤",
        body: "𝚆𝚑𝚊𝚝𝚜𝙰𝚙𝚙 𝚋𝚘𝚝 𝚝𝚑𝚊𝚝 𝚒𝚜 𝚎𝚊𝚜𝚢 𝚝𝚘 𝚖𝚘𝚍𝚒𝚏𝚢 𝚊𝚗𝚍 𝚟𝚎𝚛𝚢 𝚏𝚊𝚜𝚝",
        thumbnailUrl: img,
        sourceUrl: '',
        mediaType: 1,
        renderLargerThumbnail: true
    }
});

async function handler(m, { conn, bot, command, args }) {

    const selected = parseInt(args[0]);

    const now = new Date();

    const uptimeSeconds = process.uptime();

    const hours = Math.floor(uptimeSeconds / 3600);
    const minutes = Math.floor((uptimeSeconds % 3600) / 60);
    const seconds = Math.floor(uptimeSeconds % 60);

    const uptimeFormatted =
        `${String(hours).padStart(2, '0')}:` +
        `${String(minutes).padStart(2, '0')}:` +
        `${String(seconds).padStart(2, '0')}`;

    const date = now.toLocaleDateString('ar-EG', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const time = now.toLocaleTimeString('ar-EG', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });

    // القائمة الرئيسية
    if (!selected && !args[0]) {

        const sections = [{
            title: "ʚɞ ~ الاقـسـام ~ ʚɞ",
            rows: CATEGORIES.map(c => ({
                title: `${c[0]} ~ ${c[1]} ${c[3]}`,
                description: `اضغط لعرض أوامر قسم ${c[1]}`,
                id: `.${command} ${c[0]}`
            }))
        }];

        const menuText = `
رَبَّنَا اغْفِرْ لَنَا وَلِإِخْوَانِنَا الَّذِينَ سَبَقُونَا بِالْإِيمَانِ
وَلَا تَجْعَلْ فِي قُلُوبِنَا غِلًّا لِّلَّذِينَ آمَنُوا رَبَّنَا إِنَّكَ رَءُوفٌ رَّحِيمٌ

╭─┈─┈─┈─⟞🏮⟝─┈─┈─┈─╮
┃ ⌯🏮︙ اهـلا → *[ @${m.sender.split("@")[0]} ]*
┃ ⌯🧧︙ الـتشـغـيـل → ${uptimeFormatted}
┃ ⌯⚜️︙ الـتـاريـخ → ${date} - ${time}
╰─┈─┈─┈─⟞🏮⟝─┈─┈─┈─╯

> *_اختار قسم من القائمة عشان يبعتلك اوامر القسم_*`;

        await conn.sendButtonNormal(m.chat, {
            media: {
                url: "https://i.ibb.co/mCMhR5sW/8b20ef0dd82f7e0a3bbef077d428c536.jpg"
            },
            mediaType: 'image',
            caption: menuText,
            buttons: [{
                name: "single_select",
                params: {
                    title: "ʚɞ",
                    sections
                }
            }],
            mentions: [m.sender],
            newsletter: {
                name: '𝐈𝐍 𝐀𝐘𝐀𝐍𝐎 𝐉𝐈',
                jid: '120363425314431422@newsletter'
            }
        }, global.reply_status);

        return;
    }

    // التحقق من القسم
    const cat = getCat(selected);

    if (!cat) {
        await conn.sendMessage(
            m.chat,
            {
                text: '*❌ اختار رقم صحيح من 1 لـ 15*',
                contextInfo: context(m.sender, getImg(bot))
            },
            { quoted: m }
        );
        return;
    }

    // جلب الأوامر
    const cmds = await bot.getAllCommands();

    const categoryCmds = cmds.filter(c => c?.category === cat[2]);

    // لو القسم فاضي
    if (!categoryCmds.length) {
        await conn.sendMessage(
            m.chat,
            {
                text: '*❌ القسم فاضي*',
                contextInfo: context(m.sender, getImg(bot))
            },
            { quoted: m }
        );
        return;
    }

    // إصلاح مشكلة usage
    const cmdsList = categoryCmds.map(c => {

        let usage = [];

        if (Array.isArray(c?.usage)) {
            usage = c.usage;
        } else if (typeof c?.usage === 'string') {
            usage = [c.usage];
        } else if (c?.command) {
            usage = Array.isArray(c.command)
                ? c.command
                : [c.command];
        } else {
            usage = ['بدون اسم'];
        }

        return `${cat[3]} /${usage.join(`\n${cat[3]} /`)}`;

    }).join('\n');

    // إرسال القسم
    await conn.sendMessage(
        m.chat,
        {
            text: `
╭─┈─┈─┈─⟞${cat[3]}⟝─┈─┈─┈─╮
┃ *⌯︙ قـسـم ${cat[1]} ${cat[3]}*
╰─┈─┈─┈─⟞${cat[3]}⟝─┈─┈─┈─╯

${cmdsList}

╭─┈─┈─┈─⟞${cat[3]}⟝─┈─┈─┈─╮
┃ *⌯︙𝐈𝐍 𝐓𝐎𝐉𝐈 ~ ${bot?.config?.info?.nameBot || '𝐓𝐎𝐉𝐈'}*
╰─┈─┈─┈─⟞${cat[3]}⟝─┈─┈─┈─╯

> *رَبَّنَا اغْفِرْ لَنَا وَلِإِخْوَانِنَا*
            `.trim(),

            contextInfo: context(m.sender, getImg(bot))
        },
        { quoted: m }
    );
}

handler.command = ['المهام'];

export default handler;
