import crypto from 'crypto';
import cheerio from 'cheerio';
import axios from 'axios';
import qs from 'qs';

const ff = async (m, { text, conn }) => {
  const warningText = `*─── ❲ تـنـبـيـه ❳ ───*\n\nيُـرجـى إرفـاق رابـط الـفـيـديـو مـع الأمـر\n\n*─── 𝐈𝐍 ⁝|⁝ 𝐀𝐘𝐀𝐍𝐎 𝐉𝐈 ʚɞ ───*`;
  const warningImg = "https://i.ibb.co/1GktSXMG/IMG-20260516-WA0012.jpg";

  if (!text) {
    return await conn.sendMessage(m.chat, { 
      image: { url: warningImg }, 
      caption: warningText 
    }, { quoted: m });
  }
  
  try {
    // ⏳ رياكشن جاري التحميل
    await m.react("⏳"); 
    
    const videoData = await downloadTikTok(text);

    if (!videoData.videoUrl && !videoData.audioUrl) {
      await m.react("❌");
      return m.reply("❌ فشل تحميل الفيديو، تأكد من صحة الرابط.");
    }

    // إرسال الفيديو إذا توفر
    if (videoData.videoUrl) {
      await conn.sendMessage(m.chat, { 
        video: { url: videoData.videoUrl }, 
        caption: `*🟢 تـم الـتـحـمـيـل بـنـجـاح *\n\n*📝 الـوصـف:* ${videoData.description || "بدون وصف"}\n\n*─── 𝐈𝐍 ⁝|⁝ 𝐀𝐘𝐀𝐍𝐎 𝐉𝐈 ʚɞ ───*` 
      }, { quoted: m });
    }
    
    // إرسال الصوت إذا توفر تلقائياً بعد الفيديو
    if (videoData.audioUrl) {
      await conn.sendMessage(m.chat, { 
        audio: { url: videoData.audioUrl }, 
        mimetype: 'audio/mpeg' 
      }, { quoted: m });
    }
    
    // 📌 رياكشن الاكتمال بعد إرسال كل الملفات بنجاح
    await m.react("📌");
    
  } catch (error) {
    console.error(error.message);
    await m.react("❌");
    m.reply(`❌ حدث خطأ: ${error.message}`);
  }
};

ff.usage = ["تيك"];
ff.category = "downloads";
ff.command = ["تيك", "tiktok", "tt"];

export default ff;

async function downloadTikTok(url) {
  let data = qs.stringify({
    'id': url,
    'locale': 'en',
    'tt': crypto.randomBytes(8).toString('hex'),
  });

  let config = {
    method: 'POST',
    url: 'https://ssstik.io/abc?url=dl',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: data
  };

  const response = await axios.request(config);
  const $ = cheerio.load(response.data);

  return {
    author: $('h2').first().text().trim(),
    description: $('.maintext').text().trim(),
    videoUrl: $('a[href*="tikcdn.io"]:not(#hd_download)').first().attr('href'),
    audioUrl: $('.download_link.music').attr('href'),
    hdVideo: $('#hd_download').attr('href')
  };
                                    }
