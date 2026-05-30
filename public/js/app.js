/* ============================================================
   Beach Tour — Sylt front-end interactions
   ============================================================ */

function escapeHtml(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

/* ---------- Crew ---------- */
const CREW = [
  { name: "Rahim",   title: "Chief Island Officer",    quip: "Drew the master plan on a napkin. We follow the napkin.", style: "fun-emoji" },
  { name: "Palash",  title: "Sunset Whisperer",        quip: "Will make everyone stop walking for 'just one more photo'.", style: "bottts" },
  { name: "Rokan",   title: "Snack Commander",         quip: "Packs more chips than clothes. No regrets.", style: "big-smile" },
  { name: "Showkat", title: "SVG Bus Navigator",       quip: "Knows Line 1, 2 and 3 better than the drivers.", style: "adventurer" },
  { name: "Yousuf",  title: "Hydration Hero",          quip: "Carries the cool bag like it's a national treasure.", style: "croodles" },
  { name: "Hasan",   title: "Chief Vibes Photographer", quip: "Took 400 photos of the same dune. All keepers, apparently.", style: "lorelei" },
  { name: "Paul",    title: "Official Lighthouse Inspector", quip: "Has personally approved every red-and-white tower on Sylt.", style: "thumbs" },
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

/* ---------- Master route board ---------- */
const ROUTE = [
  { day: "Jun 4", phase: "Outbound Travel", time: "05:20 →", hub: "Frankfurt → Westerland",
    act: "Regional trains to <b>Hamburg Hbf</b>, then <b>RE6</b> to Niebüll and the island train to Westerland — target arrival ~18:25.", mode: "Regional + RE6 · ~13h", icon: "🚆", tone: "travel" },
  { day: "Jun 4", phase: "Arrival", time: "18:30 – 20:00", hub: "Westerland base",
    act: "Drop bags, grocery run, first stroll on <b>⑦ Westerland Hauptstrand</b> via Friedrichstraße.", mode: "Walk from station", icon: "🛒", tone: "rest" },
  { day: "Jun 5", phase: "Morning · Hub", time: "08:00 – 10:30", hub: "Westerland & Brandenburger",
    act: "<b>⑦ Westerland Hauptstrand</b> · <b>⑧ Brandenburger Strand</b> — resort sand and watersports.", mode: "Walk along beach", icon: "🏖️", tone: "beach" },
  { day: "Jun 5", phase: "Late Morning", time: "10:45 – 13:00", hub: "Wenningstedt & Kampen",
    act: "<b>⑥ Wenningstedt</b> · <b>④ Rotes Kliff</b> · <b>⑤ Uwe-Düne</b> viewpoint.", mode: "SVG Bus 1 · ~8–14 min", icon: "🏖️", tone: "beach" },
  { day: "Jun 5", phase: "Midday Break", time: "13:00 – 14:30", hub: "Holiday rental",
    act: "Home-cooked lunch and rest before the northern peninsula.", mode: "—", icon: "🏡", tone: "rest" },
  { day: "Jun 5", phase: "Afternoon · North", time: "14:45 – 17:30", hub: "Wanderdünen & List",
    act: "<b>③ Wanderdünen</b> · <b>② Lister Hafen</b> (Gosch buns) · <b>① Lister Ellenbogen</b>.", mode: "SVG Bus 1 · ~26–32 min", icon: "🌅", tone: "beach" },
  { day: "Jun 5", phase: "Evening · East & South", time: "17:45 – 20:30", hub: "Keitum → Hörnum",
    act: "<b>⑨ Keitum</b> · <b>⑩ Munkmarsch</b> · <b>⑪ Hörnum Kurstrand</b> · <b>⑫ Hörnum Odde</b>.", mode: "SVG Bus 3 & 2", icon: "🌅", tone: "beach" },
  { day: "Jun 5", phase: "Night", time: "21:00 →", hub: "Holiday rental",
    act: "Final group dinner and pack for a short last morning.", mode: "Return to base", icon: "🍽️", tone: "rest" },
  { day: "Jun 6", phase: "Last Morning", time: "08:00 – 12:30", hub: "Hörnum or favourites",
    act: "Optional south-tip loop or revisit missed stops until checkout ~12:30.", mode: "SVG Bus 2 · ~28 min", icon: "🏖️", tone: "beach" },
  { day: "Jun 6", phase: "Return Travel", time: "12:30 →", hub: "Westerland → Frankfurt",
    act: "RE6 to Hamburg, then regional trains south — late evening arrival Frankfurt.", mode: "RE6 + Regional · ~11h", icon: "🚆", tone: "travel" },
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
  { day: "Jun 4", label: "Travel & arrival", icon: "🌤️", hi: 21, lo: 13, cond: "Mild, breezy",
    rain: "Low · 0–2 mm", cloud: "Partly cloudy", wind: "28 km/h W", feel: "Fresh on arrival", tone: "ok" },
  { day: "Jun 5", label: "Full island day", icon: "⛅", hi: 20, lo: 12, cond: "Bright spells, windy",
    rain: "Low · 0–3 mm", cloud: "Mixed", wind: "32 km/h NW", feel: "Great for kites", tone: "good" },
  { day: "Jun 6", label: "Morning & return", icon: "🌦️", hi: 19, lo: 11, cond: "Cool start, clearing",
    rain: "Low–mod · 2–5 mm", cloud: "Variable", wind: "24 km/h", feel: "Layer up early", tone: "ok" },
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

/* ---------- Beaches (real photos via Wikimedia Commons Special:FilePath) ---------- */
function commonsPhoto(file) {
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=960`;
}

const BEACHES = [
  { n: 1, name: "Lister Ellenbogen (The Elbow Beach)", part: "Part 1 · List", loc: "~19.5 km N · SVG Bus 1 → List, Hafen (~32 min)", vibe: "wild",
    photos: [
      "Ellenbogen_Sylt@Leuchtturm_List-Ost.JPG",
      "Königshafen am Sylter Ellenbogen mit Blick auf Listland.jpg",
      "Königshafen am Sylter Ellenbogen mit Blick auf die Vogelinsel Üthörn.jpg",
      "Königshafen mit Blick auf den Sylter Ellenbogen.jpg",
      "Sylt Ellenbogen Leuchtturm List Ost (38388156574).jpg",
    ],
    desc: "Fully wild, peaceful and open. Take SVG Bus Line 1 from Westerland ZOB to the final stop List, Hafen, then walk north onto the scenic nature spit. Sit on vast sands and look across flat, shallow waves — Denmark is just 4 km away." },
  { n: 2, name: "Lister Hafen (The Northern Harbor)", part: "Part 1 · List", loc: "~17.0 km N · SVG Bus 1 → List, Hafen (~32 min)", vibe: "lively",
    photos: [
      "Hafen List Sylt.JPG",
      "Fish rolls at Gosch's.jpg",
      "Königshafen am Sylter Ellenbogen mit Blick auf rastende Kegelrobben.jpg",
      "Dgzrs minden-hafen-list-sylt-germany.jpg",
      "Königshafen am Sylter Ellenbogen mit Blick auf Listland.jpg",
    ],
    desc: "A bustling maritime harbor packed with wooden piers and docks — birthplace of Germany's famous Gosch seafood kitchens. Grab fresh, cheap fish buns and sit by the water." },
  { n: 3, name: "Die Wanderdünen (The Shifting Sand Dunes)", part: "Part 1 · List", loc: "~14.5 km N · SVG Bus 1 → Mövenberg (~26 min) + boardwalks", vibe: "wild",
    photos: [
      "Wanderdüne Listland Sylt.jpg",
      "Seenlandschaft im Naturschutzgebiet Lister Dünen im Norden von Sylt.jpg",
      "Schilf im Naturschutzgebiet Lister Dünen auf Sylt.jpg",
      "Sylt beach.jpg",
      "Dünensee im Naturschutzgebiet Lister Dünen im Norden von Sylt.jpg",
    ],
    desc: "Europe's largest connected shifting dunes — towers up to 30 m high like a rolling sand desert in the middle of Germany. Bus to Mövenberg or Kurverwaltung, then follow the designated wooden boardwalks." },
  { n: 4, name: "Rotes Kliff (The Red Cliff Beach)", part: "Part 2 · Kampen", loc: "~6.5 km N · SVG Bus 1 → Kampen, Mitte (~14 min) + 800 m walk", vibe: "scenic",
    photos: [
      "Rotes Kliff, Sylt.jpg",
      "Nordsee vom roten Kliff in Kampen.jpg",
      "Strand vom roten Kliff Kampen.jpg",
      "Kampen rotes Kliff 02.jpg",
      "Sylt Rotes Kliff.jpg",
    ],
    desc: "A magnificent 30 m bright red clay cliff line running right next to the beach. Walk the sand below at sunset when the light turns the entire cliff a fiery, deep red." },
  { n: 5, name: "Uwe-Düne (Uwe Dune Viewpoint)", part: "Part 2 · Kampen", loc: "~6.0 km N · SVG Bus 1 → Kampen, Mitte (~14 min)", vibe: "scenic",
    photos: [
      "Kampen Uwe-Düne.jpg",
      "20150322 xl 3483-Sylt Kampen Blick von der Uwe Düne bis zum Daenischen Festland.JPG",
      "View of Kampen, Sylt.jpg",
      "Nordsee vom roten Kliff in Kampen.jpg",
      "Kampen rotes Kliff 01.jpg",
    ],
    desc: "The highest natural point on Sylt — wooden stairs to a summit viewing deck with a spectacular 360° panoramic view of the entire island from coast to coast. Sits right behind the Red Cliff path." },
  { n: 6, name: "Wenningstedt Main Beach", part: "Part 2 · Wenningstedt", loc: "~4.0 km N · SVG Bus 1 or 3 → Wenningstedt, Mitte (~8 min)", vibe: "quiet",
    photos: [
      "Weststrand bei Wenningstedt.jpg",
      "Weststrand bei Wenningstedt 2.jpg",
      "Sandhaufen am Strand bei Wenningstedt.jpg",
      "Strand Nordsee 01.JPG",
      "Weststrand bei Wenningstedt 1.jpg",
    ],
    desc: "Highly relaxed, wide family beach with very soft, powdery sand. When the tide rolls in it creates massive, completely flat pools of waist-high water perfect for wading." },
  { n: 7, name: "Westerland Hauptstrand (Main Resort Beach)", part: "Part 3 · Westerland", loc: "0 km · 10 min walk from Westerland station", vibe: "lively",
    photos: [
      "2002-07 Sylt - Westerland (panorama).jpg",
      "Strandbar Sansibar Sylt (39097876991).jpg",
      "Strandsand, salzige Meeresluft und ganz viele schäumende Wellen am Strand von Sylt ... klingt nach Urlauf oder - panoramio.jpg",
      "Groyne near Westerland.jpg",
      "Düne auf Sylt in Westerland entlang der Kurpromenade - panoramio.jpg",
    ],
    desc: "The central hub where your train lands — a massive, lively, kilometres-long sandy resort beach backed by a paved pedestrian seawall promenade. Walk 10 minutes down Friedrichstraße from the station." },
  { n: 8, name: "Brandenburger Strand", part: "Part 3 · Westerland", loc: "~0.8 km N · walk north along the sand", vibe: "lively",
    photos: [
      "2023 Windsurf World Cup Sylt at Brandenburger Strand (53698032998).jpg",
      "2023 Windsurf World Cup at Brandenburger Strand on Sylt, Germany (53697824101).jpg",
      "2023 Windsurf World Cup at Brandenburger Strand on the island of Sylt, Germany (53697823416).jpg",
      "Groyne near Westerland.jpg",
      "Strandbar Sansibar Sylt (39097876991).jpg",
    ],
    desc: "The primary colourful watersports hotspot on the island — no bus needed. Walk a few hundred metres north from the main Westerland beach pavilion and watch kitesurfers and windsurfers on the big waves." },
  { n: 9, name: "Keitum Captain's Village", part: "Part 4 · East", loc: "~5.5 km E · SVG Bus 3 → Keitum, Mitte (~11 min)", vibe: "quiet",
    photos: [
      "Sylt Keitum AmKliff19 c.jpg",
      "Weide am Wattenmeer in Keitum.jpg",
      "Hund am Wattenmeer bei Keitum.jpg",
      "Keitum Wattenmeer.jpg",
      "Blick auf Keitum.jpg",
    ],
    desc: "A completely quiet, historic village facing the silent inner mudflats — beautifully preserved 17th-century sea-captain houses with thatched roofs, old stone walls and rose gardens." },
  { n: 10, name: "Munkmarsch Harbor & Beach", part: "Part 4 · East", loc: "~6.0 km NE · SVG Bus 3 → Munkmarsch, Hafen (~15 min)", vibe: "quiet",
    photos: [
      "Buhnen Nordfriesisches Wattenmeer@Munkmarsch Sylt.JPG",
      "20170411 xl P1100793-Wattenmeer-Keitum.jpg",
      "Weg am Wattenmeer bei Keitum.jpg",
      "Keitum Wattenmeer.jpg",
      "Salzwiesen bei Keitum auf Sylt im Weltnaturerbe 01.jpg",
    ],
    desc: "Serene, glassy and hidden from the tourist crowds. Facing the inner Wadden Sea there are zero crashing waves — the water is totally still, flat and shallow." },
  { n: 11, name: "Hörnum Kurstrand (East & West Beaches)", part: "Part 5 · Hörnum", loc: "~17.5 km S · SVG Bus 2 → Hörnum, Hafen (~28 min)", vibe: "scenic",
    photos: [
      "Leuchtturm-hoernum-sylt-germany.jpg",
      "Hörnum Sylt Leuchtturm@20151229 08.JPG",
      "Leuchtturm Sylt-Hörnum.jpg",
      "Hoernum FKK-Strand Sylt 1.jpg",
      "Hörnum-Odde, Sylt.jpg",
    ],
    desc: "A cozy maritime beach bay backdropped by an iconic active red-and-white lighthouse. The eastern harbour side is sheltered from heavy sea winds — water as flat and calm as a swimming pool." },
  { n: 12, name: "Hörnum Odde (The South Tip Nature Trail)", part: "Part 5 · Hörnum", loc: "~18.5 km S · SVG Bus 2 → Hörnum, Hafen (~28 min) + walk south", vibe: "wild",
    photos: [
      "Hörnum-Odde, Sylt.jpg",
      "Hörnum Hörnum-Odde Sylt.jpg",
      "Hoernum FKK-Strand Sylt 1.jpg",
      "Hörnum Sylt Leuchtturm@20151229 08.JPG",
      "Leuchtturm Sylt-Hörnum.jpg",
    ],
    desc: "A shifting, rugged sandspit nature reserve at the absolute southern tip. Take an incredible ~1-hour loop where the wild open ocean crashes on your right and the silent, flat Wadden Sea rests on your left." },
];
const VIBE_LABEL = { lively: "Lively", quiet: "Quiet", scenic: "Scenic", wild: "Wild" };

function renderBeaches() {
  const grid = document.getElementById("beachGrid");
  if (!grid) return;
  grid.innerHTML = BEACHES.map(b => `
    <article class="beach-card" data-vibe="${b.vibe}">
      <div class="beach-media">
        <div class="carousel" data-idx="0">
          <div class="car-track">
            ${b.photos.map((file, i) => `<img class="car-slide" src="${commonsPhoto(file)}" alt="${b.name} — photo ${i + 1}" loading="lazy" referrerpolicy="no-referrer">`).join("")}
          </div>
          ${b.photos.length > 1 ? `
            <button class="car-btn car-prev" aria-label="Previous photo">‹</button>
            <button class="car-btn car-next" aria-label="Next photo">›</button>
            <div class="car-count"><span class="car-cur">1</span>/${b.photos.length}</div>
            <div class="car-dots">${b.photos.map((_, i) => `<button class="car-dot${i === 0 ? " is-active" : ""}" data-go="${i}" aria-label="Photo ${i + 1}"></button>`).join("")}</div>
          ` : ""}
        </div>
        <span class="beach-num">${b.n}</span>
        <span class="beach-vibe">${VIBE_LABEL[b.vibe]}</span>
      </div>
      <div class="beach-body">
        <div class="beach-part">${b.part}</div>
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
  { icon: "🏡", label: "Accommodation", detail: "2 nights · Jun 4 & 5 · Westerland (max)", pp: 60 },
  { icon: "🛒", label: "Groceries & cooking", detail: "home-cooked meals", pp: 30 },
  { icon: "🥤", label: "Drinks, snacks & Gosch", detail: "beach + fish buns", pp: 15 },
  { icon: "✨", label: "Extra costs", detail: "buffer / misc", pp: 15 },
  { icon: "🎟️", label: "Rail & SVG buses", detail: "Deutschland-Ticket", pp: 0 },
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
const PACK_KEY = "beachTour.pack.sylt.v1";
const DEFAULT_PACK = [
  "Swimwear (×2 to rotate)", "Quick-dry beach towel", "Water shoes (dunes & Odde trail)",
  "Flip-flops / sandals", "High-SPF sunscreen", "After-sun / aloe gel",
  "Sunglasses", "Sun hat or cap", "Reusable water bottle", "Cool bag for drinks",
  "Picnic blanket", "Dry bag for phone & valuables",
  "Windbreaker / packable shell (Sylt breeze)", "Warm layer / hoodie (evenings)",
  "Comfortable walking shoes (boardwalks & Odde)", "Light long trousers",
  "Spare socks & underwear", "Sleepwear",
  "Deutschland-Ticket / DB ticket", "ID / passport", "Cash + bank card",
  "Accommodation address & keys info", "Headphones for the train", "Travel pillow & eye mask",
  "Phone + charger", "Power bank", "Universal cable / adapter",
  "Toothbrush & toiletries", "Wet wipes & hand sanitiser", "Personal medication",
  "Basic first-aid (plasters, painkillers)",
  "Reusable shopping bags", "Snacks for the 05:20 departure", "Screenshot SVG bus timetables",
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
