(() => {
  const switcher = document.querySelector(".program-switcher");
  const current = switcher?.querySelector('[aria-current="page"]');

  if (!switcher || !current) return;

  const centerCurrent = () => {
    if (switcher.scrollWidth <= switcher.clientWidth + 1) return;
    current.scrollIntoView({
      behavior: "instant",
      block: "nearest",
      inline: "center",
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", centerCurrent, { once: true });
  } else {
    centerCurrent();
  }
})();
