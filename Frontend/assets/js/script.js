const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('show');
  });

const slides = document.querySelectorAll('.hero-slider .slide');
let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    if (i === index) slide.classList.add('active');
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

setInterval(nextSlide, 5000); // Change slide every 5 seconds

document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();
    let valid = true;

    this.querySelectorAll(".form-group").forEach((group) => {
      const input = group.querySelector("input, textarea");
      const error = group.querySelector(".error-msg");

      if (!input.checkValidity()) {
        error.style.display = "block";
        valid = false;
      } else {
        error.style.display = "none";
      }
    });

    if (valid) {
      alert("Message sent successfully!");
      this.reset();
    }
  });

var swiper = new Swiper(".caseSwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      768: {
        slidesPerView: 2
      },
      1024: {
        slidesPerView: 3
      }
    }
  });