/**
 * PyTalavera - Language Toggle
 * Bilingual support (Spanish/English) with localStorage persistence
 */

(function() {
  'use strict';

  // Default language
  const DEFAULT_LANG = 'es';
  const STORAGE_KEY = 'pytalavera_language';

  /**
   * Initialize language system
   */
  function initLanguage() {
    // Get saved language preference or use default
    const savedLang = localStorage.getItem(STORAGE_KEY);
    const preferredLang = savedLang || DEFAULT_LANG;

    // Set initial language
    setLanguage(preferredLang);

    // Add event listener to language toggle button
    const toggleButton = document.getElementById('language-toggle');
    if (toggleButton) {
      toggleButton.addEventListener('click', toggleLanguage);
    }

    // Update toggle button text
    updateToggleButton(preferredLang);
  }

  /**
   * Toggle between Spanish and English
   */
  function toggleLanguage() {
    const currentLang = document.documentElement.lang;
    const newLang = currentLang === 'es' ? 'en' : 'es';

    setLanguage(newLang);
    localStorage.setItem(STORAGE_KEY, newLang);
    updateToggleButton(newLang);

    // Trigger custom event for other scripts to listen
    document.dispatchEvent(new CustomEvent('languageChanged', {
      detail: { language: newLang }
    }));
  }

  /**
   * Set the active language
   * @param {string} lang - Language code ('es' or 'en')
   */
  function setLanguage(lang) {
    // Update html lang attribute
    document.documentElement.lang = lang;

    // Update aria-label if needed
    document.documentElement.setAttribute('lang', lang);

    // Show/hide elements based on data-lang attribute
    updateVisibility(lang);
  }

  /**
   * Update visibility of language-specific elements
   * @param {string} lang - Language code ('es' or 'en')
   */
  function updateVisibility(lang) {
    // Hide all language-specific elements
    const allLangElements = document.querySelectorAll('[data-lang]');
    allLangElements.forEach(element => {
      element.style.display = 'none';
    });

    // Show only elements for current language
    const currentLangElements = document.querySelectorAll(`[data-lang="${lang}"]`);
    currentLangElements.forEach(element => {
      // Determine appropriate display type
      const computedDisplay = window.getComputedStyle(element.parentElement).display;
      const displayType = getDisplayType(element);
      element.style.display = displayType;
    });

    // Handle class-based language switching (.lang-es, .lang-en)
    document.querySelectorAll('.lang-es, .lang-en').forEach(element => {
      element.style.display = 'none';
    });

    document.querySelectorAll(`.lang-${lang}`).forEach(element => {
      element.style.display = 'block';
    });
  }

  /**
   * Determine appropriate display type for element
   * @param {HTMLElement} element - The element to check
   * @returns {string} - Display type (inline, block, inline-block, etc.)
   */
  function getDisplayType(element) {
    const tagName = element.tagName.toLowerCase();

    // Inline elements
    if (['span', 'a', 'strong', 'em', 'b', 'i', 'small'].includes(tagName)) {
      return 'inline';
    }

    // Block elements
    if (['div', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'section', 'article'].includes(tagName)) {
      return 'block';
    }

    // List items
    if (tagName === 'li') {
      return 'list-item';
    }

    // Default to inline for inline context
    return 'inline';
  }

  /**
   * Update the language toggle button text
   * @param {string} currentLang - Current language code
   */
  function updateToggleButton(currentLang) {
    const toggleButton = document.getElementById('language-toggle');
    if (!toggleButton) return;

    // Show opposite language in button (if in ES, show "EN")
    const buttonText = currentLang === 'es' ? 'EN' : 'ES';
    toggleButton.textContent = buttonText;

    // Update aria-label
    const ariaLabel = currentLang === 'es'
      ? 'Switch to English'
      : 'Cambiar a Español';
    toggleButton.setAttribute('aria-label', ariaLabel);
  }

  /**
   * Get current language
   * @returns {string} - Current language code
   */
  function getCurrentLanguage() {
    return document.documentElement.lang || DEFAULT_LANG;
  }

  /**
   * Get translation for a key (future enhancement)
   * @param {string} key - Translation key
   * @returns {string} - Translated text
   */
  function translate(key) {
    const lang = getCurrentLanguage();

    // Translation dictionary (can be expanded)
    const translations = {
      es: {
        'nav.home': 'Inicio',
        'nav.events': 'Eventos',
        'nav.team': 'Equipo',
        'nav.sponsors': 'Patrocinadores',
        'nav.blog': 'Blog',
        'nav.coc': 'Código de Conducta',
        'btn.join': 'Únete',
        'btn.learn_more': 'Conoce Más',
        'btn.register': 'Registrarse',
        'btn.contact': 'Contacto',
        'footer.copyright': '© 2026 PyTalavera. Todos los derechos reservados.',
      },
      en: {
        'nav.home': 'Home',
        'nav.events': 'Events',
        'nav.team': 'Team',
        'nav.sponsors': 'Sponsors',
        'nav.blog': 'Blog',
        'nav.coc': 'Code of Conduct',
        'btn.join': 'Join Us',
        'btn.learn_more': 'Learn More',
        'btn.register': 'Register',
        'btn.contact': 'Contact',
        'footer.copyright': '© 2026 PyTalavera. All rights reserved.',
      }
    };

    return translations[lang]?.[key] || key;
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLanguage);
  } else {
    initLanguage();
  }

  // Export functions for external use
  window.PyTalaveraLang = {
    toggle: toggleLanguage,
    set: setLanguage,
    get: getCurrentLanguage,
    translate: translate
  };

})();
