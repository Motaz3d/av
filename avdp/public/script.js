document.addEventListener("DOMContentLoaded", function () {
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

  function showPreview() {
      const preview = document.getElementById("preview");
      const firstName = document.getElementById("firstName").value;
      const lastName = document.getElementById("lastName").value;
      const course = document.getElementById("course").value;
      const semester = document.getElementById("semester").value;
      const postalCode = document.getElementById("postalCode").value;
      const street = document.getElementById("street").value;
      const phone = document.getElementById("phone").value;
      const email = document.getElementById("email").value;

      preview.innerHTML = `
          <p><strong>Name:</strong> ${firstName} ${lastName}</p>
          <p><strong>Course:</strong> ${course}</p>
          <p><strong>Semester:</strong> ${semester}</p>
          <p><strong>Postal Code:</strong> ${postalCode}</p>
          <p><strong>Street:</strong> ${street}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Email:</strong> ${email}</p>
      `;
  }
});