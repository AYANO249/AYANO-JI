import axios from "axios";
import FormData from "form-data";
import { Scrapy } from "meowsab";

let run = async (m, { conn, command }) => {
    try {
        let q = m.quoted ? m.quoted : m;
        let mime = (q.msg || q).mimetype || '';

        if (!mime.startsWith('audio')) {
            return m.reply("❌ رد على ملف صوتي أولاً");
        }

        // تحميل الصوت
        let media = await q.download();
        let link = await uploadTmpfiles(media);

        let num;
        switch (command) {
            case "فويس1": num = 1; break;
            case "فويس2": num = 2; break;
            case "فويس3": num = 3; break;
            case "فويس4": num = 4; break;
            case "فويس5": num = 5; break;
            case "فويس6": num = 6; break;
            case "فويس7": num = 7; break;
            case "فويس8": num = 8; break;
            case "فويس9": num = 9; break;
            case "فويس10": num = 10; break;
            case "فويس11": num = 11; break;
            case "فويس12": num = 12; break;
            case "فويس13": num = 13; break;
            case "فويس14": num = 14; break;
            case "فويس15": num = 15; break;
            case "فويس16": num = 16; break;
            case "فويس17": num = 17; break;
            case "فويس18": num = 18; break;
            case "فويس19": num = 19; break;
            case "فويس20": num = 20; break;
            case "فويس21": num = 21; break;
            case "فويس22": num = 22; break;
            case "فويس23": num = 23; break;
            case "فويس24": num = 24; break;
            case "فويس25": num = 25; break;
            case "فويس26": num = 26; break;
            case "فويس27": num = 27; break;
            case "فويس28": num = 28; break;
            case "فويس29": num = 29; break;
            case "فويس30": num = 30; break;
            default:
                return m.reply("❌ أمر غير معروف");
        }

        let result = await Scrapy.VoiceChange({
            url: link,
            num: num.toString()
        });

        if (!result?.data?.audio) {
            throw "❌ فشل تحويل الصوت";
        }

        let audioBuffer = Buffer.from(result.data.audio, 'base64');

        await conn.sendMessage(m.chat, {
            audio: audioBuffer,
            mimetype: 'audio/mpeg',
            ptt: false
        });

    } catch (e) {
        console.error(e);
        m.reply("❌ حصل خطأ أثناء المعالجة");
    }
};

run.command = [
    "فويس1","فويس2","فويس3","فويس4","فويس5","فويس6","فويس7","فويس8","فويس9","فويس10",
    "فويس11","فويس12","فويس13","فويس14","فويس15","فويس16","فويس17","فويس18","فويس19","فويس20",
    "فويس21","فويس22","فويس23","فويس24","فويس25","فويس26","فويس27","فويس28","فويس29","فويس30"
];

run.category = "voices";

export default run;

// رفع الصوت
async function uploadTmpfiles(buffer) {
    const form = new FormData();
    form.append('file', buffer, { filename: "voice.mp3", contentType: "audio/mpeg" });

    const res = await axios.post(
        "https://c.termai.cc/api/upload?key=AIzaBj7z2z3xBjsk",
        form,
        {
            headers: form.getHeaders(),
            timeout: 30000
        }
    );

    if (!res.data?.status || !res.data?.path) {
        throw new Error("Upload failed: " + JSON.stringify(res.data));
    }

    return res.data.path;
    }
