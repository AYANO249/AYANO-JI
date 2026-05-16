const insta = async (m, { text, Api, conn }) => {
  // نص التنبيه المنسق بالاستايل المطلوب مع اسم البوت الجديد
  const warningText = `*─── ❲ تـنـبـيـه ❳ ───*\n\nيُـرجـى إرفـاق رابـط الـمـنـشـور مـع الأمـر\n\n*─── 𝐈𝐍 ⁝|⁝ 𝐀𝐘𝐀𝐍𝐎 𝐉𝐈 ʚɞ ───*`;
  const warningImg = "https://i.ibb.co/mrWkH2pc/26149900fda553e7f298dfa534d0bdcd.jpg";

  // إذا لم يتم إدخال نص (رابط)، يتم إرسال الصورة مع نص التنبيه
  if (!text) {
    return await conn.sendMessage(m.chat, { 
      image: { url: warningImg }, 
      caption: warningText 
    }, { quoted: m });
  }
  
  try {
    m.react("⏳"); // تفاعل اختياري لإعلام المستخدم ببدء التحميل
    const { status, data } = await Api.download.instagram({ url: text });
    
    if (status !== 'success') {
      return m.react("❌");
    }

    if (Array.isArray(data)) {
      let thumbnail;
      let video;
      
      for (let item of data) {
        if (item.type === "thumbnail") {
          thumbnail = item.url;
        } else if (item.type === "video") {
          video = item.url;
        }
      }
      
      if (thumbnail && !video) {
        await conn.sendMessage(m.chat, { 
          image: { url: thumbnail },
          caption: "*─── 𝐈𝐍 ⁝|⁝ 𝐀𝐘𝐀𝐍𝐎 𝐉𝐈 ʚɞ ───*"
        }, { quoted: m });
      }
      
      if (video) {
        await conn.sendMessage(m.chat, { 
          video: { url: video }, 
          caption: "*✅ تـم تـحـمـيـل الـفـيـديـو بـنـجـاح *\n\n*─── 𝐈𝐍 ⁝|⁝ 𝐀𝐘𝐀𝐍𝐎 𝐉𝐈 ʚɞ ───*"
        }, { quoted: m });
      } else if (!thumbnail && !video) {
        m.reply("❌ لم يتم العثور على محتوى قابل للتحميل.");
      }
    }
  } catch (error) {
    console.error(error.message);
    m.reply(`❌ حدث خطأ: ${error.message}`);
  }
};

insta.usage = ["انستا"];
insta.category = "downloads";
insta.command = ["انستا", "instagram", "ig"];
insta.admin = false;

export default insta;
