/**
 * Magnetic Button Effect
 * Creates a magnetic hover effect on buttons
 */

(function() {
  'use strict';

  // Skip on touch devices or when reduced motion is preferred
  if ('ontouchstart' in window || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const magneticStrength = 0.3;
  const magneticDistance = 100;

  function initMagneticButtons() {
    const buttons = document.querySelectorAll('.btn-magnetic');
    
    buttons.forEach(button => {
      button.addEventListener('mousemove', handleMouseMove);
      button.addEventListener('mouseleave', handleMouseLeave);
    });
  }

  function handleMouseMove(e) {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    
    if (distance < magneticDistance) {
      const moveX = distanceX * magneticStrength;
      const moveY = distanceY * magneticStrength;
      
      button.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }
  }

  function handleMouseLeave(e) {
    const button = e.currentTarget;
    button.style.transform = 'translate(0, 0)';
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMagneticButtons);
  } else {
    initMagneticButtons();
  }

})();
