const initializeNavigation = () => {
  document.querySelectorAll('[data-menu-toggle]').forEach((element) => {
    if (!(element instanceof HTMLButtonElement) || element.dataset.enhanced === 'true') return;

    const panelId = element.getAttribute('aria-controls');
    const panel = panelId ? document.getElementById(panelId) : null;
    const label = element.querySelector('[data-menu-label]');
    if (!(panel instanceof HTMLElement) || !(label instanceof HTMLElement)) return;

    element.dataset.enhanced = 'true';

    const close = ({ restoreFocus = false } = {}) => {
      element.setAttribute('aria-expanded', 'false');
      label.textContent = element.dataset.openLabel ?? 'Menu';
      panel.hidden = true;
      if (restoreFocus) element.focus();
    };

    const open = () => {
      element.setAttribute('aria-expanded', 'true');
      label.textContent = element.dataset.closeLabel ?? 'Close menu';
      panel.hidden = false;
    };

    element.addEventListener('click', () => {
      if (element.getAttribute('aria-expanded') === 'true') close();
      else open();
    });

    panel.addEventListener('click', (event) => {
      if (event.target instanceof HTMLAnchorElement) close();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && element.getAttribute('aria-expanded') === 'true') {
        event.preventDefault();
        close({ restoreFocus: true });
      }
    });
  });
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeNavigation, { once: true });
} else {
  initializeNavigation();
}

document.addEventListener('astro:page-load', initializeNavigation);
