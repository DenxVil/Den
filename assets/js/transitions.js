/**
 * Page Transitions
 * Smooth transitions between pages
 */

(function() {
  'use strict';

  const transitionDuration = 300;

  function init() {
    const transition = document.getElementById('pageTransition');
    if (!transition) return;

    // Fade out transition overlay when page loads
    window.addEventListener('load', () => {
      transition.classList.remove('active');
    });

    // Add transition effect to internal links
    document.querySelectorAll('a').forEach(link => {
      // Skip external links, anchors, and links with target="_blank"
      if (link.hostname !== window.location.hostname) return;
      if (link.getAttribute('href').startsWith('#')) return;
      if (link.getAttribute('target') === '_blank') return;

      link.addEventListener('click', (e) => {
        // Check for reduced motion preference
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const href = link.getAttribute('href');
        e.preventDefault();

        // Trigger transition
        transition.classList.add('active');

        setTimeout(() => {
          window.location.href = href;
        }, transitionDuration);
      });
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
