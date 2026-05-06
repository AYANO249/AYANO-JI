import fs from "fs";
import path from "path";

const group = async (ctx, event, eventType) => {
    try {
        if (!event?.participants?.length) return null;

        const participants = event.participants
            .filter(p => p?.phoneNumber)
            .map(p => p.phoneNumber);

        const author = event.author || null;

        const users = participants.length
            ? participants.map(p => '@' + p.split('@')[0]).join(' ')
            : '—';

        const authorTag = author ? '@' + author.split('@')[0] : '';

        const footer = "\n𝐛𝐲 𝐓𝐎𝐉𝐈";

        const messages = {
            add: `♡゙ مـنـور/ه ${users}${footer}`,
            remove: `🚫 ${users} تم إزالته${footer}`,
            promote: `👑 مبروك الأدمن ${users}${footer}`,
            demote: `⚠️ رجعت عضو ${users}${footer}`
        };

        const txt = messages[eventType];
        if (!txt) return null;

        // تحقق من تعطيل الترحيب
        if (global.db?.groups?.[event.chat]?.noWelcome) return null;

        const imgDefault = "https://i.ibb.co/Ndtbdmmf/75346799414305d513e9d78df1a8a170.jpg";

        const img = ["add", "remove"].includes(eventType)
            ? (event.userUrl || imgDefault)
            : imgDefault;

        await ctx.sock.msgUrl(event.chat, txt, {
            img,
            title: ctx.config?.info?.nameBot || "𝐓𝐎𝐉𝐈 BOT",
            body: "𝐖𝐡𝐚𝐭𝐬𝐀𝐩𝐩 𝐁𝐨𝐭 ⚡",
            mentions: author ? [author, ...participants] : participants,
            newsletter: {
                name: '𝐓𝐎𝐉𝐈 𝐃𝐄𝐕',
                jid: '120363425314431422@newsletter'
            },
            big: ["add", "remove"].includes(eventType)
        });

    } catch (e) {
        console.error("Group Error:", e);
    }
    return null;
};


const access = async (msg, checkType, time) => {
    const conn = await msg.client().catch(() => null);

    const senderNum = msg.sender.split('@')[0];

    const quoted = {
        key: {
            participant: `${senderNum}@s.whatsapp.net`,
            remoteJid: 'status@broadcast',
            fromMe: false,
        },
        message: {
            contactMessage: {
                displayName: msg.pushName,
                vcard: `BEGIN:VCARD
VERSION:3.0
FN:${msg.pushName}
TEL;type=CELL;type=VOICE;waid=${senderNum}:${senderNum}
END:VCARD`,
            },
        },
    };

    const messages = {
        cooldown: `⏳ استنى ${time || 'ثواني'} وبعدين جرّب تاني`,
        owner: `✨ الأمر ده للمطور فقط`,
        group: `📢 الأمر ده شغال في الجروبات بس`,
        admin: `🛡️ للأدمن فقط`,
        private: `📩 الأمر ده في الخاص فقط`,
        botAdmin: `⚙️ لازم أكون أدمن`,
        noSub: `🚫 الأمر للبوت الأساسي فقط`,
        disabled: `🛠️ الأمر متوقف مؤقتاً`,
        error: `❌ حصل خطأ، تواصل مع TOJI`
    };

    if (conn && messages[checkType]) {
        await conn.msgUrl(msg.chat, messages[checkType], {
            img: "https://i.ibb.co/Ndtbdmmf/75346799414305d513e9d78df1a8a170.jpg",
            title: "𝐓𝐎𝐉𝐈 | System",
            body: "Bot Alerts",
            newsletter: {
                name: '𝐓𝐎𝐉𝐈 𝐃𝐄𝐕',
                jid: '120363425314431422@newsletter'
            },
            big: false
        }, quoted);

        return false;
    }

    return true;
};

export { group, access };
