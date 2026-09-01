(function () {
  'use strict';

  const username = 'DenxVil';

  function setText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  function safeNumber(value) {
    return Number.isFinite(value) ? value.toLocaleString() : '—';
  }

  async function fetchJSON(url) {
    const response = await fetch(url, { headers: { Accept: 'application/vnd.github+json' } });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  }

  function renderRepos(repos) {
    const list = document.getElementById('repoList');
    if (!list) return;

    if (!repos?.length) {
      list.innerHTML = '<li class="note">Repository preview unavailable right now.</li>';
      return;
    }

    list.innerHTML = repos
      .slice(0, 4)
      .map(
        (repo) => `<li><a href="${repo.html_url}" target="_blank" rel="noopener noreferrer"><strong>${repo.name}</strong><br><span class="note">${
          repo.description || 'No description provided.'
        }</span></a></li>`
      )
      .join('');
  }

  async function loadGitHub() {
    try {
      const [user, repos] = await Promise.all([
        fetchJSON(`https://api.github.com/users/${username}`),
        fetchJSON(`https://api.github.com/users/${username}/repos?sort=updated&per_page=8`)
      ]);

      setText('ghRepos', safeNumber(user.public_repos));
      setText('ghFollowers', safeNumber(user.followers));
      setText('ghFollowing', safeNumber(user.following));
      setText(
        'ghUpdated',
        user.updated_at ? new Date(user.updated_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : '—'
      );
      renderRepos(repos);
      setText('ghNote', 'Live data from GitHub API.');
    } catch (error) {
      setText('ghRepos', '—');
      setText('ghFollowers', '—');
      setText('ghFollowing', '—');
      setText('ghUpdated', 'Unavailable');
      renderRepos([]);
      setText('ghNote', 'Live GitHub stats are temporarily unavailable.');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadGitHub);
  } else {
    loadGitHub();
  }
})();
