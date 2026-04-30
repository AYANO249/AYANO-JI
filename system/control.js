import fs from "fs";
import path from "path";

const group = async (ctx, event, eventType) => {
    try {
        if (!event?.participants) return null;

        const participants = event.participants.filter(p => p?.phoneNumber).map(p => p.phoneNumber);
        const author = event.author;
        let txt;

        const users = participants.length 
            ? participants.map(p => '@' + p.split('@')[0]).join(' and ') 
            : 'No users';

        const authorTag = author ? '@' + author.split('@')[0] : 'Unknown';

        const messages = {
            add: `♡゙ مـنـور/ه ${users}${authorTag === users ? "" : `\n𝐛𝐲 𝐓𝐎𝐉𝐈`}`,
            remove: `${users} تم إزالته من الجروب${authorTag === users ? "" : `\n𝐛𝐲 𝐓𝐎𝐉𝐈`}`,
            promote: `♡゙ مـبـروك الادمـن ${users}\nby 𝐓𝐎𝐉𝐈`,
            demote: `♡゙ بـقـيـت عـضـو خـلاص ${users}\nby 𝐓𝐎𝐉𝐈`
        };

        txt = messages[eventType];
        if (!txt) return null;
        
        if (global.db.groups[event.chat].noWelcome === true) return 9999;

        const img = ["remove", "add"].includes(eventType) 
            ? (event.userUrl || "https://i.ibb.co/Ndtbdmmf/75346799414305d513e9d78df1a8a170.jpg") 
            : "https://i.ibb.co/Ndtbdmmf/75346799414305d513e9d78df1a8a170.jpg";

        await ctx.sock.msgUrl(event.chat, txt, {
            img,
            title: ctx.config?.info.nameBot || "𝐓𝐎𝐉𝐈 BOT",
            body: "𝐴 𝑠𝑖𝑚𝑝𝑙𝑒 𝑊𝒉𝑎𝑡𝑠𝐴𝑝𝑝 𝑏𝑜𝑡 𝑓𝑜𝑟 𝐓𝐎𝐉𝐈 ✨",
            mentions: author ? [author, ...participants] : participants,
            newsletter: {
                name: '𝐓𝐎𝐉𝐈 𝐃𝐄𝐕',
                jid: '120363425314431422@newsletter'
            },
            big: ["remove", "add"].includes(eventType)
        });

    } catch (e) {
        console.error(e);
    }
    return null;
};

const access = async (msg, checkType, time) => {
    const conn = await msg.client();
    
    const quoted = {
        key: {
            participant: `${msg.sender.split('@')[0]}@s.whatsapp.net`,
            remoteJid: 'status@broadcast',
            fromMe: false,
        },
        message: {
            contactMessage: {
                displayName: `${msg.pushName}`,
                vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:${msg.pushName}\nitem1.TEL;waid=${msg.sender.split('@')[0]}:${msg.sender.split('@')[0]}\nEND:VCARD`,
            },
        },
        participant: '0@s.whatsapp.net',
    };
    
    const messages = {
        cooldown: `*♡⏳ استنى ${time || 'بعض كام ثانيه'} ثانية وكمل الأمر ⏳♡*`,
        owner: `*♡ ✨ الأمر ده لـ 𝐓𝐎𝐉𝐈 فقط ✨♡*`,
        group: `*♡💠 الأمر ده بيشتغل بس ف الجروبات 💠♡*`,
        admin: `*♡📯 الأمر ده لـ الادمن فقط 📯♡*`,
        private: `*♡🏷️ الأمر ده في الخاص فقط 🏷️♡*`,
        botAdmin: `*♡📌 لازم اكون ادمن عشان انقذ الأمر 📌♡*`,
        noSub: `*♡🫒 الأمر ده ف البوت الأساسي فقط 🫒♡*`,
        disabled: `*♡🗃️ الامر متوقف (تحت صيانة) 🗃️♡*`,
        error: `*♡❌ الأمر فيه خطأ، كلم 𝐓𝐎𝐉𝐈 ❌♡*`
    };
    
    if (conn && messages[checkType]) {
        await conn.msgUrl(msg.chat, messages[checkType], {
            img: "https://i.ibb.co/Ndtbdmmf/75346799414305d513e9d78df1a8a170.jpg",
            title: "𝐓𝐎𝐉𝐈 | Alerts",
            body: "𝐓𝐎𝐉𝐈 Bot system alerts",
            newsletter: {
                name: '𝐓𝐎𝐉𝐈 𝐃𝐄𝐕',
                jid: '120363425314431422@newsletter'
            },
            big: false
        }, quoted);
        return false;  
    }
    return null;  
};

export { access, group };
