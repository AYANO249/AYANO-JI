const handler = async (m, { conn, text, command }) => {
    if (!m.isGroup) return m.reply('✨ هذا الأمر متاح فقط داخل المجموعات');

    const actions = {
        'قروب_اسم': async () => {
            if (!text) return m.reply('✨ يرجى كتابة الاسم الجديد للمجموعة');
            await conn.groupUpdateSubject(m.chat, text);
            m.reply('✨ تم تغيير اسم المجموعة بنجاح');
        },

        'قروب_وصف': async () => {
            if (!text) return m.reply('✨ يرجى كتابة الوصف الجديد للمجموعة');
            await conn.groupUpdateDescription(m.chat, text);
            m.reply('✨ تم تغيير وصف المجموعة بنجاح');
        },

        'قروب_صوره': async () => {
            const q = m.quoted || m;
            const mime = q.mimetype || '';

            if (!/image/.test(mime)) {
                return m.reply('✨ يرجى الرد على صورة لتغيير أيقونة المجموعة');
            }

            const media = await q.download();
            await conn.updateProfilePicture(m.chat, media);
            m.reply('✨ تم تغيير صورة المجموعة بنجاح');
        }
    };

    const action = actions[command];
    if (!action) return;

    try {
        await action();
    } catch (e) {
        console.error(e);
        m.reply('✨ حدث خطأ أثناء تنفيذ الأمر، تأكد من صلاحيات البوت');
    }
};

handler.command = ['قروب_اسم', 'قروب_وصف', 'قروب_صوره'];
handler.usage = ['قروب_اسم', 'قروب_وصف', 'قروب_صوره'];
handler.category = "admin";
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;

