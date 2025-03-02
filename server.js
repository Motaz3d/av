const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ إعداد الاتصال بـ MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // أضف كلمة مرور MySQL إذا كنت قد عينت واحدة
    database: 'avicenne'
});

db.connect(err => {
    if (err) {
        console.error('❌ خطأ في الاتصال بقاعدة البيانات:', err);
        return;
    }
    console.log('✅ تم الاتصال بقاعدة بيانات MySQL');
});

// ✅ إعداد Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// ✅ عرض صفحة التسجيل
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'registration.html'));
});

// ✅ نقطة النهاية لتسجيل الطلاب في قاعدة البيانات
app.post('/register', (req, res) => {
    const { firstName, lastName, phone, email, course } = req.body;

    const sql = `INSERT INTO students (first_name, last_name, phone, email, course) VALUES (?, ?, ?, ?, ?)`;
    db.query(sql, [firstName, lastName, phone, email, course], (err, result) => {
        if (err) {
            console.error('❌ خطأ في التسجيل:', err);
            return res.status(500).json({ error: 'فشل التسجيل' });
        }
        res.json({ success: true, message: 'تم التسجيل بنجاح!' });
    });
});

// ✅ نقطة النهاية لتسجيل الطلاب في قاعدة البيانات
app.post('/register', (req, res) => {
    const { firstName, lastName, email, phone, course } = req.body;

    if (!firstName || !lastName || !email || !phone || !course) {
        return res.status(400).json({ error: '❌ جميع الحقول مطلوبة' });
    }

    const sql = "INSERT INTO registrations (first_name, last_name, email, phone, course) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [firstName, lastName, email, phone, course], (err, result) => {
        if (err) {
            console.error('❌ خطأ في إدخال البيانات:', err);
            return res.status(500).json({ error: '❌ خطأ في عملية التسجيل' });
        }
        res.json({ success: true, message: '✅ تم تسجيل الطالب بنجاح' });
    });
});



// ✅ تشغيل الخادم
app.listen(PORT, () => {
    console.log(`✅ الخادم يعمل على http://localhost:${PORT}`);
});