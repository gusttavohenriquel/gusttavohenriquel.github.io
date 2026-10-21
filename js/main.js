/* Portfólio Gustavo Henrique | Tema, modais e e-mail */
(() => {
  const root = document.documentElement;
  const toggle = document.getElementById('theme-toggle');
  const night = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 14.2A8.6 8.6 0 0 1 9.8 3.5 8.5 8.5 0 1 0 20.5 14.2Z"/></svg>';
  const sun = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>';
  let storedTheme = null;
  try { storedTheme = localStorage.getItem('gh-portfolio-theme'); } catch (_) {}
  if (storedTheme === 'dark' || storedTheme === 'light') root.dataset.theme = storedTheme;
  const isDark = () => root.dataset.theme ? root.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
  const updateThemeLabel = () => { const dark = isDark(); toggle.innerHTML = dark ? sun : night; toggle.setAttribute('aria-label', dark ? 'Ativar tema claro' : 'Ativar tema escuro'); toggle.title = dark ? 'Ativar tema claro' : 'Ativar tema escuro'; };
  updateThemeLabel();
  toggle.addEventListener('click', () => { root.dataset.theme = isDark() ? 'light' : 'dark'; try { localStorage.setItem('gh-portfolio-theme', root.dataset.theme); } catch (_) {} updateThemeLabel(); });
  if (window.matchMedia) { const mq = matchMedia('(prefers-color-scheme: dark)'); if (mq.addEventListener) mq.addEventListener('change', updateThemeLabel); }
  document.querySelectorAll('[data-open-dialog]').forEach(button => button.addEventListener('click', () => { const dialog = document.getElementById(button.dataset.openDialog); if (dialog && typeof dialog.showModal === 'function') dialog.showModal(); }));
  document.querySelectorAll('[data-close-dialog]').forEach(button => button.addEventListener('click', () => button.closest('dialog').close()));
  document.querySelectorAll('dialog').forEach(dialog => dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); }));
  const copyButton = document.getElementById('copy-mail');
  copyButton.addEventListener('click', async () => {
    const email = 'gustavohenriquel.dev@gmail.com';
    try {
      if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(email);
      else { const field = document.createElement('textarea'); field.value = email; field.style.position = 'fixed'; field.style.opacity = '0'; document.body.appendChild(field); field.select(); const copied = document.execCommand('copy'); field.remove(); if (!copied) throw new Error('copy unavailable'); }
      document.getElementById('copy-feedback').textContent = 'E-mail copiado.';
      copyButton.textContent = 'Copiado ✓';
    } catch (_) { document.getElementById('copy-feedback').textContent = 'Não foi possível copiar automaticamente. Selecione o e-mail exibido acima.'; }
  });
  /* Galeria MarkCar: seleção, navegação e ampliação */
  const markcarThumbs = [...document.querySelectorAll('[data-markcar-slide]')];
  const markcarImage = document.getElementById('markcar-gallery-image');
  const markcarLightbox = document.getElementById('markcar-lightbox');
  const zoomImage = document.getElementById('markcar-lightbox-image');
  let currentMarkcarSlide = 0;
  function showMarkcarSlide(index) {
    if (!markcarThumbs.length) return;
    currentMarkcarSlide = (index + markcarThumbs.length) % markcarThumbs.length;
    const selected = markcarThumbs[currentMarkcarSlide];
    const title = selected.dataset.title;
    const src = selected.dataset.src;
    markcarImage.src = src;
    markcarImage.alt = title + ' no Sistema MarkCar';
    document.getElementById('markcar-gallery-title').textContent = title;
    document.getElementById('markcar-gallery-description').textContent = selected.dataset.description;
    document.getElementById('markcar-gallery-counter').textContent = `${String(currentMarkcarSlide + 1).padStart(2, '0')} / ${String(markcarThumbs.length).padStart(2, '0')}`;
    markcarThumbs.forEach((thumb, position) => {
      const active = position === currentMarkcarSlide;
      thumb.classList.toggle('is-current', active);
      thumb.setAttribute('aria-pressed', String(active));
    });
    zoomImage.src = src;
    zoomImage.alt = title + ' ampliado no Sistema MarkCar';
    document.getElementById('markcar-lightbox-title').textContent = title;
    document.getElementById('markcar-original-link').href = src;
  }
  markcarThumbs.forEach((thumb, index) => thumb.addEventListener('click', () => showMarkcarSlide(index)));
  document.getElementById('markcar-prev').addEventListener('click', () => showMarkcarSlide(currentMarkcarSlide - 1));
  document.getElementById('markcar-next').addEventListener('click', () => showMarkcarSlide(currentMarkcarSlide + 1));
  document.getElementById('markcar-zoom').addEventListener('click', () => markcarLightbox.showModal());
  document.getElementById('markcar-lightbox-prev').addEventListener('click', () => showMarkcarSlide(currentMarkcarSlide - 1));
  document.getElementById('markcar-lightbox-next').addEventListener('click', () => showMarkcarSlide(currentMarkcarSlide + 1));
  document.addEventListener('keydown', event => {
    if (!markcarLightbox.open) return;
    if (event.key === 'ArrowRight') { event.preventDefault(); showMarkcarSlide(currentMarkcarSlide + 1); }
    if (event.key === 'ArrowLeft') { event.preventDefault(); showMarkcarSlide(currentMarkcarSlide - 1); }
  });
})();
