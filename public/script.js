document.addEventListener('DOMContentLoaded', function () {
    const steps = document.querySelectorAll(".form-step");
    let currentStep = 0;

    const nextBtn = document.getElementById('next1'); 
    const courseSelect = document.getElementById('course'); 
    const step1 = document.getElementById('step-1'); 
    const step2 = document.getElementById('step-2'); 

    // ✅ زر "التالي" والتحقق من اختيار الدورة
    nextBtn.addEventListener('click', function () {
        if (courseSelect.value !== "") { 
            step1.classList.remove('active'); 
            step2.classList.add('active'); 
        } else {
            alert("❌ الرجاء اختيار دورة قبل المتابعة!");
        }
    });

    // ✅ أزرار التنقل بين الخطوات
    document.getElementById("nextBtn").addEventListener("click", function() {
        fetch("/api/next", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ step: "next" })
        })
        .then(response => response.json())
        .then(data => {
            console.log("Response:", data);
            alert(data.message || "⚠ البيانات غير متاحة!");
        })
        .catch(error => {
            console.error("❌ خطأ في الاتصال:", error);
        });
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