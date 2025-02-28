// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const path = require('path');


const Registration = require('./models/registration');

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`الخادم يعمل على http://localhost:${PORT}`);
});

// الاتصال بقاعدة بيانات MongoDB (تأكد من تغيير URI حسب إعداداتك)
mongoose.connect('mongodb://localhost:27017/avdp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('متصل بقاعدة البيانات'))
.catch(err => console.error(err));

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));




// تعيين محرك القوالب إلى EJS
app.set('view engine', 'ejs');

// تعيين المجلد الذي يحتوي على القوالب
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');


// إضافة Middleware لتقديم الملفات الثابتة (CSS, JS, Images) من مجلد public
app.use(express.static(path.join(__dirname, 'public')));

// اختبار صفحة EJS
app.get('/', (req, res) => {
    res.render('index', { title: 'صفحة رئيسية' });
});


// نقطة النهاية لتسجيل البيانات
app.post('/register', async (req, res) => {
  try {
    const registration = new Registration(req.body);
    await registration.save();
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'خطأ في تسجيل البيانات' });
  }
});

// نقطة النهاية لتوليد تقرير PDF للطلبات (واجهة مدير البيانات)
app.get('/admin/pdf', async (req, res) => {
  try {
    const registrations = await Registration.find();
    const doc = new PDFDocument();

    // تعيين نوع المحتوى ليكون PDF
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=registrations.pdf');

    // ربط تدفق البيانات من PDF إلى response
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
    console.error(err);
    res.status(500).send('خطأ في إنشاء التقرير');
  }
});

// نقطة نهاية عرض واجهة مدير البيانات (يمكن تطويرها لاحقاً)
app.get('/admin', async (req, res) => {
  // يمكنك استخدام قالب HTML أو إعادة توجيه إلى ملف dashboard.html داخل مجلد views
  res.sendFile(path.join(__dirname, 'views', 'dashboard.html'));
});

app.listen(PORT, () => {
  console.log(`الخادم يعمل على المنفذ ${PORT}`);
});