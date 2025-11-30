/**
 * Main JavaScript for Denvil Portfolio
 * Handles core functionality, theme toggle, navigation, and animations
 */

(function() {
  'use strict';

  // DOM Elements
  const themeToggle = document.getElementById('themeToggle');
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const navLinks = document.getElementById('navLinks');
  const particles = document.getElementById('particles');
  const currentYear = document.getElementById('currentYear');
  const typewriter = document.getElementById('typewriter');

  // Configuration
  const config = {
    particleCount: 50,
    typewriterTexts: [
      'Medical Student & Developer',
      'Building the Future',
      'Creating with Code',
      'Innovating in Healthcare'
    ],
    typewriterSpeed: 100,
    typewriterPause: 2000
  };

  /**
   * Theme Management
   */
  const ThemeManager = {
    storageKey: 'denvil-theme',
    
    init() {
      const savedTheme = localStorage.getItem(this.storageKey);
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const theme = savedTheme || (prefersDark ? 'dark' : 'light');
      this.setTheme(theme);
      
      if (themeToggle) {
        themeToggle.addEventListener('click', () => this.toggle());
      }
      
      // Listen for system theme changes
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem(this.storageKey)) {
          this.setTheme(e.matches ? 'dark' : 'light');
        }
      });
    },
    
    setTheme(theme) {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem(this.storageKey, theme);
    },
    
    toggle() {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      this.setTheme(newTheme);
    },
    
    get() {
      return document.documentElement.getAttribute('data-theme') || 'dark';
    }
  };

  /**
   * Mobile Navigation
   */
  const MobileNav = {
    init() {
      if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', () => this.toggle());
        
        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
          link.addEventListener('click', () => this.close());
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
          if (!navLinks.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            this.close();
          }
        });
      }
    },
    
    toggle() {
      const isOpen = navLinks.classList.toggle('active');
      mobileMenuToggle.setAttribute('aria-expanded', isOpen);
    },
    
    close() {
      navLinks.classList.remove('active');
      mobileMenuToggle.setAttribute('aria-expanded', 'false');
    }
  };

  /**
   * Particle Effect
   */
  const ParticleEffect = {
    init() {
      if (!particles || this.prefersReducedMotion()) return;
      
      for (let i = 0; i < config.particleCount; i++) {
        this.createParticle();
      }
    },
    
    createParticle() {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.animationDelay = `${Math.random() * 3}s`;
      particle.style.animationDuration = `${2 + Math.random() * 3}s`;
      particles.appendChild(particle);
    },
    
    prefersReducedMotion() {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
  };

  /**
   * Scroll Reveal Animation
   */
  const ScrollReveal = {
    elements: [],
    
    init() {
      this.elements = document.querySelectorAll('.scroll-reveal');
      
      if (this.elements.length === 0) return;
      
      // Check if reduced motion is preferred
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        this.elements.forEach(el => el.classList.add('revealed'));
        return;
      }
      
      // Use Intersection Observer
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });
      
      this.elements.forEach(el => observer.observe(el));
    }
  };

  /**
   * Spotlight Effect for Cards
   */
  const SpotlightEffect = {
    init() {
      const cards = document.querySelectorAll('.card-spotlight');
      
      cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width) * 100;
          const y = ((e.clientY - rect.top) / rect.height) * 100;
          card.style.setProperty('--x', `${x}%`);
          card.style.setProperty('--y', `${y}%`);
        });
      });
    }
  };

  /**
   * 3D Tilt Effect
   */
  const TiltEffect = {
    init() {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      
      const cards = document.querySelectorAll('.tilt-3d');
      
      cards.forEach(card => {
        const inner = card.querySelector('.tilt-3d-inner');
        if (!inner) return;
        
        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          
          const rotateX = (y - centerY) / 20;
          const rotateY = (centerX - x) / 20;
          
          inner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        card.addEventListener('mouseleave', () => {
          inner.style.transform = 'rotateX(0deg) rotateY(0deg)';
        });
      });
    }
  };

  /**
   * Typewriter Effect
   */
  const TypewriterEffect = {
    currentIndex: 0,
    currentText: '',
    isDeleting: false,
    
    init() {
      if (!typewriter) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        typewriter.textContent = config.typewriterTexts[0];
        return;
      }
      
      this.type();
    },
    
    type() {
      const fullText = config.typewriterTexts[this.currentIndex];
      
      if (this.isDeleting) {
        this.currentText = fullText.substring(0, this.currentText.length - 1);
      } else {
        this.currentText = fullText.substring(0, this.currentText.length + 1);
      }
      
      typewriter.textContent = this.currentText;
      
      let typeSpeed = this.isDeleting ? config.typewriterSpeed / 2 : config.typewriterSpeed;
      
      if (!this.isDeleting && this.currentText === fullText) {
        typeSpeed = config.typewriterPause;
        this.isDeleting = true;
      } else if (this.isDeleting && this.currentText === '') {
        this.isDeleting = false;
        this.currentIndex = (this.currentIndex + 1) % config.typewriterTexts.length;
        typeSpeed = 500;
      }
      
      setTimeout(() => this.type(), typeSpeed);
    }
  };

  /**
   * Text Scramble Effect
   */
  class TextScramble {
    constructor(el) {
      this.el = el;
      this.chars = '!<>-_\\/[]{}—=+*^?#________';
      this.update = this.update.bind(this);
    }
    
    setText(newText) {
      const oldText = this.el.innerText;
      const length = Math.max(oldText.length, newText.length);
      const promise = new Promise((resolve) => this.resolve = resolve);
      this.queue = [];
      
      for (let i = 0; i < length; i++) {
        const from = oldText[i] || '';
        const to = newText[i] || '';
        const start = Math.floor(Math.random() * 40);
        const end = start + Math.floor(Math.random() * 40);
        this.queue.push({ from, to, start, end });
      }
      
      cancelAnimationFrame(this.frameRequest);
      this.frame = 0;
      this.update();
      return promise;
    }
    
    update() {
      let output = '';
      let complete = 0;
      
      for (let i = 0, n = this.queue.length; i < n; i++) {
        let { from, to, start, end, char } = this.queue[i];
        
        if (this.frame >= end) {
          complete++;
          output += to;
        } else if (this.frame >= start) {
          if (!char || Math.random() < 0.28) {
            char = this.chars[Math.floor(Math.random() * this.chars.length)];
            this.queue[i].char = char;
          }
          output += `<span class="dud">${char}</span>`;
        } else {
          output += from;
        }
      }
      
      this.el.innerHTML = output;
      
      if (complete === this.queue.length) {
        this.resolve();
      } else {
        this.frameRequest = requestAnimationFrame(this.update);
        this.frame++;
      }
    }
  }

  /**
   * Smooth Scroll
   */
  const SmoothScroll = {
    init() {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute('href'));
          if (target) {
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        });
      });
    }
  };

  /**
   * Update Current Year
   */
  function updateCurrentYear() {
    if (currentYear) {
      currentYear.textContent = new Date().getFullYear();
    }
  }

  /**
   * Initialize All Modules
   */
  function init() {
    ThemeManager.init();
    MobileNav.init();
    ParticleEffect.init();
    ScrollReveal.init();
    SpotlightEffect.init();
    TiltEffect.init();
    TypewriterEffect.init();
    SmoothScroll.init();
    updateCurrentYear();
  }

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose utilities for other scripts
  window.DenvilPortfolio = {
    ThemeManager,
    TextScramble
  };

})();
