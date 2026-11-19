(() => {
  const rotation = document.querySelector('.rotating-subtitle');
  const phrases = rotation ? [...rotation.querySelectorAll('.subtitle-phrase')] : [];
  if (phrases.length < 2) return;

  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const lines = phrases.map(phrase => Array.from(phrase.textContent.trim()));
  if (lines.some(line => !line.length)) return;
  const output = document.createElement('span');
  output.className = 'subtitle-typed';
  output.setAttribute('aria-hidden', 'true');
  rotation.append(output);

  let lineIndex = 0;
  let length = 0;
  let deleting = false;
  let timer;
  const pause = () => clearTimeout(timer);
  function schedule(delay = 100) {
    pause();
    if (!motion.matches && !document.hidden && !rotation.matches(':hover')) {
      timer = setTimeout(tick, delay);
    }
  }
  function tick() {
    const line = lines[lineIndex];
    length += deleting ? -1 : 1;
    output.textContent = line.slice(0, length).join('');
    if (length === line.length) {
      deleting = true;
      schedule(2200);
    } else if (length === 0) {
      deleting = false;
      lineIndex = (lineIndex + 1) % lines.length;
      schedule(320);
    } else {
      schedule(deleting ? 55 : 115);
    }
  }
  function syncMotion() {
    rotation.classList.toggle('is-typing', !motion.matches);
    schedule();
  }
  rotation.addEventListener('mouseenter', pause);
  rotation.addEventListener('mouseleave', () => schedule());
  document.addEventListener('visibilitychange', () => schedule());
  motion.addEventListener('change', syncMotion);
  syncMotion();
})();
