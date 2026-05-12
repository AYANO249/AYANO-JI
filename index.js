port { Client } from 'meowsab';
import { group, access } from "./system/control.js";
import UltraDB from "./system/UltraDB.js";
import sub from './sub.js';

/* =========== Client ========== */
const client = new Client({
  phoneNumber: '2250778788908', // Bot number
  prefix: [".", "/", "!"],
  fromMe: false,
  owners: [
  // Owner 1
    { name: "𝐀𝐘𝐀𝐍𝐎 𝐉𝐈", lid: "247579682029763@lid", jid: "2250778788908@s.whatsapp.net" },
  // Owner 2
    { name: "𝙌𝙐𝙎𝘼𝙔", lid: "221307316789354@lid", jid: "249906024672@s.whatsapp.net" },
  // Owner 3
    { name: "𝐀𝐘𝐀𝐍𝐎 𝐉𝐈", jid: "201033024135@s.whatsapp.net", lid: "50414477168824@lid" }
  ],
  settings: { noWelcome: true },
  commandsPath: './plugins'
});

client.onGroupEvent(group);
client.onCommandAccess(access);

/* =========== Database ========== */
if (!global.db) {
    global.db = new UltraDB();
}

/* =========== Config ========== */
const { config } = client;
config.info = {
  nameBot: "𝐀𝐘𝐀𝐍𝐎 𝐉𝐈 〈", 
  nameChannel: "𝐀𝐘𝐀𝐍𝐎 𝐉𝐈",
  idChannel: "120363425314431422@newsletter", 
  urls: {
    repo: "https://whatsapp.com/channel/0029VbD3UpkG3R3aq6V1DW2X", 
    api: "https://emam-api.web.id",
    channel: "https://whatsapp.com/channel/0029VbD3UpkG3R3aq6V1DW2X"
  },
  copyright: {
    pack: 'ڤـ ـ 𝐀𝐘𝐀𝐍𝐎 𝐉𝐈 ـ ـا',
    author: '𝐀𝐘𝐀𝐍𝐎 𝐉𝐈' 
  },
  images: [
    "https://i.ibb.co/tTZhHZc9/5979c43babaaecdd0546dee5bc1c32ff.jpg",
    "https://i.ibb.co/B2rFmwm7/0e20c78c1ac2759547ff83ed0a8bbe66.jpg",
    "https://i.ibb.co/xKY3B7Gq/6131d7a246c6ead5aaad1a19b30c822a.jpg"
  ]
};

/* =========== Start ========== */
client.start();

setTimeout(async () => {
if (client.commandSystem) {
sub(client)
  }
}, 2000);


/* =========== Catch Errors ========== */
process.on('uncaughtException', (e) => {
    if (e.message.includes('rate-overlimit')) {}
});

process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err)
});
