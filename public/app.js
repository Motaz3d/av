const mysql = require('mysql2');

// ✅ إعداد اتصال MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // أدخل كلمة مرور MySQL الخاصة بك إذا قمت بتعيين واحدة
    database: 'avicenne'
});

db.connect(err => {
    if (err) {
        console.error('❌ خطأ في الاتصال بقاعدة البيانات:', err);
        return;
    }
    console.log('✅ تم الاتصال بقاعدة بيانات MySQL');
});

// ✅ الاحتفاظ فقط بالقائمة الجانبية (Hamburger Menu) بدون تغيير الخلفية
document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const mobile_menu = document.querySelector('.nav-list ul');
    const menu_item = document.querySelectorAll('.nav-list ul li a');

    // عند النقر على زر القائمة الجانبية
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobile_menu.classList.toggle('active');
    });

    // عند النقر على أي عنصر في القائمة، أغلق القائمة الجانبية
    menu_item.forEach((item) => {
        item.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobile_menu.classList.toggle('active');
        });
    });
});