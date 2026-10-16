const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

// Mobile menu
const menuBtn = $("#menu-btn"),
  menu = $("#menu");
function setMenu(open) {
  menu.classList.toggle("open", open);
  menuBtn.setAttribute("aria-expanded", String(open));
  menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  menuBtn.firstElementChild.className = open ? "fa fa-times" : "fa fa-bars";
}
menuBtn.addEventListener("click", () =>
  setMenu(!menu.classList.contains("open")),
);
$$("a", menu).forEach((a) => a.addEventListener("click", () => setMenu(false)));
document.addEventListener(
  "keydown",
  (e) => e.key === "Escape" && setMenu(false),
);

// Theme toggle (remembers choice)
const themeBtn = $("#theme-btn"),
  root = document.documentElement;
const isDark = () =>
  root.dataset.theme === "dark" ||
  (!root.dataset.theme && matchMedia("(prefers-color-scheme: dark)").matches);
function paintTheme() {
  themeBtn.firstElementChild.className = isDark()
    ? "fa fa-sun-o"
    : "fa fa-moon-o";
  themeBtn.setAttribute(
    "aria-label",
    isDark() ? "Switch to light theme" : "Switch to dark theme",
  );
}
themeBtn.addEventListener("click", () => {
  root.dataset.theme = isDark() ? "light" : "dark";
  try {
    localStorage.setItem("theme", root.dataset.theme);
  } catch (e) {}
  paintTheme();
});
paintTheme();

// Kathmandu clock
const fmt = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Kathmandu",
  hour: "2-digit",
  minute: "2-digit",
});
const tick = () => ($("#clock").textContent = fmt.format(new Date()));
tick();
setInterval(tick, 30000);

// Filters for skills and projects
$$(".filters").forEach((group) => {
  const items = $$("[data-c]", group.nextElementSibling);
  group.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;
    $$("button", group).forEach((b) => b.classList.toggle("on", b === btn));
    items.forEach(
      (i) =>
        (i.hidden = btn.dataset.f !== "all" && i.dataset.c !== btn.dataset.f),
    );
  });
});

// Highlight current section in nav
const links = $$(".menu a:not(.menu-cta)");
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach(
      (en) =>
        en.isIntersecting &&
        links.forEach((l) =>
          l.classList.toggle(
            "active",
            l.getAttribute("href") === "#" + en.target.id,
          ),
        ),
    );
  },
  { rootMargin: "-40% 0px -55% 0px" },
);
links.forEach((l) => {
  const s = $(l.getAttribute("href"));
  s && io.observe(s);
});

// Copy email
$("#copy").addEventListener("click", async (e) => {
  try {
    await navigator.clipboard.writeText($("#email").textContent);
    e.target.textContent = "Copied";
  } catch (err) {
    e.target.textContent = "Press Ctrl+C";
  }
  setTimeout(() => (e.target.textContent = "Copy"), 1800);
});

$("#year").textContent = new Date().getFullYear();
