import axios from 'axios';
import cheerio from 'cheerio';

const handler = async (m, { conn, text, command }) => {

  if (!text) throw `*❲ 📁 ❳ ضع رابط ميديافاير بعد الأمر ❳*\n\nمثال:\n/${command} https://www.mediafire.com/file/...`;

  if (!text.includes('mediafire.com')) throw '❌ الرابط غير صحيح';

  m.react('📥');

  try {
    // 1. جلب الصفحة
    const { data } = await axios.get(text);

    // 2. استخراج رابط التحميل
    const $ = cheerio.load(data);
    const downloadUrl = $('#downloadButton').attr('href');

    if (!downloadUrl) throw '❌ ما قدرت أجيب رابط التحميل';

    // 3. تحميل الملف
    const file = await axios.get(downloadUrl, {
      responseType: 'arraybuffer'
    });

    // 4. استخراج اسم الملف
    let fileName = downloadUrl.split('/').pop().split('?')[0];

    // 5. إرسال الملف
    await conn.sendMessage(m.chat, {
      document: file.data,
      mimetype: 'application/octet-stream',
      fileName: fileName
    }, { quoted: m });

    m.react('✅');

  } catch (e) {
    console.error(e);
    m.react('❌');
    m.reply(`🚨 خطأ:\n${e?.message || e}`);
  }
};

handler.help = ['mediafire'];
handler.tags = ['downloads'];
handler.command = /^(mf|mediafire|ميديافاير)$/i;

export default handler;
