document.addEventListener('DOMContentLoaded', function() {
  const header = document.getElementById('site-header');
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');
  const revealElements = document.querySelectorAll('.reveal-element');
  
  // Toggle mobile menu
  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !expanded);
      nav.classList.toggle('active');
      document.body.classList.toggle('menu-open');
    });
  }
  
  // Header scroll effect
  function handleScroll() {
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Reveal elements on scroll
    revealElements.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      const elementHeight = el.offsetHeight;
      const windowHeight = window.innerHeight;
      
      if (elementTop < windowHeight - elementHeight / 4) {
        el.classList.add('visible');
      }
    });
  }
  
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Initial check
  
  // Smooth scroll to anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset;
        
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (nav.classList.contains('active')) {
          menuToggle.setAttribute('aria-expanded', 'false');
          nav.classList.remove('active');
          document.body.classList.remove('menu-open');
        }
      }
    });
  });
  
  // Form validation
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      let hasError = false;
      const inputs = this.querySelectorAll('input, textarea');
      
      inputs.forEach(input => {
        if (input.hasAttribute('required') && !input.value.trim()) {
          hasError = true;
          input.classList.add('error');
        } else {
          input.classList.remove('error');
        }
      });
      
      const emailInput = this.querySelector('input[type="email"]');
      if (emailInput && emailInput.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
          hasError = true;
          emailInput.classList.add('error');
        }
      }
      
      if (hasError) {
        e.preventDefault();
      }
    });
  }
});
