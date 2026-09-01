(function () {
  'use strict';

  const pulse = window.portfolioData?.projects?.find((project) => project.id === 'pulse-protector');
  if (!pulse) return;

  const targets = {
    title: document.getElementById('pulseTitle'),
    subtitle: document.getElementById('pulseSubtitle'),
    category: document.getElementById('pulseCategory'),
    description: document.getElementById('pulseDescription'),
    disclaimer: document.getElementById('pulseDisclaimer'),
    idea: document.getElementById('pulseIdea'),
    problem: document.getElementById('pulseProblem'),
    approach: document.getElementById('pulseApproach'),
    contribution: document.getElementById('pulseContribution'),
    result: document.getElementById('pulseResult'),
    links: document.getElementById('pulseLinks')
  };

  if (targets.title) targets.title.textContent = pulse.title;
  if (targets.subtitle) targets.subtitle.textContent = pulse.subtitle;
  if (targets.category) targets.category.textContent = pulse.category;
  if (targets.description) targets.description.textContent = pulse.description;
  if (targets.disclaimer) targets.disclaimer.textContent = pulse.disclaimer;
  if (targets.idea) targets.idea.textContent = pulse.idea;
  if (targets.problem) targets.problem.textContent = pulse.problem;
  if (targets.approach) targets.approach.textContent = pulse.approach;
  if (targets.contribution) targets.contribution.textContent = pulse.contribution;
  if (targets.result) targets.result.textContent = pulse.result;

  if (targets.links) {
    targets.links.innerHTML = `
      <a class="btn btn-primary" href="${pulse.links.live}" target="_blank" rel="noopener noreferrer">Live Demo ↗</a>
      <a class="btn btn-secondary" href="${pulse.links.github}" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
      <a class="btn btn-secondary" href="projects.html#pulse-protector">All Case Studies ↗</a>`;
  }

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
    { threshold: 0.08 }
  );

  revealTargets.forEach((el) => io.observe(el));
})();
