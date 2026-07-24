// ========================
// GLOBAL UI ELEMENTS (Define once at the top)
// ========================
const header = document.querySelector(".header");
const toggle = document.getElementById("menuToggle");
const nav = document.getElementById("navMenu");
const themeBtn = document.getElementById("themeToggle");
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("#navMenu a");
const lightbox = document.getElementById("lightbox");
const lightImg = document.getElementById("lightboxImg");
const form = document.getElementById("contactForm");
const counters = document.querySelectorAll(".stat h3");
const modal = document.getElementById("newsModal");
const progressBar = document.getElementById("scrollProgress");
const toastContainer = document.getElementById("toastContainer");

// ========================
// MOBILE MENU
// ========================
if (toggle && nav) {
  toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    toggle.classList.toggle("active");
    nav.classList.toggle("active");
  });

  // close when clicking outside
  document.addEventListener("click", (e) => {
    if (!nav.contains(e.target) && !toggle.contains(e.target)) {
      nav.classList.remove("active");
      toggle.classList.remove("active");
    }
  });

  // close when link clicked
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("active");
      toggle.classList.remove("active");
    });
  });
}

// ========================
// DARK MODE (persistent)
// ========================
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}

if (themeBtn) {
  // مطمئن شوید دکمه وجود دارد
  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    if (document.body.classList.contains("dark")) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  });
}

// ========================
// SCROLL REVEAL
// ========================
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 },
);

document.querySelectorAll(".reveal").forEach((el) => {
  revealObserver.observe(el);
});

// ========================
// FORM VALIDATION
// ========================
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputs = form.querySelectorAll("input, textarea");
    let valid = true;

    inputs.forEach((input) => {
      if (!input.value.trim()) {
        input.style.borderColor = "red";
        valid = false;
      } else {
        input.style.borderColor = "";
      }
    });

    if (!valid) {
      showToast("لطفاً تمام فیلدها را تکمیل کنید", "error");
      return;
    }

    showToast("پیام شما با موفقیت ارسال شد", "success");
    form.reset();
  });
}

// ========================
// SMOOTH SCROLL (Updated to use the globally defined 'header')
// ========================

// این تابع را می‌توانید برای لینک‌هایی که به سction خاصی اشاره دارند، استفاده کنید
function scrollToSection(id) {
  const element = document.getElementById(id);
  if (!element) return;
  const headerOffset = header ? header.offsetHeight + 2 : 80; // استفاده از header تعریف شده
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth",
  });
}

// برای تمام لینک‌های ناوبری که به # شروع می‌شوند
document.querySelectorAll('#navMenu a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const id = link.getAttribute("href").substring(1);
    const target = document.getElementById(id);
    if (!target) return;

    const headerOffset = header ? header.offsetHeight + 2 : 80; // استفاده از header تعریف شده
    const elementPosition =
      target.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  });
});

// ========================
// COUNTER ANIMATION
// ========================
const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
function toEnglishNum(str) {
  return str.replace(/[۰-۹]/g, (d) => persianDigits.indexOf(d));
}

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const counter = entry.target;
      const raw = toEnglishNum(counter.innerText.replace("+", ""));
      const target = parseInt(raw, 10);

      if (isNaN(target)) { counterObserver.unobserve(counter); return; }

      let count = 0;
      const duration = 80;
      const step = target / duration;

      const update = () => {
        count += step;

        if (count < target) {
          counter.innerText = "+" + Math.floor(count);
          requestAnimationFrame(update);
        } else {
          counter.innerText = "+" + target;
        }
      };

      update();
      counterObserver.unobserve(counter);
    });
  },
  { threshold: 0.6 },
);

counters.forEach((counter) => {
  counterObserver.observe(counter);
});

if (modal) {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
}

// ========================
// LAZY LOADING FALLBACK
// ========================
const lazyImages = document.querySelectorAll("img[loading='lazy']");

if ("IntersectionObserver" in window) {
  const imgObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const img = entry.target;
      img.src = img.dataset.src || img.src;

      observer.unobserve(img);
    });
  });

  lazyImages.forEach((img) => imgObserver.observe(img));
}

// script loaded

