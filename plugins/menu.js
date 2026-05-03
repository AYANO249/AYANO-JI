const MENU_TIMEOUT = 120000;

const CATEGORIES = [
    [1, '﴿الـتـحـمـيـل﴾', 'downloads', 'ʚɞ'],
    [2, '﴿الـمـجـمـوعـات﴾', 'group', 'ʚɞ'],
    [3, '﴿الـمـلـصـقات﴾', 'sticker', 'ʚɞ'],
    [4, '﴿الـمطـوريـن﴾', 'owner', 'ʚɞ'],
    [5, '﴿الأمـثـلة﴾', 'example', 'ʚɞ'],
    [6, '﴿الأدوات﴾', 'tools', 'ʚɞ'],
    [7, '﴿البحث﴾', 'search', 'ʚɞ'],
    [8, '﴿الـمـشـرفـيـن﴾', 'admin', 'ʚɞ'],
    [9, '﴿الألـعـاب﴾', 'games', 'ʚɞ'],
    [10, '﴿الـجـيف﴾', 'gif', 'ʚɞ'],
    [11, '﴿الـبنڪ﴾', 'bank', 'ʚɞ'],
    [12, '﴿الـذڪاء الإصطناعي﴾', 'ai', 'ʚɞ'],
    [13, '﴿الـبوتـات الـفـࢪعية﴾', 'sub', 'ʚɞ'],
    [14, '﴿مـعلومـات الـبوتـات﴾', 'info', 'ʚɞ'],
    [15, '﴿أقسام أخرى﴾', 'other', 'ʚɞ']
];

const getCat = n => CATEGORIES.find(c => c[0] === n);

if (!global.menus) global.menus = {};

const clean = () => {
    const now = Date.now();
    Object.keys(global.menus).forEach(k => {
        if (now - global.menus[k].time > MENU_TIMEOUT) delete global.menus[k];
    });
};

const getImg = (bot) => {
    const images = bot.config?.info?.images;
    if (!images) return 'https://telegra.ph/file/default.jpg'; // رابط احتياطي في حال عدم وجود صور
    return Array.isArray(images) ? images[Math.floor(Math.random() * images.length)] : images;
};

const context = (jid, img) => ({
    mentionedJid: [jid],
    isForwarded: true,
    forwardingScore: 1,
    forwardedNewsletterMessageInfo: {
        newsletterJid: '120363407991526193@newsletter',
        newsletterName: '𝐈𝐍 | 𝐃𝐀𝐒𝐇',
        serverMessageId: 0
    },
    externalAdReply: {
        title: "𝐓𝐎𝐉𝐈 𝐈𝐍 🏮 | 𝐁𝐨𝐭 𝐒𝐲𝐬𝐭𝐞𝐦",
        body: "𝚃𝙾𝙹𝙸 𝙱𝙾𝚃 𝙸𝚂 𝙰 𝙱𝙴𝚂𝚃",
        thumbnailUrl: img,
        sourceUrl: 'https://whatsapp.com/channel/0029VbD2uOa6rsQqt4yQQW0Y',
        mediaType: 1,
        renderLargerThumbnail: true
    }
});

const menu = async (m, { conn, bot }) => {
    clean();
    const cmds = await bot.getAllCommands();
    const cats = {};

    cmds.forEach(c => {
        if (!c.usage && !c.command) return;
        let cat = (c.category || 'other').toLowerCase();
        if (!cats[cat]) cats[cat] = [];
        cats[cat].push(c);
    });

    const txt = `
رَبَّنَا اغْفِرْ لَنَا وَلِإِخْوَانِنَا الَّذِينَ سَبَقُونَا بِالْإِيمَانِ
وَلَا تَجْعَلْ فِي قُلُوبِنَا غِلًّا لِّلَّذِينَ آمَنُوا رَبَّنَا إِنَّكَ رَءُوفٌ رَّحِيمٌ
╭─┈─┈─┈─⟞ʚɞ⟝─┈─┈─┈─╮
${CATEGORIES.map(c => `┃ ⌯︙${c[0]} ~ *قـسـم ${c[1]} ${c[3]}*`).join('\n')}
╰─┈─┈─┈─⟞ʚɞ⟝─┈─┈─┈─╯
> *الرجاء الرد برقم القسم على الرسالة*
𝐓𝐎𝐉𝐈 𝐈𝐍 🏮`;

    const msg = await conn.sendMessage(m.chat, {
        text: txt,
        contextInfo: context(m.sender, getImg(bot))
    }, { quoted: m });

    global.menus[msg.key.id] = { cats, chatId: m.chat, time: Date.now() };
};

menu.before = async (m, { conn, bot }) => {
    if (!m.quoted || !m.text) return false;
    clean();
    
    const menuData = global.menus[m.quoted.id];
    if (!menuData) return false;

    const catNum = parseInt(m.text.trim());
    if (isNaN(catNum)) return false;

    const cat = getCat(catNum);
    if (!cat) return false;

    let cmds = menuData.cats[cat[2]];
    if (!cmds || cmds.length === 0) {
        await conn.sendMessage(m.chat, { text: '*❌ ≥ القسم فاضي حالياً*' }, { quoted: m });
        return true;
    }

    // حذف رسالة القائمة القديمة لتنظيف الدردشة
    try {
        await conn.sendMessage(m.chat, { delete: m.quoted.key });
    } catch (e) { /* تجاهل الخطأ إذا لم يملك الصلاحية */ }
    
    delete global.menus[m.quoted.id];

    let finalCmds = [];
    cmds.forEach(c => {
        let raw = Array.isArray(c.command) ? c.command[0] : (Array.isArray(c.usage) ? c.usage[0] : (c.command || c.usage));
        
        if (raw instanceof RegExp) {
            raw = raw.source.replace(/[\^\$\(\)\[\]\\]/g, '').split('|')[0];
        } else if (typeof raw === 'string' && raw.includes('^')) {
            raw = raw.replace(/[\^\$\(\)\[\]\\]/g, '').split('|')[0];
        }

        if (raw && !finalCmds.includes(raw)) finalCmds.push(raw);
    });

    const cmdsList = finalCmds.map(name => `┃${cat[3]} /${name}`).join('\n');

    await conn.sendMessage(m.chat, {
        text: `╭─┈─┈─┈─⟞${cat[3]}⟝─┈─┈─┈─╮
┃ *⌯︙ قـسـم ${cat[1]} ${cat[3]}*
╰─┈─┈─┈─⟞${cat[3]}⟝─┈─┈─┈─╯

${cmdsList}

╭─┈─┈─┈─⟞${cat[3]}⟝─┈─┈─┈─╮
┃ *⌯︙𝐓𝐎𝐉𝐈 𝐈𝐍 ~ 𝐒𝐘𝐒𝐓𝐄𝐌*
╰─┈─┈─┈─⟞${cat[3]}⟝─┈─┈─┈─╯
> *رَبَّنَا اغْفِرْ لَنَا وَلِإِخْوَانِنَا*`.trim(),
        contextInfo: context(m.sender, getImg(bot))
    }, { quoted: m });

    return true;
};

menu.command = ['الاوامر', 'القائمة', 'menu', 'اوامر'];
export default menu;
