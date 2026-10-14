(() => {
  const settings = document.currentScript?.dataset || {};
  const positiveInteger = (value, fallback) => {
    const number = Number(value);
    return Number.isInteger(number) && number > 0 ? number : fallback;
  };
  const foldLines = positiveInteger(settings.foldLines, 20);
  const previewLines = Math.min(positiveInteger(settings.previewLines, 12), foldLines);
  const languages = { java: 'Java', javascript: 'JavaScript', js: 'JavaScript', typescript: 'TypeScript', ts: 'TypeScript', python: 'Python', py: 'Python', bash: 'Bash', shell: 'Shell', sh: 'Shell', ruby: 'Ruby', sql: 'SQL', json: 'JSON', yaml: 'YAML', yml: 'YAML', html: 'HTML', css: 'CSS', cpp: 'C++', c: 'C', plaintext: '代码', text: '代码' };

  document.querySelectorAll('.prose pre, .post-excerpt pre').forEach((pre, index) => {
    if (pre.closest('.code-block')) return;
    const code = pre.querySelector('code');
    if (!code) return;
    const frame = pre.closest('.highlighter-rouge') || pre.parentElement.closest('div.highlight') || pre;
    const languageClass = [frame, pre, code].flatMap(element => [...element.classList]).find(name => name.startsWith('language-'));
    const language = languageClass?.slice(9) || code.dataset.lang || 'text';
    const lineCount = code.textContent.replace(/\r\n/g, '\n').replace(/\n$/, '').split('\n').length;
    const block = document.createElement('div');
    block.className = 'code-block';
    block.style.setProperty('--code-preview-lines', previewLines);
    const header = document.createElement('div');
    header.className = 'code-block-header';
    const label = document.createElement('span');
    label.className = 'code-block-language';
    label.textContent = languages[language] || language;
    const count = document.createElement('span');
    count.className = 'code-block-count';
    count.textContent = `${lineCount} 行`;
    const actions = document.createElement('div');
    actions.className = 'code-block-actions';
    const copy = document.createElement('button');
    copy.type = 'button';
    copy.className = 'code-block-copy';
    copy.textContent = '复制';
    copy.setAttribute('aria-live', 'polite');
    let feedbackTimer;
    copy.addEventListener('click', async () => {
      clearTimeout(feedbackTimer);
      copy.disabled = true;
      try {
        const text = code.textContent;
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(text);
        } else {
          const selection = window.getSelection();
          const ranges = selection ? Array.from({ length: selection.rangeCount }, (_, i) => selection.getRangeAt(i).cloneRange()) : [];
          const field = document.createElement('textarea');
          field.value = text;
          field.setAttribute('readonly', '');
          field.style.cssText = 'position:fixed;left:-9999px;top:0;';
          document.body.append(field);
          try {
            field.select();
            if (!document.execCommand('copy')) throw new Error('Copy failed');
          } finally {
            field.remove();
            if (selection) {
              selection.removeAllRanges();
              ranges.forEach(range => selection.addRange(range));
            }
            copy.focus({ preventScroll: true });
          }
        }
        copy.textContent = '已复制';
      } catch {
        copy.textContent = '复制失败';
      } finally {
        copy.disabled = false;
        feedbackTimer = setTimeout(() => { copy.textContent = '复制'; }, 2000);
      }
    });
    actions.append(count, copy);
    header.append(label, actions);
    const body = document.createElement('div');
    body.className = 'code-block-body';
    body.id = `code-block-${index + 1}`;
    frame.replaceWith(block);
    body.append(frame);
    block.append(header, body);

    if (lineCount > foldLines) {
      block.classList.add('is-collapsed');
      const toggle = document.createElement('button');
      toggle.type = 'button';
      toggle.className = 'code-block-toggle';
      toggle.setAttribute('aria-controls', body.id);
      const update = () => {
        const collapsed = block.classList.contains('is-collapsed');
        toggle.setAttribute('aria-expanded', String(!collapsed));
        toggle.textContent = collapsed ? `展开全部 ${lineCount} 行代码 ↓` : '收起代码 ↑';
      };
      toggle.addEventListener('click', () => {
        block.classList.toggle('is-collapsed');
        update();
        if (block.classList.contains('is-collapsed') && block.getBoundingClientRect().top < 0) {
          block.scrollIntoView({ block: 'nearest', behavior: 'auto' });
        }
      });
      update();
      block.append(toggle);
    }
  });
})();
