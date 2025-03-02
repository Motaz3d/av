document.addEventListener('DOMContentLoaded', function () {
    const steps = document.querySelectorAll(".form-step");
    let currentStep = 0;

    document.getElementById("next1").addEventListener("click", function () {
        steps[currentStep].classList.remove("active");
        currentStep++;
        steps[currentStep].classList.add("active");
    });

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

    document.getElementById("registrationForm").addEventListener("submit", function (event) {
        event.preventDefault();
        submitForm();
    });

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