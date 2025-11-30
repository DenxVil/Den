/**
 * Project Reactions System
 * Allows users to react to projects with emojis, stored in localStorage
 */

(function() {
  'use strict';

  const STORAGE_KEY = 'denvil-reactions';

  /**
   * Get all reactions from localStorage
   */
  function getReactions() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch (e) {
      console.error('Error reading reactions from localStorage:', e);
      return {};
    }
  }

  /**
   * Save reactions to localStorage
   */
  function saveReactions(reactions) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(reactions));
    } catch (e) {
      console.error('Error saving reactions to localStorage:', e);
    }
  }

  /**
   * Get user's reactions (which buttons they've clicked)
   */
  function getUserReactions() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY + '-user');
      return stored ? JSON.parse(stored) : {};
    } catch (e) {
      return {};
    }
  }

  /**
   * Save user's reactions
   */
  function saveUserReactions(userReactions) {
    try {
      localStorage.setItem(STORAGE_KEY + '-user', JSON.stringify(userReactions));
    } catch (e) {
      console.error('Error saving user reactions:', e);
    }
  }

  /**
   * Toggle a reaction for a project
   */
  function toggleReaction(projectId, reactionType) {
    const reactions = getReactions();
    const userReactions = getUserReactions();
    
    // Initialize project reactions if not exists
    if (!reactions[projectId]) {
      reactions[projectId] = {};
    }
    if (!reactions[projectId][reactionType]) {
      reactions[projectId][reactionType] = 0;
    }
    
    // Initialize user reactions for this project
    if (!userReactions[projectId]) {
      userReactions[projectId] = {};
    }
    
    // Toggle reaction
    if (userReactions[projectId][reactionType]) {
      // User already reacted, remove it
      reactions[projectId][reactionType] = Math.max(0, reactions[projectId][reactionType] - 1);
      delete userReactions[projectId][reactionType];
    } else {
      // Add reaction
      reactions[projectId][reactionType]++;
      userReactions[projectId][reactionType] = true;
    }
    
    saveReactions(reactions);
    saveUserReactions(userReactions);
    
    return {
      count: reactions[projectId][reactionType],
      isActive: !!userReactions[projectId][reactionType]
    };
  }

  /**
   * Get reaction count for a project
   */
  function getReactionCount(projectId, reactionType) {
    const reactions = getReactions();
    return reactions[projectId]?.[reactionType] || 0;
  }

  /**
   * Check if user has reacted
   */
  function hasUserReacted(projectId, reactionType) {
    const userReactions = getUserReactions();
    return !!userReactions[projectId]?.[reactionType];
  }

  /**
   * Update button UI
   */
  function updateButtonUI(button, count, isActive) {
    const countEl = button.querySelector('.count');
    if (countEl) {
      countEl.textContent = count;
    }
    
    if (isActive) {
      button.classList.add('active');
    } else {
      button.classList.remove('active');
    }
  }

  /**
   * Initialize all reaction buttons
   */
  function initReactionButtons() {
    const reactionContainers = document.querySelectorAll('.reactions');
    
    reactionContainers.forEach(container => {
      const projectId = container.dataset.project;
      if (!projectId) return;
      
      const buttons = container.querySelectorAll('.reaction-btn');
      
      buttons.forEach(button => {
        const reactionType = button.dataset.reaction;
        if (!reactionType) return;
        
        // Set initial state
        const count = getReactionCount(projectId, reactionType);
        const isActive = hasUserReacted(projectId, reactionType);
        updateButtonUI(button, count, isActive);
        
        // Add click handler
        button.addEventListener('click', () => {
          const result = toggleReaction(projectId, reactionType);
          updateButtonUI(button, result.count, result.isActive);
          
          // Add animation
          button.classList.add('clicked');
          setTimeout(() => button.classList.remove('clicked'), 300);
        });
      });
    });
  }

  // Add CSS for click animation
  function addStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .reaction-btn.clicked {
        animation: reactionPop 0.3s ease;
      }
      
      @keyframes reactionPop {
        0% { transform: scale(1); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); }
      }
    `;
    document.head.appendChild(style);
  }

  // Initialize when DOM is ready
  function init() {
    addStyles();
    initReactionButtons();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose API for external use
  window.ReactionsSystem = {
    toggleReaction,
    getReactionCount,
    hasUserReacted
  };

})();
