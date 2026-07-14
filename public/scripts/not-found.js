(() => {
  const requestedPath = window.location.pathname;
  const language = requestedPath === '/en' || requestedPath.startsWith('/en/') ? 'en' : 'ru';
  const pathParts = requestedPath.split('/').filter(Boolean);

  if (pathParts[0] === 'ru' || pathParts[0] === 'en') pathParts.shift();

  const localizedMissingPath = (targetLanguage) => {
    const suffix = pathParts.join('/');
    return suffix ? `/${targetLanguage}/${suffix}${requestedPath.endsWith('/') ? '/' : ''}` : `/${targetLanguage}/`;
  };

  const activeContent = document.querySelector(`main [data-not-found-locale="${language}"]`);

  document.documentElement.lang = language;
  document.querySelectorAll('[data-not-found-locale]').forEach((element) => {
    element.hidden = element.dataset.notFoundLocale !== language;
  });

  if (activeContent instanceof HTMLElement) {
    document.title = activeContent.dataset.notFoundDocumentTitle ?? document.title;
    const description = document.querySelector('[data-not-found-meta-description]');
    if (description instanceof HTMLMetaElement && activeContent.dataset.notFoundDescription) {
      description.content = activeContent.dataset.notFoundDescription;
    }
  }

  document.querySelectorAll('a[lang][hreflang]').forEach((link) => {
    if (!(link instanceof HTMLAnchorElement)) return;
    const targetLanguage = link.hreflang === 'en' ? 'en' : 'ru';
    link.href = localizedMissingPath(targetLanguage);
    if (targetLanguage === language) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
})();
