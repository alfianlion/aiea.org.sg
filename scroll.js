/* AIEA homepage â€” scroll choreography
   - Nav state on scroll
   - IntersectionObserver reveals (staggered)
   - Hero parallax + fade-out (Apple-style pinned feel)
   - Background parallax on objectives + photo band
   - Animated stat counters
   Respects prefers-reduced-motion.
*/
(function () {
  "use strict";

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Mobile menu ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.querySelector(".mobile-menu");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      menu.classList.toggle("is-open", !open);
      document.body.style.overflow = open ? "" : "hidden";
    });
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        toggle.setAttribute("aria-expanded", "false");
        menu.classList.remove("is-open");
        document.body.style.overflow = "";
      });
    });
  }

  /* ---------- Hero headline word-by-word mask reveal ---------- */
  var heroH1 = document.querySelector(".hero h1");
  if (heroH1 && !reducedMotion) {
    var words = heroH1.textContent.trim().split(/\s+/);
    // No orphan word: glue the last two words into one unbreakable span
    if (words.length > 2) {
      var last = words.pop();
      words[words.length - 1] += "\u00A0" + last;
    }
    heroH1.textContent = "";
    words.forEach(function (word, i) {
      var outer = document.createElement("span");
      outer.className = "w";
      var inner = document.createElement("span");
      inner.textContent = word;
      inner.style.setProperty("--w-delay", (0.25 + i * 0.07) + "s");
      outer.appendChild(inner);
      heroH1.appendChild(outer);
      if (i < words.length - 1) heroH1.appendChild(document.createTextNode(" "));
    });
    heroH1.classList.add("is-split");
  }

  /* ---------- Header scrolled state ---------- */
  var header = document.querySelector(".site-header");
  function updateHeader() {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 24);
  }
  updateHeader();

  /* ---------- Reveal on scroll (scroll-linked: reverses when scrolling back) ---------- */
  var revealEls = document.querySelectorAll(".reveal, .reveal-fade");
  if ("IntersectionObserver" in window && !reducedMotion) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          // Toggle, don't unobserve â€” animations replay in both scroll directions
          entry.target.classList.toggle("is-revealed", entry.isIntersecting);
        });
      },
      { threshold: 0.15, rootMargin: "6% 0px -6% 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-revealed"); });
  }

  /* ---------- Stat counters ---------- */
  function animateCount(el) {
    var target = parseInt(el.getAttribute("data-count"), 10);
    var suffix = el.getAttribute("data-suffix") || "";
    var dur = 1400;
    var start = null;
    function frame(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }
  var counters = document.querySelectorAll("[data-count]");
  if (counters.length) {
    if ("IntersectionObserver" in window && !reducedMotion) {
      var cio = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              animateCount(entry.target);
              cio.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.6 }
      );
      counters.forEach(function (el) { cio.observe(el); });
    } else {
      counters.forEach(function (el) {
        el.textContent = el.getAttribute("data-count") + (el.getAttribute("data-suffix") || "");
      });
    }
  }

  /* ---------- Parallax (rAF-throttled) ---------- */
  var heroBg = document.querySelector(".hero-bg");
  var heroContent = document.querySelector(".hero-content");
  var hero = document.querySelector(".hero");
  var objectivesBg = document.querySelector(".objectives-bg");
  var objectives = document.querySelector(".objectives");
  var photoBandImg = document.querySelector(".photo-band-img");
  var photoBand = document.querySelector(".photo-band");
  var driftEls = Array.prototype.slice.call(document.querySelectorAll("[data-drift]"));

  var ticking = false;

  function parallax() {
    ticking = false;
    var y = window.scrollY;
    var vh = window.innerHeight;

    // Hero: bg moves slower (parallax), content drifts up + fades (Apple-style)
    if (hero && y < vh * 1.2) {
      // bg: parallax drift + subtle zoom as you scroll (Apple-style)
      var zoom = 1 + Math.min(y / vh, 1) * 0.08;
      if (heroBg) heroBg.style.transform = "translateY(" + y * 0.35 + "px) scale(" + zoom + ")";
      if (heroContent) {
        var p = Math.min(y / (vh * 0.7), 1);
        heroContent.style.transform = "translateY(" + y * 0.14 + "px)";
        heroContent.style.opacity = String(1 - p * 0.9);
      }
    }

    // Objectives bg drift
    if (objectives && objectivesBg) {
      var r = objectives.getBoundingClientRect();
      if (r.top < vh && r.bottom > 0) {
        var prog = (vh - r.top) / (vh + r.height);
        objectivesBg.style.transform = "translateY(" + (prog - 0.5) * 60 + "px)";
      }
    }

    // Photo band: parallax + settle-zoom (1.12 â†’ 1.0 as it crosses the viewport)
    if (photoBand && photoBandImg) {
      var pr = photoBand.getBoundingClientRect();
      if (pr.top < vh && pr.bottom > 0) {
        var pp = (vh - pr.top) / (vh + pr.height);
        var pz = 1.12 - Math.min(Math.max(pp, 0), 1) * 0.12;
        photoBandImg.style.transform = "translateY(" + (pp - 0.5) * 90 + "px) scale(" + pz + ")";
      }
    }
    // Depth drift: elements move at different speeds relative to viewport center,
    // in both scroll directions (Apple-style scroll-linked motion)
    for (var i = 0; i < driftEls.length; i++) {
      var el = driftEls[i];
      var dr = el.getBoundingClientRect();
      if (dr.top < vh && dr.bottom > 0) {
        var offset = (dr.top + dr.height / 2) - vh / 2;
        var coef = parseFloat(el.getAttribute("data-drift")) || 0;
        el.style.transform = "translateY(" + (offset * coef).toFixed(1) + "px)";
      }
    }
  }

  function onScroll() {
    updateHeader();
    if (reducedMotion) return;
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(parallax);
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  if (!reducedMotion) parallax();

  /* ---------- Active nav section tracking ---------- */
  var navLinks = document.querySelectorAll(".nav-links a[href^='#']");
  var sections = [];
  navLinks.forEach(function (a) {
    var id = a.getAttribute("href").slice(1);
    var el = document.getElementById(id);
    if (el) sections.push({ el: el, a: a });
  });
  if (sections.length && "IntersectionObserver" in window) {
    var navIo = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            navLinks.forEach(function (a) { a.classList.remove("is-active"); });
            sections.forEach(function (s) {
              if (s.el === entry.target) s.a.classList.add("is-active");
            });
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    sections.forEach(function (s) { navIo.observe(s.el); });
  }

  /* ---------- Footer year ---------- */
  var yrEl = document.getElementById("footer-year");
  if (yrEl) yrEl.textContent = new Date().getFullYear();
})();