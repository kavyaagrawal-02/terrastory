/* =========================================================
   TERRASTORY SETTINGS — edit only this block
   ---------------------------------------------------------
   whatsapp : your number with country code, digits only
              e.g. "919876543210"
   form     : your Google Form link
   instagram: your Instagram profile link
   email    : your email address
   upiQr    : path to your UPI QR image in the images folder
   ========================================================= */
const TERRASTORY = {
  whatsapp: "91XXXXXXXXXX",
  form: "GOOGLE_FORM_LINK",
  instagram: "INSTAGRAM_LINK",
  email: "EMAIL",
  upiQr: "images/upi-qr.svg"
};
/* ========================================================= */

(function () {
  "use strict";
  const root = document.documentElement;
  root.classList.add("js");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isSet = (v) => v && !/^(GOOGLE_FORM_LINK|INSTAGRAM_LINK|EMAIL)$/.test(v) && !/X{4,}/.test(v);

  /* ---------- Fill in links from the settings ---------- */
  document.querySelectorAll("[data-wa]").forEach((a) => {
    const msg = a.getAttribute("data-wa") || "Hi Terrastory!";
    a.href = "https://wa.me/" + TERRASTORY.whatsapp.replace(/\D/g, "") + "?text=" + encodeURIComponent(msg);
    a.target = "_blank";
    a.rel = "noopener";
  });
  document.querySelectorAll("[data-form]").forEach((a) => {
    if (isSet(TERRASTORY.form)) { a.href = TERRASTORY.form; a.target = "_blank"; a.rel = "noopener"; }
  });
  document.querySelectorAll("[data-instagram]").forEach((a) => {
    if (isSet(TERRASTORY.instagram)) { a.href = TERRASTORY.instagram; a.target = "_blank"; }
  });
  document.querySelectorAll("[data-email]").forEach((a) => {
    if (isSet(TERRASTORY.email)) { a.href = "mailto:" + TERRASTORY.email; a.textContent = TERRASTORY.email; }
  });
  document.querySelectorAll("[data-upi]").forEach((img) => { img.src = TERRASTORY.upiQr; });

  /* ---------- Theme (night map) ---------- */
  const toggle = document.querySelector(".theme-toggle");
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)");
  const isDark = () => root.dataset.theme ? root.dataset.theme === "dark" : systemDark.matches;
  const labelTheme = () => {
    if (!toggle) return;
    const dark = isDark();
    toggle.setAttribute("aria-label", dark ? "Switch to day map" : "Switch to night map");
    toggle.title = dark ? "Day map" : "Night map";
    document.querySelectorAll('meta[name="theme-color"]').forEach((m) => m.setAttribute("content", dark ? "#14202B" : "#F6F1E7"));
  };
  if (toggle) {
    toggle.addEventListener("click", () => {
      root.dataset.theme = isDark() ? "light" : "dark";
      try { localStorage.setItem("ts-theme", root.dataset.theme); } catch (e) {}
      labelTheme();
    });
    labelTheme();
  }

  /* ---------- Mobile menu ---------- */
  const menuBtn = document.querySelector(".menu-toggle");
  const nav = document.getElementById("site-nav");
  if (menuBtn && nav) {
    const close = () => { nav.classList.remove("is-open"); menuBtn.setAttribute("aria-expanded", "false"); menuBtn.setAttribute("aria-label", "Open menu"); };
    menuBtn.addEventListener("click", () => {
      const open = !nav.classList.contains("is-open");
      nav.classList.toggle("is-open", open);
      menuBtn.setAttribute("aria-expanded", String(open));
      menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    nav.addEventListener("click", (e) => { if (e.target.closest("a")) close(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && nav.classList.contains("is-open")) { close(); menuBtn.focus(); } });
  }

  /* ---------- Services dropdown ---------- */
  document.querySelectorAll(".has-sub").forEach((li) => {
    const btn = li.querySelector(".sub-toggle");
    const set = (open) => { li.classList.toggle("is-open", open); btn.setAttribute("aria-expanded", String(open)); };
    const desktop = window.matchMedia("(min-width: 960px) and (hover: hover)");
    let hoverOpenedAt = 0;
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (Date.now() - hoverOpenedAt < 500) return; // just opened by hover; keep it open
      set(!li.classList.contains("is-open"));
    });
    li.addEventListener("mouseenter", () => { if (desktop.matches && !li.classList.contains("is-open")) { hoverOpenedAt = Date.now(); set(true); } });
    li.addEventListener("mouseleave", () => { if (desktop.matches) set(false); });
    document.addEventListener("click", (e) => { if (!li.contains(e.target)) set(false); });
    li.addEventListener("keydown", (e) => { if (e.key === "Escape") { set(false); btn.focus(); } });
    li.addEventListener("focusout", (e) => { if (desktop.matches && !li.contains(e.relatedTarget)) set(false); });
  });

  /* ---------- Header border on scroll ---------- */
  const header = document.querySelector(".site-header");
  if (header) {
    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Hero coordinates type in ---------- */
  const coord = document.querySelector("[data-type]");
  if (coord && !reduceMotion) {
    const text = coord.textContent.trim();
    coord.setAttribute("aria-label", text);
    coord.textContent = "";
    coord.classList.add("is-typing");
    let i = 0;
    const tick = () => {
      coord.textContent = text.slice(0, ++i);
      if (i < text.length) setTimeout(tick, 55 + Math.random() * 40);
      else setTimeout(() => coord.classList.remove("is-typing"), 1400);
    };
    setTimeout(tick, 450);
  }

  /* ---------- Reveal: layer stack and a few groups ---------- */
  const targets = document.querySelectorAll(".layer-stack, .reveal");
  if ("IntersectionObserver" in window && !reduceMotion) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } });
    }, { threshold: 0.25, rootMargin: "0px 0px -8% 0px" });
    targets.forEach((t) => io.observe(t));
  } else {
    targets.forEach((t) => t.classList.add("is-in"));
  }
})();
