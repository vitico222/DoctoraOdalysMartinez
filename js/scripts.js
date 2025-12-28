// Set footer year
const yearElement = document.getElementById("year");
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// Dark mode toggle
const toggle = document.querySelector(".dark-mode-toggle");
if (toggle) {
  const isDarkMode = localStorage.getItem("darkMode") === "true";
  if (isDarkMode) {
    document.body.classList.add("dark-mode");
  }
  toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem(
      "darkMode",
      document.body.classList.contains("dark-mode")
    );
  });
}

// Hamburger menu toggle
const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector('nav[role="navigation"]');
if (hamburger && nav) {
  // Alternar menú al hacer clic
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    nav.classList.toggle("active");
  });

  // Soporte para teclado (Enter o Espacio)
  hamburger.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      hamburger.classList.toggle("active");
      nav.classList.toggle("active");
    }
  });

  // Cerrar menú al hacer clic en un enlace (usando delegación de eventos)
  nav.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      hamburger.classList.remove("active");
      nav.classList.remove("active");
    }
  });

  // Cerrar menú al hacer clic fuera
  document.addEventListener("click", (e) => {
    if (
      nav.classList.contains("active") &&
      !nav.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      hamburger.classList.remove("active");
      nav.classList.remove("active");
    }
  });
}

// Back-to-top button
const backToTop = document.querySelector(".back-to-top");
const triggerSection =
  document.querySelector("#acerca") ||
  document.querySelector(".conference-info-section") ||
  document.querySelector(".resources-section");
if (backToTop && triggerSection) {
  window.addEventListener("scroll", () => {
    const sectionTop = triggerSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    if (sectionTop < windowHeight) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }
  });
  backToTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// Scroll to poster on conf-info.html
if (window.location.pathname.includes("conf-info.html")) {
  window.addEventListener("load", () => {
    const hash = window.location.hash;
    if (hash) {
      const targetPoster = document.querySelector(hash);
      if (targetPoster) {
        targetPoster.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  });
}

// Smooth scrolling for all anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Highlight active nav link
document.querySelectorAll('nav[role="navigation"] ul li a').forEach((link) => {
  if (
    link.href.includes("conferencias") &&
    window.location.pathname.includes("conf-info.html")
  ) {
    link.classList.add("active");
  } else if (
    link.href.includes("recursos.html") &&
    window.location.pathname.includes("recursos.html")
  ) {
    link.classList.add("active");
  }
});

// Descargar recurso Guia

// Descargar recurso Guia con AJAX (evita mensaje de Netlify)
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("descarga-form");
  const mensajeExito = document.getElementById("mensaje-exito");
  const pdfUrl = "/resources/ebook.pdf";
  const pdfNombre = "Guia-Tus-Primeros-Pasos-Dra-Odalys-Martinez.pdf";

  if (form && mensajeExito) {
    form.addEventListener("submit", function (e) {
      e.preventDefault(); // Evita el envío normal y el mensaje de Netlify

      // Envío AJAX a Netlify
      const formData = new FormData(form);
      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString(),
      })
        .then(() => {
          // Éxito: oculta form, muestra mensaje y descarga PDF
          form.style.display = "none";
          mensajeExito.style.display = "block";

          const link = document.createElement("a");
          link.href = pdfUrl;
          link.download = pdfNombre;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Hubo un error al enviar. Intenta de nuevo.");
        });
    });
  }
});
