(() => {
  const prose = document.querySelector('.post .prose');
  const panel = document.querySelector('.article-toc');
  const toggle = document.querySelector('.toc-toggle');
  if (!prose || !panel || !toggle) return;

  const headings = [...prose.querySelectorAll('h1, h2, h3, h4, h5, h6')]
    .filter(heading => heading.textContent.trim());
  if (!headings.length) return;

  const root = document.createElement('ol');
  const stack = [{ level: 0, list: root, item: null }];
  const links = [];
  const branches = new Map();
  headings.forEach((heading, index) => {
    if (!heading.id || document.getElementById(heading.id) !== heading) {
      const base = `article-section-${index + 1}`;
      let id = base;
      let suffix = 1;
      while (document.getElementById(id)) id = `${base}-${suffix++}`;
      heading.id = id;
    }

    const level = Number(heading.tagName.slice(1));
    while (stack.length > 1 && stack.at(-1).level >= level) stack.pop();
    const parent = stack.at(-1);
    let list = parent.list;
    if (parent.item) {
      list = parent.item.querySelector(':scope > ol');
      if (!list) {
        list = document.createElement('ol');
        parent.item.append(list);
      }
    }
    const item = document.createElement('li');
    const link = document.createElement('a');
    link.href = `#${encodeURIComponent(heading.id)}`;
    link.textContent = heading.textContent.trim();
    link.addEventListener('click', () => {
      const branch = branches.get(link);
      if (branch) setBranchExpanded(branch, true);
      heading.tabIndex = -1;
      heading.focus({ preventScroll: true });
    });
    const row = document.createElement('div');
    row.className = 'toc-entry';
    row.append(link);
    item.append(row);
    list.append(item);
    stack.push({ level, list, item });
    links.push(link);
  });

  root.querySelectorAll('li').forEach((item, index) => {
    const children = item.querySelector(':scope > ol');
    if (!children) return;
    const link = item.querySelector(':scope > .toc-entry > a');
    let id = `toc-children-${index + 1}`;
    while (document.getElementById(id)) id += '-nested';
    children.id = id;
    children.hidden = true;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'toc-branch-toggle';
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-controls', id);
    button.setAttribute('aria-label', `展开“${link.textContent}”的子目录`);
    button.innerHTML = '<svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="m6 3 5 5-5 5"/></svg>';
    const branch = { children, button, link };
    branches.set(link, branch);
    button.addEventListener('click', () => setBranchExpanded(branch, children.hidden));
    item.querySelector(':scope > .toc-entry').append(button);
  });
  panel.querySelector('.toc-links').append(root);
  toggle.hidden = false;

  function setBranchExpanded(branch, expanded) {
    branch.children.hidden = !expanded;
    branch.button.setAttribute('aria-expanded', String(expanded));
    branch.button.setAttribute('aria-label', `${expanded ? '收起' : '展开'}“${branch.link.textContent}”的子目录`);
    updateActive(false);
  }

  const setExpanded = (expanded, restoreFocus = false) => {
    panel.hidden = !expanded;
    toggle.setAttribute('aria-expanded', String(expanded));
    toggle.querySelector('span').textContent = expanded ? '隐藏目录' : '显示目录';
    if (expanded) updateActive();
    if (restoreFocus) toggle.focus({ preventScroll: true });
  };
  toggle.addEventListener('click', () => setExpanded(panel.hidden));
  panel.querySelector('.toc-close').addEventListener('click', () => setExpanded(false, true));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !panel.hidden) setExpanded(false, true);
  });

  let activeLink = null;
  function updateActive(revealCurrent = true) {
    let nextIndex = 0;
    headings.forEach((heading, index) => {
      if (heading.getBoundingClientRect().top <= 120) nextIndex = index;
    });
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
      nextIndex = headings.length - 1;
    }
    let nextLink = links[nextIndex];
    let item = nextLink.closest('li');
    while (item.parentElement !== root) {
      const list = item.parentElement;
      const parent = list.parentElement;
      if (list.hidden) nextLink = parent.querySelector(':scope > .toc-entry > a');
      item = parent;
    }
    if (nextLink === activeLink) return;
    activeLink?.removeAttribute('aria-current');
    nextLink.setAttribute('aria-current', 'location');
    activeLink = nextLink;
    if (!revealCurrent) return;
    // Keep the active chapter visible by scrolling only the directory itself.
    const navigation = panel.querySelector('.toc-links');
    const bounds = navigation.getBoundingClientRect();
    const current = nextLink.getBoundingClientRect();
    if (current.top < bounds.top) navigation.scrollTop -= bounds.top - current.top;
    else if (current.bottom > bounds.bottom) navigation.scrollTop += current.bottom - bounds.bottom;
  }
  let pending = false;
  window.addEventListener('scroll', () => {
    if (panel.hidden || pending) return;
    pending = true;
    requestAnimationFrame(() => {
      updateActive();
      pending = false;
    });
  }, { passive: true });
  window.addEventListener('resize', () => {
    if (!panel.hidden) updateActive();
  });
})();
