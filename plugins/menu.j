const MENU_TIMEOUT = 120000;

const CATEGORIES = [
    [1, 'التحميل', 'downloads','⚜️'],
    [2, 'المجموعات', 'group', '⚜️'],
    [3, 'الملصقات', 'sticker', '⚜️'],
    [4, 'المطورين', 'owner', '⚜️'],
    [5, 'أمثلة', 'example', '⚜️'],
    [6, 'الأدوات', 'tools', '⚜️'],
    [7, 'البحث', 'search', '⚜️'],
    [8, 'المشرفين', 'admin', '⚜️'],
    [9, 'الألعاب', 'games', '⚜️'],
    [10, 'الجيف', 'gif', '⚜️'],
    [11, 'البنك', 'bank', '⚜️'],
    [12, 'الذكاء الاصطناعي', 'ai', '⚜️'],
    [13, 'البوتات الفرعية', 'sub', '⚜️'],
    [14, 'معلومات البوت', 'info', '⚜️'],
    [15, 'أخرى', 'other', '⚜️']
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
        newsletterJid: '120363425314431422@newsletter',
        newsletterName: '𝐓𝐎𝐉𝐈 ~ 𝐃𝐄𝐕 ',
        serverMessageId: 0
    },
    externalAdReply: {
        title: "𝐓𝐎𝐉𝐈 𝐁𝐎𝐓",
        body: "𝐓𝐎𝐉𝐈 𝐂𝐨𝐦𝐦𝐚𝐧𝐝 𝐒𝐲𝐬𝐭𝐞𝐦",
        thumbnailUrl: img,
        sourceUrl: '',
        mediaType: 1,
        renderLargerThumbnail: true
    }
});

const menu = async (m, { conn, bot }) => {
    clean();
    
    const cmds = await bot.getAllCommands();
    const cats = {};
    
    cmds.forEach(c => {
        if (!c.usage?.length) return;
        const cat = c.category || 'other';
        if (!cats[cat]) cats[cat] = [];
        cats[cat].push(c);
    });

    const txt = `
رَبَّنَا اغْفِرْ لَنَا وَلِإِخْوَانِنَا الَّذِينَ سَبَقُونَا بِالْإِيمَانِ
وَلَا تَجْعَلْ فِي قُلُوبِنَا غِلًّا لِّلَّذِينَ آمَنُوا رَبَّنَا إِنَّكَ رَءُوفٌ رَّحِيمٌ
╭─┈─┈─┈─⟞⚜️⟝─┈─┈─┈─╮
${CATEGORIES.map(c => `┃ ⌯︙${c[0]} ~ *قائمة ${c[1]} ${c[3]}*`).join('\n')}
╰─┈─┈─┈─⟞⚜️⟝─┈─┈─┈─╯
> *يرجى الرد على الرسالة برقم القسم المطلوب*`;

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
    if (!cat) {
        await conn.sendMessage(m.chat, { text: '*❌ ~ يرجى اختيار رقم صحيح من القائمة.*' }, { quoted: m });
        return true;
    }
    
    const cmds = menuData.cats[cat[2]];
    if (!cmds?.length) {
        await conn.sendMessage(m.chat, { text: '*❌ ~ هذا القسم لا يحتوي على أوامر حالياً.*' }, { quoted: m });
        return true;
    }
    
    await conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, id: m.quoted.id, fromMe: true } });
    delete global.menus[m.quoted.id];
    
    const cmdsList = cmds.map(c => `┃${cat[3]} /${c.usage.join(`\n┃${cat[3]} /`)}`).join('\n');
    
    await conn.sendMessage(m.chat, { 
        text: `
╭─┈─┈─┈─⟞${cat[3]}⟝─┈─┈─┈─╮
┃ *⌯︙ قائمة ${cat[1]} ${cat[3]}*
╰─┈─┈─┈─⟞${cat[3]}⟝─┈─┈─┈─╯

${cmdsList}

╭─┈─┈─┈─⟞${cat[3]}⟝─┈─┈─┈─╮
┃ *⌯︙𝐃𝐄𝐕 ~ ${bot.config.info.nameBot}*
╰─┈─┈─┈─⟞${cat[3]}⟝─┈─┈─┈─╯
> *رَبَّنَا اغْفِرْ لَنَا وَلِإِخْوَانِنَا*`.trim(),
        contextInfo: context(m.sender, getImg(bot))
    }, { quoted: m });
    
    return true;
};

menu.command = ['الاوامر', 'القائمة', 'menu', 'اوامر'];
export default menu;

