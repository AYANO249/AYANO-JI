const run = async (m, { args, conn, bot }) => {
  if (global.db.noSub) return m.reply("⚠️ المطور أغلق نظام التنصيب حالياً")
  try {
    const num = m.sender.split("@")[0].replace(/[+\s-]/g, '');

    if (!/^\d+$/.test(num)) return m.reply("⚠️ رقم الهاتف غير صالح");

    const sub = global.subBots;
    if (!sub) return m.reply("❌ نظام البوتات الفرعية غير متاح");

    const init = await m.reply(`⏳ جاري تنصيب بوت للرقم *${num}*...`);

    const state = { uid: null, pairDone: false, resolved: false, pending: null };
    const { images: img } = bot.config.info;

    const cleanup = () => {
      sub.off('pair', handlers.pair);
      sub.off('ready', handlers.ready);
      sub.off('error', handlers.error);
    };

    const handlers = {
      pair: (id, code) => {
        if (state.pairDone) return;
        if (!state.uid) {
          state.pending = { id, code };
          return;
        }
        if (id !== state.uid) return;
        state.pairDone = true;
        Func.pair(conn, code, num, m, init);
      },
      ready: (id) => {
        if (id !== state.uid || state.resolved) return;
        state.resolved = true;
        Func.ready(conn, num, m, img[Math.floor(Math.random() * img.length)]);
        cleanup();
      },
      error: (id, err) => {
        if (id !== state.uid || state.resolved) return;
        state.resolved = true;
        Func.error(conn, num, err, m);
        cleanup();
      },
    };

    sub.on('pair', handlers.pair);
    sub.on('ready', handlers.ready);
    sub.on('error', handlers.error);

    state.uid = await sub.add(num);

    if (state.pending?.id === state.uid && !state.pairDone) {
      state.pairDone = true;
      Func.pair(conn, state.pending.code, num, m, init);
    }

    setTimeout(() => {
      if (state.resolved) return;
      state.resolved = true;
      Func.timeout(conn, m, state.pairDone);
      cleanup();
    }, 120000);

  } catch (error) {
    await m.reply(error.message);
  }
};

run.command = ["تنصيب"];
run.noSub = true;
run.usage = ["تنصيب"];
run.category = "sub";
export default run;

const Func = {
  pair: async (conn, code, num, m, reply_status) => {
    await conn.sendButton(m.chat, {
      // تم وضع رابط الصورة الجديد هنا
      imageUrl: "https://i.ibb.co/RkVbNgdz/IMG-20260429-WA0040.jpg",
      bodyText: `🔐⤿ نـظـام الـبـوتـات الـفـرعـيـه 𑁍\n⊱⋅ ──────────── ⋅⊰\n📱 — الرقم: ${num}\n🔑 — الكود: ${code}\n⊱⋅ ──────────── ⋅⊰\n> *_افتح واتساب > الأجهزة المرتبطة > ربط جهاز برقم الهاتف > أدخل الكود_*`,
      footerText: "© 𝐒𝐲𝐬𝐭𝐞𝐦 𝐒𝐮𝐛𝐁𝐨𝐭𝐬 𝐀𝐘𝐀𝐍𝐎 𝐉𝐈",
      buttons: [
        { name: "cta_copy", params: { display_text: "⟨⚜️| 𝐂𝐨𝐩𝐲 𝐂𝐨𝐝𝐞 |⚜️⟩", copy_code: code } },
        { name: "cta_url", params: { display_text: "⟨📢| 𝐂𝐡𝐚𝐧 n e l 𝐀𝐘𝐀𝐍𝐎 𝐉𝐈 |⟩", url: "https://whatsapp.com/channel/0029VbD3UpkG3R3aq6V1DW2X" } },
      ],
      mentions: [m.sender],
      newsletter: {
        name: '𝐀𝐘𝐀𝐍𝐎 𝐉𝐈 𝐃𝐄𝐕',
        jid: '120363425314431422@newsletter'
      },
      interactiveConfig: {
        buttons_limits: 10,
        list_title: "𝐀𝐘𝐀𝐍𝐎 𝐉𝐈 𝐒𝐘𝐒𝐓𝐄𝐌",
        button_title: "Click Here",
        // الرابط المحدث لضمان معاينة صحيحة باسم قناتك
        canonical_url: `https://whatsapp.com/channel/0029VbD3UpkG3R3aq6V1DW2X`
      }
    }, global.reply_status);
  },

  ready: async (conn, num, m, img) => {
    await m.react("✅");
    await conn.sendMessage(m.chat, {
      text: `✅ — *تـم الاتـصـال بـنـجـاح*\n\n📱 الرقم: ${num}\n> *بـوت 𝐀𝐘𝐀𝐍𝐎 𝐉𝐈 جـاهـز للاسـتـخـدام الآن*`,
      contextInfo: {
        externalAdReply: {
          title: "𝐀𝐘𝐀𝐍𝐎 𝐉𝐈 | 𝐁𝐨𝐭 𝐂𝐨 n n e c t e d",
          body: "نظام البوتات الفرعية الأسرع والأكثر استقراراً",
          thumbnailUrl: img,
          sourceUrl: 'https://whatsapp.com/channel/0029VbD3UpkG3R3aq6V1DW2X',
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    });
  },

  error: async (conn, num, err, m) => {
    await m.reply(`❌ *فشل الاقتران!*\n\n📱 الرقم: ${num}\n⚠️ الخطأ: ${err?.message || 'غير معروف'}`);
  },

  timeout: async (conn, m, pairDone) => {
    await m.reply(pairDone
      ? `⏰ تم إرسال الكود لكن لم يتم تأكيد الاتصال.\nتأكد من إدخال الكود في واتساب.`
      : `⏰ لم يتم استلام كود الاقتران خلال 120 ثانية.\nالرجاء المحاولة مرة أخرى.`
    );
  }
};

