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
  /* Galerias dos estudos de caso: seleção, navegação e ampliação. */
  function initProjectGallery(slug, projectName) {
    const thumbs = [...document.querySelectorAll(`[data-${slug}-slide]`)];
    if (!thumbs.length) return;
    const image = document.getElementById(`${slug}-gallery-image`);
    const lightbox = document.getElementById(`${slug}-lightbox`);
    const zoomImage = document.getElementById(`${slug}-lightbox-image`);
    let current = 0;
    function showSlide(index) {
      current = (index + thumbs.length) % thumbs.length;
      const selected = thumbs[current];
      const { title, src, description, width, height } = selected.dataset;
      image.src = src;
      image.alt = `${title} no ${projectName}`;
      image.classList.toggle('is-portrait', selected.dataset.orientation === 'portrait');
      if (width && height) { image.width = Number(width); image.height = Number(height); }
      document.getElementById(`${slug}-gallery-title`).textContent = title;
      document.getElementById(`${slug}-gallery-description`).textContent = description;
      document.getElementById(`${slug}-gallery-counter`).textContent = `${String(current + 1).padStart(2, '0')} / ${String(thumbs.length).padStart(2, '0')}`;
      thumbs.forEach((thumb, position) => {
        const active = position === current;
        thumb.classList.toggle('is-current', active);
        thumb.setAttribute('aria-pressed', String(active));
      });
      zoomImage.src = src;
      zoomImage.alt = `${title} ampliado no ${projectName}`;
      if (width && height) { zoomImage.width = Number(width); zoomImage.height = Number(height); }
      document.getElementById(`${slug}-lightbox-title`).textContent = title;
      document.getElementById(`${slug}-original-link`).href = src;
    }
    thumbs.forEach((thumb, index) => thumb.addEventListener('click', () => showSlide(index)));
    document.getElementById(`${slug}-prev`).addEventListener('click', () => showSlide(current - 1));
    document.getElementById(`${slug}-next`).addEventListener('click', () => showSlide(current + 1));
    document.getElementById(`${slug}-zoom`).addEventListener('click', () => lightbox.showModal());
    document.getElementById(`${slug}-lightbox-prev`).addEventListener('click', () => showSlide(current - 1));
    document.getElementById(`${slug}-lightbox-next`).addEventListener('click', () => showSlide(current + 1));
    document.addEventListener('keydown', event => {
      if (!lightbox.open) return;
      if (event.key === 'ArrowRight') { event.preventDefault(); showSlide(current + 1); }
      if (event.key === 'ArrowLeft') { event.preventDefault(); showSlide(current - 1); }
    });
    showSlide(0);
  }
  initProjectGallery('markcar', 'Sistema MarkCar');
  initProjectGallery('unica', 'protótipo da loja ÚNICA.');
  initProjectGallery('barber', 'Plataforma de Barbearias');
  initProjectGallery('racha', 'Racha Franca');
})();
