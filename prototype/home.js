/* Service order fills in as each step reaches the middle of the screen.
   Without JS (or before it runs) the order is shown complete. */
(() => {
  const ticket = document.getElementById('ticket');
  const steps = [...document.querySelectorAll('.step')];
  document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });

  const date = document.getElementById('ticket-date');
  if (date) date.textContent = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  /* "What's going on?" picker: plain answers + a pre-written text message. */
  const PROBLEMS = {
    slow: {
      cause: 'An aging hard drive, too many startup programs, or overheating.',
      fix: 'A diagnosis first. Often an SSD upgrade or a cleanup.',
      remote: 'Sometimes. Hardware problems need a drop-off or visit.',
      sms: "Hi Matt, my computer is slow or won't start."
    },
    virus: {
      cause: 'A bad browser extension, a fake download, or a scam pop-up.',
      fix: 'Malware removal, browser cleanup, and security settings.',
      remote: 'Usually, yes.',
      tip: "If a pop-up tells you to call a number for support, don't call it.",
      sms: 'Hi Matt, I think my computer has a virus or pop-ups.'
    },
    wifi: {
      cause: 'Router placement, an old router, or too many devices.',
      fix: 'An on-site check, better settings, or a mesh system.',
      remote: 'Usually needs a visit.',
      sms: 'Hi Matt, my Wi-Fi keeps dropping.'
    },
    printer: {
      cause: 'A driver update, changed settings, or a new password.',
      fix: 'Reconnecting, updating, and testing it with you.',
      remote: 'Usually, yes.',
      sms: "Hi Matt, my printer or email isn't working."
    },
    files: {
      cause: 'A deleted folder, a failing drive, or a sync problem.',
      fix: 'Recovery when possible, then a backup so it doesn’t happen again.',
      remote: 'Depends on the drive.',
      tip: 'Stop using the computer or drive until it’s checked. It improves the chance of recovery.',
      sms: 'Hi Matt, I lost some files and need help.'
    },
    web: {
      cause: 'Running the business on paper, texts, and spreadsheets.',
      fix: 'A fast business website or a simple system built for how you work.',
      remote: 'Yes, mostly remote.',
      sms: 'Hi Matt, I need a website or a simple system for my business.'
    }
  };
  const answer = document.getElementById('answer');
  const sms = document.getElementById('answer-sms');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (answer) {
    const fill = p => {
      ['cause', 'fix', 'remote'].forEach(k => { answer.querySelector(`[data-k="${k}"]`).textContent = p[k]; });
      const tip = answer.querySelector('[data-k="tip"]');
      tip.textContent = p.tip || '';
      tip.hidden = !p.tip;
      sms.href = 'sms:+17542708385?&body=' + encodeURIComponent(p.sms);
    };
    document.querySelectorAll('input[name="problem"]').forEach(r => r.addEventListener('change', () => {
      const p = PROBLEMS[r.value];
      if (reduce.matches) return fill(p);
      answer.classList.add('is-changing');
      setTimeout(() => { fill(p); answer.classList.remove('is-changing'); }, 160);
    }));
  }

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
