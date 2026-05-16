async function handler(m, { conn, command, args }) {
    const chatId = m.chat;
    const subCmd = args[0]?.toLowerCase();
    
    // ===== بيانات المجموعة والصلاحيات =====
    const groupMetadata = m.isGroup ? await conn.groupMetadata(chatId).catch(() => null) : null;
    const participants = groupMetadata?.participants || [];
    const admins = participants.filter(p => p.admin !== null).map(p => p.id);
    const isAdmin = m.isGroup && admins.includes(m.sender);

    const menu = `
╭─┈─┈─┈─⟞ ʚɞ ⟝─┈─┈─┈─╮
│ *نظام التفعيل والتشغيل*
│
│ *.تفعيل ايقاف_الترحيب*
│ > سيتوقف البوت عن الترحيب بالأعضاء
│
│ *.تفعيل تشغيل_الترحيب*
│ > سيقوم البوت بالترحيب بالأعضاء
│
│ *.تفعيل تشغيل_الادمن*
│ > سيستجيب البوت للمشرفين فقط
│
│ *.تفعيل ايقاف_الادمن*
│ > سيستجيب البوت للجميع
│
│ *.تفعيل مطور_فقط*
│ > سيتفاعل البوت مع المطورين فقط
│
│ *.تفعيل مطور_عام*
│ > سيتفاعل البوت مع الجميع
│
│ *.تفعيل تشغيل_مضاد_الروابط*
│ > سيقوم البوت بحذف أي رابط مرسل
│
│ *.تفعيل ايقاف_مضاد_الروابط*
│ > لن يقوم البوت بحذف الروابط
│
│ *.تفعيل ايقاف_خاص*
│ > سيعمل البوت للمطورين فقط في الخاص
│
│ *.تفعيل تشغيل_خاص*
│ > سيعمل البوت للجميع في الخاص
╰─┈─┈─┈─⟞ ʚɞ ⟝─┈─┈─┈─╯
`;

    if (!subCmd) {
        await conn.sendButton(m.chat, {
            bodyText: menu,
            footerText: "𝐀𝐘𝐀𝐍𝐎 𝐉𝐈 ʚɞ",
            buttons: [
                { name: "quick_reply", params: { display_text: "ʚɞ إيقاف التنصيب (البوتات الفرعية)", id: ".تفعيل ايقاف_الفرعي" } },
                { name: "quick_reply", params: { display_text: "ʚɞ تشغيل التنصيب", id: ".تفعيل تشغيل_الفرعي" } },
                { name: "quick_reply", params: { display_text: "ʚɞ إيقاف الترحيب", id: ".تفعيل ايقاف_الترحيب" } },
                { name: "quick_reply", params: { display_text: "ʚɞ تشغيل الترحيب", id: ".تفعيل تشغيل_الترحيب" } },
                { name: "quick_reply", params: { display_text: "ʚɞ تشغيل وضع المشرفين", id: ".تفعيل تشغيل_الادمن" } },
                { name: "quick_reply", params: { display_text: "ʚɞ إيقاف وضع المشرفين", id: ".تفعيل ايقاف_الادمن" } },
                { name: "quick_reply", params: { display_text: "ʚɞ للمطور فقط", id: ".تفعيل مطور_فقط" } },
                { name: "quick_reply", params: { display_text: "ʚɞ للمطور العام", id: ".تفعيل مطور_عام" } },
                { name: "quick_reply", params: { display_text: "ʚɞ تشغيل مضاد الروابط", id: ".تفعيل تشغيل_مضاد_الروابط" } },
                { name: "quick_reply", params: { display_text: "ʚɞ إيقاف مضاد الروابط", id: ".تفعيل ايقاف_مضاد_الروابط" } },
                { name: "quick_reply", params: { display_text: "ʚɞ تشغيل الخاص للمطورين فقط", id: ".تفعيل ايقاف_خاص" } },
                { name: "quick_reply", params: { display_text: "ʚɞ إيقاف تشغيل الخاص للمطورين فقط", id: ".تفعيل تشغيل_خاص" } }
            ],
            mentions: [m.sender],
            newsletter: {
                name: '𝐈𝐍 𝐀𝐘𝐀𝐍Ｏ 𝐉𝐈',
                jid: '120363425314431422@newsletter'
            },
            interactiveConfig: {
                buttons_limits: 1,
                list_title: "Available Options",
                button_title: "اضغط هنا للتحكم",
                canonical_url: "𝐀𝐘𝐀𝐍Ｏ 𝐉𝐈"
            }
        }, m);
        return;
    }

    // رسائل الرفض المزخرفة والموحدة لـ 𝐀𝐘𝐀𝐍𝐎 𝐉𝐈
    const adminDenied = `*─── ❲ رتـبـة الـمـشـرف ❳ ───*

الـوصـول مـرفـوض، هـذه المـيـزة تـتـطـلـب صـلاحـيـات الإدارة
تـواصـل مـع مـشـرف المـجـمـوعـة للـقـيـام بـذلـك

*─── 𝐈𝐍 ⁝|⁝ 𝐀𝐘𝐀𝐍𝐎 𝐉𝐈 ʚɞ ───*`;

    const ownerDenied = `*─── ❲ رتـبـة الـمـطـور ❳ ───*

الـوصـول مـرفـوض، هـذه المـيـزة تـتـطـلـب صـلاحـيـات الـمـطـور
تـواصـل مـع مـالـك الـبـوت للـقـيـام بـذلـك

*─── 𝐈𝐍 ⁝|⁝ 𝐀𝐘𝐀𝐍𝐎 𝐉𝐈 ʚɞ ───*`;

    const groupOnly = `*─── ❲ الـمـجـمـوعـات فـقـط ❳ ───*

الـوصـول مـرفـوض، هـذه المـيـزة مـخـصـصـة لـلـمـجـمـوعـات فـقـط
يـرجـى اسـتـخـدام الأمـر داخـل الـمـجـمـوعـة

*─── 𝐈𝐍 ⁝|⁝ 𝐀𝐘𝐀𝐍𝐎 𝐉𝐈 ʚɞ ───*`;

    let result;
    
    switch (subCmd) {
        case 'ايقاف_الفرعي':
            if (!m.isOwner) {
                result = ownerDenied;
                break;
            }
            global.db.noSub = true;
            result = '*ʚɞ تم إيقاف تنصيب البوتات الفرعية*\n> لن يتمكن أحد من استخدام أمر التنصيب مجدداً';
            break;
            
        case 'تشغيل_الفرعي':
            if (!m.isOwner) {
                result = ownerDenied;
                break;
            }
            global.db.noSub = false;
            result = '*ʚɞ تم تشغيل تنصيب البوتات الفرعية*\n> الآن يمكن للجميع استخدام البوتات الفرعية';
            break;

        case 'ايقاف_الترحيب':
            if (!m.isGroup) {
                result = groupOnly;
                break;
            }
            if (!m.isOwner && !isAdmin) {
                result = adminDenied;
                break;
            }
            global.db.groups[chatId].noWelcome = true;
            result = '*ʚɞ تم تفعيل وضع عدم الترحيب*\n> سيتوقف البوت عن الترحيب بالأعضاء الجدد';
            break;
            
        case 'تشغيل_الترحيب':
            if (!m.isGroup) {
                result = groupOnly;
                break;
            }
            if (!m.isOwner && !isAdmin) {
                result = adminDenied;
                break;
            }
            global.db.groups[chatId].noWelcome = false;
            result = '*ʚɞ تم تفعيل وضع الترحيب*\n> سيقوم البوت بالترحيب بالأعضاء الجدد';
            break;
            
        case 'تشغيل_الادمن':
            if (!m.isGroup) {
                result = groupOnly;
                break;
            }
            if (!m.isOwner && !isAdmin) {
                result = adminDenied;
                break;
            }
            global.db.groups[chatId].adminOnly = true;
            result = '*ʚɞ تم تفعيل وضع المشرفين*\n> سيتفاعل البوت مع المشرفين فقط';
            break;
            
        case 'ايقاف_الادمن':
            if (!m.isGroup) {
                result = groupOnly;
                break;
            }
            if (!m.isOwner && !isAdmin) {
                result = adminDenied;
                break;
            }
            global.db.groups[chatId].adminOnly = false;
            result = '*ʚɞ تم إلغاء وضع المشرفين*\n> سيتفاعل البوت مع جميع الأعضاء الآن';
            break;
            
        case 'مطور_فقط':
            if (!m.isOwner) {
                result = ownerDenied;
                break;
            }
            global.db.ownerOnly = true;
            result = '*ʚɞ تم تفعيل وضع المطور فقط*\n> سيتفاعل البوت مع المطورين فقط';
            break;
            
        case 'مطور_عام':
            if (!m.isOwner) {
                result = ownerDenied;
                break;
            }
            global.db.ownerOnly = false;
            result = '*ʚɞ تم تفعيل وضع المطور العام*\n> سيتفاعل البوت مع الجميع';
            break;
            
        case 'تشغيل_مضاد_الروابط':
            if (!m.isGroup) {
                result = groupOnly;
                break;
            }
            if (!m.isOwner && !isAdmin) {
                result = adminDenied;
                break;
            }
            global.db.groups[chatId].antiLink = true;
            result = '*ʚɞ تم تفعيل مضاد الروابط*\n> سيقوم البوت بحذف أي رابط يتم إرساله';
            break;
            
        case 'ايقاف_مضاد_الروابط':
            if (!m.isGroup) {
                result = groupOnly;
                break;
            }
            if (!m.isOwner && !isAdmin) {
                result = adminDenied;
                break;
            }
            global.db.groups[chatId].antiLink = false;
            result = '*ʚɞ تم إيقاف مضاد الروابط*\n> لن يقوم البوت بحذف الروابط بعد الآن';
            break;

        case 'ايقاف_خاص':
            if (!m.isOwner) {
                result = ownerDenied;
                break;
            }
            global.db.dev = true;
            result = '*ʚɞ تم إيقاف الخاص للمستخدمين*\n> يمكن للمطورين فقط استخدام البوت في الخاص حالياً';
            break;

        case 'تشغيل_خاص':
            if (!m.isOwner) {
                result = ownerDenied;
                break;
            }
            global.db.dev = false;
            result = '*ʚɞ تم تشغيل الخاص للجميع*\n> يمكن لجميع المستخدمين استخدام البوت في الخاص الآن';
            break;

        default:
            return m.reply("╭─┈─┈─┈─⟞ ʚɞ ⟝─┈─┈─┈─╮\n│ *نظام التفعيل والتشغيل*\n│\n│ ʚɞ ايقاف_الترحيب\n│ ʚɞ تشغيل_الترحيب\n│ ʚɞ تشغيل_الادمن\n│ ʚɞ ايقاف_الادمن\n│ ʚɞ مطور_فقط\n│ ʚɞ مطور_عام\n│ ʚɞ تشغيل_مضاد_الروابط\n│ ʚɞ ايقاف_مضاد_الروابط\n╰─┈─┈─┈─⟞ ʚɞ ⟝─┈─┈─┈─╯");
    }
    
    if (result) {
        m.reply(result);
    }
}

handler.usage = ['تفعيل'];
handler.category = 'admin';
handler.command = ['تفعيل'];

export default handler;

