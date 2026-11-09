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
البيانات الحية في قاعدة البيانات؛ الأنواع والحقول في `src/data/countries.ts`. لكل دولة سجل مستقل للبنك والمحفظة (الاسم، الشعار، الموقع، Facebook، روابط التطبيقات `apps`، طرق فتح الحساب وتسجيل الدخول، المصادر، الحالة، وملاحظة `note` تشرح سبب أي حقل فارغ).
روابط Facebook والتطبيقات مأخوذة فقط من الروابط المنشورة على الموقع الرسمي لكل جهة.
الحالات: `verified` موثّق، `partial` موثّق جزئياً، `review` يحتاج مراجعة، `unavailable` غير متوفر.
لا تضف أي بيانات بدون مصدر رسمي في حقل `sources`.

## قاعدة البيانات
البيانات تُقرأ من جدول `countries` (Postgres / Supabase).
1. أنشئ مشروع Supabase.
2. نفّذ `database/seed.sql` (ينشئ الجدول ويُدخل كل الدول والبيانات الموثقة).
3. انسخ `.env.example` إلى `.env` وضع الرابط والمفتاح العام.
 يمكن تصدير البيانات الحالية من الواجهة بصيغ CSV / JSON / SQL.

## النشر
- **Vercel / Netlify / Cloudflare**: المشروع مبني على TanStack Start + Vite. اربط المستودع واستخدم أمر البناء `npm run build`. للنشر على Vercel أو Netlify غيّر الـ preset في `vite.config.ts` حسب توثيق TanStack Start (https://tanstack.com/start/latest/docs/framework/react/hosting).

لا يحتوي الملف على أي كلمات مرور أو مفاتيح API.
