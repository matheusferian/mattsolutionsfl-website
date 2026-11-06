/* Inner pages: FAQ accordion + contact form (Formspree). */
(() => {
  const PT = (document.documentElement.lang || '').toLowerCase().startsWith('pt');

  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.setAttribute('aria-expanded', 'false');
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const open = !item.classList.contains('open');
      item.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', String(open));
    });
  });

  const toast = document.getElementById('toast');
  const show = msg => {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 5000);
  };

  const form = document.getElementById('contact-form') || document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }
    const btn = form.querySelector('[type="submit"]');
    const label = btn.textContent;
    btn.textContent = PT ? 'Enviando…' : 'Sending…';
    btn.disabled = true;
    try {
      const res = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
      if (res.ok) {
        form.reset();
        show(PT ? 'Mensagem enviada. Eu respondo em breve.' : "Message sent. I'll get back to you shortly.");
      } else {
        show(PT ? 'Não foi possível enviar. Ligue ou mande mensagem para (754) 270-8385.' : "Couldn't send it. Call or text (754) 270-8385.");
      }
    } catch {
      show(PT ? 'Não foi possível enviar. Ligue ou mande mensagem para (754) 270-8385.' : "Couldn't send it. Call or text (754) 270-8385.");
    } finally {
      btn.textContent = label;
      btn.disabled = false;
    }
  });
})();
