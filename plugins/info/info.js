import os from 'os';

const handler = async (m, { conn, bot, config }) => {
  try {
      const usedRam = (process.memoryUsage().rss / 1024 / 1024).toFixed(1);
      const heapUsed = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(1);
      const heapTotal = (process.memoryUsage().heapTotal / 1024 / 1024).toFixed(1);
      const totalRam = (os.totalmem() / 1024 / 1024 / 1024).toFixed(1);
      const freeRam = (os.freemem() / 1024 / 1024 / 1024).toFixed(1);
      
      // تصحيح مشكلة الـ CPU هنا
      const cpus = os.cpus();
      const cpuCores = cpus && cpus.length ? cpus.length : "N/A";
      const cpuModel = cpus && cpus.length ? cpus[0].model : "Unknown Model";
      const cpuSpeed = cpus && cpus.length ? (cpus[0].speed / 1000).toFixed(1) : "0.0";
      
      const cpuUsage = (os.loadavg()[0] * 100).toFixed(1);
      const platform = os.platform();
      const arch = os.arch();
      const hostname = os.hostname();
      const uptime = process.uptime();
      const uptimeHours = Math.floor(uptime / 3600);
      const uptimeMins = Math.floor((uptime % 3600) / 60);
      const uptimeSecs = Math.floor(uptime % 60);
      
      const groups = await conn.groupFetchAllParticipating();
      const groupCount = Object.values(groups).length;
      
      const subBots = global.subBots;
      const subCount = subBots?.list ? subBots.list().length : 0;
      const subConnected = subBots?.list ? subBots.list().filter(b => b.connected).length : 0;
      
      const msg = `
——> *الـبـوت ʚɞ*
- *الاسم:* \`${conn.user.name || bot.config?.info?.nameBot || "User"}\`
- *الرقم:* \`wa.me/+${conn.user.id.split(':')[0]}\`
- *شغال منذ:* \`${uptimeHours.toString().padStart(2, '0')}:${uptimeMins.toString().padStart(2, '0')}:${uptimeSecs.toString().padStart(2, '0')}\`

——> *الـنـظـام ʚɞ*
- *النظام:* \`${platform} ${arch}\`
- *الجهاز:* \`${hostname}\`
- *المعالج:* \`${cpuModel.slice(0, 30)}...\`
- *النوى:* \`${cpuCores} نواة @ ${cpuSpeed}GHz\`
- *الحمل:* \`${cpuUsage}%\`

——> *الـذاكـرة 🧠*
- *الرام المستخدم:* \`${usedRam}MB / ${totalRam}GB\`
- *الرام الفارغ:* \`${freeRam}GB\`
- *Heap:* \`${heapUsed}MB / ${heapTotal}MB\`

——> *احـصـائـيـات 📊*
- *المجموعات:* \`${groupCount}\`

——> *الـبـوتـات الـفـرعـيـه ʚɞ*
- *الإجمالي:* \`${subCount}\`
- *المتصل:* \`${subConnected}\`
- *المنفصل:* \`${subCount - subConnected}\`

——> *الـمـالـكـيـن 👑*
- *العدد:* \`${bot.owners?.length || 0}\`
- *الرئيسي:* \`${bot.owners?.[0]?.name || 'IN'} (${bot.owners?.[0]?.jid?.split('@')[0] || 'لا يوجد'})\`

> *_𝐈𝐍 𝐀𝐘𝐀𝐍𝐎 𝐉𝐈 𝐁𝐎𝐓_*`;

      // ملاحظة: تأكد أن متغير reply_status معرف عندك، إذا لم يعمل استبدله بـ m
      await conn.sendMessage(m.chat, {
        text: msg,
        contextInfo: context(m.sender, "https://i.ibb.co/GvXH1tNj/ac321af909b59b373cf93b6c235f733e.jpg") 
      }, { quoted: m }); 

  } catch (e) {
      console.error(e);
      m.reply("حدث خطأ داخلي أثناء تشغيل الأمر.");
  }
};

handler.command = ["معلومات", "info", "botinfo", "حالة"];
handler.category = "info";
handler.usage = ["معلومات"];
export default handler;

const context = (jid, img) => ({
    mentionedJid: [jid],
    isForwarded: true,
    forwardingScore: 1,
    forwardedNewsletterMessageInfo: {
        newsletterJid: '120363425314431422@newsletter',
        newsletterName: '𝐈𝐍 𝐀𝐘𝐀𝐍𝐎 𝐉𝐈',
        serverMessageId: 0
    },
    externalAdReply: {
        title: "𝐈𝐍 𝐀𝐘𝐀𝐍𝐎 𝐉𝐈 | 𝐁𝐨𝐭 𝐢𝐬 𝐛𝐮𝐢𝐥𝐭 𝐨𝐧 𝐭𝐡𝐞 𝐖𝐒/𝐕𝐈𝐈 𝐟𝐫𝐚𝐦𝐞𝐰𝐨𝐫𝐤",
        body: "𝚆𝚑𝚊𝚝𝚜𝙰𝚙𝚙 𝚋𝚘𝚝 𝚝𝚑𝚊𝚝 𝚒𝚜 𝚎𝚊𝚜𝚢 𝚝𝚘 𝚖𝚘𝚍𝚒𝚏𝚢 𝚊𝚗𝚍 𝚟𝚎𝚛𝚢 𝚏𝚊𝚜𝚝",
        thumbnailUrl: img,
        sourceUrl: '',
        mediaType: 1,
        renderLargerThumbnail: true
    }
});
