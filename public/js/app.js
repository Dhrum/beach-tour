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
  { name: "Showkat", title: "Tide & Bus 40 Navigator", quip: "Knows the timetable better than the timetable.", style: "adventurer" },
  { name: "Yousuf",  title: "Hydration Hero",        quip: "Carries the cool bag like it's a national treasure.", style: "croodles" },
  { name: "Hasan",   title: "Chief Vibes Photographer", quip: "Took 400 photos of the same wave. All keepers, apparently.", style: "lorelei" },
  { name: "Paul",    title: "Official Pier Inspector", quip: "Has personally approved every pier from Scharbeutz to Haffkrug.", style: "thumbs" },
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
  { day: "Jun 3", phase: "Night Travel", time: "20:20 →", hub: "Frankfurt → Lübeck",
    act: "Overnight regional journey via Kassel–Göttingen–Hannover–Hamburg.", mode: "Regional trains · ~14h", icon: "🚆", tone: "travel" },
  { day: "Jun 4", phase: "Arrival", time: "10:52 – 12:30", hub: "Lübeck → Base",
    act: "Local train to Travemünde / Timmendorfer Strand, drop bags, grocery run.", mode: "Local train / Walk", icon: "🛒", tone: "rest" },
  { day: "Jun 4", phase: "Early Afternoon", time: "12:45 – 16:00", hub: "Travemünde & Priwall",
    act: "<b>① Travemünde Kurstrand</b> — ship-watching. <b>② Priwall Beach</b> via 2-min ferry.", mode: "⛴️ Priwall ferry", icon: "🏖️", tone: "beach" },
  { day: "Jun 4", phase: "Midday Break", time: "16:00 – 17:30", hub: "Holiday Rental",
    act: "Cook a hot lunch, rest, pack cold bags.", mode: "—", icon: "🏡", tone: "rest" },
  { day: "Jun 4", phase: "Evening", time: "17:30 – 21:00", hub: "Brodten & Niendorf",
    act: "<b>③ Brodten Cliff Beach</b> · <b>④ Niendorf Beach</b> — harbour-side twilight.", mode: "Coastal trail walk", icon: "🌅", tone: "beach" },
  { day: "Jun 5", phase: "Morning Route", time: "08:30 – 13:00", hub: "Timmendorf & Scharbeutz",
    act: "<b>⑤ Timmendorfer Strand</b> — 7 km of flat shallows. <b>⑥ Scharbeutz</b> pier walk.", mode: "Bus 40 · ~10 min", icon: "🏖️", tone: "beach" },
  { day: "Jun 5", phase: "Midday Break", time: "13:00 – 15:00", hub: "Holiday Rental",
    act: "Home-cooked lunch and a short rest.", mode: "—", icon: "🏡", tone: "rest" },
  { day: "Jun 5", phase: "Afternoon / Eve", time: "15:15 – 20:30", hub: "Haffkrug & Sierksdorf",
    act: "<b>⑦ Haffkrug Beach</b> · <b>⑧ Sierksdorf Natural Beach</b> — wild sunset walk.", mode: "Local train / Bus · ~15 min", icon: "🌅", tone: "beach" },
  { day: "Jun 5", phase: "Night", time: "21:00 →", hub: "Holiday Rental",
    act: "Final group dinner, pack for departure.", mode: "Return ~15 min", icon: "🍽️", tone: "rest" },
  { day: "Jun 6", phase: "Return Travel", time: "Daytime", hub: "Lübeck → Frankfurt",
    act: "Daytime journey home via regional connections.", mode: "Regional trains", icon: "🚆", tone: "travel" },
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
  { day: "Jun 3", label: "Travel night", icon: "🌦️", hi: 20, lo: 14, cond: "Cloudy, odd shower",
    rain: "Low–mod · 0–5 mm", cloud: "Mostly cloudy", wind: "22 km/h", feel: "Mild, breezy", tone: "ok" },
  { day: "Jun 4", label: "Travemünde & Priwall", icon: "🌤️", hi: 23, lo: 12, cond: "Dry, mild",
    rain: "None expected", cloud: "Mostly cloudy", wind: "12 km/h", feel: "Pleasant", tone: "good" },
  { day: "Jun 5", label: "Timmendorf → Sierksdorf", icon: "🌧️", hi: 22, lo: 13, cond: "Overcast, occasional rain",
    rain: "Mod · 5–10 mm", cloud: "Overcast", wind: "8 km/h", feel: "Damp, calm", tone: "bad" },
  { day: "Jun 6", label: "Return", icon: "⛅", hi: 25, lo: 15, cond: "Warm, mostly cloudy",
    rain: "Low · 2–5 mm", cloud: "Variable", wind: "7 km/h", feel: "Warm", tone: "ok" },
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
  { n: 1, name: "Travemünde Kurstrand", loc: "Travemünde · local train", vibe: "lively",
    imgs: [
      WC + "0/01/Travem%C3%BCnde-strand-ostsee-mecklenburg-vorpommern.JPG/960px-Travem%C3%BCnde-strand-ostsee-mecklenburg-vorpommern.JPG",
      WC + "7/7a/Travem%C3%BCnde-strandk%C3%B6rbe-strand-ostsee-himmel.JPG/960px-Travem%C3%BCnde-strandk%C3%B6rbe-strand-ostsee-himmel.JPG",
      WC + "6/65/Travem%C3%BCnde-strandpromenade-strand-ostsee.JPG/960px-Travem%C3%BCnde-strandpromenade-strand-ostsee.JPG",
      WC + "b/b9/L%C3%BCbeck_-_Travem%C3%BCnde%2C_Germany_%28explored%29_-_Flickr_-_Thomas_Depenbusch_%28Depi%29.jpg/960px-L%C3%BCbeck_-_Travem%C3%BCnde%2C_Germany_%28explored%29_-_Flickr_-_Thomas_Depenbusch_%28Depi%29.jpg",
    ],
    desc: "An exceptionally wide white-sand resort beach at the mouth of the Trave. Spread your mats and watch giant international cruise ships and ferries glide past on the horizon." },
  { n: 2, name: "Priwall Beach", loc: "Priwall · 2-min ferry", vibe: "quiet",
    imgs: [
      WC + "3/36/Strand_am_Priwall_-_Travem%C3%BCnde_-_panoramio.jpg/960px-Strand_am_Priwall_-_Travem%C3%BCnde_-_panoramio.jpg",
      WC + "6/66/Travem%C3%BCnde_beach_2024_2.jpg/960px-Travem%C3%BCnde_beach_2024_2.jpg",
      WC + "b/b4/Travem%C3%BCnde_beach_2024_1.jpg/960px-Travem%C3%BCnde_beach_2024_1.jpg",
      WC + "4/46/Travem%C3%BCnde_beach_2024_3.jpg/960px-Travem%C3%BCnde_beach_2024_3.jpg",
    ],
    desc: "Reached by a tiny 2-minute passenger ferry across the river mouth — a fully natural sand beach framed by quiet dunes and a protected coastal nature reserve." },
  { n: 3, name: "Brodten Cliff Beach", loc: "Brodtener Ufer · coastal trail", vibe: "scenic",
    imgs: [
      WC + "e/e0/Brodtener_Ufer_Sept_2014b.jpg/960px-Brodtener_Ufer_Sept_2014b.jpg",
      WC + "5/50/BrodtenerUfer-02.jpg/960px-BrodtenerUfer-02.jpg",
      WC + "1/11/Steilk%C3%BCste_am_Brodtener_Ufer.jpg/960px-Steilk%C3%BCste_am_Brodtener_Ufer.jpg",
      WC + "3/34/Niendorf_Brodtener_Ufer_2018-05-12.jpg/960px-Niendorf_Brodtener_Ufer_2018-05-12.jpg",
    ],
    desc: "A rugged, wild sea beach running directly beneath steep, dramatic bluffs (the Brodtener Ufer). The clifftop trail offers some of the finest views on the whole bay." },
  { n: 4, name: "Niendorf Beach", loc: "Niendorf · coastal walk", vibe: "quiet",
    imgs: [
      WC + "8/8d/Niendorf-Ostsee%2C_23669_Timmendorfer_Strand%2C_Germany_-_panoramio.jpg/960px-Niendorf-Ostsee%2C_23669_Timmendorfer_Strand%2C_Germany_-_panoramio.jpg",
      WC + "3/3b/Niendorf-Ostsee%2C_23669_Timmendorfer_Strand%2C_Germany_-_panoramio_-_mroszewski.jpg/960px-Niendorf-Ostsee%2C_23669_Timmendorfer_Strand%2C_Germany_-_panoramio_-_mroszewski.jpg",
      WC + "2/27/Niendorf-Ostsee%2C_23669_Timmendorfer_Strand%2C_Germany_-_panoramio_-_mroszewski_%282%29.jpg/960px-Niendorf-Ostsee%2C_23669_Timmendorfer_Strand%2C_Germany_-_panoramio_-_mroszewski_%282%29.jpg",
      WC + "d/de/Blick_auf_Niendorf%2C_Ostsee_TOM1463.jpg/960px-Blick_auf_Niendorf%2C_Ostsee_TOM1463.jpg",
    ],
    desc: "A cozy, calm sand strip right next to a tiny fishing port full of wooden cutter boats. Sit on the seawall here at twilight and let the day wind down." },
  { n: 5, name: "Timmendorfer Strand", loc: "Timmendorf · Bus 40", vibe: "lively",
    imgs: [
      WC + "e/e3/Timmendorfer_Strand_2010_PD_023.JPG/960px-Timmendorfer_Strand_2010_PD_023.JPG",
      WC + "4/46/Timmendorfer-strand-niendorf-promenade.jpg/960px-Timmendorfer-strand-niendorf-promenade.jpg",
    ],
    desc: "The absolute crown jewel — around 7 km of powdery white sand with incredibly flat shallows where you can wade out until the water hits your waist." },
  { n: 6, name: "Scharbeutz Beach", loc: "Scharbeutz · walk / Bus 40", vibe: "lively",
    imgs: [
      WC + "7/7f/Scharbeutz%2C_Strand%2C_Blick_zur_Seebr%C3%BCcke.JPG/960px-Scharbeutz%2C_Strand%2C_Blick_zur_Seebr%C3%BCcke.JPG",
      WC + "9/94/RK_1805_P1600408_Scharbeutz%2C_Strand_mit_Seebr%C3%BCcke.jpg/960px-RK_1805_P1600408_Scharbeutz%2C_Strand_mit_Seebr%C3%BCcke.jpg",
      WC + "b/b9/Seebr%C3%BCcke_in_Scharbeutz_-_panoramio.jpg/960px-Seebr%C3%BCcke_in_Scharbeutz_-_panoramio.jpg",
      WC + "a/a6/Ausblick_zur_Seebr%C3%BCcke_in_Scharbeutz_-_panoramio.jpg/960px-Ausblick_zur_Seebr%C3%BCcke_in_Scharbeutz_-_panoramio.jpg",
    ],
    desc: "Connected to Timmendorf along the sand, with a modern wooden pier stretching deep over the water and a lively, freshly rebuilt promenade." },
  { n: 7, name: "Haffkrug Beach", loc: "Haffkrug · local train", vibe: "quiet",
    imgs: [
      WC + "2/21/Seebrucke_Haffkrug_20160716_0002_%2828476313675%29.jpg/960px-Seebrucke_Haffkrug_20160716_0002_%2828476313675%29.jpg",
      WC + "f/f6/Seebr%C3%BCcke_Haffkrug._-_panoramio.jpg/960px-Seebr%C3%BCcke_Haffkrug._-_panoramio.jpg",
      WC + "5/50/Seebrucke_Haffkrug_20160716_0006_%2828193275740%29.jpg/960px-Seebrucke_Haffkrug_20160716_0006_%2828193275740%29.jpg",
      WC + "2/29/Haffkrug.jpg/960px-Haffkrug.jpg",
    ],
    desc: "A quiet, traditional beach with a deeply relaxed village feel and its own small pier — the calm antidote to the busier resort towns down the sand." },
  { n: 8, name: "Sierksdorf Natural Beach", loc: "Sierksdorf · local train / bus", vibe: "scenic",
    imgs: [
      WC + "b/b8/Sierksdorf_Strand_2012.JPG/960px-Sierksdorf_Strand_2012.JPG",
      WC + "7/7a/SierksdorfVonScharbeutz.jpg/960px-SierksdorfVonScharbeutz.jpg",
      WC + "d/df/L%C3%BCbecker_Bucht_vom_Hansapark_aus_gesehen_-_panoramio.jpg/960px-L%C3%BCbecker_Bucht_vom_Hansapark_aus_gesehen_-_panoramio.jpg",
      WC + "b/b3/View_over_Bay_of_L%C3%BCbeck_to_Hansa-Park.jpg/960px-View_over_Bay_of_L%C3%BCbeck_to_Hansa-Park.jpg",
    ],
    desc: "An isolated, meadow-backed natural beach facing away from the commercial crowds. The perfect quiet, peaceful shoreline for the squad's final sunset walk." },
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
