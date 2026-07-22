const initializeSearch = () => {
  document.querySelectorAll('[data-search-form]').forEach((element) => {
    if (!(element instanceof HTMLFormElement) || element.dataset.enhanced === 'true') return;

    const input = element.querySelector('[data-search-input]');
    const status = element.parentElement?.querySelector('[data-search-status]');
    const results = element.parentElement?.querySelector('[data-search-results]');
    if (!(input instanceof HTMLInputElement) || !(status instanceof HTMLElement) || !(results instanceof HTMLOListElement)) return;

    element.dataset.enhanced = 'true';
    let pagefindPromise;
    let requestId = 0;
    let debounceTimer;

    const labels = {
      hint: element.dataset.hint ?? 'Enter at least two characters.',
      loading: element.dataset.loading ?? 'Searching…',
      unavailable: element.dataset.unavailable ?? 'Search is unavailable.',
      empty: element.dataset.empty ?? 'No results found.',
      results: element.dataset.results ?? 'Results: {count}',
    };

    const loadPagefind = () => {
      pagefindPromise ??= import('/pagefind/pagefind.js').then(async (pagefind) => {
        await pagefind.options({
          bundlePath: '/pagefind/',
          excerptLength: 28,
          noWorker: true,
        });
        return pagefind;
      });
      return pagefindPromise;
    };

    const clearResults = () => {
      results.replaceChildren();
    };

    const renderResults = (items) => {
      clearResults();
      const fragment = document.createDocumentFragment();

      items.forEach((item) => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        const type = document.createElement('span');
        const title = document.createElement('span');
        const excerpt = document.createElement('span');

        listItem.className = 'search-result';
        link.className = 'search-result__link';
        link.href = item.url;
        type.className = 'search-result__type';
        type.textContent = item.meta?.type ?? '';
        title.className = 'search-result__title';
        title.textContent = item.meta?.title ?? item.url;
        excerpt.className = 'search-result__excerpt';
        excerpt.textContent = item.plain_excerpt ?? '';

        link.append(type, title, excerpt);
        listItem.append(link);
        fragment.append(listItem);
      });

      results.append(fragment);
    };

    const runSearch = async () => {
      const query = input.value.trim();
      const currentRequest = ++requestId;

      if (query.length < 2) {
        clearResults();
        status.textContent = labels.hint;
        return;
      }

      status.textContent = labels.loading;

      try {
        const pagefind = await loadPagefind();
        const search = await pagefind.search(query);
        const items = await Promise.all(search.results.slice(0, 12).map((result) => result.data()));
        if (currentRequest !== requestId) return;

        renderResults(items);
        status.textContent = items.length > 0
          ? labels.results.replace('{count}', String(search.results.length))
          : labels.empty;
      } catch {
        if (currentRequest !== requestId) return;
        clearResults();
        status.textContent = labels.unavailable;
      }
    };

    input.addEventListener('focus', () => void loadPagefind().catch(() => undefined), { once: true });
    input.addEventListener('input', () => {
      window.clearTimeout(debounceTimer);
      debounceTimer = window.setTimeout(runSearch, 160);
    });

    element.addEventListener('submit', (event) => {
      event.preventDefault();
      const firstResult = results.querySelector('a');
      if (input.value.trim().length >= 2 && firstResult instanceof HTMLAnchorElement) {
        window.location.assign(firstResult.href);
      } else {
        void runSearch();
      }
    });

    input.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        const firstResult = results.querySelector('a');
        if (firstResult instanceof HTMLAnchorElement) {
          event.preventDefault();
          window.location.assign(firstResult.href);
        }
      } else if (event.key === 'ArrowDown') {
        const firstResult = results.querySelector('a');
        if (firstResult instanceof HTMLAnchorElement) {
          event.preventDefault();
          firstResult.focus();
        }
      } else if (event.key === 'Escape') {
        input.value = '';
        clearResults();
        status.textContent = labels.hint;
      }
    });

    results.addEventListener('keydown', (event) => {
      if (!(event.target instanceof HTMLAnchorElement)) return;
      const links = [...results.querySelectorAll('a')];
      const index = links.indexOf(event.target);

      if (event.key === 'ArrowDown' && links[index + 1] instanceof HTMLAnchorElement) {
        event.preventDefault();
        links[index + 1].focus();
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        if (links[index - 1] instanceof HTMLAnchorElement) links[index - 1].focus();
        else input.focus();
      } else if (event.key === 'Escape') {
        event.preventDefault();
        input.focus();
      }
    });
  });
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeSearch, { once: true });
} else {
  initializeSearch();
}

document.addEventListener('astro:page-load', initializeSearch);
