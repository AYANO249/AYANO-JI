import axios from 'axios';

const handler = async (m, { conn, text, usedPrefix, command }) => {
    const surahs = [
        "الفاتحة", "البقرة", "آل عمران", "النساء", "المائدة", "الأنعام", "الأعراف", "الأنفال", "التوبة", "يونس", "هود", "يوسف", "الرعد", "إبراهيم", "الحجر", "النحل", "الإسراء", "الكهف", "مريم", "طه", "الأنبياء", "الحج", "المؤمنون", "النور", "الفرقان", "الشعراء", "النمل", "القصص", "العنكبوت", "الروم", "لقمان", "السجدة", "الأحزاب", "سبأ", "فاطر", "يس", "الصافات", "ص", "الزمر", "غافر", "فصلت", "الشورى", "الزخرف", "الدخان", "الجاثية", "الأحقاف", "محمد", "الفتح", "الحجرات", "ق", "الالذاريات", "الطور", "النجم", "القمر", "الرحمن", "الواقعة", "الحديد", "المجادلة", "الحشر", "الممتحنة", "الصف", "الجمعة", "المنافقون", "التغابن", "الطلاق", "التحريم", "الملك", "القلم", "الحاقة", "المعارج", "نوح", "الجن", "المزمل", "المدثر", "القيامة", "الإنسان", "المرسلات", "النبأ", "النازعات", "عبس", "التكوير", "الانفطار", "المطففين", "الانشقاق", "البروج", "الطارق", "الأعلى", "الغاشية", "الفجر", "البلد", "الشمس", "الليل", "الضحى", "الشرح", "التين", "العلق", "القدر", "البينة", "الزلزلة", "العاديات", "القارعة", "التكاثر", "العصر", "الهمزة", "الفيل", "قريش", "الماعون", "الكوثر", "الكافرون", "النصر", "المسد", "الإخلاص", "الفلق", "الناس"
    ];

    const reciters = [
        { name: "أحمد العجمي", server: "https://download.quranicaudio.com/quran/ahmed_ibn_3ali_al-ajamy" },
        { name: "مشاري العفاسي", server: "https://download.quranicaudio.com/quran/mishari_rashid_al_afasy" },
        { name: "ماهر المعيقلي", server: "https://download.quranicaudio.com/quran/maher_2al_mu3ayqly/ybeem" },
        { name: "سعد الغامدي", server: "https://download.quranicaudio.com/quran/sa3d_al_ghaamidi/complete" },
        { name: "فارس عباد", server: "https://download.quranicaudio.com/quran/faris_3abbad" },
        { name: "ياسر الدوسري", server: "https://download.quranicaudio.com/quran/yasser_ad-dussary" },
        { name: "ناصر القطامي", server: "https://download.quranicaudio.com/quran/nasser_alqatami" }
    ];

    try {
        let surahIndex = -1;
        if (text) {
            let cleanText = text.replace(/[إأآا]/g, 'ا').replace(/ة/g, 'ه').replace(/[^\u0621-\u064A]/g, '').trim();
            surahIndex = surahs.findIndex(s => {
                let cleanSurah = s.replace(/[إأآا]/g, 'ا').replace(/ة/g, 'ه').replace(/[^\u0621-\u064A]/g, '');
                return cleanSurah.includes(cleanText) || cleanText.includes(cleanSurah);
            });
            if (surahIndex === -1) return m.reply("❌ لم أستطع العثور على السورة، تأكد من الاسم.");
        } else {
            surahIndex = Math.floor(Math.random() * 114);
        }

        const surahNumber = surahIndex + 1;
        const reciter = reciters[Math.floor(Math.random() * reciters.length)];
        const formattedNumber = surahNumber.toString().padStart(3, '0');
        const audioUrl = `${reciter.server}/${formattedNumber}.mp3`;

        await m.reply(`⏳ جاري جلب سورة *${surahs[surahIndex]}* بصوت الشيخ: *${reciter.name}*...`);

        await conn.sendMessage(m.chat, {
            audio: { url: audioUrl },
            mimetype: 'audio/mp4',
            ptt: false,
            contextInfo: {
                mentionedJid: [m.sender],
                isForwarded: true,
                forwardingScore: 1,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363425314431422@newsletter',
                    newsletterName: '𝐓𝐎𝐉𝐈 𝐈𝐍 🏮',
                    serverMessageId: 0
                },
                externalAdReply: {
                    title: `📖 سورة ${surahs[surahIndex]}`,
                    body: `القارئ: ${reciter.name} | 𝐓𝐎𝐉𝐈 𝐈𝐍`,
                    thumbnailUrl: 'https://i.ibb.co/1y4gGJC/b53f9668d1cf2b6783c65fb3d940f79d.jpg',
                    sourceUrl: 'https://whatsapp.com/channel/0029VbD3UpkG3R3aq6V1DW2X',
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        }, { quoted: m });

    } catch (e) {
        console.error(e);
        m.reply("❌ حدث خطأ، تأكد من اتصالك بالإنترنت أو جرب قارئاً آخر.");
    }
};

handler.command = ["قرآن", "قران", "quran"];
handler.category = "islamic";
handler.usage = ["قرآن (اسم السورة)"];

export default handler;
