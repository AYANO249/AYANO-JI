const handler = async (m, { conn, args }) => {
    const chatId = m.chat;
    const subCmd = args.join(" ").trim();

    // ===== قاعدة البيانات =====
    global.db = global.db || {};
    global.db.groups = global.db.groups || {};

    global.db.groups[chatId] = global.db.groups[chatId] || {
        noWelcome: false,
        adminOnly: false,
        antiLink: false
    };

    const dbGroup = global.db.groups[chatId];

    // ===== بيانات المجموعة =====
    const groupMetadata = m.isGroup
        ? await conn.groupMetadata(chatId).catch(() => null)
        : null;

    const participants = groupMetadata?.participants || [];

    const admins = participants
        .filter(p => p.admin !== null)
        .map(p => p.id);

    // ===== الصلاحيات =====
    const isOwner =
        m.isOwner ||
        global.opts?.owner?.includes(m.sender) ||
        m.sender.split("@")[0] === "249906024672";

    const isAdmin = m.isGroup && admins.includes(m.sender);

    // ===== دوال الحماية الاحترافية المزخرفة =====
    const requireOwner = () => {
        if (!isOwner) {
            m.reply(`*─── ❲ رتـبـة الـمـطـور ❳ ───*

الـوصـول مـرفـوض، هـذه المـيـزة تـتـطـلـب صـلاحـيـات الـمـطـور
تـواصـل مـع مـمالـك الـبـوت للـقـيـام بـذلـك

*─── 𝐈𝐍 ⁝|⁝ 𝐀𝐘𝐀𝐍𝐎 𝐉𝐈 ʚɞ ───*`);
            return false;
        }
        return true;
    };

    const requireGroup = () => {
        if (!m.isGroup) {
            m.reply(`*─── ❲ الـمـجـمـوعـات فـقـط ❳ ───*

الـوصـول مـرفـوض، هـذه المـيـزة مـخـصـصـة لـلـمـجـمـوعـات فـقـط
يـرجـى اسـتـخـدام الأمـر داخـل الـمـجـمـوعـة

*─── 𝐈𝐍 ⁝|⁝ 𝐀𝐘𝐀𝐍Ｏ 𝐉𝐈 ʚɞ ───*`);
            return false;
        }
        return true;
    };

    const requireAdmin = () => {
        if (!isOwner && !isAdmin) {
            m.reply(`*─── ❲ رتـبـة الـمـشـرف ❳ ───*

الـوصـول مـرفـوض، هـذه المـيـزة تـتـطـلـب صـلاحـيـات الإدارة
تـواصـل مـع مـشـرف المـجـمـوعـة للـقـيـام بـذلـك

*─── 𝐈𝐍 ⁝|⁝ 𝐀𝐘𝐀𝐍𝐎 𝐉𝐈 ʚɞ ───*`);
            return false;
        }
        return true;
    };

    // ===== القائمة =====
    const menu = `
╭━━━━━━━ʚɞ━━━━━━━╮
┃  نظام التحكم
┃
┃ .تفعيل إيقاف_الترحيب
┃ .تفعيل تشغيل_الترحيب
┃ .تفعيل وضع_المشرفين
┃ .تفعيل وضع_الجميع
┃
┃ .تفعيل مضاد_الروابط
┃ .تفعيل إيقاف_المضاد
┃
┃ .تفعيل المطور_فقط
┃ .تفعيل المطور_عام
┃
╰━━━━━━━ʚɞ━━━━━━━╯
𝐀𝐘𝐀𝐍𝐎 𝐉𝐈
`;

    if (!subCmd) {
        return conn.sendMessage(m.chat, {
            text: menu,
            footer: "𝐀𝐘𝐀𝐍𝐎 𝐉𝐈",
            headerType: 4
        }, { quoted: m });
    }

    let title = "";
    let body = "";

    switch (subCmd) {

        case "إيقاف_الفرعي":
            if (!requireOwner()) return;
            global.db.noSub = true;
            title = "الـبـوتـات الـفـرعـيـة";
            body = "تـم إيـقـاف تـنـصـيـب الـبـوتـات الـفـرعـيـة بـنـجـاح";
            break;

        case "تشغيل_الفرعي":
            if (!requireOwner()) return;
            global.db.noSub = false;
            title = "الـبـوتـات الـفـرعـيـة";
            body = "تـم تـشـغـيـل تـنـصـيـب الـبـوتـات الـفـرعـيـة بـنـجـاح";
            break;

        case "إيقاف_الترحيب":
            if (!requireGroup() || !requireAdmin()) return;
            dbGroup.noWelcome = true;
            title = "نـظـام الـتـرحـيـب";
            body = "تـم إيـقـاف تـفـعـيـل الـتـرحـيـب فـي هـذه الـمـجـمـوعـة";
            break;

        case "تشغيل_الترحيب":
            if (!requireGroup() || !requireAdmin()) return;
            dbGroup.noWelcome = false;
            title = "نـظـام الـتـرحـيـب";
            body = "تـم تـشـغـيـل تـفـعـيـل الـتـرحـيـب فـي هـذه الـمـجـمـوعـة";
            break;

        case "وضع_المشرفين":
            if (!requireGroup() || !requireAdmin()) return;
            dbGroup.adminOnly = true;
            title = "وضع الإدارة";
            body = "تـم قـفـل الـبـوت لـيـصـبـح مـتـاحـاً لـلـمـشـرفـيـن فـقـط";
            break;

        case "وضع_الجميع":
            if (!requireGroup() || !requireAdmin()) return;
            dbGroup.adminOnly = false;
            title = "وضع الإدارة";
            body = "تـم فـتـح الـبـوت لـيـصـبـح مـتـاحـاً لـجـمـيـع الأعـضـاء";
            break;

        case "مضاد_الروابط":
            if (!requireGroup() || !requireAdmin()) return;
            dbGroup.antiLink = true;
            title = "مـضـاد الـروابـط";
            body = "تـم تـشـغـيـل حـمـايـة الـمـجـمـوعـة ومـنـع الـروابـط";
            break;

        case "إيقاف_المضاد":
            if (!requireGroup() || !requireAdmin()) return;
            dbGroup.antiLink = false;
            title = "مـضـاد الـروابـط";
            body = "تـم إيـقـاف حـمـايـة الـمـجـمـوعـة والـسـمـاح بـالـروابـط";
            break;

        case "المطور_فقط":
            if (!requireOwner()) return;
            global.db.ownerOnly = true;
            title = "الـوضـع الـحـصـري";
            body = "تـم تـفـعـيـل وضـع الـمـطـور فـقـط لـجـمـيـع الـشـاتـات";
            break;

        case "المطور_عام":
            if (!requireOwner()) return;
            global.db.ownerOnly = false;
            title = "الـوضـع الـحـصـري";
            body = "تـم إلـغـاء وضـع الـمـطـور وفـتـح الـبـوت لـلـجـمـيـع";
            break;

        default:
            return m.reply(`*─── ❲ خـطـأ فـي الأمـر ❳ ───*

الأمـر الـذي أدخـلـتـه غـيـر مـوجـود فـي الـقـائـمـة
يـرجـى الـتـحـقـق مـمـا كـتـبـتـه لـلـتـفـعـيـل

*─── 𝐈𝐍 ⁝|⁝ 𝐀𝐘𝐀𝐍Ｏ 𝐉𝐈 ʚɞ ───*`);
    }

    // إرسال رد التأكيد النهائي الموحد والمزخرف
    return m.reply(`*─── ❲ ${title} ❳ ───*

${body}

*─── 𝐈𝐍 ⁝|⁝ 𝐀𝐘𝐀𝐍𝐎 𝐉𝐈 ʚɞ ───*`);
};

handler.help = ["تفعيل"];
handler.tags = ["admin"];
handler.command = /^تفعيل$/i;

export default handler;

