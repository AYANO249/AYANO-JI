const MENU_TIMEOUT = 120000;

const CATEGORIES = [
    [1, 'الـتـحـمـيـل', 'downloads', '🌀'],
    [2, 'الـمـجـمـوعـات', 'group', '🌸'],
    [3, 'الـمـلـصـقـات', 'sticker', '🔮'],
    [4, 'الـمـطـوريـن', 'owner', '⚜️'],
    [5, 'الأمـثـلـة', 'example', '💠'],
    [6, 'الأدوات', 'tools', '📜'],
    [7, 'الـبـحـث', 'search', '🔍'],
    [8, 'الـمـشـرفـيـن', 'admin', '✨'],
    [9, 'الألـعـاب', 'games', '🎮'],
    [10, 'الـجـيـف', 'gif', '💮'],
    [11, 'الـبـنـك', 'bank', '💰'],
    [12, 'الـذكـاء الاصـطـنـاعـي', 'ai', '⚙️'],
    [13, 'الـبـوتـات الـفـرعـيـة', 'sub', '🏮'],
    [14, 'مـعـلومـات الـبـوت', 'info', '🧧'],
    [15, 'أقـسـام أخــرى', 'other', '🧸']
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
    const { images } = bot.config.info;
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
        title: "𝐓𝐎𝐉𝐈 𝐈𝐍 ✨ | 𝐁𝐨𝐭 𝐒𝐲𝐬𝐭𝐞𝐦",
        body: "𝚆𝚑𝚊𝚝𝚜𝙰𝚙𝚙 𝚋𝚘𝚝 𝚋𝚢 𝚀𝚄𝚂𝙰𝚈",
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
╭─┈─┈─┈─⟞✨⟝─┈─┈─┈─╮
${CATEGORIES.map(c => `┃ ⌯︙${c[0]} ~ *قـسـم ${c[1]} ${c[3]}*`).join('\n')}
╰─┈─┈─┈─⟞✨⟝─┈─┈─┈─╯
> *الرجاء الرد برقم القسم على الرسالة*
𝐓𝐎𝐉𝐈 𝐈𝐍`;

    const msg = await conn.sendMessage(m.chat, { 
        text: txt,
        contextInfo: context(m.sender, getImg(bot))
    }, { quoted: m });
  
    global.menus[msg.key.id] = { cats, chatId: m.chat, time: Date.now() };
};

menu.before = async (m, { conn, bot }) => {
    clean();
    const menuData = global.menus[m.quoted?.id];
    if (!menuData) return false;
    
    const cat = getCat(parseInt(m.text));
    if (!cat) return false;
    
    let cmds = menuData.cats[cat[2]];
    if (!cmds?.length) {
        await conn.sendMessage(m.chat, { text: '*❌≥ القسم فاضي حالياً*' }, { quoted: m });
        return true;
    }
    
    await conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, id: m.quoted.id, fromMe: true } });
    delete global.menus[m.quoted.id];

    // --- معالجة الأوامر لتكون نظيفة ---
    let finalCmds = [];
    cmds.forEach(c => {
        let raw = Array.isArray(c.command) ? c.command[0] : (Array.isArray(c.usage) ? c.usage[0] : (c.command || c.usage));
        
        // تنظيف الـ Regex (مثل تحويل ^(فيس|فيس)$ إلى فيس)
        if (raw instanceof RegExp || (typeof raw === 'string' && raw.includes('^'))) {
            let match = raw.toString().match(/\((.*?)\|/);
            raw = match ? match[1] : raw.toString().replace(/[^a-z0-9أ-ي]/gi, '');
        }
        
        if (raw && !finalCmds.includes(raw)) finalCmds.push(raw);
    });

    const cmdsList = finalCmds.map(name => `┃${cat[3]} /${name}`).join('\n');
    
    await conn.sendMessage(m.chat, { 
        text: `
╭─┈─┈─┈─⟞${cat[3]}⟝─┈─┈─┈─╮
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

