const initializePublicationFilters = () => {
  document.querySelectorAll('[data-publication-portfolio]').forEach((portfolio) => {
    if (!(portfolio instanceof HTMLElement) || portfolio.dataset.publicationFiltersReady === 'true') return;

    const buttons = [...portfolio.querySelectorAll('[data-publication-filter]')];
    const items = [...portfolio.querySelectorAll('[data-publication-item]')];
    const groups = [...portfolio.querySelectorAll('[data-publication-group]')];
    const status = portfolio.querySelector('[data-publication-status]');

    const applyFilter = (filter) => {
      items.forEach((item) => {
        if (!(item instanceof HTMLElement)) return;
        const matches = filter === 'all' || item.dataset.type === filter || item.dataset.year === filter;
        item.hidden = !matches;
      });

      groups.forEach((group) => {
        const section = group.closest('section');
        if (!(section instanceof HTMLElement)) return;

        const hasVisibleItems = [...group.querySelectorAll('[data-publication-item]')]
          .some((item) => item instanceof HTMLElement && !item.hidden);
        section.hidden = !hasVisibleItems;
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

initializePublicationFilters();
document.addEventListener('astro:page-load', initializePublicationFilters);
