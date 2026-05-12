import axios from 'axios';
import cheerio from 'cheerio';

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `*❲ ⚠️ ❳ ~ يرجى وضع رابط الفيسبوك ~ ❲ ⚠️ ❳*\n\nمثال:\n${usedPrefix}${command} https://www.facebook.com/watch?v=xxxxxx`;

  m.react('⏳');

  try {
    const result = await fbdown(text);
    if (!result || !result.url) throw '❌ فشل الحصول على رابط الفيديو';

    const caption = `> *تم بواسطة ~ 𝐀𝐘𝐀𝐍𝐎 𝐉𝐈 𝐃𝐄𝐕*`;

    await conn.sendMessage(m.chat, {
      video: { url: result.url },
      caption: caption,
      mimetype: 'video/mp4',
      fileName: `fb_video.mp4`
    }, { quoted: m });

    m.react('✅');

  } catch (e) {
    console.error('Error in FB Downloader:', e.message);
    m.react('❌');
    m.reply('حدث خطأ أثناء محاولة جلب الفيديو، تأكد من أن الرابط عام وليس خاصاً.');
  }
};

handler.help = ['facebook'];
handler.tags = ['downloads'];
handler.command = /^(فيس|فيسبوك|fb|fbdl|facebook)$/i;

export default handler;

// دالة التحميل الجديدة والأكثر استقراراً
async function fbdown(url) {
    try {
        const { data } = await axios.post('https://getmyfb.com/process', 
        `urls=${encodeURIComponent(url)}`, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36'
            }
        });
        
        const $ = cheerio.load(data);
        const videoUrl = $('ul.results-list li').first().find('a').attr('href');
        
        return {
            url: videoUrl
        };
    } catch (err) {
        return null;
    }
}

