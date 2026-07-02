document.addEventListener('DOMContentLoaded', () => {

  // Sticky nav background on scroll
  const nav = document.querySelector('nav');
  const onScroll = () => {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  };
  onScroll();
  window.addEventListener('scroll', onScroll);

  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const navList = document.querySelector('nav ul');
  if (toggle && navList) {
    toggle.addEventListener('click', () => {
      navList.classList.toggle('open');
    });
    // Close menu when a link is clicked
    navList.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navList.classList.remove('open');
      });
    });
  }

  // Booking form submission
  const bookingForm = document.querySelector('#booking-form');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const msg = document.querySelector('.confirm-msg');
      if (msg) {
        msg.textContent = 'Request received — our concierge will confirm your stay by email shortly.';
        msg.classList.add('show');
      }
      bookingForm.reset();
    });
  }

});