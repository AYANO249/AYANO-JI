import { Client } from 'meowsab';
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
    { name: "𝐓𝐎𝐉𝐈", lid: "247579682029763@lid", jid: "2250778788908@s.whatsapp.net" },
  // Owner 2
    { name: "𝐃𝐄𝐕", lid: "221307316789354@lid", jid: "249906024672@s.whatsapp.net" },
  // Owner 3
    { name: "Sukuna", jid: "201033024135@s.whatsapp.net", lid: "50414477168824@lid" },
  // Owner 4
   { name: "عمورتي", jid: "201050079089@s.whatsapp.net", lid: "51664513925368@lid" }
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
  nameBot: "𝐓𝐎𝐉𝐈 〈", // تم التأكد من الاسم TOJI
  nameChannel: "𝐓𝐎𝐉𝐈 𝐃𝐄𝐕",
  idChannel: "120363425314431422@newsletter", // تم تحديث معرف القناة
  urls: {
    // تم استبدال رابط github برابط قناتك لحذف اسم Pomni من المعاينة
    repo: "https://whatsapp.com/channel/0029VbD3UpkG3R3aq6V1DW2X", 
    api: "https://emam-api.web.id",
    channel: "https://whatsapp.com/channel/0029VbD3UpkG3R3aq6V1DW2X"
  },
  copyright: {
    pack: 'ڤـ ـ 𝐓𝐎𝐉𝐈 ـ ـا',
    author: '𝐓𝐎𝐉𝐈' // حذف أي إشارة لاسم QUSAY
  },
  images: [
    "https://i.ibb.co/TxpVwQGC/IMG-20260429-WA0041.jpg",
    "https://i.ibb.co/6c3XHHWG/IMG-20260429-WA0047.jpg",
    "https://i.ibb.co/YSFZ4BS/IMG-20260429-WA0049.jpg"
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
