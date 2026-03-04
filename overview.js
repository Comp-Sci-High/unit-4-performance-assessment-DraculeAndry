let bunnyData;
let xp = localStorage.getItem("bunnyXP")
  ? parseInt(localStorage.getItem("bunnyXP"))
  : 0;

let level = Math.floor(xp / 100) + 1;

/* ========================= */
/* LOAD */
/* ========================= */

async function loadOverview() {
  try {
    await new Promise(r => setTimeout(r, 800));
    const response = await fetch("bunny-data.json");
    bunnyData = await response.json();
    initializeOverview();
  } catch (err) {
    console.error("Overview load failed:", err);
  }
}

/* ========================= */
/* INIT */
/* ========================= */

function initializeOverview() {
  document.getElementById("loader").style.display = "none";

  animateStat("levelStat", "Level " + level);
  animateStat("xpStat", "XP: " + xp);
  animateStat("powersStat", "Total Powers: " + bunnyData.powers.length);

  const unlocked = bunnyData.powers.filter(p => xp >= p.xp).length;
  animateStat("unlockedStat", "Unlocked: " + unlocked);

  buildTimeline();
}

/* ========================= */
/* ANIMATED STATS */
/* ========================= */

function animateStat(id, text) {
  const el = document.getElementById(id);
  el.style.opacity = 0;
  el.textContent = text;

  setTimeout(() => {
    el.style.transition = "opacity 0.6s ease";
    el.style.opacity = 1;
  }, 200);
}

/* ========================= */
/* TIMELINE */
/* ========================= */

function buildTimeline() {
  const timeline = document.getElementById("timeline");
  timeline.innerHTML = "";

  bunnyData.powers.forEach((power, index) => {
    const item = document.createElement("div");
    item.classList.add("timeline-item");

    const unlocked = xp >= power.xp;

    item.innerHTML = `
      <h3>${power.title}</h3>
      <p>${power.description}</p>
      <span>${unlocked ? "Unlocked ✨" : "Locked 🔒"}</span>
    `;

    if (unlocked) item.classList.add("unlocked");

    item.style.opacity = 0;
    timeline.appendChild(item);

    setTimeout(() => {
      item.style.transition = "all 0.6s ease";
      item.style.opacity = 1;
      item.style.transform = "translateY(0)";
    }, index * 200);
  });
}

loadOverview();