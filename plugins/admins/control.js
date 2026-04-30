let control = async (m, { command, text, conn, bot, participants }) => {
    try {
        const isBotOwner = (userId) => {
            if (!bot.config || !bot.config.owners) return false;
            return bot.config.owners.some(owner => 
                owner.jid === userId || owner.lid === userId
            );
        };

        const getUser = () => {
            if (m.quoted) return m.quoted.sender;
            if (m.mentionedJid && m.mentionedJid.length > 0) return m.mentionedJid[0];
            if (text) return text + "@s.whatsapp.net";
            return null;
        };

        if (command === "ضيف") {
            if (!text && !m.quoted && !(m.mentionedJid && m.mentionedJid.length > 0)) {
                return m.reply("❌ يُرجى إدخال الرقم أو المنشن.");
            }
            let user = getUser();
            await conn.groupParticipantsUpdate(m.chat, [user], 'add');
            return m.reply("✅ **تمت إضافة العضو بنجاح.**");
        }
        
        if (command === "طرد") {
            let user = getUser();
            if (!user) return m.reply("❌ يُرجى الإشارة (منشن) للعضو أو الرد على رسالته.");
            
            // حماية المطور والبوت من الطرد المزاحي
            if (isBotOwner(user) || user === conn.user.id) {
                m.reply("⚠️ لا يمكنني طرد المطور أو طرد طردي! سيتم طردك أنت لمحاولتك ذلك.");
                return await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
            }
            
            await conn.groupParticipantsUpdate(m.chat, [user], 'remove');
            return m.reply("✅ **تم طرد العضو بنجاح.**");
        }
        
        if (command === "رفع") {
            let user = getUser();
            if (!user) return m.reply("❌ يُرجى الإشارة للعضو المراد ترقيته.");
            await conn.groupParticipantsUpdate(m.chat, [user], 'promote');
            return m.reply("✅ **تمت ترقية العضو إلى مشرف.**");
        }
        
        if (command === "خفض") {
            let user = getUser();
            if (!user) return m.reply("❌ يُرجى الإشارة للعضو المراد تنزيل رتبته.");
            await conn.groupParticipantsUpdate(m.chat, [user], 'demote');
            return m.reply("✅ **تم خفض رتبة العضو بنجاح.**");
        }
        
    } catch (error) {
        await m.reply("❌ **حدث خطأ:** " + error.message);
    }
};

control.usage = ['اضف', 'طرد', 'رفع', 'خفض'];
control.command = ['اضف', 'طرد', 'رفع', 'خفض'];
control.admin = true;
control.botAdmin = true;
control.category = "admin";

export default control;

