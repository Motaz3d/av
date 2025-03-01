// ✅ تحميل المتغيرات البيئية
require('dotenv').config();
console.log('Database URL:', process.env.DATABASE_URL);
console.log('CPanel URL:', process.env.CPANEL_URL);
console.log('Email:', process.env.EMAIL);

// ✅ استيراد المكتبات الأساسية
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const helmet = require('helmet');

const Registration = require('./models/registration');

// ✅ تهيئة تطبيق Express
const app = express();
const PORT = process.env.PORT || 3000;

// ✅ تفعيل جميع ترويسات الأمان باستخدام Helmet
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],  // السماح فقط بالموارد المحلية
            scriptSrc: ["'self'", "trusted-cdn.com"], // السماح فقط بالـ scripts من المصادر الموثوقة
            styleSrc: ["'self'", "trusted-cdn.com"] // السماح فقط بـ CSS من المصادر الموثوقة
        }
    },
    frameguard: { action: "deny" },  // منع Clickjacking
    referrerPolicy: { policy: "strict-origin-when-cross-origin" }, // تحسين خصوصية الـ Referrer
    hsts: { maxAge: 31536000, includeSubDomains: true, preload: true } // تفعيل HTTPS بشكل صارم
}));

// ✅ الاتصال بقاعدة بيانات MongoDB
mongoose.connect(process.env.DATABASE_URL || 'mongodb://localhost:27017/avdp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('✅ متصل بقاعدة البيانات'))
.catch(err => console.error('❌ فشل الاتصال بقاعدة البيانات:', err));

// ✅ Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// ✅ إعداد محرك القوالب EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ✅ إضافة Middleware لتقديم الملفات الثابتة (CSS, JS, Images)
app.use(express.static(path.join(__dirname, 'public')));

// ✅ الصفحة الرئيسية
app.get('/', (req, res) => {
    res.render('index', { title: 'الصفحة الرئيسية' });
});

// ✅ نقطة النهاية لتسجيل البيانات
app.post('/register', async (req, res) => {
    try {
        const registration = new Registration(req.body);
        await registration.save();
        res.json({ success: true });
    } catch (err) {
        console.error('❌ خطأ في تسجيل البيانات:', err);
        res.status(500).json({ error: 'خطأ في تسجيل البيانات' });
    }
});

// ✅ نقطة النهاية لتوليد تقرير PDF للطلبات
app.get('/admin/pdf', async (req, res) => {
    try {
        const registrations = await Registration.find();
        const doc = new PDFDocument();

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=registrations.pdf');
        doc.pipe(res);

        doc.fontSize(18).text('تقرير التسجيل - Centre Avicenne Luxembourg', { align: 'center' });
        doc.moveDown();

        registrations.forEach((reg, index) => {
            doc.fontSize(12).text(`تسجيل ${index + 1}:`);
            doc.text(`الدورة: ${reg.course}`);
            doc.text(`الفصل: ${reg.semester}`);
            doc.text(`الاسم: ${reg.firstName} ${reg.lastName}`);
            doc.text(`الرمز البريدي: ${reg.postalCode}`);
            doc.text(`اسم الشارع: ${reg.street}`);
            doc.text(`الهاتف: ${reg.phone}`);
            doc.text(`البريد الإلكتروني: ${reg.email}`);
            doc.text(`تاريخ التسجيل: ${reg.registeredAt}`);
            doc.moveDown();
        });

        doc.end();
    } catch (err) {
        console.error('❌ خطأ في إنشاء التقرير:', err);
        res.status(500).send('خطأ في إنشاء التقرير');
    }
});

// ✅ نقطة نهاية عرض واجهة مدير البيانات
app.get('/admin', async (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'dashboard.html'));
});

// ✅ تشغيل الخادم
app.listen(PORT, () => {
    console.log(`✅ الخادم يعمل على http://localhost:${PORT}`);
});


module.exports = app;