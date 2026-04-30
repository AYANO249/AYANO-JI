import os

path = "./plugins"
exts = ('.png', '.jpg', '.jpeg', '.gif', '.webp')

if os.path.exists(path):
    print(f"\033[1;34m🔍 جاري البحث في: {path}...\033[0m")
    imgs = [os.path.join(r, f) for r, d, files in os.walk(path) for f in files if f.lower().endswith(exts)]
    
    if imgs:
        for i in imgs: print(f"\033[1;32m[IMAGE]\033[0m {i}")
        print(f"\n✅ المجموع: {len(imgs)} صورة.")
    else:
        print("❌ لم يتم العثور على صور.")
else:
    print("⚠️ مجلد plugins غير موجود في المسار الحالي.")
