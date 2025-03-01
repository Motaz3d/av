document.addEventListener("DOMContentLoaded", function () {
    let currentStep = 1;
    const totalSteps = 3;
    const progressBar = document.getElementById("progress-bar");
  
    function updateProgress() {
      const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;
      progressBar.style.width = `${progress}%`;
    }
  
    document.getElementById("next1").addEventListener("click", function () {
      document.getElementById("step-1").classList.remove("active");
      document.getElementById("step-2").classList.add("active");
      currentStep++;
      updateProgress();
    });
  
    document.getElementById("next2").addEventListener("click", function () {
      document.getElementById("step-2").classList.remove("active");
      document.getElementById("step-3").classList.add("active");
      currentStep++;
      updateProgress();
    });
  
    document.getElementById("prev2").addEventListener("click", function () {
      document.getElementById("step-2").classList.remove("active");
      document.getElementById("step-1").classList.add("active");
      currentStep--;
      updateProgress();
    });
  
    document.getElementById("prev3").addEventListener("click", function () {
      document.getElementById("step-3").classList.remove("active");
      document.getElementById("step-2").classList.add("active");
      currentStep--;
      updateProgress();
    });
  
    updateProgress();
  });