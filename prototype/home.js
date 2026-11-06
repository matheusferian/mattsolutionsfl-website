/* Service order fills in as each step reaches the middle of the screen.
   Without JS (or before it runs) the order is shown complete. */
(() => {
  const ticket = document.getElementById('ticket');
  const steps = [...document.querySelectorAll('.step')];
  document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });

  const date = document.getElementById('ticket-date');
  if (date) date.textContent = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  if (!ticket || !steps.length || !('IntersectionObserver' in window)) return;
  document.documentElement.classList.add('js');

  const fields = [...ticket.querySelectorAll('.field')];
  let current = 0;

  function setStep(n) {
    if (n === current) return;
    current = n;
    fields.forEach(f => f.classList.toggle('is-filled', Number(f.dataset.at) <= n));
    ticket.classList.toggle('is-approved', n >= 3);
    ticket.classList.toggle('is-done', n >= 4);
    steps.forEach(s => s.classList.toggle('is-active', Number(s.dataset.step) === n));
  }

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) setStep(Number(e.target.dataset.step)); });
  }, { rootMargin: '-45% 0px -45% 0px' });
  steps.forEach(s => io.observe(s));

  // Scrolled back above the first step: empty order again.
  const first = steps[0];
  window.addEventListener('scroll', () => {
    if (first.getBoundingClientRect().top > window.innerHeight * 0.55) setStep(0);
  }, { passive: true });
})();