// FAQ
document.querySelectorAll(".faq-question").forEach((btn) => {
  btn.addEventListener("click", () => {
    const item = btn.parentElement;
    const answer = item.querySelector(".faq-answer");

    const isOpen = item.classList.contains("active");

    document.querySelectorAll(".faq-item").forEach((i) => {
      i.classList.remove("active");
      const a = i.querySelector(".faq-answer");
      if (a) a.style.maxHeight = null;
    });

    if (!isOpen) {
      item.classList.add("active");
      answer.style.maxHeight = answer.scrollHeight + "px";
    }
  });
});

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

  if (progressBar) {
    progressBar.style.width = progress + "%";
  }

  // افزودن/حذف کلاس scrolled برای هدر گلس مورفیک
  if (header) {
    if (scrollTop > 10) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }
});

function showToast(message, type = "info") {
  if (!toastContainer) return;

  const toast = document.createElement("div");
  toast.className = `toast toast--${type}`;

  const msgSpan = document.createElement("span");
  msgSpan.className = "toast__message";
  msgSpan.textContent = message;

  const closeBtn = document.createElement("button");
  closeBtn.className = "toast__close";
  closeBtn.setAttribute("aria-label", "بستن پیام");
  closeBtn.textContent = "×";

  closeBtn.addEventListener("click", () => {
    hideToast(toast);
  });

  toast.appendChild(msgSpan);
  toast.appendChild(closeBtn);

  toastContainer.appendChild(toast);

  // حذف خودکار بعد از ۳ ثانیه
  setTimeout(() => {
    hideToast(toast);
  }, 3000);
}

function hideToast(toast) {
  if (!toast) return;
  toast.style.animation = "toast-out 0.25s ease-in forwards";
  toast.addEventListener("animationend", () => {
    toast.remove();
  });
}
if (lightbox) {
  lightbox.addEventListener("click", () => {
    lightbox.style.display = "none";
  });
}

// ================= MODERN GALLERY SLIDER =================
const galleryTrack = document.getElementById("galleryTrack");
const btnPrev = document.getElementById("galleryPrev");
const btnNext = document.getElementById("galleryNext");
const galleryDots = document.getElementById("galleryDots");

if (galleryTrack && btnPrev && btnNext) {
  const slides = galleryTrack.querySelectorAll(".gallery-slide");
  const totalSlides = slides.length;
  let currentIndex = 0;
  let autoScrollInterval;

  // Create dot indicators
  if (galleryDots) {
    slides.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.className = "gallery-dot" + (i === 0 ? " active" : "");
      dot.setAttribute("aria-label", `تصویر ${i + 1}`);
      dot.addEventListener("click", () => goToSlide(i));
      galleryDots.appendChild(dot);
    });
  }

  function goToSlide(index) {
    if (index < 0 || index >= totalSlides) return;
    currentIndex = index;

    const slide = slides[index];
    const slideWidth = slide.offsetWidth;
    const trackWidth = galleryTrack.parentElement.offsetWidth;
    const offset = slide.offsetLeft - (trackWidth - slideWidth) / 2;

    galleryTrack.style.transform = `translateX(${-offset}px)`;
    updateDots();
  }

  function updateDots() {
    if (!galleryDots) return;
    const dots = galleryDots.querySelectorAll(".gallery-dot");
    dots.forEach((dot, i) => dot.classList.toggle("active", i === currentIndex));
  }

  btnNext.addEventListener("click", () => {
    goToSlide(currentIndex >= totalSlides - 1 ? 0 : currentIndex + 1);
  });

  btnPrev.addEventListener("click", () => {
    goToSlide(currentIndex <= 0 ? totalSlides - 1 : currentIndex - 1);
  });

  // Autoplay
  function startAutoScroll() {
    stopAutoScroll();
    autoScrollInterval = setInterval(() => {
      goToSlide(currentIndex >= totalSlides - 1 ? 0 : currentIndex + 1);
    }, 4000);
  }

  function stopAutoScroll() {
    clearInterval(autoScrollInterval);
  }

  startAutoScroll();
  galleryTrack.parentElement.addEventListener("mouseenter", stopAutoScroll);
  galleryTrack.parentElement.addEventListener("mouseleave", startAutoScroll);
  galleryTrack.parentElement.addEventListener("touchstart", stopAutoScroll, { passive: true });
  galleryTrack.parentElement.addEventListener("touchend", () => setTimeout(startAutoScroll, 3000), { passive: true });

  // Keyboard navigation
  galleryTrack.setAttribute("tabindex", "0");
  galleryTrack.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") { e.preventDefault(); goToSlide(currentIndex >= totalSlides - 1 ? 0 : currentIndex + 1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); goToSlide(currentIndex <= 0 ? totalSlides - 1 : currentIndex - 1); }
  });

  // Initialize position
  goToSlide(0);
}

