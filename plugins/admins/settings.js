async function handler(m, { conn, command, args }) {
    const chatId = m.chat;
    const subCmd = args[0]?.toLowerCase();
    const menu = `
╭─┈─┈─┈─⟞ʚɞ⟝─┈─┈─┈─╮
│ *نظام التفعيل والتشغيل*
│
│ *.تفعيل إيقاف_الترحيب*
│ > يتوقف البوت عن الترحيب بالأعضاء الجدد
│
│ *.تفعيل تشغيل_الترحيب*
│ > يقوم البوت بالترحيب بكل عضو جديد
│
│ *.تفعيل وضع_المشرفين*
│ > يستجيب البوت للمشرفين فقط
│
│ *.تفعيل وضع_الجميع*
│ > يستجيب البوت لكافة الأعضاء
│
│ *.تفعيل المطور_فقط*
│ > يتفاعل البوت مع المطورين فحسب
│
│ *.تفعيل المطور_عام*
│ > يتفاعل البوت مع الجميع بشكل طبيعي
│
│ *.تفعيل مضاد_الروابط*
│ > يقوم البوت بحذف أي رابط يتم إرساله
│
│ *.تفعيل إيقاف_المضاد*
│ > يتوقف البوت عن حذف الروابط
│
│ *.تفعيل الوضع_الخاص*
│ > يعمل البوت في الخاص للمطورين فقط
│
│ *.تفعيل العام_للخاص*
│ > يعمل البوت في الخاص لكافة المستخدمين
╰─┈─┈─┈─⟞ʚɞ⟝─┈─┈─┈─╯
`;

    if (!subCmd) {
        await conn.sendButton(m.chat, {
            bodyText:  menu,
            footerText: "𝐀𝐘𝐀𝐍𝐎 𝐉𝐈",
            buttons: [
                { name: "quick_reply", params: { display_text: "ʚɞ إيقاف التنصيب الفرعي", id: ".تفعيل إيقاف_الفرعي" } },
                { name: "quick_reply", params: { display_text: "ʚɞ تشغيل التنصيب الفرعي", id: ".تفعيل تشغيل_الفرعي" } },
                { name: "quick_reply", params: { display_text: "ʚɞ إيقاف الترحيب", id: ".تفعيل إيقاف_الترحيب" } },
                { name: "quick_reply", params: { display_text: "ʚɞ تشغيل الترحيب", id: ".تفعيل تشغيل_الترحيب" } },
                { name: "quick_reply", params: { display_text: "ʚɞ وضع المشرفين", id: ".تفعيل وضع_المشرفين" } },
                { name: "quick_reply", params: { display_text: "ʚɞ وضع الجميع", id: ".تفعيل وضع_الجميع" } },
                { name: "quick_reply", params: { display_text: "ʚɞ المطور فقط", id: ".تفعيل المطور_فقط" } },
                { name: "quick_reply", params: { display_text: "ʚɞ المطور عام", id: ".تفعيل المطور_عام" } },
                { name: "quick_reply", params: { display_text: "ʚɞ تشغيل مضاد الروابط", id: ".تفعيل مضاد_الروابط" } },
                { name: "quick_reply", params: { display_text: "ʚɞ إيقاف مضاد الروابط", id: ".تفعيل إيقاف_المضاد" } },
                { name: "quick_reply", params: { display_text: "ʚɞ تفعيل الخاص للمطورين", id: ".تفعيل الوضع_الخاص" } },
                { name: "quick_reply", params: { display_text: "ʚɞ تفعيل الخاص للجميع", id: ".تفعيل العام_للخاص" } }
            ],
            mentions: [m.sender],
            newsletter: {
                name: '𝙌𝙐𝙎𝘼𝙔 ʚɞ',
                jid: '120363425314431422@newsletter'
            },
            interactiveConfig: {
                buttons_limits: 1, 
                list_title: "الخيارات المتاحة",
                button_title: "اضغط هنا",
                canonical_url: "𝐀𝐘𝐀𝐍𝐎 𝐉𝐈 "
            }
        }, m);
        return;
    }

    let result;
    
    switch (subCmd) {
        case 'إيقاف_الفرعي':
            if (!m.isOwner) { result = '*ʚɞ هذا الأمر مخصص للمطور فقط*'; break; }
            global.db.noSub = true;
            result = '*ʚɞ تم إيقاف تنصيب البوتات الفرعية بنجاح*';
            break;
            
        case 'تشغيل_الفرعي':
            if (!m.isOwner) { result = '*ʚɞ هذا الأمر مخصص للمطور فقط*'; break; }
            global.db.noSub = false;
            result = '*ʚɞ تم تفعيل تنصيب البوتات الفرعية للجميع*';
            break;

        case 'إيقاف_الترحيب':
            if (!m.isOwner && !m.isAdmin) { result = '*ʚɞ هذا الأمر مخصص للمشرفين فقط*'; break; }
            if (!global.db.groups[chatId]) global.db.groups[chatId] = {};
            global.db.groups[chatId].noWelcome = true;
            result = '*ʚɞ تم إيقاف ميزة الترحيب في هذه المجموعة*';
            break;
            
        case 'تشغيل_الترحيب':
            if (!m.isOwner && !m.isAdmin) { result = '*ʚɞ هذا الأمر مخصص للمشرفين فقط*'; break; }
            if (!global.db.groups[chatId]) global.db.groups[chatId] = {};
            global.db.groups[chatId].noWelcome = false;
            result = '*ʚɞ تم تفعيل ميزة الترحيب بنجاح*';
            break;
            
        case 'وضع_المشرفين':
            if (!m.isOwner && !m.isAdmin) { result = '*ʚɞ هذا الأمر مخصص للمشرفين فقط*'; break; }
            if (!global.db.groups[chatId]) global.db.groups[chatId] = {};
            global.db.groups[chatId].adminOnly = true;
            result = '*ʚɞ تم تفعيل وضع المشرفين؛ سيتفاعل البوت معهم فقط*';
            break;
            
        case 'وضع_الجميع':
            if (!m.isOwner && !m.isAdmin) { result = '*ʚɞ هذا الأمر مخصص للمشرفين فقط*'; break; }
            if (!global.db.groups[chatId]) global.db.groups[chatId] = {};
            global.db.groups[chatId].adminOnly = false;
            result = '*ʚɞ تم إيقاف وضع المشرفين؛ البوت متاح للجميع الآن*';
            break;
            
        case 'مطور_فقط':
        case 'المطور_فقط':
            if (!m.isOwner) { result = '*ʚɞ هذا الأمر مخصص للمطور فقط*'; break; }
            global.db.ownerOnly = true;
            result = '*ʚɞ تم تفعيل وضع المطور؛ الاستجابة ستكون للمطورين فقط*';
            break;
            
        case 'المطور_عام':
            if (!m.isOwner) { result = '*ʚɞ هذا الأمر مخصص للمطور فقط*'; break; }
            global.db.ownerOnly = false;
            result = '*ʚɞ تم إيقاف وضع المطور؛ البوت سيتفاعل مع الجميع*';
            break;
            
        case 'مضاد_الروابط':
            if (!m.isOwner && !m.isAdmin) { result = '*ʚɞ هذا الأمر مخصص للمشرفين فقط*'; break; }
            if (!global.db.groups[chatId]) global.db.groups[chatId] = {};
            global.db.groups[chatId].antiLink = true;
            result = '*ʚɞ تم تفعيل نظام مكافحة الروابط بنجاح*';
            break;
            
        case 'إيقاف_المضاد':
            if (!m.isOwner && !m.isAdmin) { result = '*ʚɞ هذا الأمر مخصص للمشرفين فقط*'; break; }
            if (!global.db.groups[chatId]) global.db.groups[chatId] = {};
            global.db.groups[chatId].antiLink = false;
            result = '*ʚɞ تم إيقاف نظام مكافحة الروابط*';
            break;

        case 'الوضع_الخاص':
            if (!m.isOwner) { result = '*ʚɞ هذا الأمر مخصص للمطورين فقط*'; break; }
            global.db.dev = true;
            result = '*ʚɞ تم قصر استخدام البوت في الخاص على المطورين*';
            break;

        case 'العام_للخاص':
            if (!m.isOwner) { result = '*ʚɞ هذا الأمر مخصص للمطورين فقط*'; break; }
            global.db.dev = false;
            result = '*ʚɞ تم فتح استخدام البوت في الخاص للجميع*';
            break;

        default:
            return m.reply("ʚɞ عذراً، يرجى اختيار خيار صحيح من القائمة.");
    }
    
    if (result) {
        m.reply(result);
    }
};

handler.usage = ['تفعيل'];
handler.category = 'admin';
handler.command = ['تفعيل'];

export default handler;
