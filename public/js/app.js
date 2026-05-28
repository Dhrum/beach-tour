/* ============================================================
   Beach Tour — front-end interactions
   ============================================================ */

function escapeHtml(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

/* ---------- Crew ---------- */
const CREW = [
  { name: "Rahim",   title: "Chief Beach Officer",   quip: "Drew the master plan on a napkin. We follow the napkin.", style: "fun-emoji" },
  { name: "Palash",  title: "Sunset Whisperer",      quip: "Will make everyone stop walking for 'just one more photo'.", style: "bottts" },
  { name: "Rokan",   title: "Snack Commander",       quip: "Packs more chips than clothes. No regrets.", style: "big-smile" },
  { name: "Showkat", title: "Tide & Bus 20 Navigator", quip: "Knows the timetable better than the timetable.", style: "adventurer" },
  { name: "Yousuf",  title: "Hydration Hero",        quip: "Carries the cool bag like it's a national treasure.", style: "croodles" },
  { name: "Paul",    title: "Official Pier Inspector", quip: "Has personally approved all 394 m of the Sellin pier.", style: "thumbs" },
  { name: "Kabir",   title: "Vibe Curator & Beach DJ", quip: "Aux cord rights secured for the entire trip.", style: "micah" },
];

function crewAvatar(p) {
  return `https://api.dicebear.com/9.x/${p.style}/svg?seed=${encodeURIComponent(p.name)}&radius=12`;
}

function renderCrew() {
  const grid = document.getElementById("crewGrid");
  if (!grid) return;
  grid.innerHTML = CREW.map(p => `
    <article class="crew-card">
      <div class="crew-avatar"><img src="${crewAvatar(p)}" alt="${p.name}" loading="lazy"></div>
      <h3 class="crew-name">${p.name}</h3>
      <div class="crew-title">${p.title}</div>
      <p class="crew-quip">“${p.quip}”</p>
    </article>`).join("");
}

/* ---------- Connections / route corridors are static HTML ---------- */

/* ---------- Master route board ---------- */
const ROUTE = [
  { day: "Jun 3", phase: "Night Travel", time: "20:00 – 06:30", hub: "Frankfurt → Rügen",
    act: "Overnight regional journey to the base station (Bergen/Binz).", mode: "Regional trains · ~10.5 h", icon: "🚆", tone: "travel" },
  { day: "Jun 4", phase: "Early Morning", time: "07:00 – 09:15", hub: "Binz / Prora",
    act: "Drop luggage, grocery run for food and soft drinks.", mode: "Walk / Local bus · ~1 h", icon: "🛒", tone: "rest" },
  { day: "Jun 4", phase: "Morning Route", time: "09:30 – 13:30", hub: "Prora & Binz North",
    act: "<b>① Prora Beach</b> — quiet sand walking. <b>② Binzer Strand</b> — waist-deep wading.", mode: "RE9 / Bus 20 · &lt;10 min hops", icon: "🏖️", tone: "beach" },
  { day: "Jun 4", phase: "Midday Break", time: "13:30 – 15:30", hub: "Holiday Rental",
    act: "Cook lunch, rest, pack cold-beverage bags.", mode: "—", icon: "🏡", tone: "rest" },
  { day: "Jun 4", phase: "Afternoon / Eve", time: "15:45 – 21:00", hub: "Binz South & Centre",
    act: "<b>③ Südstrand Binz</b> · <b>④ Fischerstrand</b> · bonus Schmachter See sunset walk.", mode: "Walk · no transit", icon: "🌅", tone: "beach" },
  { day: "Jun 5", phase: "Morning Route", time: "08:30 – 13:00", hub: "Sellin & Baabe",
    act: "<b>⑤ Nordstrand Sellin</b> · <b>⑥ Südstrand Sellin</b> · <b>⑦ Baabe Beach</b>.", mode: "Bus 20 · ~15 min", icon: "🏖️", tone: "beach" },
  { day: "Jun 5", phase: "Midday Break", time: "13:00 – 15:00", hub: "Holiday Rental",
    act: "Home-cooked lunch, clear leftover provisions.", mode: "—", icon: "🏡", tone: "rest" },
  { day: "Jun 5", phase: "Afternoon / Eve", time: "15:15 – 20:30", hub: "Göhren Peninsula",
    act: "<b>⑧ Göhren Nordstrand</b> · <b>⑨ Südstrand Göhren</b> — wild sunset walk.", mode: "Bus 20 / local · ~25 min", icon: "🌅", tone: "beach" },
  { day: "Jun 5", phase: "Night", time: "21:00 →", hub: "Holiday Rental",
    act: "Final group dinner, pack for early departure.", mode: "Return ~25 min", icon: "🍽️", tone: "rest" },
  { day: "Jun 6", phase: "Return Travel", time: "06:30 – 17:00", hub: "Rügen → Frankfurt",
    act: "Daytime journey home via regional connections.", mode: "Regional trains · ~10.5 h", icon: "🚆", tone: "travel" },
];

function renderRoute() {
  const board = document.getElementById("route-board");
  if (!board) return;
  let html = "";
  let lastDay = null;
  ROUTE.forEach(r => {
    if (r.day !== lastDay) {
      html += `<div class="route-day"><span class="route-day-dot"></span>${r.day}</div>`;
      lastDay = r.day;
    }
    html += `
      <div class="route-row tone-${r.tone}">
        <div class="route-time">${r.time}</div>
        <div class="route-main">
          <div class="route-phase">${r.phase}</div>
          <div class="route-hub">${r.icon} ${r.hub}</div>
          <div class="route-act">${r.act}</div>
        </div>
        <div class="route-mode">${r.mode}</div>
      </div>`;
  });
  board.innerHTML = html;
}

/* ---------- Weather ---------- */
const WEATHER = [
  { day: "Jun 3", label: "Travel night", icon: "⛅", hi: 20, lo: 12, cond: "Partly cloudy",
    rain: "Low · dry", cloud: "Broken", wind: "16 km/h", feel: "Mild, breezy", tone: "ok" },
  { day: "Jun 4", label: "Binz & Prora", icon: "🌤️", hi: 24, lo: 11, cond: "Bright, warm",
    rain: "Low · slight PM risk", cloud: "Mostly clear", wind: "15 km/h", feel: "Warm in sun", tone: "good" },
  { day: "Jun 5", label: "Sellin → Göhren", icon: "⛈️", hi: 21, lo: 14, cond: "Showers & storms",
    rain: "High · 10–20 mm", cloud: "Overcast", wind: "18 km/h", feel: "Cooler, damp", tone: "bad" },
  { day: "Jun 6", label: "Return", icon: "⛅", hi: 20, lo: 13, cond: "Mixed sun & cloud",
    rain: "Moderate", cloud: "Variable", wind: "16 km/h", feel: "Fresh", tone: "ok" },
];

function renderWeather() {
  const grid = document.getElementById("weatherGrid");
  if (!grid) return;
  grid.innerHTML = WEATHER.map(w => `
    <article class="weather-card tone-${w.tone}">
      <div class="weather-top">
        <div><div class="weather-day">${w.day}</div><div class="weather-label">${w.label}</div></div>
        <div class="weather-icon">${w.icon}</div>
      </div>
      <div class="weather-temp"><span class="hi">${w.hi}°</span><span class="lo">/ ${w.lo}°C</span></div>
      <div class="weather-cond">${w.cond}</div>
      <ul class="weather-metrics">
        <li><span>🌧️ Rain</span><b>${w.rain}</b></li>
        <li><span>☁️ Cloud</span><b>${w.cloud}</b></li>
        <li><span>💨 Wind</span><b>${w.wind}</b></li>
        <li><span>🌡️ Feels</span><b>${w.feel}</b></li>
      </ul>
    </article>`).join("");
}

/* ---------- Beaches ---------- */
// Real photos of each place, sourced from Wikimedia Commons (upload.wikimedia.org).
const WC = "https://upload.wikimedia.org/wikipedia/commons/thumb/";
const BEACHES = [
  { n: 1, name: "Prora Beach", loc: "Prora · RE9 / Bus 20", vibe: "quiet",
    imgs: [
      WC + "2/28/Weg_zum_Strand_bei_Prora_20181029_001.jpg/960px-Weg_zum_Strand_bei_Prora_20181029_001.jpg",
      WC + "0/0a/Gebiet_bei_KdF-Seebad_R%C3%BCgen_20181029_008.jpg/960px-Gebiet_bei_KdF-Seebad_R%C3%BCgen_20181029_008.jpg",
      WC + "2/25/Gebiet_bei_KdF-Seebad_R%C3%BCgen_20181029_013.jpg/960px-Gebiet_bei_KdF-Seebad_R%C3%BCgen_20181029_013.jpg",
      WC + "4/48/Gebiet_bei_KdF-Seebad_R%C3%BCgen_20181029_027.jpg/960px-Gebiet_bei_KdF-Seebad_R%C3%BCgen_20181029_027.jpg",
    ],
    desc: "Expansive, wide sand running alongside historic pine groves. Remarkably uncrowded in the morning — ideal for long group walks right by the water line." },
  { n: 2, name: "Binzer Strand", loc: "Central Binz · short walk", vibe: "lively",
    imgs: [
      WC + "9/91/Ostseebad_Binz_Auf_R%C3%BCgen_%28120686231%29.jpeg/960px-Ostseebad_Binz_Auf_R%C3%BCgen_%28120686231%29.jpeg",
      WC + "f/f9/Strand_an_der_Ostsee_in_Binz_Eveline_Kladov_04.jpg/960px-Strand_an_der_Ostsee_in_Binz_Eveline_Kladov_04.jpg",
      WC + "7/73/Binz_Strand_09.jpg/960px-Binz_Strand_09.jpg",
      WC + "f/f5/R%C3%BCgen%2C_Binz_-_Strandhaus_-_Flickr_-_tempoworld.net.jpg/960px-R%C3%BCgen%2C_Binz_-_Strandhaus_-_Flickr_-_tempoworld.net.jpg",
    ],
    desc: "The primary 5 km white-sand resort beach. An exceptionally flat sea floor slopes gently into the Baltic — perfect for waist-deep wading without crashing waves." },
  { n: 3, name: "Südstrand Binz", loc: "Southern Binz · promenade", vibe: "quiet",
    imgs: [
      WC + "f/f9/Strand_an_der_Ostsee_in_Binz_Eveline_Kladov_04.jpg/960px-Strand_an_der_Ostsee_in_Binz_Eveline_Kladov_04.jpg",
      WC + "f/f5/R%C3%BCgen%2C_Binz_-_Strandhaus_-_Flickr_-_tempoworld.net.jpg/960px-R%C3%BCgen%2C_Binz_-_Strandhaus_-_Flickr_-_tempoworld.net.jpg",
      WC + "7/73/Binz_Strand_09.jpg/960px-Binz_Strand_09.jpg",
    ],
    desc: "A calm transition zone heading away from the busy village centre. Relaxed, fewer crowds, and plenty of room to spread large picnic blankets on the sand. (Photos: the Binz beachfront it adjoins.)" },
  { n: 4, name: "Fischerstrand", loc: "Mid Binz · promenade", vibe: "scenic",
    imgs: [
      WC + "7/73/Binz_Strand_09.jpg/960px-Binz_Strand_09.jpg",
      WC + "9/91/Ostseebad_Binz_Auf_R%C3%BCgen_%28120686231%29.jpeg/960px-Ostseebad_Binz_Auf_R%C3%BCgen_%28120686231%29.jpeg",
      WC + "f/f5/R%C3%BCgen%2C_Binz_-_Strandhaus_-_Flickr_-_tempoworld.net.jpg/960px-R%C3%BCgen%2C_Binz_-_Strandhaus_-_Flickr_-_tempoworld.net.jpg",
    ],
    desc: "A small, historically rich stretch where local fishing boats still operate. A rustic maritime atmosphere with a clean shoreline to rest near the vessels. (Photos: the Binz beach it sits on.)" },
  { n: 5, name: "Nordstrand Sellin", loc: "Sellin · Bus 20", vibe: "scenic",
    imgs: [
      WC + "d/dd/Seebr%C3%BCcke_Sellin%2C_150620%2C_ako.jpg/960px-Seebr%C3%BCcke_Sellin%2C_150620%2C_ako.jpg",
      WC + "f/f2/Seebr%C3%BCcke_Sellin_September_2012.JPG/960px-Seebr%C3%BCcke_Sellin_September_2012.JPG",
      WC + "7/7a/Seebr%C3%BCcke_Sellin_abends.jpg/960px-Seebr%C3%BCcke_Sellin_abends.jpg",
      WC + "1/15/Sellin_pier-1.jpg/960px-Sellin_pier-1.jpg",
    ],
    desc: "Home to the famous 394 m wooden pier and its over-water pavilion. High cliffs frame the background, giving a dramatic spot to sit on the stone sea wall." },
  { n: 6, name: "Südstrand Sellin", loc: "South Sellin · cliff walk", vibe: "quiet",
    imgs: [
      WC + "5/5a/2015_Sellin_Strand_01.jpg/960px-2015_Sellin_Strand_01.jpg",
      WC + "9/92/2015_Sellin_Strand_02.jpg/960px-2015_Sellin_Strand_02.jpg",
      WC + "2/2a/2018_Sellin_S%C3%BCdstrand_02.jpg/960px-2018_Sellin_S%C3%BCdstrand_02.jpg",
      WC + "0/0a/R%C3%BCgen%2C_Beach_at_Sellin_--_2009_--_1173.jpg/960px-R%C3%BCgen%2C_Beach_at_Sellin_--_2009_--_1173.jpg",
    ],
    desc: "A sheltered, sunny bay tucked south of the main pier cliffs. Extremely calm water with a gradual incline — very comfortable for half-body wading." },
  { n: 7, name: "Baabe Beach", loc: "Baabe · Bus 20 / walk", vibe: "lively",
    imgs: [
      WC + "7/71/Strand_baabe_ruegen.JPG/960px-Strand_baabe_ruegen.JPG",
      WC + "8/84/Strand_bei_Baabe_20180522_33.jpg/960px-Strand_bei_Baabe_20180522_33.jpg",
      WC + "d/d0/Baabe_%28R%C3%BCgen%29_-_Regentag_an_der_Ostsee_%2811485917965%29.jpg/960px-Baabe_%28R%C3%BCgen%29_-_Regentag_an_der_Ostsee_%2811485917965%29.jpg",
      WC + "a/a7/Baabe%2C_Sellin_%282011-05-21%29_3.JPG/960px-Baabe%2C_Sellin_%282011-05-21%29_3.JPG",
    ],
    desc: "A flawless, exceptionally wide white-sand beach known for clean, regulated shallows. A perfect mid-day resting spot directly on the fine sand." },
  { n: 8, name: "Göhren Nordstrand", loc: "Göhren · Bus 20 terminus", vibe: "lively",
    imgs: [
      WC + "9/9c/Nordstrand_G%C3%B6hren_R%C3%BCgen.JPG/960px-Nordstrand_G%C3%B6hren_R%C3%BCgen.JPG",
      WC + "5/58/G%C3%B6hren_Aufgang_vom_Nordstrand.jpg/960px-G%C3%B6hren_Aufgang_vom_Nordstrand.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/9/93/Goehren_wiki.jpg",
      WC + "5/56/Seebr%C3%BCcke_in_G%C3%B6hren_%28R%C3%BCgen%29_%281%29_%2812085414096%29.jpg/960px-Seebr%C3%BCcke_in_G%C3%B6hren_%28R%C3%BCgen%29_%281%29_%2812085414096%29.jpg",
    ],
    desc: "A lively destination with a busy promenade, manicured lawns and its own short pier. Crystal-clear water that stays shallow far from the shoreline." },
  { n: 9, name: "Südstrand Göhren", loc: "South Göhren · town ridge", vibe: "scenic",
    imgs: [
      WC + "4/42/Blick_auf_S%C3%BCdstrand_G%C3%B6hren_R%C3%BCgen.JPG/960px-Blick_auf_S%C3%BCdstrand_G%C3%B6hren_R%C3%BCgen.JPG",
      WC + "3/39/Blick_S%C3%BCdstrand_und_Thiesow_G%C3%B6hren_R%C3%BCgen.JPG/960px-Blick_S%C3%BCdstrand_und_Thiesow_G%C3%B6hren_R%C3%BCgen.JPG",
      WC + "8/87/Sellin%2C_Blick_vom_S%C3%BCdstrand_nach_G%C3%B6hren.jpg/960px-Sellin%2C_Blick_vom_S%C3%BCdstrand_nach_G%C3%B6hren.jpg",
    ],
    desc: "A completely natural, wild landscape mixing fine sand and smooth coastal stones. An isolated, rugged view of the sea away from any holiday crowds." },
];
const VIBE_LABEL = { lively: "Lively", quiet: "Quiet", scenic: "Scenic" };

function renderBeaches() {
  const grid = document.getElementById("beachGrid");
  if (!grid) return;
  grid.innerHTML = BEACHES.map(b => `
    <article class="beach-card" data-vibe="${b.vibe}">
      <div class="beach-media">
        <div class="carousel" data-idx="0">
          <div class="car-track">
            ${b.imgs.map((src, i) => `<img class="car-slide" src="${src}" alt="${b.name} — photo ${i + 1}" loading="lazy" referrerpolicy="no-referrer">`).join("")}
          </div>
          ${b.imgs.length > 1 ? `
            <button class="car-btn car-prev" aria-label="Previous photo">‹</button>
            <button class="car-btn car-next" aria-label="Next photo">›</button>
            <div class="car-count"><span class="car-cur">1</span>/${b.imgs.length}</div>
            <div class="car-dots">${b.imgs.map((_, i) => `<button class="car-dot${i === 0 ? " is-active" : ""}" data-go="${i}" aria-label="Photo ${i + 1}"></button>`).join("")}</div>
          ` : ""}
        </div>
        <span class="beach-num">${b.n}</span>
        <span class="beach-vibe">${VIBE_LABEL[b.vibe]}</span>
      </div>
      <div class="beach-body">
        <h3 class="beach-name">${b.name}</h3>
        <div class="beach-loc">${b.loc}</div>
        <p class="beach-desc">${b.desc}</p>
      </div>
    </article>`).join("");
  initCarousels(grid);
}

function initCarousels(scope) {
  scope.querySelectorAll(".carousel").forEach(car => {
    const track = car.querySelector(".car-track");
    const slides = car.querySelectorAll(".car-slide");
    if (slides.length < 2) return;
    const dots = car.querySelectorAll(".car-dot");
    const curEl = car.querySelector(".car-cur");

    const go = (i) => {
      const idx = (i + slides.length) % slides.length;
      car.dataset.idx = idx;
      track.style.transform = `translateX(-${idx * 100}%)`;
      dots.forEach((d, di) => d.classList.toggle("is-active", di === idx));
      if (curEl) curEl.textContent = idx + 1;
    };
    car.querySelector(".car-next").addEventListener("click", () => go(Number(car.dataset.idx) + 1));
    car.querySelector(".car-prev").addEventListener("click", () => go(Number(car.dataset.idx) - 1));
    dots.forEach(d => d.addEventListener("click", () => go(Number(d.dataset.go))));
  });
}
function initBeachFilter() {
  const bar = document.getElementById("beachFilter");
  if (!bar) return;
  bar.addEventListener("click", (e) => {
    const chip = e.target.closest(".filter-chip");
    if (!chip) return;
    bar.querySelectorAll(".filter-chip").forEach(c => c.classList.remove("is-active"));
    chip.classList.add("is-active");
    const f = chip.dataset.filter;
    document.querySelectorAll(".beach-card").forEach(card => {
      card.classList.toggle("is-hidden", f !== "all" && card.dataset.vibe !== f);
    });
  });
}

/* ---------- Day tabs ---------- */
function initDayTabs() {
  const tabs = document.getElementById("dayTabs");
  if (!tabs) return;
  tabs.addEventListener("click", (e) => {
    const tab = e.target.closest(".day-tab");
    if (!tab) return;
    const day = tab.dataset.day;
    tabs.querySelectorAll(".day-tab").forEach(t => t.classList.toggle("is-active", t === tab));
    document.querySelectorAll(".day-panel").forEach(p => p.classList.toggle("is-active", p.dataset.day === day));
  });
}

/* ---------- Nav ---------- */
function initNav() {
  const nav = document.getElementById("nav");
  const burger = document.getElementById("burger");
  const links = document.querySelector(".nav-links");
  window.addEventListener("scroll", () => nav.classList.toggle("scrolled", window.scrollY > 30), { passive: true });
  burger?.addEventListener("click", () => links.classList.toggle("open"));
  links?.addEventListener("click", (e) => { if (e.target.tagName === "A") links.classList.remove("open"); });
}

/* ---------- Scroll reveal ---------- */
function initReveal() {
  const els = document.querySelectorAll(".section-head, .stat-grid, .highlight-grid, .crew-grid, .day-tabs, .day-panels, .conn-grid, .conn-note, .legend, .route, .map-frame, .filter-bar, .beach-grid, .weather-grid, .weather-note, .planner-grid, .comments");
  els.forEach(el => el.classList.add("reveal"));
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } });
  }, { threshold: 0.06 });
  els.forEach(el => io.observe(el));
}

