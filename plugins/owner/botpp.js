const handler = async (m, { conn }) => {
    const q = m.quoted ? m.quoted : m;
    const mime = (q.msg || q).mimetype || '';

    if (!/image/.test(mime)) {
        return m.reply('✨ يرجى الرد على صورة لتتمكن من تغيير صورة البوت');
    }

    try {
        const media = await q.download?.();
        if (!media) throw new Error('فشل تحميل الصورة');

        // بدون decodeJid
        const botJid = conn.user.id;

        await conn.updateProfilePicture(botJid, media);

        m.reply('✅ تم تحديث صورة الملف الشخصي للبوت بنجاح يا **𝐀𝐘𝐀𝐍𝐎 𝐉𝐈**');
    } catch (error) {
        console.error('ERROR:', error);
        m.reply('❌ حدث خطأ أثناء التحديث:\n' + error.message);
    }
};

handler.help = ['botpp'];
handler.tags = ['owner'];
handler.command = ['ضع', 'botpp'];
handler.owner = true;

export default handler;
