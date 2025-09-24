// Burger menu
const burger = document.getElementById("burger");
const nav = document.getElementById("nav");
const body = document.getElementById("top");
const aboutHeader = document.getElementById("header-about");
const phoneHeader = document.getElementById("header-phone");
const contactsHeader = document.getElementById("header-contacts");
const sslCert = document.getElementById("ssl-cert");

burger?.addEventListener("click", () => {
  burger.classList.toggle("active");
  body.classList.toggle("lock");
  aboutHeader.classList.toggle("hide");
  phoneHeader.classList.toggle("hide");
  sslCert.classList.toggle("hide");
  contactsHeader.classList.toggle("show");
  const open = nav.classList.toggle("open");
  burger.setAttribute("aria-expanded", open ? "true" : "false");
});
// Close menu on link click (mobile)
nav?.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    if (nav.classList.contains("open")) {
      nav.classList.remove("open");
      burger.classList.remove("active");
      body.classList.remove("lock");
      aboutHeader.classList.remove("hide");
      phoneHeader.classList.remove("hide");
      sslCert.classList.remove("hide");
      contactsHeader.classList.remove("show");
      burger.setAttribute("aria-expanded", "false");
    }
  })
);


 // FAQ toggle
  document.querySelectorAll(".faq-item").forEach(item => {
    item.addEventListener("click", () => {
      const p = item.querySelector("p");
      item.classList.toggle("active");
      p.style.display = (p.style.display === "block") ? "none" : "block";
    });
  });
    // Анімація появи при скролі
    const sections = document.querySelectorAll("section, footer");
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    }, { threshold: 0.2 });

    sections.forEach(sec => observer.observe(sec));

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) =>
  anchor.addEventListener("click", function (e) {
    const id = this.getAttribute("href");
    if (id.length > 1) {
      const el = document.querySelector(id);
      if (el) {
        e.preventDefault();
        window.scrollTo({ top: el.offsetTop - 70, behavior: "smooth" });
      }
    }
  })
);
// Year
document.getElementById("y").textContent = new Date().getFullYear();


// // Swiper
// const swiper = new Swiper(".swiper", {
//   // Optional parameters
//   spaceBetween: 30,
//   centeredSlides: true,
//   effect: "fade",
//   centeredSlides: true,
//   loop: true,
//   // navigation: false,
//   noSwipingClass: "swiper-slide",
//   slidesPerView: "auto",
//   spaceBetween: 15,
//   speed: 2500,
//   autoplay: {
//     delay: 11000,
//     disableOnInteraction: false,
//     reverseDirection: false,
//   },
//   keyboard: {
//     enabled: true,
//   },
//   // If we need pagination
//   pagination: {
//     el: ".swiper-pagination",
//     clickable: true,
//   },

//   // Navigation arrows
//   navigation: {
//     nextEl: ".swiper-button-next",
//     prevEl: ".swiper-button-prev",
//   },

//   // And if we need scrollbar
//   scrollbar: {
//     el: ".swiper-scrollbar",
//   },
// });

// Form send message to WhatsApp and Messenger
function getFormData() {
  const form = document.getElementById("contactForm");
  const formData = new FormData(form);
  const name = formData.get("name");
  // const email = formData.get("email");
  const message = formData.get("message");

  return { name, message };
}

// Scroll to top
const scrollTop = document.getElementById("scrollTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 500) {
    scrollTop.classList.add("show");
  } else {
    scrollTop.classList.remove("show");
  }
});

scrollTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// // Hide overlay after 3 seconds with fade-out
// window.addEventListener("DOMContentLoaded", () => {
//   setTimeout(() => {
//     const overlay = document.getElementById("consent-overlay");
//     overlay.style.opacity = "0";
//     // Remove from DOM after transition
//     setTimeout(() => overlay.remove(), 600);
//   }, 3000);
// });

// Add class hide after 3 seconds with transition 
const linkCross = document.getElementById("cross-link");
window.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    linkCross.classList.add("hide");
  }, 4000);
});

linkCross?.addEventListener("click", () => {
  linkCross.classList.toggle("hide");
  linkCross.classList.toggle("show");
  setTimeout(() => {
    linkCross.classList.remove("show");
    linkCross.classList.add("hide");
  }, 4000);
});