/**
 * Swipe Navigation
 * Enables swipe gestures for mobile navigation between pages
 */

(function() {
  'use strict';

  // Main navigation pages (matches nav menu order)
  // Note: Sub-pages like pulse-protector.html are intentionally excluded
  const pages = [
    'index.html',
    'projects.html',
    'nexus.html',
    'stats.html'
  ];

  let touchStartX = 0;
  let touchEndX = 0;
  const minSwipeDistance = 100;

  function getCurrentPageIndex() {
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop() || 'index.html';
    return pages.indexOf(currentPage);
  }

  function navigateToPage(index) {
    if (index >= 0 && index < pages.length) {
      // Trigger page transition if available
      const transition = document.getElementById('pageTransition');
      if (transition) {
        transition.classList.add('active');
        setTimeout(() => {
          window.location.href = pages[index];
        }, 300);
      } else {
        window.location.href = pages[index];
      }
    }
  }

  function handleSwipe() {
    const swipeDistance = touchEndX - touchStartX;
    const currentIndex = getCurrentPageIndex();

    if (Math.abs(swipeDistance) < minSwipeDistance) return;

    if (swipeDistance > 0) {
      // Swipe right - go to previous page
      navigateToPage(currentIndex - 1);
    } else {
      // Swipe left - go to next page
      navigateToPage(currentIndex + 1);
    }
  }

  function init() {
    // Only enable on touch devices
    if (!('ontouchstart' in window)) return;

    document.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    document.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
