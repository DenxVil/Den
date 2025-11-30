/**
 * Timeline Component
 * Renders the interactive journey timeline
 */

(function() {
  'use strict';

  const timelineData = [
    {
      year: '2020',
      title: 'Started Coding Journey',
      description: 'Began learning programming and exploring the world of software development.'
    },
    {
      year: '2021',
      title: 'Project Hecker',
      description: 'First major project focused on cybersecurity concepts and ethical hacking education.'
    },
    {
      year: '2022',
      title: 'Project X9, E-Certificate & TEAM KYRO',
      description: 'Launched multiple projects including experimental tech, digital certification, and team collaboration tools.'
    },
    {
      year: '2023',
      title: 'Dark Userbot & Started MBBS',
      description: 'Released Dark Userbot for Telegram automation while beginning medical studies.'
    },
    {
      year: '2024',
      title: 'Pulse Protector',
      description: 'Developed a health monitoring app combining medical knowledge with technology.'
    },
    {
      year: '2025',
      title: 'MITRA AI, Nexus AI & SYNAPSE WEB',
      description: 'Launched AI-powered projects including Nexus AI bot and modern web framework.'
    },
    {
      year: 'Planned',
      title: 'Future Projects',
      description: 'Arduino robotics, Pyboard/MicroPython projects, and denx.me personal domain.'
    }
  ];

  function createTimelineItem(item, index) {
    const div = document.createElement('div');
    div.className = 'timeline-item';
    div.style.animationDelay = `${index * 0.1}s`;
    
    div.innerHTML = `
      <div class="timeline-dot" aria-hidden="true"></div>
      <div class="timeline-year">${item.year}</div>
      <h4 class="timeline-title">${item.title}</h4>
      <p class="timeline-description">${item.description}</p>
    `;
    
    return div;
  }

  function renderTimeline() {
    const container = document.getElementById('timeline');
    if (!container) return;

    // Clear existing content
    container.innerHTML = '';

    // Add timeline items
    timelineData.forEach((item, index) => {
      container.appendChild(createTimelineItem(item, index));
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderTimeline);
  } else {
    renderTimeline();
  }

})();
