const hamburger = document.getElementById('hamburger-btn');
const mobileNav = document.getElementById('mobile-nav');
const closeBtn = document.getElementById('mobile-nav-close');
const mobileNavOverlay = document.getElementById('mobile-nav-overlay');
const body = document.body;

// Hamburger toggle for professional animated menu
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  mobileNav.classList.toggle('active');
  if (closeBtn) closeBtn.classList.toggle('active');
  if (mobileNav.classList.contains('active')) {
    mobileNavOverlay.style.display = 'block';
    body.classList.add('menu-open');
  } else {
    mobileNavOverlay.style.display = 'none';
    body.classList.remove('menu-open');
  }
});

// Keyboard accessibility for hamburger
hamburger.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    hamburger.click();
  }
});

document.addEventListener('click', (e) => {
  if (!hamburger.contains(e.target) && !mobileNav.contains(e.target) && e.target !== mobileNavOverlay) {
    hamburger.classList.remove('active');
    mobileNav.classList.remove('active');
    if (closeBtn) closeBtn.classList.remove('active');
    mobileNavOverlay.style.display = 'none';
    body.classList.remove('menu-open');
  }
});

if (closeBtn) {
  closeBtn.addEventListener('click', () => {
    hamburger.classList.remove('active');
    mobileNav.classList.remove('active');
    closeBtn.classList.remove('active');
    mobileNavOverlay.style.display = 'none';
    body.classList.remove('menu-open');
  });
}

if (mobileNavOverlay) {
  mobileNavOverlay.addEventListener('click', () => {
    hamburger.classList.remove('active');
    mobileNav.classList.remove('active');
    if (closeBtn) closeBtn.classList.remove('active');
    mobileNavOverlay.style.display = 'none';
    body.classList.remove('menu-open');
  });
}

// HERO IMAGE SLIDER
const heroSlides = document.querySelectorAll('.hero-slide');
const heroPrevBtn = document.querySelector('.hero-prev');
const heroNextBtn = document.querySelector('.hero-next');
const indicators = document.querySelectorAll('.indicator');
let heroCurrent = 0;
let heroInterval = setInterval(nextHeroSlide, 1500);

function updateHeroSlider() {
  heroSlides.forEach((slide, idx) => {
    slide.classList.remove('active');
    indicators[idx].classList.remove('active');
  });
  heroSlides[heroCurrent].classList.add('active');
  indicators[heroCurrent].classList.add('active');
}

function nextHeroSlide() {
  heroCurrent = (heroCurrent + 1) % heroSlides.length;
  updateHeroSlider();
}

function prevHeroSlide() {
  heroCurrent = (heroCurrent - 1 + heroSlides.length) % heroSlides.length;
  updateHeroSlider();
}

// Add click events to indicators
indicators.forEach((indicator, idx) => {
  indicator.addEventListener('click', () => {
    heroCurrent = idx;
    updateHeroSlider();
    resetHeroInterval();
  });
});

if(heroPrevBtn && heroNextBtn) {
  heroPrevBtn.addEventListener('click', () => {
    prevHeroSlide();
    resetHeroInterval();
  });

  heroNextBtn.addEventListener('click', () => {
    nextHeroSlide();
    resetHeroInterval();
  });

  updateHeroSlider();
}

function resetHeroInterval() {
  clearInterval(heroInterval);
  heroInterval = setInterval(nextHeroSlide, 1500);
}

// Pause auto-play on hover
const heroSection = document.querySelector('.hero');
if (heroSection) {
  heroSection.addEventListener('mouseenter', () => clearInterval(heroInterval));
  heroSection.addEventListener('mouseleave', resetHeroInterval);
}

// Page Transition
function transitionToLink(event) {
  event.preventDefault();
  const loader = document.querySelector('.loader');
  loader.classList.add('loader--active');
  setTimeout(() => window.location.href = 'link.html', 2000);
}

// Add click event to the contact button
document.querySelector('.cta').addEventListener('click', transitionToLink);

// Add click events to mobile nav links
const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
mobileNavLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileNav.classList.add('menu-closing');
    setTimeout(() => {
      hamburger.classList.remove('active');
      mobileNav.classList.remove('active', 'menu-closing');
      mobileNavOverlay.style.display = 'none';
      body.classList.remove('menu-open');
    }, 400); // Match animation duration
  });
});

document.addEventListener('DOMContentLoaded', function() {
  // AOS Animation Init
  if (window.AOS) {
    AOS.init({
      once: true,
      duration: 1000,
      easing: 'ease-in-out',
    });
  }

  // Header scroll effect
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Contact transition
  window.transitionToLink = function(event) {
    event.preventDefault();
    const loader = document.querySelector('.loader');
    loader.classList.add('loader--active');
    setTimeout(() => window.location.href = 'link.html', 2000);
  };

  // Add click event to the contact button
  const ctaBtn = document.querySelector('.cta');
  if (ctaBtn) ctaBtn.addEventListener('click', window.transitionToLink);

  // Hero image click scroll to produk section (with header offset)
  document.querySelectorAll('.hero-image').forEach(image => {
    image.addEventListener('click', () => {
      const produkSection = document.querySelector('#produk');
      const header = document.querySelector('header');
      const headerHeight = header.offsetHeight;
      const sectionTop = produkSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      window.scrollTo({
        top: sectionTop,
        behavior: 'smooth'
      });
    });
  });

  // Adjust scroll for all anchor links to account for fixed header
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href.length > 1 && document.querySelector(href)) {
        e.preventDefault();
        const header = document.querySelector('header');
        const headerHeight = header.offsetHeight;
        const target = document.querySelector(href);
        const targetTop = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        window.scrollTo({
          top: targetTop,
          behavior: 'smooth'
        });
      }
    });
  });
});