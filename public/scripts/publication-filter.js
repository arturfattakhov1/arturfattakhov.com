const initializePublicationFilters = () => {
  document.querySelectorAll('[data-publication-portfolio]').forEach((portfolio) => {
    if (!(portfolio instanceof HTMLElement) || portfolio.dataset.publicationFiltersReady === 'true') return;

    const buttons = [...portfolio.querySelectorAll('[data-publication-filter]')];
    const items = [...portfolio.querySelectorAll('[data-publication-item]')];
    const groups = [...portfolio.querySelectorAll('[data-publication-group]')];
    const status = portfolio.querySelector('[data-publication-status]');
    const validFilters = new Set(
      buttons
        .map((button) => button instanceof HTMLElement ? button.dataset.publicationFilter : undefined)
        .filter(Boolean),
    );

    const applyFilter = (requestedFilter) => {
      const filter = validFilters.has(requestedFilter) ? requestedFilter : 'all';
      let visibleCount = 0;

      items.forEach((item) => {
        if (!(item instanceof HTMLElement)) return;
        const matches = filter === 'all' || item.dataset.type === filter || item.dataset.year === filter;
        item.hidden = !matches;
        item.style.display = matches ? '' : 'none';
        if (matches) visibleCount += 1;
      });

      if (visibleCount === 0 && filter !== 'all') {
        applyFilter('all');
        return;
      }

      groups.forEach((group) => {
        const section = group.closest('section');
        if (!(section instanceof HTMLElement)) return;

        const hasVisibleItems = [...group.querySelectorAll('[data-publication-item]')]
          .some((item) => item instanceof HTMLElement && !item.hidden);
        section.hidden = !hasVisibleItems;
        section.style.display = hasVisibleItems ? '' : 'none';
      });

      buttons.forEach((button) => {
        if (!(button instanceof HTMLElement)) return;
        const active = button.dataset.publicationFilter === filter;
        button.setAttribute('aria-pressed', String(active));
        button.classList.toggle('button--primary', active);
        button.classList.toggle('button--secondary', !active);
      });

      if (status) {
        const activeButton = buttons.find(
          (button) => button instanceof HTMLElement && button.dataset.publicationFilter === filter,
        );
        status.textContent = filter === 'all'
          ? (portfolio.dataset.showingAll ?? '')
          : `${portfolio.dataset.showingFiltered}: ${activeButton?.textContent?.trim() ?? filter}.`;
      }
    };

    buttons.forEach((button) => {
      if (!(button instanceof HTMLElement)) return;
      button.addEventListener('click', () => applyFilter(button.dataset.publicationFilter ?? 'all'));
    });

    portfolio.dataset.publicationFiltersReady = 'true';
  });
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializePublicationFilters, { once: true });
} else {
  initializePublicationFilters();
}
document.addEventListener('astro:page-load', initializePublicationFilters);