/* ---------- Cost breakdown ---------- */
const COSTS = [
  { icon: "🏡", label: "Accommodation", detail: "2 nights · Jun 4 & 5", pp: 60 },
  { icon: "🛒", label: "Groceries & cooking", detail: "home-cooked meals", pp: 20 },
  { icon: "🥤", label: "Drinks, snacks & food", detail: "beach provisions", pp: 10 },
  { icon: "✨", label: "Extra costs", detail: "buffer / misc", pp: 10 },
  { icon: "🎟️", label: "Rail & local transit", detail: "Deutschland-Ticket", pp: 0 },
];
function initCost() {
  const table = document.getElementById("costTable");
  if (!table) return;
  let group = 6;
  const ppEl = document.getElementById("costPP");
  const grpEl = document.getElementById("costGroup");
  const grpCount = document.getElementById("grpCount");
  const grpEcho = document.getElementById("grpEcho");
  const perPerson = COSTS.reduce((s, c) => s + c.pp, 0);

  function render() {
    table.innerHTML = `
      <thead><tr><th>Item</th><th>Per person</th><th>× ${group}</th></tr></thead>
      <tbody>
        ${COSTS.map(c => `
          <tr>
            <td><span class="cost-ic">${c.icon}</span><div><b>${c.label}</b><span class="cost-detail">${c.detail}</span></div></td>
            <td class="num">${c.pp === 0 ? "€0" : "€" + c.pp}</td>
            <td class="num">${c.pp === 0 ? "€0" : "€" + c.pp * group}</td>
          </tr>`).join("")}
      </tbody>`;
    ppEl.textContent = `€${perPerson}`;
    grpEl.textContent = `€${perPerson * group}`;
    grpCount.textContent = group;
    grpEcho.textContent = group;
  }
  document.getElementById("grpMinus").addEventListener("click", () => { group = Math.max(1, group - 1); render(); });
  document.getElementById("grpPlus").addEventListener("click", () => { group = Math.min(20, group + 1); render(); });
  render();
}

