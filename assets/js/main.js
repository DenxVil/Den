(function () {
  'use strict';

  const data = window.portfolioData;
  if (!data) return;

  const root = document.documentElement;

  function setYear() {
    const year = document.getElementById('currentYear');
    if (year) year.textContent = String(new Date().getFullYear());
  }

  function setProfile() {
    const profile = data.profile;
    document.querySelectorAll('[data-name]').forEach((el) => (el.textContent = profile.name));
    document.querySelectorAll('[data-identity]').forEach((el) => (el.textContent = profile.identity));
    document.querySelectorAll('[data-title]').forEach((el) => (el.textContent = profile.title));
    document.querySelectorAll('[data-axis]').forEach((el) => (el.textContent = profile.axis));
    document.querySelectorAll('[data-statement]').forEach((el) => (el.textContent = profile.statement));
  }

  function renderNav() {
    const list = document.getElementById('navLinks');
    if (!list) return;
    list.innerHTML = data.nav
      .map((item) => `<li><a href="#${item.id}">${item.label}</a></li>`)
      .join('');
  }

  function renderAbout() {
    const wrap = document.getElementById('aboutFrames');
    if (!wrap) return;
    wrap.innerHTML = data.aboutFrames
      .map(
        (item) => `
      <article class="frame" data-reveal>
        <div class="frame-inner">
          <p class="info-label">${item.title}</p>
          <p class="info-value">${item.detail}</p>
        </div>
      </article>`
      )
      .join('');
  }

  function projectCard(project) {
    const actions = [];
    if (project.links.caseStudy) actions.push(`<a class="btn btn-secondary" href="${project.links.caseStudy}">Case Study ↗</a>`);
    if (project.links.live) actions.push(`<a class="btn btn-secondary" href="${project.links.live}" target="_blank" rel="noopener noreferrer">Live ↗</a>`);
    if (project.links.github) actions.push(`<a class="btn btn-secondary" href="${project.links.github}" target="_blank" rel="noopener noreferrer">GitHub ↗</a>`);

    return `
    <article class="frame project-frame" data-reveal>
      <div class="frame-inner">
        <div class="project-head">
          <span class="project-index">Project ${project.number}</span>
          <span aria-hidden="true">↗</span>
        </div>
        <h3 class="project-title">${project.title}</h3>
        <p class="project-subtitle">${project.subtitle}</p>
        <div class="tag-row">${project.category
          .split('·')
          .map((x) => `<span class="tag">${x.trim()}</span>`)
          .join('')}</div>
        <p class="project-description">${project.description}</p>
        ${project.disclaimer ? `<p class="note"><strong>${project.disclaimer}</strong></p>` : ''}
        <div class="project-actions">${actions.join('')}</div>
      </div>
    </article>`;
  }

  function renderFeatured() {
    const featured = data.projects.find((p) => p.highlight);
    const wrap = document.getElementById('featuredProject');
    if (!featured || !wrap) return;

    wrap.innerHTML = `
      <div class="featured-head">
        <div>
          <p class="index-badge">Project ${featured.number}</p>
          <h3 class="featured-title">${featured.title}</h3>
          <p class="project-subtitle">${featured.subtitle}</p>
          <div class="tag-row">${featured.category
            .split('·')
            .map((x) => `<span class="tag">${x.trim()}</span>`)
            .join('')}</div>
        </div>
        <div class="achievement-badge">
          <strong>🥈 ${featured.achievement}</strong>
          <span class="note">Catalyst Hackathon 2025</span>
        </div>
      </div>
      <div class="featured-body">
        <div class="visual-panel">
          <p class="info-label">Triaged Parameters</p>
          <div class="vital-grid">
            <div class="vital-item"><div class="vital-name">Heart Rate</div><div class="vital-status">Monitored</div></div>
            <div class="vital-item"><div class="vital-name">Respiratory Rate</div><div class="vital-status">Monitored</div></div>
            <div class="vital-item"><div class="vital-name">SpO2</div><div class="vital-status">Monitored</div></div>
            <div class="vital-item"><div class="vital-name">Blood Pressure</div><div class="vital-status">Monitored</div></div>
            <div class="vital-item"><div class="vital-name">GCS</div><div class="vital-status">Scored</div></div>
            <div class="vital-item"><div class="vital-name">Pupillary</div><div class="vital-status">Assessed</div></div>
          </div>
          <div class="arch-lines" aria-label="Architecture overview">
            <div class="arch-line">Input simulation → Triage layer</div>
            <div class="arch-line">Weighted scoring → Confidence output</div>
            <div class="arch-line">Intervention recommendations</div>
          </div>
        </div>
        <div class="case-points">
          <div class="case-point"><h4>The Idea</h4><p>${featured.idea}</p></div>
          <div class="case-point"><h4>The Problem</h4><p>${featured.problem}</p></div>
          <div class="case-point"><h4>The Approach</h4><p>${featured.approach}</p></div>
          <div class="case-point"><h4>My Contribution</h4><p>${featured.contribution}</p></div>
          <div class="case-point"><h4>Result / Achievement</h4><p>${featured.result}</p></div>
          <p class="note"><strong>${featured.disclaimer}</strong></p>
          <div class="case-links">
            <a class="btn btn-primary" href="${featured.links.live}" target="_blank" rel="noopener noreferrer">Live Demo ↗</a>
            <a class="btn btn-secondary" href="${featured.links.github}" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
            <a class="btn btn-secondary" href="${featured.links.caseStudy}">Full Case Study ↗</a>
          </div>
        </div>
      </div>`;
  }

  function renderProjects() {
    const wrap = document.getElementById('projectCards');
    if (!wrap) return;
    wrap.innerHTML = data.projects.filter((p) => !p.highlight).map(projectCard).join('');
  }

  function renderAchievements() {
    const wrap = document.getElementById('achievementCards');
    if (!wrap) return;
    wrap.innerHTML = data.achievements
      .map(
        (a) => `<article class="frame" data-reveal><div class="frame-inner"><div class="metric-number">${a.value}</div><div class="metric-label"><strong>${a.label}</strong><br>${a.detail}</div></div></article>`
      )
      .join('');
  }

  function renderEducation() {
    const timeline = document.getElementById('educationTimeline');
    if (!timeline) return;
    timeline.innerHTML = data.education
      .map(
        (item) => `<article class="timeline-item" data-reveal><div class="timeline-stage">${item.stage}</div><h3 class="timeline-title">${item.title}</h3><p class="timeline-desc">${item.detail}</p></article>`
      )
      .join('');
  }

  function renderJourney() {
    const wrap = document.getElementById('journeySteps');
    if (!wrap) return;
    wrap.innerHTML = data.journey
      .map((step) => `<article class="journey-step" data-reveal><span>${step.stage}</span><strong>${step.text}</strong></article>`)
      .join('');
  }

  function renderTech() {
    const wrap = document.getElementById('techCards');
    if (!wrap) return;
    wrap.innerHTML = Object.entries(data.technologies)
      .map(
        ([title, items]) => `<article class="tech-card" data-reveal><h3>${title}</h3><ul class="tech-list">${items
          .map((item) => `<li>${item}</li>`)
          .join('')}</ul></article>`
      )
      .join('');
  }

  function renderContact() {
    const wrap = document.getElementById('contactLinks');
    if (!wrap) return;
    const links = [
      { label: 'GitHub', href: data.profile.github, value: '@DenxVil' },
      {
        label: 'LinkedIn',
        href: data.profile.linkedIn || '#',
        value: data.profile.linkedIn ? 'Verified profile' : 'Placeholder — add verified URL',
        disabled: !data.profile.linkedIn
      },
      {
        label: 'Email',
        href: data.profile.email ? `mailto:${data.profile.email}` : '#',
        value: data.profile.email || 'Placeholder — add preferred email',
        disabled: !data.profile.email
      }
    ];

    wrap.innerHTML = links
      .map(
        (item) => `<a class="contact-link" ${item.disabled ? 'aria-disabled="true"' : ''} href="${item.href}" ${
          item.disabled ? '' : 'target="_blank" rel="noopener noreferrer"'
        }><strong>${item.label}</strong><span class="note">${item.value}</span></a>`
      )
      .join('');
  }

  function navBehavior() {
    const header = document.querySelector('.site-header');
    window.addEventListener(
      'scroll',
      () => {
        header && header.classList.toggle('scrolled', window.scrollY > 8);
      },
      { passive: true }
    );

    const toggle = document.getElementById('menuToggle');
    const nav = document.getElementById('navLinks');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });

    nav.addEventListener('click', (event) => {
      if (event.target instanceof HTMLAnchorElement) {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  function reveal() {
    const elements = document.querySelectorAll('[data-reveal]');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      elements.forEach((el) => el.classList.add('revealed'));
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
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    elements.forEach((el) => io.observe(el));
  }

  function cursor() {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const dot = document.querySelector('.cursor-dot');
    if (!dot) return;

    let rafId = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;

    const draw = () => {
      dot.style.left = `${x}px`;
      dot.style.top = `${y}px`;
      rafId = 0;
    };

    document.addEventListener('pointermove', (event) => {
      x = event.clientX;
      y = event.clientY;
      if (!rafId) rafId = requestAnimationFrame(draw);
    });

    const magnets = document.querySelectorAll('.btn, .contact-link');
    magnets.forEach((element) => {
      element.addEventListener('pointerenter', () => (dot.style.transform = 'translate(-50%, -50%) scale(1.45)'));
      element.addEventListener('pointerleave', () => (dot.style.transform = 'translate(-50%, -50%) scale(1)'));
    });
  }

  function init() {
    setYear();
    setProfile();
    renderNav();
    renderAbout();
    renderFeatured();
    renderProjects();
    renderAchievements();
    renderEducation();
    renderJourney();
    renderTech();
    renderContact();
    navBehavior();
    reveal();
    cursor();
    root.classList.add('js-ready');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
