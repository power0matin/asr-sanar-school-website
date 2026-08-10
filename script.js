(() => {
  "use strict";

  const root = document.documentElement;
  const body = document.body;
  const menuToggle = document.getElementById("menuToggle");
  const nav = document.getElementById("siteNav");
  const themeToggle = document.getElementById("themeToggle");
  const progress = document.getElementById("scrollProgress");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

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
  if (prefersReducedMotion.matches || !("IntersectionObserver" in window)) {
    reveals.forEach((el) => el.classList.add("is-visible"));
  } else {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });
    reveals.forEach((el) => observer.observe(el));
  }

  const updateProgress = () => {
    if (!progress) return;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = `${max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0}%`;
  };
  updateProgress();
  window.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress, { passive: true });

  const gallery = document.querySelector("[data-gallery]");
  if (gallery) {
    const viewport = gallery.querySelector("[data-gallery-viewport]");
    const track = gallery.querySelector("[data-gallery-track]");
    const slides = [...gallery.querySelectorAll(".gallery-slide")];
    const prev = gallery.querySelector("[data-gallery-prev]");
    const next = gallery.querySelector("[data-gallery-next]");
    const play = gallery.querySelector("[data-gallery-play]");
    const dots = gallery.querySelector("[data-gallery-dots]");
    let index = 0;
    let timer = null;
    let manualPause = false;
    let pointerStart = null;

    const dotButtons = slides.map((_, i) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "gallery-dot";
      dot.setAttribute("aria-label", `رفتن به تصویر ${i + 1}`);
      dot.addEventListener("click", () => goTo(i, true));
      dots?.appendChild(dot);
      return dot;
    });

    const updateDots = () => dotButtons.forEach((dot, i) => dot.setAttribute("aria-current", i === index ? "true" : "false"));
    const updatePosition = () => {
      if (!viewport || !track || !slides.length) return;
      const slide = slides[index];
      const viewportWidth = viewport.clientWidth;
      const offset = slide.offsetLeft - ((viewportWidth - slide.offsetWidth) / 2);
      track.style.transform = `translate3d(${-offset}px,0,0)`;
      updateDots();
    };

    const stopTimer = () => { if (timer) window.clearInterval(timer); timer = null; };
    const startTimer = () => {
      stopTimer();
      if (manualPause || prefersReducedMotion.matches || document.hidden || slides.length < 2) return;
      timer = window.setInterval(() => goTo(index + 1, false), 5000);
    };
    const updatePlay = () => {
      if (!play) return;
      play.setAttribute("aria-pressed", String(manualPause));
      play.textContent = manualPause ? "ادامه نمایش خودکار" : "توقف نمایش خودکار";
    };
    const goTo = (target, userInitiated = false) => {
      index = (target + slides.length) % slides.length;
      updatePosition();
      if (userInitiated) startTimer();
    };

    prev?.addEventListener("click", () => goTo(index - 1, true));
    next?.addEventListener("click", () => goTo(index + 1, true));
    play?.addEventListener("click", () => { manualPause = !manualPause; updatePlay(); manualPause ? stopTimer() : startTimer(); });
    viewport?.addEventListener("mouseenter", stopTimer);
    viewport?.addEventListener("mouseleave", startTimer);
    viewport?.addEventListener("focusin", stopTimer);
    viewport?.addEventListener("focusout", startTimer);
    viewport?.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") { event.preventDefault(); goTo(index + 1, true); }
      if (event.key === "ArrowRight") { event.preventDefault(); goTo(index - 1, true); }
    });
    viewport?.addEventListener("pointerdown", (event) => { pointerStart = event.clientX; stopTimer(); });
    viewport?.addEventListener("pointerup", (event) => {
      if (pointerStart == null) return;
      const delta = event.clientX - pointerStart;
      pointerStart = null;
      if (Math.abs(delta) > 45) goTo(index + (delta < 0 ? 1 : -1), true); else startTimer();
    });
    viewport?.addEventListener("pointercancel", () => { pointerStart = null; startTimer(); });
    document.addEventListener("visibilitychange", () => document.hidden ? stopTimer() : startTimer());
    prefersReducedMotion.addEventListener?.("change", startTimer);
    window.addEventListener("resize", updatePosition, { passive: true });

    updatePlay();
    requestAnimationFrame(() => { updatePosition(); startTimer(); });

    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightboxImage");
    const lightboxCaption = document.getElementById("lightboxCaption");
    const close = lightbox?.querySelector("[data-lightbox-close]");
    const lbPrev = lightbox?.querySelector("[data-lightbox-prev]");
    const lbNext = lightbox?.querySelector("[data-lightbox-next]");
    let lastFocused = null;

    const renderLightbox = () => {
      const slide = slides[index];
      const img = slide?.querySelector("img");
      if (!slide || !img || !lightboxImage || !lightboxCaption) return;
      lightboxImage.src = slide.dataset.src || img.currentSrc || img.src;
      lightboxImage.alt = img.alt;
      lightboxCaption.textContent = `${img.alt} — ${index + 1} از ${slides.length}`;
    };
    const openLightbox = (slideIndex) => {
      if (!lightbox) return;
      index = slideIndex;
      renderLightbox();
      lastFocused = document.activeElement;
      lightbox.hidden = false;
      body.style.overflow = "hidden";
      stopTimer();
      close?.focus();
    };
    const closeLightbox = () => {
      if (!lightbox) return;
      lightbox.hidden = true;
      body.style.overflow = "";
      lastFocused?.focus?.();
      startTimer();
    };
    const moveLightbox = (delta) => { goTo(index + delta, false); renderLightbox(); };

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