/* ---------- Packing checklist ---------- */
const PACK_KEY = "beachTour.pack.v2";
const DEFAULT_PACK = [
  // Beach essentials
  "Swimwear (×2 to rotate)", "Quick-dry beach towel", "Water shoes (stony beaches)",
  "Flip-flops / sandals", "High-SPF sunscreen", "After-sun / aloe gel",
  "Sunglasses", "Sun hat or cap", "Reusable water bottle", "Cool bag for drinks",
  "Picnic blanket", "Dry bag for phone & valuables",
  // Clothing
  "Packable rain jacket", "Warm layer / hoodie (sea breeze)", "Comfortable walking shoes",
  "Light long trousers", "Spare socks & underwear", "Sleepwear",
  // Travel & docs
  "Deutschland-Ticket / DB ticket", "ID / passport", "Cash + bank card",
  "Accommodation address & keys info", "Headphones for the train", "Travel pillow & eye mask",
  // Tech
  "Phone + charger", "Power bank", "Universal cable / adapter",
  // Toiletries & health
  "Toothbrush & toiletries", "Wet wipes & hand sanitiser", "Personal medication",
  "Basic first-aid (plasters, painkillers)", "Insect repellent",
  // Food & group gear
  "Reusable shopping bags", "Snacks for the journey", "Bottle opener / pocket knife",
  "Rubbish bags (leave no trace)", "Portable speaker (Kabir!)",
];
function loadPack() {
  try { const s = JSON.parse(localStorage.getItem(PACK_KEY)); if (Array.isArray(s)) return s; } catch {}
  return DEFAULT_PACK.map(label => ({ label, done: false }));
}
function savePack(items) { localStorage.setItem(PACK_KEY, JSON.stringify(items)); }
function initPlanner() {
  const list = document.getElementById("packList");
  if (!list) return;
  let items = loadPack();
  const bar = document.getElementById("packBar");
  const progress = document.getElementById("packProgress");

  function render() {
    list.innerHTML = items.map((it, i) => `
      <li class="${it.done ? "done" : ""}">
        <input type="checkbox" id="pk${i}" ${it.done ? "checked" : ""} data-i="${i}">
        <label for="pk${i}">${escapeHtml(it.label)}</label>
        <button class="del" data-del="${i}" aria-label="Remove">✕</button>
      </li>`).join("");
    const done = items.filter(i => i.done).length;
    progress.textContent = `${done} / ${items.length}`;
    bar.style.width = items.length ? `${(done / items.length) * 100}%` : "0%";
    savePack(items);
  }
  list.addEventListener("change", (e) => {
    const cb = e.target.closest("input[type=checkbox]"); if (!cb) return;
    items[cb.dataset.i].done = cb.checked; render();
  });
  list.addEventListener("click", (e) => {
    const del = e.target.closest("[data-del]"); if (!del) return;
    items.splice(Number(del.dataset.del), 1); render();
  });
  document.getElementById("addPackForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const input = document.getElementById("addPackInput");
    const val = input.value.trim(); if (!val) return;
    items.push({ label: val, done: false }); input.value = ""; render();
  });
  document.getElementById("packReset").addEventListener("click", () => {
    items = DEFAULT_PACK.map(label => ({ label, done: false })); render();
  });
  render();
}

