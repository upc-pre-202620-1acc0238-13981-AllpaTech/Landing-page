(function () {
  "use strict";


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

  /* Testimonials carousel */
  const testimonials = [
    {
      name: "Carlos Estrada",
      image: "assets/f11b7.png",
      role: { en: "20 years of experience", es: "20 años de experiencia" },
      quote: {
        en: "“We improve the interaction between the merchant and the farmer. Thanks to the app, I gained a valuable tool for working safely and reliably, with the confidence to build a long-term business relationship.”",
        es: "“Mejoramos la interacción entre el comerciante y el agricultor. Gracias a la aplicación, obtuve una herramienta valiosa para trabajar de forma segura y confiable, con la confianza para construir una relación comercial a largo plazo.”"
      }
    },
    {
      name: "María Rojas",
      image: "assets/f1bf1.png",
      role: { en: "Quinoa producer", es: "Productora de quinua" },
      quote: {
        en: "“Now every activity in my field is recorded clearly. I can send evidence even without signal and know exactly when each milestone is approved.”",
        es: "“Ahora cada actividad en mi campo queda registrada con claridad. Puedo enviar evidencias incluso sin señal y saber exactamente cuándo se aprueba cada hito.”"
      }
    },
    {
      name: "José Luna",
      image: "assets/1108c.png",
      role: { en: "Agricultural merchant", es: "Comerciante agrícola" },
      quote: {
        en: "“Muyu gives me the context I need before approving a payment. Photos, location and time make production progress easier to verify.”",
        es: "“Muyu me brinda el contexto que necesito antes de aprobar un pago. Las fotos, la ubicación y la hora facilitan la verificación del avance productivo.”"
      }
    },
    {
      name: "Ana Paredes",
      image: "assets/20136.png",
      role: { en: "Corn producer", es: "Productora de maíz" },
      quote: {
        en: "“The milestone plan helps us organize the season and demonstrate the work completed. Payments are clearer for everyone involved.”",
        es: "“El plan por hitos nos ayuda a organizar la campaña y demostrar el trabajo realizado. Los pagos son más claros para todos.”"
      }
    }
  ];

  let activeTestimonial = 0;
  let currentLanguage = "en";
  const testimonialQuote = document.getElementById("testimonial-quote");
  const testimonialName = document.getElementById("testimonial-name");
  const testimonialRole = document.getElementById("testimonial-role");
  const testimonialImage = document.getElementById("testimonial-image");
  const testimonialPeople = document.querySelectorAll("[data-testimonial]");

  function renderTestimonial(index) {
    activeTestimonial = (index + testimonials.length) % testimonials.length;
    const item = testimonials[activeTestimonial];
    if (testimonialQuote) testimonialQuote.textContent = item.quote[currentLanguage];
    if (testimonialName) testimonialName.textContent = item.name;
    if (testimonialRole) testimonialRole.textContent = item.role[currentLanguage];
    if (testimonialImage) {
      testimonialImage.src = item.image;
      testimonialImage.alt = currentLanguage === "es" ? `Testimonio de ${item.name}` : `Testimonial from ${item.name}`;
    }
    testimonialPeople.forEach((button) => {
      button.classList.toggle("testimonial-person--active", Number(button.dataset.testimonial) === activeTestimonial);
    });
  }

  document.getElementById("testimonial-prev")?.addEventListener("click", () => renderTestimonial(activeTestimonial - 1));
  document.getElementById("testimonial-next")?.addEventListener("click", () => renderTestimonial(activeTestimonial + 1));
  testimonialPeople.forEach((button) => button.addEventListener("click", () => renderTestimonial(Number(button.dataset.testimonial))));

  /* English / Spanish language switch */
  const languageToggle = document.getElementById("language-toggle");
  const languageSelector = document.getElementById("language-selector");
  const languageMenu = document.getElementById("language-menu");
  const languageOptions = document.querySelectorAll(".language-option");
  const translations = {
    "Home": "Inicio", "About Muyu": "Sobre Muyu", "Testimonials": "Testimonios", "Plans": "Planes", "Payments": "Pagos", "Contact": "Contacto", "Contact Us": "Contáctanos",
    "Connecting farm": "Conectando el trabajo", "work with verified": "agrícola con progreso", "progress.": "verificado.",
    "Muyu connects farmers and merchants through milestone-based production agreements. Funds remain in Escrow and are released as field progress is verified with GPS and timestamped evidence.": "Muyu conecta a agricultores y comerciantes mediante acuerdos de producción basados en hitos. Los fondos permanecen en Escrow y se liberan cuando el avance en campo se verifica con GPS y evidencias con fecha y hora.",
    "See how it works": "Mira cómo funciona", "How does it work?": "¿Cómo funciona?", "Built around real agricultural progress": "Construido alrededor del progreso agrícola real",
    "How Muyu works": "Cómo funciona Muyu", "Funds held by milestone": "Fondos protegidos por hito", "Contextual field evidence": "Evidencia de campo con contexto", "Evidence without connection": "Evidencia sin conexión", "Progress linked to payments": "Progreso vinculado a pagos",
    "Muyu connects farmers and merchants through production milestones, field evidence and escrow-based payments. Farmers document their work from the field, while merchants review progress before each milestone payment is released.": "Muyu conecta a agricultores y comerciantes mediante hitos de producción, evidencias de campo y pagos con Escrow. Los agricultores documentan su trabajo y los comerciantes revisan el progreso antes de liberar cada pago.",
    "CORE FEATURES": "FUNCIONES PRINCIPALES", "Everything you need to track agricultural progress": "Todo lo que necesitas para seguir el progreso agrícola",
    "Escrow by milestone": "Escrow por hito", "Works offline": "Funciona sin conexión", "Climate alerts": "Alertas climáticas", "Milestone tracking": "Seguimiento de hitos",
    "PRODUCTION PLANS": "PLANES DE PRODUCCIÓN", "Production organized around clear milestones": "Producción organizada alrededor de hitos claros", "Explore all plans": "Explorar todos los planes",
    "HOW IT WORKS": "CÓMO FUNCIONA", "From field work to verified payment": "Del trabajo de campo al pago verificado", "Publish a plot": "Publicar una parcela", "Fund the production": "Financiar la producción", "Complete the field work": "Completar el trabajo de campo", "Submit and review evidence": "Enviar y revisar evidencias", "Approve or request a correction": "Aprobar o solicitar una corrección",
    "PAYMENTS": "PAGOS", "Payments protected at every milestone": "Pagos protegidos en cada hito", "Learn about payments": "Conoce los pagos", "Funds secured": "Fondos protegidos", "Evidence approved": "Evidencia aprobada", "Payment released": "Pago liberado",
    "Production funds remain secured in Escrow and are released progressively, only after the evidence for each milestone has been reviewed and approved.": "Los fondos de producción permanecen protegidos en Escrow y se liberan progresivamente, solo después de revisar y aprobar la evidencia de cada hito.",
    "The merchant funds the production plan and the money remains protected in Escrow.": "El comerciante financia el plan de producción y el dinero permanece protegido en Escrow.", "Field evidence is reviewed before approving the corresponding production milestone.": "La evidencia de campo se revisa antes de aprobar el hito de producción correspondiente.", "Once approved, the milestone payment is released to the farmer with a clear record for both parties.": "Una vez aprobado, el pago del hito se libera al agricultor con un registro claro para ambas partes.",
    "For Farmers": "PARA AGRICULTORES", "FOR MERCHANTS": "PARA COMERCIANTES", "Turn field work into visible progress": "Convierte el trabajo de campo en progreso visible", "Follow production before approving each milestone": "Sigue la producción antes de aprobar cada hito",
    "FAQ's": "PREGUNTAS FRECUENTES", "Frequently Asked Questions": "Preguntas frecuentes", "Contact us": "Contáctanos", "What is Muyu?": "¿Qué es Muyu?", "How does Escrow work?": "¿Cómo funciona Escrow?", "What happens if a milestone is not approved?": "¿Qué sucede si un hito no es aprobado?", "What information is included in field evidence?": "¿Qué información incluye la evidencia de campo?", "Can farmers use Muyu without internet access?": "¿Los agricultores pueden usar Muyu sin internet?", "What is a production plan?": "¿Qué es un plan de producción?", "When is a milestone payment released?": "¿Cuándo se libera el pago de un hito?", "Does Muyu provide climate alerts?": "¿Muyu ofrece alertas climáticas?",
    "Take Muyu to the field": "Lleva Muyu al campo", "Download the app": "Descarga la app", "Let's talk about Muyu": "Hablemos de Muyu", "Email us:": "Escríbenos:", "Who can contact us?": "¿Quién puede contactarnos?", "Name": "Nombre", "Email": "Correo", "Phone": "Teléfono", "Subject": "Asunto", "Tell us what you are interested in": "Cuéntanos qué te interesa", "Send message": "Enviar mensaje", "Send to us": "Envíanoslo",
    "Manage agricultural progress, field evidence and milestone status directly from your phone.": "Gestiona el progreso agrícola, las evidencias de campo y el estado de los hitos directamente desde tu teléfono.",
    "Have a question about Muyu, production plans or how the platform works? Send us a message and the AllpaTech team will get in touch with you.": "¿Tienes una pregunta sobre Muyu, los planes de producción o el funcionamiento de la plataforma? Envíanos un mensaje y el equipo de AllpaTech se pondrá en contacto contigo.",
    "Platform": "Plataforma", "Company": "Empresa", "Get the app": "Obtén la app", "Product": "Producto", "For users": "Para usuarios", "Help": "Ayuda", "For farmers": "Para agricultores", "For merchants": "Para comerciantes", "Information": "Información", "Pricing": "Precios", "Terms and Conditions": "Términos y condiciones", "Privacy Policy": "Política de privacidad", "Term of Service": "Términos del servicio", "A product by AllpaTech.": "Un producto de AllpaTech.", "Core features": "Funciones principales", "Production plans": "Planes de producción", "How it works": "Cómo funciona"
  };
  const reverseTranslations = Object.fromEntries(Object.entries(translations).map(([en, es]) => [es, en]));

  function translateTextNodes(dictionary) {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach((node) => {
      if (node.parentElement?.closest("script, style")) return;
      const value = node.nodeValue;
      const trimmed = value.trim();
      if (!trimmed || !dictionary[trimmed]) return;
      node.nodeValue = value.replace(trimmed, dictionary[trimmed]);
    });
  }

  function setLanguage(language) {
    if (language === currentLanguage) {
      if (languageMenu) languageMenu.hidden = true;
      languageToggle?.setAttribute("aria-expanded", "false");
      return;
    }
    translateTextNodes(language === "es" ? translations : reverseTranslations);
    currentLanguage = language;
    document.documentElement.lang = language;
    if (languageToggle) {
      const flag = languageToggle.querySelector(".language-flag");
      if (flag) flag.src = language === "en" ? "assets/eeuu.png" : "assets/peru.png";
      languageToggle.setAttribute("aria-label", language === "en" ? "Select language, current language: English" : "Seleccionar idioma, idioma actual: español");
    }
    languageOptions.forEach((option) => {
      option.setAttribute("aria-checked", String(option.dataset.language === language));
    });
    if (languageMenu) languageMenu.hidden = true;
    languageToggle?.setAttribute("aria-expanded", "false");
    document.querySelector('[name="name"]')?.setAttribute("placeholder", language === "es" ? "Tu nombre" : "Your name");
    document.querySelector('[name="phone"]')?.setAttribute("placeholder", language === "es" ? "Tu teléfono" : "Your phone");
    document.querySelector('[name="subject"]')?.setAttribute("placeholder", language === "es" ? "¿Cómo podemos ayudarte?" : "How can we help?");
    document.querySelector('[name="message"]')?.setAttribute("placeholder", language === "es" ? "Escribe tu mensaje" : "Write your message");
    renderTestimonial(activeTestimonial);
  }

  languageToggle?.addEventListener("click", () => {
    const open = languageToggle.getAttribute("aria-expanded") !== "true";
    languageToggle.setAttribute("aria-expanded", String(open));
    if (languageMenu) languageMenu.hidden = !open;
  });
  languageOptions.forEach((option) => {
    option.addEventListener("click", () => {
      const language = option.dataset.language;
      if (language === "en" || language === "es") setLanguage(language);
    });
  });
  document.addEventListener("click", (event) => {
    if (languageSelector && !languageSelector.contains(event.target)) {
      if (languageMenu) languageMenu.hidden = true;
      languageToggle?.setAttribute("aria-expanded", "false");
    }
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && languageToggle?.getAttribute("aria-expanded") === "true") {
      if (languageMenu) languageMenu.hidden = true;
      languageToggle.setAttribute("aria-expanded", "false");
      languageToggle.focus();
    }
  });
  document.getElementById("footer-language")?.addEventListener("click", () => setLanguage(currentLanguage === "en" ? "es" : "en"));
  languageOptions.forEach((option) => {
    option.setAttribute("aria-checked", String(option.dataset.language === currentLanguage));
  });

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
