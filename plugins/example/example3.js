const handler = async (m, { conn }) => {

await conn.sendButton(m.chat, {
  // تم وضع الصورة الجديدة التي اخترتها لـ SHADOW
  imageUrl: "",
  bodyText: "مرحباً بك في نظام **𝐀𝐘𝐀𝐍𝐎 𝐉𝐈** المتطور. يرجى اختيار أحد الخيارات المتاحة أدناه:",
  footerText: "نظام التحكم الذكي - 𝐀𝐘𝐀𝐍𝐎 𝐉𝐈",
  buttons: [
    // 1. رد سريع
    { name: "quick_reply", params: { display_text: "✅ تأكيد العملية", id: "confirm1" } },
    { name: "quick_reply", params: { display_text: "❌ إلغاء الأمر", id: "cancel1" } },
    
    // 2. رابط خارجي
    { name: "cta_url", params: { display_text: "🔗 قناة المطور", url: "https://whatsapp.com/channel/0029VbD3UpkG3R3aq6V1DW2X" } },
    
    // 3. اتصال
    { name: "cta_call", params: { display_text: "📞 اتصال بالمطور", phone_number: "249906024672" } },
    
    // 4. نسخ الكود
    { name: "cta_copy", params: { display_text: "📋 نسخ معرف الهوية", copy_code: "SHADOW-DEV-249" } },
    
    // 5. قائمة خيارات منسدلة
    { name: "single_select", params: { 
      title: "🔎 استعراض الأقسام",
      sections: [{
        title: "القائمة الرئيسية",
        rows: [
          { title: "قسم الحماية", description: "إعدادات أمان البوت", id: "security" },
          { title: "قسم الألعاب", description: "قائمة الألعاب التفاعلية", id: "games" }
        ]
      }]
    }},
  ],
  mentions: [m.sender],
  newsletter: {
      name: '𝐈𝐍 𝐀𝐘𝐀𝐍𝐎 𝐉𝐈',
      jid: '120363425314431422@newsletter'
    },
  interactiveConfig: {
    buttons_limits: 1,
    list_title: "الخيارات المتاحة",
    button_title: "اضغط هنا",
    canonical_url: "https://example.com"
  }
}, m);

};

handler.usage = ["تست3"];
handler.category = "example";
handler.command = ["تست3"];

export default handler;

