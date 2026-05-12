export default async function before(m, { conn }) {

    const g = global.db?.groups?.[m.chat];
    const text = (m.text || "");

    // إذا ما مفعّل antiLink أو المستخدم Owner/Admin → تجاهل
    if (!g?.antiLink || m.isOwner || m.isAdmin) return false;

    // روابط واتساب (قروبات + قنوات)
    const groupLinkRegex = /(https?:\/\/)?(chat\.whatsapp\.com|whatsapp\.com\/channel)\/[A-Za-z0-9]+/gi;

    // إذا ما في رابط → خروج
    if (!groupLinkRegex.test(text)) return false;

    try {

        // حذف الرسالة
        await conn.sendMessage(m.chat, {
            delete: m.key
        });

        // تحذير للمستخدم
        await conn.sendMessage(m.chat, {
            text: `🚫 *تم حذف الرابط*\n\n@${m.sender.split('@')[0]} ممنوع نشر روابط القروبات أو القنوات\n\n> يرجى الالتزام بقوانين المجموعة`,
            mentions: [m.sender]
        });

    } catch (e) {
        console.log("AntiLink Error:", e);
    }

    return true;
}
