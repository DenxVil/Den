/**
 * GitHub Stats Component
 * Fetches and displays GitHub statistics with fallback data
 */

(function() {
  'use strict';

  const GITHUB_USERNAME = 'DenxVil';
  const CACHE_KEY = 'denvil-github-stats';
  const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  // Fallback static data in case API is rate-limited
  const fallbackData = {
    user: {
      public_repos: 10,
      followers: 15,
      following: 5
    },
    repos: [
      {
        name: 'DARK-USERBOT',
        description: 'A powerful Telegram userbot built with Python and Pyrogram.',
        html_url: 'https://github.com/DenxVil/DARK-USERBOT',
        stargazers_count: 25,
        forks_count: 8,
        language: 'Python'
      },
      {
        name: 'Den',
        description: 'Personal portfolio website with Bento grid layout and glassmorphism.',
        html_url: 'https://github.com/DenxVil/Den',
        stargazers_count: 5,
        forks_count: 2,
        language: 'HTML'
      },
      {
        name: 'NexusAI',
        description: 'Advanced AI-powered Telegram bot with multiple features.',
        html_url: 'https://github.com/DenxVil/NexusAI',
        stargazers_count: 10,
        forks_count: 3,
        language: 'Python'
      }
    ],
    totalStars: 40,
    totalCommits: 250,
    currentStreak: 7,
    longestStreak: 30,
    totalContributions: 500
  };

  /**
   * Fetch data from GitHub API with caching
   */
  async function fetchWithCache(url) {
    const cached = getCachedData(url);
    if (cached) return cached;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      setCachedData(url, data);
      return data;
    } catch (error) {
      console.warn('GitHub API error, using fallback data:', error);
      return null;
    }
  }

  function getCachedData(key) {
    try {
      const cached = sessionStorage.getItem(CACHE_KEY + '-' + key);
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_DURATION) {
          return data;
        }
      }
    } catch (e) {
      // Ignore cache errors
    }
    return null;
  }

  function setCachedData(key, data) {
    try {
      sessionStorage.setItem(CACHE_KEY + '-' + key, JSON.stringify({
        data,
        timestamp: Date.now()
      }));
    } catch (e) {
      // Ignore cache errors
    }
  }

  /**
   * Fetch all GitHub data
   */
  async function fetchGitHubData() {
    const userUrl = `https://api.github.com/users/${GITHUB_USERNAME}`;
    const reposUrl = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=stars&per_page=10`;

    const [userData, reposData] = await Promise.all([
      fetchWithCache(userUrl),
      fetchWithCache(reposUrl)
    ]);

    return {
      user: userData || fallbackData.user,
      repos: reposData || fallbackData.repos,
      usedFallback: !userData || !reposData
    };
  }

  /**
   * Calculate total stars from repos
   */
  function calculateTotalStars(repos) {
    return repos.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0);
  }

  /**
   * Update DOM elements with stats
   */
  function updateStats(data) {
    const { user, repos, usedFallback } = data;

    // Update main stats
    updateElement('totalRepos', user.public_repos || fallbackData.user.public_repos);
    updateElement('totalStars', calculateTotalStars(repos) || fallbackData.totalStars);
    updateElement('totalFollowers', user.followers || fallbackData.user.followers);
    updateElement('totalCommits', fallbackData.totalCommits); // Commits require authenticated API

    // Update streak stats (requires GraphQL API, using fallback)
    updateElement('currentStreak', fallbackData.currentStreak);
    updateElement('longestStreak', fallbackData.longestStreak);
    updateElement('totalContributions', fallbackData.totalContributions);

    // Update last updated timestamp
    const lastUpdated = document.getElementById('lastUpdated');
    if (lastUpdated) {
      lastUpdated.textContent = new Date().toLocaleString() + (usedFallback ? ' (fallback data)' : '');
    }
  }

  function updateElement(id, value) {
    const el = document.getElementById(id);
    if (el) {
      el.textContent = value.toLocaleString();
    }
  }

  /**
   * Render repositories list
   */
  function renderRepos(repos) {
    const container = document.getElementById('reposList');
    if (!container) return;

    if (!repos || repos.length === 0) {
      container.innerHTML = '<p class="error-message">No repositories found.</p>';
      return;
    }

    container.innerHTML = repos.slice(0, 6).map(repo => `
      <div class="repo-card">
        <div class="repo-info">
          <a href="${repo.html_url}" class="repo-name" target="_blank" rel="noopener noreferrer">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path fill-rule="evenodd" d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"/>
            </svg>
            ${repo.name}
          </a>
          <p class="repo-description">${repo.description || 'No description available.'}</p>
          <div class="repo-meta">
            ${repo.language ? `
              <span class="repo-meta-item">
                <span class="language-dot language-${repo.language.toLowerCase()}"></span>
                ${repo.language}
              </span>
            ` : ''}
          </div>
        </div>
        <div class="repo-stats">
          <span class="repo-stat">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z"/>
            </svg>
            ${repo.stargazers_count || 0}
          </span>
          <span class="repo-stat">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path fill-rule="evenodd" d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"/>
            </svg>
            ${repo.forks_count || 0}
          </span>
        </div>
      </div>
    `).join('');
  }

  /**
   * Generate contribution heatmap
   */
  function generateHeatmap() {
    const container = document.getElementById('contributionHeatmap');
    if (!container) return;

    const days = 365;
    const cells = [];

    for (let i = 0; i < days; i++) {
      const level = Math.floor(Math.random() * 5);
      const levelClass = level > 0 ? `level-${level}` : '';
      cells.push(`<div class="heatmap-cell ${levelClass}" title="Contributions"></div>`);
    }

    container.innerHTML = cells.join('');
  }

  /**
   * Render language statistics
   */
  function renderLanguageStats(repos) {
    const container = document.getElementById('languageStats');
    if (!container) return;

    const languages = {};
    repos.forEach(repo => {
      if (repo.language) {
        languages[repo.language] = (languages[repo.language] || 0) + 1;
      }
    });

    const sorted = Object.entries(languages)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    const total = sorted.reduce((sum, [, count]) => sum + count, 0);

    container.innerHTML = `
      <div style="display: flex; height: 8px; border-radius: 4px; overflow: hidden; margin-bottom: 1rem;">
        ${sorted.map(([lang]) => `
          <div class="language-${lang.toLowerCase()}" style="flex: 1; background: var(--accent-primary);"></div>
        `).join('')}
      </div>
      <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
        ${sorted.map(([lang, count]) => `
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span class="language-dot language-${lang.toLowerCase()}"></span>
            <span>${lang}</span>
            <span class="text-muted">${((count / total) * 100).toFixed(1)}%</span>
          </div>
        `).join('')}
      </div>
    `;
  }

  /**
   * Initialize stats page
   */
  async function init() {
    try {
      const data = await fetchGitHubData();
      updateStats(data);
      renderRepos(data.repos);
      renderLanguageStats(data.repos);
      generateHeatmap();
    } catch (error) {
      console.error('Error loading stats:', error);
      // Use fallback data
      updateStats({ user: fallbackData.user, repos: fallbackData.repos, usedFallback: true });
      renderRepos(fallbackData.repos);
      generateHeatmap();
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
