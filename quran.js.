
(function () {
  "use strict";

  const API = "https://mp3quran.net/api/v3";

  let reciters = [];
  let surahs = [];

  const $ = id => document.getElementById(id);

  async function getData(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error("فشل التحميل");
    return response.json();
  }

  async function initQuran() {
    const reciterSelect = $("reciter");
    const surahSelect = $("surah");
    const status = $("quranStatus");

    if (!reciterSelect || !surahSelect) return;

    try {
      if (status) status.textContent = "جارٍ تحميل القراء والسور...";

      const [s, r] = await Promise.all([
        getData(API + "/suwar?language=ar"),
        getData(API + "/reciters?language=ar")
      ]);

      surahs = s.suwar || [];
      reciters = [];

      (r.reciters || []).forEach(reciter => {
        (reciter.moshaf || []).forEach(m => {
          if (m.server) {
            reciters.push({
              name: reciter.name + " - " + m.name,
              server: m.server,
              surahList: m.surah_list || ""
            });
          }
        });
      });

      reciterSelect.innerHTML = "";

      reciters.forEach((r, i) => {
        const option = document.createElement("option");
        option.value = i;
        option.textContent = r.name;
        reciterSelect.appendChild(option);
      });

      reciterSelect.onchange = updateSurahs;
      updateSurahs();

      if ($("play")) $("play").onclick = playSurah;

      if ($("surahList")) {
        $("surahList").innerHTML = "";

        surahs.forEach(s => {
          const item = document.createElement("div");
          item.className = "item";
          item.textContent = s.id + " - " + s.name;

          item.onclick = () => {
            $("surah").value = s.id;
            playSurah();
          };

          $("surahList").appendChild(item);
        });
      }

      if (status) status.textContent = "تم تحميل القرآن والقراء.";

    } catch (error) {
      console.error(error);
      if (status) status.textContent = "تعذر التحميل، حاول مرة أخرى.";
    }
  }

  function updateSurahs() {
    const reciter = reciters[Number($("reciter").value)];
    const select = $("surah");

    if (!reciter || !select) return;

    const available = reciter.surahList
      ? reciter.surahList.split(",").map(Number)
      : surahs.map(s => s.id);

    select.innerHTML = "";

    surahs.filter(s => available.includes(s.id)).forEach(s => {
      const option = document.createElement("option");
      option.value = s.id;
      option.textContent = s.id + " - " + s.name;
      select.appendChild(option);
    });
  }

  function playSurah() {
    const reciter = reciters[Number($("reciter").value)];
    const id = Number($("surah").value);
    const player = $("player");

    if (!reciter || !id || !player) return;

    player.src = reciter.server + String(id).padStart(3, "0") + ".mp3";

    player.play().catch(() => {
      if ($("quranStatus")) {
        $("quranStatus").textContent = "اضغط تشغيل من مشغل الصوت.";
      }
    });
  }

  window.AlImanQuran = {
    init: initQuran,
    play: playSurah,
    getSurahs: () => surahs,
    getReciters: () => reciters
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initQuran);
  } else {
    initQuran();
  }
})();
