const request = require('supertest');
const express = require('express');
const app = require('../server'); // تأكد من تصدير `app` في `server.js`

// ✅ اختبار الصفحة الرئيسية
describe('GET /', () => {
  it('يجب أن يرجع حالة 200 مع رسالة ترحيب', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toContain('Hello, Secure World!');
  });
});

// ✅ اختبار نقطة النهاية للتسجيل
describe('POST /register', () => {
  it('يجب أن يسجل المستخدم بنجاح', async () => {
    const newUser = {
      firstName: "Ahmed",
      lastName: "Ali",
      email: "ahmed@example.com",
      phone: "123456789",
      course: "JavaScript Basics",
      semester: "Spring 2025"
    };

    const res = await request(app).post('/register').send(newUser);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('success', true);
  });
});

// ✅ اختبار عدم السماح بالتسجيل عند نقص البيانات
describe('POST /register بدون بيانات كاملة', () => {
  it('يجب أن يرجع خطأ عند عدم إرسال جميع البيانات المطلوبة', async () => {
    const incompleteUser = {
      firstName: "Khalid"
    };

    const res = await request(app).post('/register').send(incompleteUser);
    expect(res.statusCode).toBe(500);
    expect(res.body).toHaveProperty('error');
  });
});