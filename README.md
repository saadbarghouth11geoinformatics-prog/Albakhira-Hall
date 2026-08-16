# قاعة الباخرة للاحتفالات

الموقع الرسمي لقاعة الباخرة للاحتفالات في جدة. المشروع مبني باستخدام React وTypeScript وVite، مع خادم Express لتقديم الموقع وواجهة الطقس الاختيارية.

## التشغيل محليًا

يتطلب المشروع Node.js 18 أو إصدارًا أحدث.

```bash
npm install
copy .env.example .env.local
npm run dev
```

يعمل الموقع افتراضيًا على `http://localhost:3000`.

## متغيرات البيئة

- `GEMINI_API_KEY`: اختياري، لتفعيل بيانات الطقس المدعومة من Gemini. عند غيابه تُعرض بيانات احتياطية.
- `GOOGLE_MAPS_PLATFORM_KEY`: اختياري، لتفعيل خريطة Google Maps.
- `PORT`: منفذ خادم الإنتاج، والقيمة الافتراضية `3000`.

## الفحص والبناء

```bash
npm run lint
npm run build
npm start
```

يتم إنشاء ملفات الإنتاج داخل مجلد `dist`، ويشغّل `npm start` خادم Express المبني.
