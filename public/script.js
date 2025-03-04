document.addEventListener('DOMContentLoaded', function () {
    const steps = document.querySelectorAll(".form-step");
    let currentStep = 0;

    document.addEventListener('DOMContentLoaded', function () {
        const nextBtn = document.getElementById('next1'); // زر الانتقال للخطوة التالية
        const courseSelect = document.getElementById('course'); // حقل اختيار الدورة
        const step1 = document.getElementById('step-1'); // القسم الأول من النموذج
        const step2 = document.getElementById('step-2'); // القسم الثاني من النموذج
    


    // ✅ زر "التالي" والتحقق من اختيار الدورة
    const nextBtn = document.getElementById('next1'); 
    const courseSelect = document.getElementById('course'); 
    const step1 = document.getElementById('step-1'); 
    const step2 = document.getElementById('step-2'); 

    // ✅ التعرف على لغة الموقع
    function getLanguage() {
        const lang = document.documentElement.lang || "fr"; // افتراضي الفرنسية
        return lang;
    }




    nextBtn.addEventListener('click', function () {
        if (courseSelect.value !== "") { 
            step1.classList.remove('active'); 
            step2.classList.add('active'); 
        } else {
            alert("❌ الرجاء اختيار دورة قبل المتابعة!");
        }
    });

    // ✅ أزرار التنقل بين الخطوات
    document.getElementById("next2").addEventListener("click", function () {
        steps[currentStep].classList.remove("active");
        currentStep++;
        steps[currentStep].classList.add("active");
        showPreview();
    });

    document.getElementById("prev2").addEventListener("click", function () {
        steps[currentStep].classList.remove("active");
        currentStep--;
        steps[currentStep].classList.add("active");
    });

    document.getElementById("prev3").addEventListener("click", function () {
        steps[currentStep].classList.remove("active");
        currentStep--;
        steps[currentStep].classList.add("active");
    });

    // ✅ عرض البيانات قبل الإرسال
    function showPreview() {
        const preview = document.getElementById("preview");
        const firstName = document.getElementById("firstName").value;
        const lastName = document.getElementById("lastName").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;
        const course = document.getElementById("course").value;

        preview.innerHTML = `
            <p><strong>First Name:</strong> ${firstName}</p>
            <p><strong>Last Name:</strong> ${lastName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Course:</strong> ${course}</p>
        `;
    }

    // ✅ إرسال البيانات إلى الخادم
    document.getElementById("registrationForm").addEventListener("submit", function (event) {
        event.preventDefault();
        submitForm();
    });

    function submitForm() {
        const formData = {
            firstName: document.getElementById("firstName").value,
            lastName: document.getElementById("lastName").value,
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value,
            course: document.getElementById("course").value
        };

        fetch('/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            if (data.success) {
                document.getElementById("registrationForm").reset();
                currentStep = 0;
                steps.forEach(step => step.classList.remove("active"));
                steps[0].classList.add("active");
            }
        })
        .catch(error => console.error("❌ خطأ في إرسال البيانات:", error));
    }
});


nextBtn.addEventListener('click', function () {
    if (courseSelect.value !== "") { // التأكد أن المستخدم اختار دورة
        step1.classList.remove('active'); // إخفاء الخطوة 1
        step2.classList.add('active'); // إظهار الخطوة 2
    } else {
        const lang = getLanguage();
        let message = "";
        
        if (lang === "fr") {
            message = "❌ Veuillez sélectionner un cours avant de continuer! 🇫🇷";
        } else if (lang === "en") {
            message = "❌ Please select a course before proceeding! 🇬🇧";
        } else {
            message = "❌ الرجاء اختيار دورة قبل المتابعة! 🇴🇦"; // علم جامعة الدول العربية أو رمز الضاد
        }

        alert(message);
    }
});
});