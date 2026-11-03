# أطلس البنوك والمحافظ الرقمية — تعليمات التشغيل

## المتطلبات
- Node.js 20+ أو Bun

## التثبيت والتشغيل
```bash
bun install        # أو npm install
bun run dev        # http://localhost:8080
bun run build      # بناء نسخة الإنتاج
```

## تعديل البيانات
كل الدول في `src/data/countries.ts`. لكل دولة سجل مستقل للبنك والمحفظة (الاسم، الشعار، الموقع، Facebook، طرق فتح الحساب وتسجيل الدخول، المصادر، الحالة).
الحالات: `verified` موثّق، `partial` موثّق جزئياً، `review` يحتاج مراجعة، `unavailable` غير متوفر.
لا تضف أي بيانات بدون مصدر رسمي في حقل `sources`.

## قاعدة البيانات
`database/schema.sql` يحتوي على جدول `countries`. يمكن تصدير البيانات الحالية من الواجهة بصيغ CSV / JSON / SQL.

## النشر
- **Vercel / Netlify / Cloudflare**: المشروع مبني على TanStack Start + Vite. اربط المستودع واستخدم أمر البناء `npm run build`. للنشر على Vercel أو Netlify غيّر الـ preset في `vite.config.ts` حسب توثيق TanStack Start (https://tanstack.com/start/latest/docs/framework/react/hosting).

لا يحتوي الملف على أي كلمات مرور أو مفاتيح API.
