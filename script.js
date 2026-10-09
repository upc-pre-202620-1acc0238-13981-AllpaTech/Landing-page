(function () {
  "use strict";

  /* Mobile navigation */
  const headerNav = document.querySelector(".header-nav");
  const navToggle = document.querySelector(".nav-toggle");

  if (navToggle && headerNav) {
    navToggle.addEventListener("click", () => {
      const open = headerNav.classList.toggle("nav-open");
      navToggle.setAttribute("aria-expanded", String(open));
    });

    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", () => {
        headerNav.classList.remove("nav-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* Features accordion — one open at a time; 02 (GPS) open by default per Figma */
  const featuresAccordion = document.getElementById("features-accordion");

  if (featuresAccordion) {
    const items = featuresAccordion.querySelectorAll(".accordion-item");

    function setFeatureOpen(activeItem) {
      items.forEach((item) => {
        const trigger = item.querySelector(".accordion-trigger");
        const panel = item.querySelector(".accordion-panel");
        const icon = item.querySelector(".accordion-icon");
        const isActive = item === activeItem;

        item.classList.toggle("accordion-item--active", isActive);
        trigger?.setAttribute("aria-expanded", String(isActive));

        if (panel) {
          panel.hidden = !isActive;
        }

        if (icon) {
          icon.classList.toggle("accordion-icon--minus", isActive);
          icon.classList.toggle("accordion-icon--plus", !isActive);
        }
      });
    }

    items.forEach((item) => {
      item.querySelector(".accordion-trigger")?.addEventListener("click", () => {
        if (item.classList.contains("accordion-item--active")) return;
        setFeatureOpen(item);
      });
    });
  }

  /* FAQ accordion */
  const faqAccordion = document.getElementById("faq-accordion");

  if (faqAccordion) {
    const faqItems = faqAccordion.querySelectorAll(".faq-item");

    function setFaqOpen(activeItem) {
      faqItems.forEach((item) => {
        const trigger = item.querySelector(".faq-trigger");
        const answer = item.querySelector(".faq-answer");
        const icon = item.querySelector(".faq-icon");
        const isOpen = item === activeItem;

        item.classList.toggle("faq-item--open", isOpen);
        trigger.setAttribute("aria-expanded", String(isOpen));

        if (answer) {
          answer.hidden = !isOpen;
        }

        if (icon) {
          icon.classList.toggle("faq-icon--minus", isOpen);
          icon.classList.toggle("faq-icon--plus", !isOpen);
        }
      });
    }

    faqItems.forEach((item) => {
      item.querySelector(".faq-trigger")?.addEventListener("click", () => {
        const alreadyOpen = item.classList.contains("faq-item--open");
        if (alreadyOpen) {
          item.classList.remove("faq-item--open");
          item.querySelector(".faq-trigger")?.setAttribute("aria-expanded", "false");
          item.querySelector(".faq-answer").hidden = true;
          const icon = item.querySelector(".faq-icon");
          icon?.classList.remove("faq-icon--minus");
          icon?.classList.add("faq-icon--plus");
        } else {
          setFaqOpen(item);
        }
      });
    });
  }

  /* Contact form */
  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }
      alert("Message sent! The AllpaTech team will contact you soon.");
      contactForm.reset();
    });
  }

  /* CTA email form */
  const ctaForm = document.getElementById("cta-form");

  if (ctaForm) {
    ctaForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = ctaForm.querySelector('input[type="email"]');
      if (!input?.value || !input.checkValidity()) {
        input?.focus();
        return;
      }
      alert("Thanks! We'll send download instructions to " + input.value);
      input.value = "";
    });
  }

  /* Smooth offset for fixed feel — anchor links */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
})();
