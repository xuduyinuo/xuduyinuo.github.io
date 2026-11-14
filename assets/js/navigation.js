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
  const desktop = window.matchMedia('(min-width: 992px)');
  let scrollAnchor = window.scrollY;
  let pending = false;
  const updateScrollState = () => {
    const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    const currentY = Math.max(0, Math.min(window.scrollY, maxScroll));
    if (!desktop.matches || currentY <= navigation.offsetHeight) {
      navigation.classList.remove('is-fixed', 'is-visible');
      scrollAnchor = currentY;
      return;
    }

    const hasFocus = navigation.contains(document.activeElement);
    if (!navigation.classList.contains('is-fixed')) {
      navigation.classList.add('is-fixed');
      navigation.classList.toggle('is-visible', hasFocus);
      scrollAnchor = currentY;
      return;
    }
    const delta = currentY - scrollAnchor;
    if (Math.abs(delta) >= 8) {
      navigation.classList.toggle('is-visible', delta < 0 || hasFocus);
      scrollAnchor = currentY;
    }
  };
  window.addEventListener('scroll', () => {
    if (pending) return;
    pending = true;
    requestAnimationFrame(() => {
      updateScrollState();
      pending = false;
    });
  }, { passive: true });
  navigation.addEventListener('focusin', () => {
    if (desktop.matches && navigation.classList.contains('is-fixed')) {
      navigation.classList.add('is-visible');
    }
  });
  desktop.addEventListener('change', () => {
    setExpanded(false);
    navigation.classList.remove('is-fixed', 'is-visible');
    scrollAnchor = window.scrollY;
    updateScrollState();
  });
  window.addEventListener('pageshow', updateScrollState);
  updateScrollState();
})();