/* ---------- Comments ---------- */
const AVATAR_COLORS = ["#16a085", "#0f3d5c", "#15728a", "#e67e22", "#8e44ad", "#c0392b", "#2980b9"];
function avatarColor(name) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h);
  return AVATAR_COLORS[Math.abs(h) % AVATAR_COLORS.length];
}
function formatDate(iso) {
  return new Date(iso).toLocaleString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
}
const SECTION_TITLES = {
  overview: "Notes on the overview",
  crew: "Crew banter & roll call",
  itinerary: "Discuss the itinerary",
  connections: "Train & connection notes",
  "route-table": "Logistics & route notes",
  map: "Map & meet-up notes",
  beaches: "Beach picks & tips",
  weather: "Weather watch",
  planner: "Costs & packing chat",
};
function renderComments(listEl, countEl, comments) {
  countEl.textContent = `${comments.length} ${comments.length === 1 ? "comment" : "comments"}`;
  if (!comments.length) {
    listEl.innerHTML = `<li class="comment-empty">No comments yet — be the first to add a note.</li>`;
    return;
  }
  listEl.innerHTML = comments.map(c => {
    const initial = (c.name || "?").trim().charAt(0).toUpperCase();
    return `
      <li class="comment-item">
        <div class="c-avatar" style="background:${avatarColor(c.name)}">${escapeHtml(initial)}</div>
        <div class="c-main">
          <div class="c-meta"><span class="c-author">${c.name}</span><span class="c-date">${formatDate(c.createdAt)}</span></div>
          <div class="c-body">${c.comment}</div>
        </div>
      </li>`;
  }).join("");
}
async function initCommentWidget(host) {
  const section = host.dataset.comments;
  const tpl = document.getElementById("commentTemplate");
  host.appendChild(tpl.content.cloneNode(true));

  const widget = host.querySelector(".comments");
  widget.querySelector(".c-title").textContent = SECTION_TITLES[section] || "Notes for the crew";
  const form = widget.querySelector(".comment-form");
  const nameEl = widget.querySelector(".c-name");
  const textEl = widget.querySelector(".c-text");
  const errEl = widget.querySelector(".c-error");
  const listEl = widget.querySelector(".comment-list");
  const countEl = widget.querySelector(".comments-count");
  const submitBtn = widget.querySelector("button[type=submit]");

  const savedName = localStorage.getItem("beachTour.name");
  if (savedName) nameEl.value = savedName;

  async function load() {
    try {
      const res = await fetch(`/api/comments/${section}`);
      renderComments(listEl, countEl, await res.json());
    } catch {
      listEl.innerHTML = `<li class="comment-empty">Couldn't load comments.</li>`;
    }
  }
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    errEl.textContent = "";
    const name = nameEl.value.trim();
    const comment = textEl.value.trim();
    if (!name) { errEl.textContent = "Please add your name."; return; }
    if (!comment) { errEl.textContent = "Please write a comment."; return; }
    submitBtn.disabled = true; submitBtn.textContent = "Posting…";
    try {
      const res = await fetch(`/api/comments/${section}`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, comment }),
      });
      if (!res.ok) { const err = await res.json().catch(() => ({})); throw new Error(err.error || "Could not post."); }
      localStorage.setItem("beachTour.name", name);
      textEl.value = "";
      await load();
    } catch (err) { errEl.textContent = err.message; }
    finally { submitBtn.disabled = false; submitBtn.textContent = "Post comment"; }
  });
  load();
}

/* ---------- Boot ---------- */
document.addEventListener("DOMContentLoaded", () => {
  renderCrew();
  renderRoute();
  renderWeather();
  renderBeaches();
  initBeachFilter();
  initDayTabs();
  initNav();
  initCost();
  initPlanner();
  document.querySelectorAll("[data-comments]").forEach(initCommentWidget);
  initReveal();
});
