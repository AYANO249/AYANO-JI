export default async function before(m, { conn }) {
    if (!global.db?.users[m.sender]) return false;
    
    const user = global.db.users[m.sender];
    let xp = user.xp || 0;
    let level = user.level || 0;
    let nameLevel = user.nameLevel || 'بدون جوجزتسو';
    
    const levels = [
        { min: 0, max: 99, name: 'بدون جوجوستو' },
        { min: 100, max: 249, name: 'مبتدئ جوجوتسو' },
        { min: 250, max: 499, name: 'حامل شيميغامي' },
        { min: 500, max: 799, name: 'صائد لعنات' },
        { min: 800, max: 1199, name: 'ذو قوة ملعونة' },
        { min: 1200, max: 1699, name: 'ييد الشكيغامش' },
        { min: 1700, max: 2299, name: 'ساحر عادي' },
        { min: 2300, max: 2999, name: ' ساحر الظل' },
        { min: 3000, max: 3799, name: 'نوبارا' },
        { min: 3800, max: 4699, name: 'سيد ماهوراغا' },
        { min: 4700, max: 5699, name: 'ملك الأختام' },
        { min: 5700, max: 6799, name: 'جيتو سوغورو' },
        { min: 6800, max: 7999, name: 'فوشيغرو ميغومي' },
        { min: 8000, max: 9299, name: 'جوغو' },
        { min: 9300, max: 10699, name: 'ماهيتو' },
        { min: 10700, max: 12199, name: 'فوشيغرو أيانو' },
        { min: 12200, max: 13799, name: 'ريكا' },
        { min: 13800, max: 15499, name: 'يوتا أوكوتسو' },
        { min: 15500, max: 17499, name: 'ماكي زينين' },
        { min: 17500, max: 19999, name: 'غوجو ساتورو' },
        { min: 20000, max: Infinity, name: 'ريومن سوكونا' }
    ];
    
    let newLevel = level;
    let newNameLevel = nameLevel;
    let levelUp = false;
    let oldLevel = level;
    
    for (const lvl of levels) {
        if (xp >= lvl.min && xp <= lvl.max) {
            const currentLevelNum = levels.findIndex(l => l.min === lvl.min);
            if (currentLevelNum !== level) {
                newLevel = currentLevelNum;
                newNameLevel = lvl.name;
                levelUp = true;
                oldLevel = level;
            }
            break;
        }
    }
    
    if (levelUp) {
        user.level = newLevel;
        user.nameLevel = newNameLevel;
        
        const msg = `╭─┈─┈─┈─⟞🏮⟝─┈─┈─┈─╮
┃ *✨ تـرقـية جوجتسو ✨*
╰─┈─┈─┈─⟞🏮⟝─┈─┈─┈─╯

┃ @${m.sender.split('@')[0]}
┃ المستوى السابق: *${oldLevel}*
┃ المستوى الجديد: *${newLevel}*

┃ 🏷️ *لقبك الجديد:*
┃ ✦ ${newNameLevel} ✦

╭─┈─┈─┈─⟞🏮⟝─┈─┈─┈─╮
┃ *لـم نـنـتـهـي بعد* 
╰─┈─┈─┈─⟞🏮⟝─┈─┈─┈─╯`;
        
        await conn.sendMessage(m.chat, {
            text: msg,
            contextInfo: {
                mentionedJid: [m.sender],
                isForwarded: true,
                forwardingScore: 1,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363425314431422@newsletter',
                    newsletterName: '𝐈𝐍 𝐀𝐘𝐀𝐍𝐎 𝐉𝐈',
                    serverMessageId: 0
                },
                externalAdReply: {
                    title: "𝐈𝐍 𝐀𝐘𝐀𝐍𝐎 𝐉𝐈🏮 | عـالـم الجوجتسو",
                    body: "تـرقـيـة فـي الـجـوجـتـسـو",
                    thumbnailUrl: "https://i.ibb.co/jvBRpKjS/1a8ec40ebc4a3a44d8f81d41a9ab93b2.jpg",
                    sourceUrl: '',
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        }, { quoted: reply_status });
    }
    
    return false;
}
