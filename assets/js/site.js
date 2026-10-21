(() => {
  const root = document.documentElement;
  const storedTheme = localStorage.getItem('theme');
  const preferredDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = storedTheme || (preferredDark ? 'dark' : 'light');
  root.dataset.theme = theme;

  const themeButton = document.querySelector('[data-theme-toggle]');
  const updateThemeLabel = () => {
    if (themeButton) themeButton.setAttribute('aria-label', `Switch to ${root.dataset.theme === 'dark' ? 'light' : 'dark'} theme`);
  };
  updateThemeLabel();
  themeButton?.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', root.dataset.theme);
    updateThemeLabel();
  });

  const menuButton = document.querySelector('[data-menu]');
  const navigation = document.querySelector('#site-nav');
  const menuLabel = menuButton?.querySelector('.sr-only');
  const setMenuOpen = (open, { returnFocus = false } = {}) => {
    menuButton?.setAttribute('aria-expanded', String(open));
    navigation?.classList.toggle('open', open);
    if (menuLabel) menuLabel.textContent = open ? 'Close menu' : 'Open menu';
    if (open) navigation?.querySelector('a')?.focus();
    if (!open && returnFocus) menuButton?.focus();
  };
  menuButton?.addEventListener('click', () => {
    setMenuOpen(menuButton.getAttribute('aria-expanded') !== 'true');
  });
  navigation?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenuOpen(false)));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuButton?.getAttribute('aria-expanded') === 'true') {
      setMenuOpen(false, { returnFocus: true });
    }
  });
  document.addEventListener('click', (event) => {
    if (menuButton?.getAttribute('aria-expanded') !== 'true') return;
    if (event.target instanceof Node && !menuButton.contains(event.target) && !navigation?.contains(event.target)) {
      setMenuOpen(false);
    }
  });
  window.matchMedia('(min-width: 681px)').addEventListener('change', (event) => {
    if (event.matches) setMenuOpen(false);
  });

  const header = document.querySelector('[data-header]');
  const updateHeader = () => header?.classList.toggle('scrolled', window.scrollY > 18);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  document.querySelectorAll('[data-year]').forEach((element) => { element.textContent = new Date().getFullYear(); });

  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    reveals.forEach((element) => observer.observe(element));
  } else {
    reveals.forEach((element) => element.classList.add('visible'));
  }
})();
