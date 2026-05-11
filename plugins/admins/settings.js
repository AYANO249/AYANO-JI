const handler = async (m, { conn, args }) => {
    const chatId = m.chat;
    const subCmd = args.join(" ").trim().toLowerCase();

    // إنشاء قواعد البيانات تلقائياً
    if (!global.db) global.db = {};
    if (!global.db.groups) global.db.groups = {};
    if (!global.db.groups[chatId]) {
        global.db.groups[chatId] = {};
    }

    const menu = `
╭━━━━━━━ʚɞ━━━━━━━╮
┃  نظام التحكم والتفعيل
┃
┃ ʚɞ الإعدادات الإدارية ʚɞ
┃
┃ ⌯︙ .تفعيل إيقاف_الترحيب
┃ ⌯︙ .تفعيل تشغيل_الترحيب
┃ ⌯︙ .تفعيل وضع_المشرفين
┃ ⌯︙ .تفعيل وضع_الجميع
┃
┃ ʚɞ إعدادات الحماية ʚɞ
┃
┃ ⌯︙ .تفعيل مضاد_الروابط
┃ ⌯︙ .تفعيل إيقاف_المضاد
┃
┃ ʚɞ إعدادات المطور ʚɞ
┃
┃ ⌯︙ .تفعيل المطور_فقط
┃ ⌯︙ .تفعيل المطور_عام
┃ ⌯︙ .تفعيل الوضع_الخاص
┃ ⌯︙ .تفعيل العام_للخاص
┃ ⌯︙ .تفعيل إيقاف_الفرعي
┃ ⌯︙ .تفعيل تشغيل_الفرعي
┃
╰━━━━━━━ʚɞ━━━━━━━╯

      𝐀𝐘𝐀𝐍𝐎 𝐉𝐈
`;

    // القائمة الرئيسية
    if (!subCmd) {
        return await conn.sendMessage(
            m.chat,
            {
                text: menu,
                footer: "𝐀𝐘𝐀𝐍𝐎 𝐉𝐈 𝐌𝐔𝐋𝐓𝐈-𝐃𝐄𝐕",
                buttons: [
                    {
                        buttonId: ".تفعيل إيقاف_الفرعي",
                        buttonText: { displayText: "ʚɞ إيقاف الفرعي" },
                        type: 1
                    },
                    {
                        buttonId: ".تفعيل تشغيل_الفرعي",
                        buttonText: { displayText: "ʚɞ تشغيل الفرعي" },
                        type: 1
                    },
                    {
                        buttonId: ".تفعيل وضع_الجميع",
                        buttonText: { displayText: "ʚɞ وضع الجميع" },
                        type: 1
                    }
                ],
                headerType: 4
            },
            { quoted: m }
        );
    }

    let result = "";

    switch (subCmd) {

        // الفرعي
        case "إيقاف_الفرعي":
            if (!m.isOwner)
                return m.reply("*ʚɞ هذا الأمر للمطور فقط*");

            global.db.noSub = true;
            result = "*ʚɞ تم إيقاف تنصيب البوتات الفرعية*";
            break;

        case "تشغيل_الفرعي":
            if (!m.isOwner)
                return m.reply("*ʚɞ هذا الأمر للمطور فقط*");

            global.db.noSub = false;
            result = "*ʚɞ تم تشغيل تنصيب البوتات الفرعية*";
            break;

        // الترحيب
        case "إيقاف_الترحيب":
            if (!m.isGroup)
                return m.reply("*ʚɞ هذا الأمر للمجموعات فقط*");

            if (!m.isOwner && !m.isAdmin)
                return m.reply("*ʚɞ هذا الأمر للمشرفين فقط*");

            global.db.groups[chatId].noWelcome = true;
            result = "*ʚɞ تم إيقاف الترحيب*";
            break;

        case "تشغيل_الترحيب":
            if (!m.isGroup)
                return m.reply("*ʚɞ هذا الأمر للمجموعات فقط*");

            if (!m.isOwner && !m.isAdmin)
                return m.reply("*ʚɞ هذا الأمر للمشرفين فقط*");

            global.db.groups[chatId].noWelcome = false;
            result = "*ʚɞ تم تشغيل الترحيب*";
            break;

        // وضع المشرفين
        case "وضع_المشرفين":
            if (!m.isGroup)
                return m.reply("*ʚɞ هذا الأمر للمجموعات فقط*");

            if (!m.isOwner && !m.isAdmin)
                return m.reply("*ʚɞ هذا الأمر للمشرفين فقط*");

            global.db.groups[chatId].adminOnly = true;
            result = "*ʚɞ البوت الآن للمشرفين فقط*";
            break;

        case "وضع_الجميع":
            if (!m.isGroup)
                return m.reply("*ʚɞ هذا الأمر للمجموعات فقط*");

            if (!m.isOwner && !m.isAdmin)
                return m.reply("*ʚɞ هذا الأمر للمشرفين فقط*");

            global.db.groups[chatId].adminOnly = false;
            result = "*ʚɞ البوت الآن متاح للجميع*";
            break;

        // المطور
        case "المطور_فقط":
        case "مطور_فقط":
            if (!m.isOwner)
                return m.reply("*ʚɞ هذا الأمر للمطور فقط*");

            global.db.ownerOnly = true;
            result = "*ʚɞ تم تفعيل وضع المطور فقط*";
            break;

        case "المطور_عام":
            if (!m.isOwner)
                return m.reply("*ʚɞ هذا الأمر للمطور فقط*");

            global.db.ownerOnly = false;
            result = "*ʚɞ تم فتح البوت للجميع*";
            break;

        // مضاد الروابط
        case "مضاد_الروابط":
            if (!m.isGroup)
                return m.reply("*ʚɞ هذا الأمر للمجموعات فقط*");

            if (!m.isOwner && !m.isAdmin)
                return m.reply("*ʚɞ هذا الأمر للمشرفين فقط*");

            global.db.groups[chatId].antiLink = true;
            result = "*ʚɞ تم تشغيل مضاد الروابط*";
            break;

        case "إيقاف_المضاد":
            if (!m.isGroup)
                return m.reply("*ʚɞ هذا الأمر للمجموعات فقط*");

            if (!m.isOwner && !m.isAdmin)
                return m.reply("*ʚɞ هذا الأمر للمشرفين فقط*");

            global.db.groups[chatId].antiLink = false;
            result = "*ʚɞ تم إيقاف مضاد الروابط*";
            break;

        // الخاص
        case "الوضع_الخاص":
            if (!m.isOwner)
                return m.reply("*ʚɞ هذا الأمر للمطور فقط*");

            global.db.dev = true;
            result = "*ʚɞ الخاص الآن للمطورين فقط*";
            break;

        case "العام_للخاص":
            if (!m.isOwner)
                return m.reply("*ʚɞ هذا الأمر للمطور فقط*");

            global.db.dev = false;
            result = "*ʚɞ تم فتح الخاص للجميع*";
            break;

        default:
            return m.reply(
                "*ʚɞ الخيار غير موجود، يرجى اختيار أمر صحيح من القائمة*"
            );
    }

    await m.reply(result);
};

handler.help = ["تفعيل"];
handler.tags = ["admin"];
handler.command = /^تفعيل$/i;

export default handler;
