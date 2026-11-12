
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    console.log("مرحباً بك في تطبيق الإيمان ❤️");

    // تشغيل أذكار الصباح
    const morningBtn = document.getElementById("morningBtn");
    if (morningBtn) {
      morningBtn.addEventListener("click", function () {
        if (window.AlImanAzkar) {
          window.AlImanAzkar.render("morning", "azkarContainer");
        }
      });
    }

    // تشغيل أذكار المساء
    const eveningBtn = document.getElementById("eveningBtn");
    if (eveningBtn) {
      eveningBtn.addEventListener("click", function () {
        if (window.AlImanAzkar) {
          window.AlImanAzkar.render("evening", "azkarContainer");
        }
      });
    }
  });
})();

