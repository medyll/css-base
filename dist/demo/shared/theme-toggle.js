// theme-toggle.js — Toggle light/dark theme, persist to localStorage
const t = localStorage.getItem('theme') ||
  (matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light');
document.documentElement.dataset.theme = t;
function toggleTheme() {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = next;
  localStorage.setItem('theme', next);
}