// ================= MODERN LIGHTBOX FOR GALLERY =================
(function () {
  const lightbox = document.getElementById("lightbox");
  const lightImg = document.getElementById("lightboxImg");
  if (!lightbox || !lightImg) return;

  const gallerySlides = document.querySelectorAll(".gallery-track .gallery-slide");
  let lightboxImages = [];
  let lightboxIndex = 0;

  gallerySlides.forEach((slide) => {
    const img = slide.querySelector("img");
    if (img) lightboxImages.push(img.src);
  });

  // Create lightbox controls
  const closeBtn = document.createElement("button");
  closeBtn.className = "lightbox-close";
  closeBtn.innerHTML = "&#10005;";
  closeBtn.setAttribute("aria-label", "بستن");

  const prevBtn = document.createElement("button");
  prevBtn.className = "lightbox-nav";
  prevBtn.style.right = "24px";
  prevBtn.innerHTML = "&#10095;";
  prevBtn.setAttribute("aria-label", "تصویر قبلی");

  const nextBtn = document.createElement("button");
  nextBtn.className = "lightbox-nav";
  nextBtn.style.left = "24px";
  nextBtn.innerHTML = "&#10094;";
  nextBtn.setAttribute("aria-label", "تصویر بعدی");

  const counter = document.createElement("div");
  counter.className = "lightbox-counter";

  lightbox.appendChild(closeBtn);
  lightbox.appendChild(prevBtn);
  lightbox.appendChild(nextBtn);
  lightbox.appendChild(counter);

  function openLightbox(index) {
    lightboxIndex = index;
    lightImg.src = lightboxImages[index];
    counter.textContent = `${index + 1} / ${lightboxImages.length}`;
    lightbox.style.display = "flex";
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.style.display = "none";
    document.body.style.overflow = "";
  }

  function navigateLightbox(dir) {
    lightboxIndex = (lightboxIndex + dir + lightboxImages.length) % lightboxImages.length;
    lightImg.src = lightboxImages[lightboxIndex];
    counter.textContent = `${lightboxIndex + 1} / ${lightboxImages.length}`;
  }

  gallerySlides.forEach((slide, i) => {
    slide.addEventListener("click", () => openLightbox(i));
  });

  closeBtn.addEventListener("click", (e) => { e.stopPropagation(); closeLightbox(); });
  lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });
  prevBtn.addEventListener("click", (e) => { e.stopPropagation(); navigateLightbox(1); });
  nextBtn.addEventListener("click", (e) => { e.stopPropagation(); navigateLightbox(-1); });

  document.addEventListener("keydown", (e) => {
    if (lightbox.style.display !== "flex") return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") navigateLightbox(1);
    if (e.key === "ArrowLeft") navigateLightbox(-1);
  });
})();

document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".staff-filter");
  const staffCards = document.querySelectorAll(".staff-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      const filterValue = button.getAttribute("data-filter");

      // Phase 1: hide non-matching cards
      staffCards.forEach((card) => {
        const category = card.getAttribute("data-category");
        const shouldShow = filterValue === "all" || category === filterValue;

        if (!shouldShow && !card.classList.contains("hidden")) {
          card.classList.add("hiding");
        }
      });

      // Phase 2: after fade out, swap visibility and stagger entrance
      setTimeout(() => {
        let delay = 0;

        staffCards.forEach((card) => {
          const category = card.getAttribute("data-category");
          const shouldShow = filterValue === "all" || category === filterValue;

          card.classList.remove("hiding", "showing");

          if (!shouldShow) {
            card.classList.add("hidden");
          } else {
            card.classList.remove("hidden");
            card.style.animationDelay = delay + "ms";
            card.classList.add("showing");
            delay += 50;
          }
        });
      }, 300);
    });
  });
});
