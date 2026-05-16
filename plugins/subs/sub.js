const run = async (m, { args, conn, bot }) => {
  // رسالة إغلاق المطور لنظام التنصيب
  if (global.db.noSub) {
    return m.reply(`*─── ❲ صلاحـيـة الـتـنـصـيـب ❳ ───*\n\nالـوصـول مـرفـوض، هـذه المـيـزة تـتـطـلـب صـلاحـيـات الإدارة\nتـواصـل مـع مـشـرف المـجـمـوعـة للـقـيـام بـذلـك\n\n*─── 𝐈𝐍 ⁝|⁝ 𝐀𝐘𝐀𝐍𝐎 𝐉𝐈 ʚɞ ───*`);
  }
  
  // التحقق من اسم المجموعة
  const groupMetadata = m.isGroup ? await conn.groupMetadata(m.chat).catch(() => null) : null;
  const groupName = groupMetadata ? groupMetadata.subject : "";
  const allowedGroup = "𝐀𝐘𝐀𝐍𝐎 𝐉𝐈||تنصيب";

  if (!m.isGroup || groupName !== allowedGroup) {
    return m.reply(`*─── ❲ الـتـنـصـيب ❳ ───*\n\nهذا الأمر في القروب الاساسي فقط، لا يمكنك استخدام ميزة التنصيب هنا.\n\n*─── 𝐈𝐍 ⁝|⁝ 𝐀𝐘𝐀𝐍𝐎 𝐉𝐈 ʚɞ ───*`);
  }

  try {
    const num = m.sender.split("@")[0].replace(/[+\s-]/g, '');

    // تعديل وتنسيق رسالة رقم الهاتف غير صالح
    if (!/^\d+$/.test(num)) {
      return m.reply(`*─── ❲ خـطـأ فـي الـرقـم ❳ ───*\n\n⚠️ عذراً، رقم الهاتف الخاص بك غير صالح أو غير مدعوم.\n\n> *تأكد من إعدادات حسابك وحاول مجدداً.*\n\n*─── 𝐈𝐍 ⁝|⁝ 𝐀𝐘𝐀𝐍𝐎 𝐉𝐈 ʚɞ ───*`);
    }

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
      imageUrl: "https://i.ibb.co/zh7Cgwxh/862bdd19ab9abd7d7720fc5e761f0c7b.jpg",
      bodyText: `🔐⤿ نـظـام الـبـوتـات الـفـرعـيـه 𑁍\n⊱⋅ ──────────── ⋅⊰\n📱 — الرقم: ${num}\n🔑 — الكود: ${code}\n⊱⋅ ──────────── ⋅⊰\n> *_افتح واتساب > الأجهزة المرتبطة > ربط جهاز برقم الهاتف > أدخل الكود_*`,
      footerText: "© 𝐒𝐲𝐬𝐭𝐞ม 𝐒𝐮𝐛𝐁𝐨𝐭𝐬 𝐀𝐘𝐀𝐍𝐎 𝐉𝐈",
      buttons: [
        { name: "cta_copy", params: { display_text: "⟨⚜️| 𝐂𝐨𝐩𝐲 𝐂𝐨𝐝𝐞 |⚜️⟩", copy_code: code } },
        { name: "cta_url", params: { display_text: "⟨📢| 𝐂𝐡𝐚н n e l 𝐀𝐘𝐀𝐍𝐎 𝐉𝐈 |⟩", url: "https://whatsapp.com/channel/0029VbD3UpkG3R3aq6V1DW2X" } },
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
        canonical_url: `𝐀𝐘𝐀𝐍𝐎 𝐉𝐈`
      }
    }, global.reply_status);
  },

  ready: async (conn, num, m, img) => {
    await m.react("✅");
    await conn.sendMessage(m.chat, {
      text: `*─── ❲ حـالـة الـتـنـصـيـب ❳ ───*\n\n✅ تـم الاتـصـال بـنـجـاح!\n📱 الـرقم: +${num}\n\n> *بـوت الـتـنـصـيـب الـفـرعـي جـاهـز للاسـتـخـدام الآن*\n\n*─── 𝐈𝐍 ⁝|⁝ 𝐀𝐘𝐀𝐍𝐎 𝐉𝐈 ʚɞ ───*`,
      contextInfo: {
        externalAdReply: {
          title: "𝐀𝐘𝐀𝐍𝐎 𝐉𝐈 𝐁𝐨𝐭 ",
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
    await m.reply(`*─── ❲ فـشـل الاقـتـران ❳ ───*\n\n❌ نأسف، لم يكتمل ربط البوت الفرعي بنجاح.\n📱 الـرقم: +${num}\n⚠️ الـخطأ: ${err?.message || 'غير معروف'}\n\n> *يرجى التحقق من استقرار شبكتك وإعادة المحاولة لاحقاً.*\n\n*─── 𝐈𝐍 ⁝|⁝ 𝐀𝐘𝐀𝐍𝐎 𝐉𝐈 ʚɞ ───*`);
  },

  timeout: async (conn, m, pairDone) => {
    const msgText = pairDone
      ? `⏰ تم إرسال الكود مسبقاً لكن لم يتم تأكيد الاتصال على الواتساب الخاص بك.\nتأكد من إدخال الكود في الأجهزة المرتبطة.`
      : `⏰ انتهت المهلة! لم يتم استلام كود الاقتران خلال 120 ثانية.\nالرجاء إعادة كتابة الأمر للمحاولة مرة أخرى.`;

    await m.reply(`*─── ❲ انـتـهـاء المـهـلـة ❳ ───*\n\n${msgText}\n\n*─── 𝐈𝐍 ⁝|⁝ 𝐀𝐘𝐀𝐍𝐎 𝐉𝐈 ʚɞ ───*`);
  }
};
