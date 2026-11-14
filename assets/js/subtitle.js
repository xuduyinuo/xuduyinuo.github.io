(() => {
  const rotation = document.querySelector('.rotating-subtitle');
  const phrases = rotation ? [...rotation.querySelectorAll('.subtitle-phrase')] : [];
  if (phrases.length < 2) return;

  let index = 0;
  let timer;
  const pause = () => clearInterval(timer);
  const start = () => {
    pause();
    if (document.hidden || rotation.matches(':hover')) return;
    timer = setInterval(() => {
      phrases[index].classList.remove('is-active');
      phrases[index].setAttribute('aria-hidden', 'true');
      index = (index + 1) % phrases.length;
      phrases[index].classList.add('is-active');
      phrases[index].setAttribute('aria-hidden', 'false');
    }, 4000);
  };
  rotation.addEventListener('mouseenter', pause);
  rotation.addEventListener('mouseleave', start);
  document.addEventListener('visibilitychange', start);
  start();
})();
