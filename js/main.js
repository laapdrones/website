/* =============================================
   LAAP — main.js
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* --- Mobile menu toggle --- */
  const hamburger   = document.querySelector('.nav__hamburger');
  const mobileMenu  = document.querySelector('.nav__mobile');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
  }

  /* --- Mobile dropdown toggles --- */
  document.querySelectorAll('.nav__mobile-toggle').forEach(toggle => {
    toggle.addEventListener('click', () => {
      const sub = toggle.nextElementSibling;
      if (sub) sub.classList.toggle('open');
    });
  });

  /* --- Close mobile menu on link click --- */
  document.querySelectorAll('.nav__mobile a').forEach(link => {
    link.addEventListener('click', () => {
      if (mobileMenu) mobileMenu.classList.remove('open');
      if (hamburger)  hamburger.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  /* --- Hero carousel --- */
  const slides = document.querySelectorAll('.hero__slide');
  const dots   = document.querySelectorAll('.hero__dot');

  if (slides.length > 0) {
    let current = 0;

    function goTo(index) {
      slides[current].classList.remove('active');
      dots[current]?.classList.remove('active');
      current = index;
      slides[current].classList.add('active');
      dots[current]?.classList.add('active');
    }

    // Auto-advance every 5s
    let timer = setInterval(() => {
      goTo((current + 1) % slides.length);
    }, 5000);

    // Dot click
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        clearInterval(timer);
        goTo(i);
        timer = setInterval(() => {
          goTo((current + 1) % slides.length);
        }, 5000);
      });
    });
  }

  /* --- Active nav link --- */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__links a, .nav__dropdown-menu a').forEach(link => {
    const linkPath = link.getAttribute('href');
    if (linkPath === currentPath) {
      link.closest('li')?.classList.add('active');
    }
  });

});
