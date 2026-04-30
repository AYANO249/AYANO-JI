let handler = async (m, { conn, bot }) => {
  // الاسم بالخط المنسق
  let watermark = '𝐓𝐎𝐉𝐈';
  
  // رسالة الاقتباس بدون قلوب وبالخط المنسق
  let quoted = {
    key: { fromMe: false, participant: '0@s.whatsapp.net', remoteJid: 'status@broadcast' },
    message: { conversation: '𝐈𝐍 𝐓𝐎𝐉𝐈' }
  };

  // رقمك الخاص الذي طلبته
  const num = "249906024672";
  
  let vcard = `BEGIN:VCARD
VERSION:3.0
FN:${watermark}
TEL;type=CELL;waid=${num}:+${num}
END:VCARD`;

  // رابط الصورة الجديدة التي أرسلتها
  let img = 'https://i.ibb.co/q3MpTLzp/99fa210d6f0a7c0c7c48038973877064.jpg';
  
  await conn.sendMessage(m.chat, {
    contacts: { displayName: watermark, contacts: [{ vcard }] },
    contextInfo: {
      forwardingScore: 2026,
      externalAdReply: {
        title: '𝐓𝐎𝐉𝐈 𝐃𝐄𝐕',
        body: 'الـمـطـور الـرسـمـي',
        sourceUrl: 'https://whatsapp.com/channel/0029VbD3UpkG3R3aq6V1DW2X',
        thumbnailUrl: img,
        mediaType: 1,
        showAdAttribution: true,
        renderLargerThumbnail: true
      }
    }
  }, { quoted })
};

handler.command = /^(owner|مطور|المطور|توجي)$/i;

export default handler;

