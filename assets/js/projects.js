(function () {
  'use strict';

  const data = window.portfolioData;
  if (!data) return;

  const list = document.getElementById('caseStudyList');
  if (!list) return;

  function link(label, href) {
    return href ? `<a class="btn btn-secondary" href="${href}" target="_blank" rel="noopener noreferrer">${label} ↗</a>` : '';
  }

  list.innerHTML = data.projects
    .map(
      (project) => `
      <article class="frame" id="${project.id}" data-reveal>
        <div class="frame-inner case-grid">
          <div>
            <p class="project-index">Project ${project.number}</p>
            <h2 class="project-title">${project.title}</h2>
            <p class="project-subtitle">${project.subtitle}</p>
            <div class="tag-row">${project.category
              .split('·')
              .map((x) => `<span class="tag">${x.trim()}</span>`)
              .join('')}</div>
          </div>

          <p class="project-description">${project.description}</p>

          <div class="case-points">
            ${project.idea ? `<div class="case-point"><h4>The Idea</h4><p>${project.idea}</p></div>` : ''}
            ${project.problem ? `<div class="case-point"><h4>The Problem</h4><p>${project.problem}</p></div>` : ''}
            ${project.approach ? `<div class="case-point"><h4>The Approach</h4><p>${project.approach}</p></div>` : ''}
            ${project.technologies?.length ? `<div class="case-point"><h4>Technology</h4><ul>${project.technologies.map((t) => `<li>${t}</li>`).join('')}</ul></div>` : ''}
            ${project.contribution ? `<div class="case-point"><h4>My Contribution</h4><p>${project.contribution}</p></div>` : ''}
            ${project.result ? `<div class="case-point"><h4>Result / Achievement</h4><p>${project.result}</p></div>` : ''}
            ${project.disclaimer ? `<p class="note"><strong>${project.disclaimer}</strong></p>` : ''}
          </div>

          <div class="case-links">
            ${project.links.caseStudy ? `<a class="btn btn-secondary" href="${project.links.caseStudy}">Dedicated Page ↗</a>` : ''}
            ${link('Live', project.links.live)}
            ${link('GitHub', project.links.github)}
          </div>
        </div>
      </article>`
    )
    .join('');

  const revealTargets = document.querySelectorAll('[data-reveal]');
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    revealTargets.forEach((el) => el.classList.add('revealed'));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -40px' }
  );

  revealTargets.forEach((el) => io.observe(el));
})();
