(() => {
  const navigation = document.querySelector('.site-navigation');
  const toggle = navigation?.querySelector('.menu-toggle');
  if (!toggle) return;
  toggle.hidden = false;
  navigation.classList.add('has-menu-toggle');
  const setExpanded = (expanded) => {
    toggle.setAttribute('aria-expanded', String(expanded));
    navigation.classList.toggle('menu-open', expanded);
  };
  toggle.addEventListener('click', () => setExpanded(toggle.getAttribute('aria-expanded') !== 'true'));
  navigation.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setExpanded(false);
      toggle.focus();
    }
  });
  navigation.querySelectorAll('.site-nav a').forEach(link => {
    link.addEventListener('click', () => setExpanded(false));
  });
  window.matchMedia('(min-width: 992px)').addEventListener('change', () => setExpanded(false));
})();
