(() => {
  "use strict";

  const root = document.documentElement;
  const body = document.body;
  const menuToggle = document.getElementById("menuToggle");
  const nav = document.getElementById("siteNav");
  const themeToggle = document.getElementById("themeToggle");
  const progress = document.getElementById("scrollProgress");
  const header = document.getElementById("siteHeader");

  const setTheme = (theme) => {
    root.dataset.theme = theme;
    const isDark = theme === "dark";
    themeToggle?.setAttribute("aria-pressed", String(isDark));
    themeToggle?.setAttribute("aria-label", isDark ? "فعال کردن حالت روشن" : "فعال کردن حالت تاریک");
    try { localStorage.setItem("theme", theme); } catch (_) {}
  };

  let savedTheme = null;
  try { savedTheme = localStorage.getItem("theme"); } catch (_) {}
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  setTheme(savedTheme === "dark" || savedTheme === "light" ? savedTheme : (systemDark ? "dark" : "light"));

  themeToggle?.addEventListener("click", () => setTheme(root.dataset.theme === "dark" ? "light" : "dark"));

  const closeMenu = () => {
    if (!menuToggle || !nav) return;
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "باز کردن منو");
    nav.dataset.open = "false";
  };

  menuToggle?.addEventListener("click", () => {
    const open = menuToggle.getAttribute("aria-expanded") !== "true";
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "بستن منو" : "باز کردن منو");
    if (nav) nav.dataset.open = String(open);
  });
  nav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
  document.addEventListener("click", (event) => {
    if (!nav || !menuToggle || menuToggle.getAttribute("aria-expanded") !== "true") return;
    if (!nav.contains(event.target) && !menuToggle.contains(event.target)) closeMenu();
  });
  document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeMenu(); });

  document.querySelectorAll(".faq-question").forEach((button) => {
    button.addEventListener("click", () => {
      const answer = document.getElementById(button.getAttribute("aria-controls"));
      const open = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!open));
      if (answer) answer.hidden = open;
    });
  });

  const reveals = [...document.querySelectorAll(".reveal")];
  if (!("IntersectionObserver" in window)) {
    reveals.forEach((el) => el.classList.add("is-visible"));
  } else {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -4% 0px" });
    reveals.forEach((el) => observer.observe(el));
  }

  const updateProgress = () => {
    if (!progress) return;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = `${max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0}%`;
    header?.classList.toggle("is-scrolled", window.scrollY > 12);
  };
  updateProgress();
  window.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress, { passive: true });

  const gallery = document.querySelector("[data-gallery]");
  if (gallery) {
    const slides = [...gallery.querySelectorAll(".gallery-item")];
    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightboxImage");
    const lightboxCaption = document.getElementById("lightboxCaption");
    const close = lightbox?.querySelector("[data-lightbox-close]");
    const lbPrev = lightbox?.querySelector("[data-lightbox-prev]");
    const lbNext = lightbox?.querySelector("[data-lightbox-next]");
    let index = 0;
    let lastFocused = null;

    const renderLightbox = () => {
      const slide = slides[index];
      const img = slide?.querySelector("img");
      if (!slide || !img || !lightboxImage || !lightboxCaption) return;
      lightboxImage.src = slide.dataset.src || img.currentSrc || img.src;
      lightboxImage.alt = img.alt;
      lightboxCaption.textContent = `${index + 1} از ${slides.length}`;
    };

    const openLightbox = (slideIndex) => {
      if (!lightbox) return;
      index = slideIndex;
      renderLightbox();
      lastFocused = document.activeElement;
      lightbox.hidden = false;
      body.style.overflow = "hidden";
      close?.focus();
    };

    const closeLightbox = () => {
      if (!lightbox) return;
      lightbox.hidden = true;
      body.style.overflow = "";
      lastFocused?.focus?.();
    };

    const moveLightbox = (delta) => {
      index = (index + delta + slides.length) % slides.length;
      renderLightbox();
    };

    slides.forEach((slide, i) => slide.addEventListener("click", () => openLightbox(i)));
    close?.addEventListener("click", closeLightbox);
    lbPrev?.addEventListener("click", () => moveLightbox(-1));
    lbNext?.addEventListener("click", () => moveLightbox(1));
    lightbox?.addEventListener("click", (event) => { if (event.target === lightbox) closeLightbox(); });

    document.addEventListener("keydown", (event) => {
      if (!lightbox || lightbox.hidden) return;
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") moveLightbox(1);
      if (event.key === "ArrowRight") moveLightbox(-1);
      if (event.key === "Tab") {
        const focusables = [...lightbox.querySelectorAll("button:not([disabled])")];
        if (!focusables.length) return;
        const first = focusables[0], last = focusables[focusables.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    });
  }
})();
