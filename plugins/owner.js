let handler = async (m, { conn, bot }) => {

  // الاسم بالخط المنسق
  let watermark = '𝐀𝐘𝐀𝐍𝐎 𝐉𝐈';

  // رسالة الاقتباس
  let quoted = {
    key: {
      fromMe: false,
      participant: '0@s.whatsapp.net',
      remoteJid: 'status@broadcast'
    },
    message: {
      conversation: '𝐈𝐍 𝐀𝐘𝐀𝐍𝐎 𝐉𝐈'
    }
  };

  // رقم المطور
  const num = "249906024672";

  let vcard = `BEGIN:VCARD
VERSION:3.0
FN:${watermark}
TEL;type=CELL;waid=${num}:+${num}
END:VCARD`;

  // الصورة الجديدة
  let img = 'https://i.ibb.co/mCMhR5sW/8b20ef0dd82f7e0a3bbef077d428c536.jpg';

  await conn.sendMessage(m.chat, {
    contacts: {
      displayName: watermark,
      contacts: [{ vcard }]
    },

    contextInfo: {
      forwardingScore: 2026,

      externalAdReply: {
        title: '𝐀𝐘𝐀𝐍𝐎 𝐉𝐈 𝐃𝐄𝐕',
        body: 'الـمـطـور الـرسـمـي',
        sourceUrl: 'https://whatsapp.com/channel/0029VbD3UpkG3R3aq6V1DW2X',
        thumbnailUrl: img,
        mediaType: 1,
        showAdAttribution: true,
        renderLargerThumbnail: true
      }
    }

  }, { quoted });

};

handler.command = /^(owner|مطور|المطور|ايانو|أيانو)$/i;

export default handler;
