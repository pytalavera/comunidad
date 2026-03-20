/**
 * PyTalavera - Main JavaScript
 * Navigation, mobile menu, smooth scrolling, and interactions
 */

(function() {
  'use strict';

  /**
   * Initialize all functionality
   */
  function init() {
    initMobileMenu();
    initSmoothScroll();
    initScrollEffects();
    initActiveNavigation();
    initLazyLoading();
    initIntersectionObserver();
    initParallax();
    initCardTilt();
  }

  /**
   * Mobile Menu Toggle
   */
  function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuOverlay = document.querySelector('.mobile-menu-overlay');
    const menuLinks = document.querySelectorAll('.mobile-menu a');

    if (!menuToggle || !mobileMenu || !menuOverlay) return;

    // Toggle menu on button click
    menuToggle.addEventListener('click', () => {
      toggleMobileMenu();
    });

    // Close menu on overlay click
    menuOverlay.addEventListener('click', () => {
      closeMobileMenu();
    });

    // Close menu on link click
    menuLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeMobileMenu();
      });
    });

    // Close menu on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        closeMobileMenu();
      }
    });
  }

  function toggleMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuOverlay = document.querySelector('.mobile-menu-overlay');

    menuToggle.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    menuOverlay.classList.toggle('active');

    // Toggle body scroll
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';

    // Update aria-expanded
    const isExpanded = mobileMenu.classList.contains('active');
    menuToggle.setAttribute('aria-expanded', isExpanded);
  }

  function closeMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuOverlay = document.querySelector('.mobile-menu-overlay');

    menuToggle.classList.remove('active');
    mobileMenu.classList.remove('active');
    menuOverlay.classList.remove('active');
    document.body.style.overflow = '';
    menuToggle.setAttribute('aria-expanded', 'false');
  }

  /**
   * Smooth Scrolling for Anchor Links
   */
  function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');

        // Skip if href is just "#"
        if (href === '#') return;

        const targetElement = document.querySelector(href);

        if (targetElement) {
          e.preventDefault();

          // Get header height for offset
          const header = document.querySelector('.site-header');
          const headerHeight = header ? header.offsetHeight : 0;

          // Calculate scroll position
          const targetPosition = targetElement.offsetTop - headerHeight - 20;

          // Smooth scroll
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });

          // Update URL without jumping
          history.pushState(null, '', href);

          // Focus the target element for accessibility
          targetElement.focus({ preventScroll: true });
        }
      });
    });
  }

  /**
   * Scroll Effects (header shadow, etc.)
   */
  function initScrollEffects() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    function updateHeaderOnScroll() {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Initial check
    updateHeaderOnScroll();

    // Listen for scroll events (throttled)
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateHeaderOnScroll();
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  /**
   * Active Navigation Highlighting
   */
  function initActiveNavigation() {
    const navLinks = document.querySelectorAll('.main-nav a, .mobile-menu a');
    const currentPath = window.location.pathname;

    navLinks.forEach(link => {
      const linkPath = new URL(link.href).pathname;

      // Check if current page
      if (linkPath === currentPath || (currentPath.endsWith('/') && linkPath === currentPath + 'index.html')) {
        link.classList.add('active');
      }
    });
  }

  /**
   * Lazy Loading for Images
   */
  function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');

    // If browser doesn't support native lazy loading, use Intersection Observer
    if ('loading' in HTMLImageElement.prototype) {
      // Native lazy loading supported, no need for additional code
      return;
    }

    // Fallback for browsers without native lazy loading
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.add('loaded');
          observer.unobserve(img);
        }
      });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
  }

  /**
   * Intersection Observer for Fade-In Animations with Stagger
   */
  function initIntersectionObserver() {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) return; // Skip animations if user prefers reduced motion

    // Elements to animate on scroll
    const animatedElements = document.querySelectorAll('.card, .team-member-card, .event-card, .blog-post-card, .section-header');

    if (animatedElements.length === 0) return;

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Add stagger delay based on index
          const delay = parseInt(entry.target.dataset.delay) || index * 100;

          setTimeout(() => {
            entry.target.classList.add('fade-in');
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, delay);

          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    animatedElements.forEach((element, index) => {
      // Set initial state
      element.style.opacity = '0';
      element.style.transform = 'translateY(30px)';
      element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';

      // Store index for stagger delay
      element.dataset.delay = index * 100;

      // Observe element
      observer.observe(element);
    });
  }

  /**
   * Parallax Effect for Hero Background
   */
  function initParallax() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const hero = document.querySelector('.hero');
    if (!hero) return;

    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.pageYOffset;
          const heroPattern = hero.querySelector('::before');

          // Apply parallax transform to hero pseudo-element via CSS variable
          hero.style.setProperty('--scroll-y', `${scrolled * 0.5}px`);

          ticking = false;
        });
        ticking = true;
      }
    });
  }

  /**
   * 3D Tilt Effect for Cards
   */
  function initCardTilt() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const tiltCards = document.querySelectorAll('.card-tilt');

    tiltCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
      });
    });
  }

  /**
   * Utility: Debounce function
   */
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  /**
   * Utility: Throttle function
   */
  function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  /**
   * Form Validation (if forms are embedded)
   */
  function initFormValidation() {
    const forms = document.querySelectorAll('form[data-validate]');

    forms.forEach(form => {
      form.addEventListener('submit', (e) => {
        if (!validateForm(form)) {
          e.preventDefault();
        }
      });

      // Real-time validation
      const inputs = form.querySelectorAll('input, textarea, select');
      inputs.forEach(input => {
        input.addEventListener('blur', () => {
          validateField(input);
        });
      });
    });
  }

  function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input, textarea, select');

    inputs.forEach(input => {
      if (!validateField(input)) {
        isValid = false;
      }
    });

    return isValid;
  }

  function validateField(field) {
    const value = field.value.trim();
    const type = field.type;
    const required = field.hasAttribute('required');

    // Clear previous error
    clearFieldError(field);

    // Required field check
    if (required && value === '') {
      showFieldError(field, 'Este campo es requerido / This field is required');
      return false;
    }

    // Email validation
    if (type === 'email' && value !== '') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        showFieldError(field, 'Email inválido / Invalid email');
        return false;
      }
    }

    // URL validation
    if (type === 'url' && value !== '') {
      try {
        new URL(value);
      } catch {
        showFieldError(field, 'URL inválida / Invalid URL');
        return false;
      }
    }

    return true;
  }

  function showFieldError(field, message) {
    field.classList.add('error');

    const errorElement = document.createElement('span');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    errorElement.style.color = 'var(--color-secondary)';
    errorElement.style.fontSize = 'var(--font-size-sm)';
    errorElement.style.display = 'block';
    errorElement.style.marginTop = 'var(--spacing-xs)';

    field.parentElement.appendChild(errorElement);
  }

  function clearFieldError(field) {
    field.classList.remove('error');

    const errorElement = field.parentElement.querySelector('.field-error');
    if (errorElement) {
      errorElement.remove();
    }
  }

  /**
   * External Links - Open in New Tab
   */
  function initExternalLinks() {
    const links = document.querySelectorAll('a[href^="http"]');

    links.forEach(link => {
      const url = new URL(link.href);

      // If external link (different domain)
      if (url.hostname !== window.location.hostname) {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');

        // Add visual indicator (optional)
        link.classList.add('external-link');
      }
    });
  }

  /**
   * Back to Top Button
   */
  function initBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');
    if (!backToTopButton) return;

    // Show/hide button based on scroll position
    window.addEventListener('scroll', throttle(() => {
      if (window.scrollY > 500) {
        backToTopButton.classList.add('visible');
      } else {
        backToTopButton.classList.remove('visible');
      }
    }, 200));

    // Scroll to top on click
    backToTopButton.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /**
   * Console Welcome Message
   */
  function showWelcomeMessage() {
    console.log('%c¡Bienvenido a PyTalavera! 🐍', 'color: #1E3A8A; font-size: 20px; font-weight: bold;');
    console.log('%cComunidad Python de Puebla', 'color: #D97706; font-size: 14px;');
    console.log('%cContributing? Check out our GitHub! https://github.com/pytalavera', 'color: #7C3AED; font-size: 12px;');
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      init();
      initExternalLinks();
      initBackToTop();
      showWelcomeMessage();
    });
  } else {
    init();
    initExternalLinks();
    initBackToTop();
    showWelcomeMessage();
  }

  // Export utilities for external use
  window.PyTalavera = {
    closeMobileMenu,
    debounce,
    throttle
  };

})();
