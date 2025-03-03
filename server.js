const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg'); // استيراد مكتبة PostgreSQL
const path = require('path');
require('dotenv').config(); // لدعم استخدام المتغيرات البيئية

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ إعداد اتصال PostgreSQL باستخدام Render Database URL
const pool = new Pool({
    connectionString: process.env.DATABASE_URL, // نستخدم متغير البيئة لحماية البيانات الحساسة
    ssl: { rejectUnauthorized: false } // مطلوبة لاتصال آمن على Render
});

// ✅ التحقق من الاتصال بقاعدة البيانات
pool.connect()
    .then(client => {
        console.log('✅ تم الاتصال بقاعدة بيانات PostgreSQL');
        client.release();
    })
    .catch(err => console.error('❌ خطأ في الاتصال بقاعدة البيانات:', err));

// ✅ Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // تقديم الملفات الثابتة من مجلد public

// ✅ عرض الصفحة الرئيسية
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ✅ عرض صفحة التسجيل
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'registration.html'));
});

// ✅ نقطة النهاية لتسجيل الطلاب في قاعدة البيانات
app.post('/register', async (req, res) => {
    const { firstName, lastName, phone, email, course } = req.body;

    if (!firstName || !lastName || !email || !phone || !course) {
        return res.status(400).json({ error: '❌ جميع الحقول مطلوبة' });
    }

    try {
        const result = await pool.query(
            "INSERT INTO registrations (first_name, last_name, email, phone, course) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [firstName, lastName, email, phone, course]
        );
        res.json({ success: true, message: '✅ تم تسجيل الطالب بنجاح', data: result.rows[0] });
    } catch (err) {
        console.error('❌ خطأ في إدخال البيانات:', err);
        res.status(500).json({ error: '❌ خطأ في عملية التسجيل' });
    }
});

// ✅ إعادة توجيه أي مسار غير موجود إلى الصفحة الرئيسية
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ✅ تشغيل الخادم
app.listen(PORT, () => {
    console.log(`✅ الخادم يعمل على http://localhost:${PORT}`);
});