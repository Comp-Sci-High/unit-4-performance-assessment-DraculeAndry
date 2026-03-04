let bunnyData;
let xp = localStorage.getItem("bunnyXP")
  ? parseInt(localStorage.getItem("bunnyXP"))
  : 0;

let level = Math.floor(xp / 100) + 1;

/* ========================= */
/* LOAD DATA */
/* ========================= */

async function loadData() {
  try {
    await new Promise(r => setTimeout(r, 1000));
    const response = await fetch("bunny-data.json");
    bunnyData = await response.json();
    initializeSite();
  } catch (err) {
    console.error("Failed to load bunny data:", err);
  }
}

/* ========================= */
/* INITIALIZE */
/* ========================= */

function initializeSite() {
  document.getElementById("loader").style.display = "none";

  applyTheme();
  renderHero();
  renderCards();
  renderCarousel();
  updateXPUI(true);
}

/* ========================= */
/* THEME */
/* ========================= */

function applyTheme() {
  document.body.style.background = bunnyData.theme.background;
}

/* ========================= */
/* HERO */
/* ========================= */

function renderHero() {
  document.querySelector(".title").textContent = bunnyData.hero.title;
  document.querySelector(".subtitle").textContent = bunnyData.hero.subtitle;

  const button = document.querySelector(".enter-btn");
  button.textContent = bunnyData.hero.buttonText;

  button.addEventListener("click", () => {
    addXP(10); // reward for entering
    cinematicTransition();
  });
}

/* ========================= */
/* CARDS */
/* ========================= */

function renderCards() {
  const container = document.querySelector(".cards");
  container.innerHTML = "";

  bunnyData.powers.forEach(power => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${power.image}">
      <h3>${power.title}</h3>
      <p>${power.description}</p>
      <button class="gain-xp">Gain ${power.xp} XP</button>
    `;

    card.querySelector(".gain-xp").addEventListener("click", () => {
      addXP(power.xp);
    });

    container.appendChild(card);
  });
}

/* ========================= */
/* CAROUSEL */
/* ========================= */

function renderCarousel() {
  const track = document.querySelector(".carousel-track");
  track.innerHTML = "";

  bunnyData.carousel.forEach(img => {
    const image = document.createElement("img");
    image.src = img;
    track.appendChild(image);
  });
}

/* ========================= */
/* XP SYSTEM */
/* ========================= */

function addXP(amount) {
  xp += amount;
  localStorage.setItem("bunnyXP", xp);
  level = Math.floor(xp / 100) + 1;
  updateXPUI(false);
}

function updateXPUI(initial) {
  const xpFill = document.querySelector(".xp-fill");
  const levelDisplay = document.querySelector(".level-display");

  let progress = xp % 100;

  if (initial) {
    xpFill.style.width = progress + "%";
  } else {
    xpFill.style.transition = "width 0.6s ease";
    xpFill.style.width = progress + "%";
  }

  levelDisplay.textContent = getRankTitle(level) + 
    " — Level " + level + " — XP: " + xp;
}

/* ========================= */
/* RANK TITLES */
/* ========================= */

function getRankTitle(level) {
  if (level >= 15) return "🌌 Divine Bunny";
  if (level >= 10) return "✨ Mythic Bunny";
  if (level >= 5) return "🌙 Celestial Bunny";
  return "🐰 Meadow Bunny";
}

/* ========================= */
/* CINEMATIC TRANSITION */
/* ========================= */

function cinematicTransition() {
  document.body.style.transition = "opacity 0.6s ease";
  document.body.style.opacity = "0";

  setTimeout(() => {
    window.location.href = "overview.html";
  }, 600);
}

loadData();