/* Shared: mobile menu + footer year. */
(() => {
  document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });
  const btn = document.querySelector('.menu-btn');
  const sheet = document.getElementById('nav-sheet');
  if (!btn || !sheet) return;
  const set = open => { btn.setAttribute('aria-expanded', String(open)); sheet.hidden = !open; };
  btn.addEventListener('click', () => set(sheet.hidden));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !sheet.hidden) { set(false); btn.focus(); } });
  window.addEventListener('resize', () => { if (window.innerWidth > 900 && !sheet.hidden) set(false); });
})();
