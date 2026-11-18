(() => {
  const viewer = document.querySelector('.photo-viewer');
  const enlarged = viewer.querySelector('img');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let source;
  let animation;

  function transformBetween(from, to) {
    return `translate(${from.left - to.left}px, ${from.top - to.top}px) scale(${from.width / to.width}, ${from.height / to.height})`;
  }

  function closeViewer() {
    if (!viewer.open || viewer.classList.contains('is-closing')) return;
    viewer.classList.add('is-closing');
    const current = enlarged.getBoundingClientRect();
    animation?.cancel();
    const finish = () => {
      viewer.close();
      source.classList.remove('is-enlarged');
      viewer.classList.remove('is-closing');
      animation = null;
    };
    if (reducedMotion.matches) return finish();
    const full = enlarged.getBoundingClientRect();
    animation = enlarged.animate([
      { transform:transformBetween(current, full) },
      { transform:transformBetween(source.getBoundingClientRect(), full) }
    ], { duration:260, easing:'cubic-bezier(.4,0,.2,1)', fill:'forwards' });
    animation.onfinish = () => { animation.cancel(); finish(); };
  }

  viewer.addEventListener('cancel', event => {
    event.preventDefault();
    closeViewer();
  });
  viewer.addEventListener('click', event => {
    if (event.target === viewer || event.target === enlarged) closeViewer();
  });

  document.querySelectorAll('.photo-wall img').forEach(image => {
    const trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.setAttribute('aria-haspopup', 'dialog');
    trigger.setAttribute('aria-label', '放大查看' + (image.alt || '照片'));
    (image.closest('a') || image).replaceWith(trigger);
    trigger.append(image);
    trigger.addEventListener('click', () => {
      const thumbnail = image.getBoundingClientRect();
      if (!thumbnail.width || !thumbnail.height) return;
      source = image;
      viewer.style.setProperty('--photo-ratio', thumbnail.width / thumbnail.height);
      enlarged.src = image.currentSrc || image.src;
      enlarged.alt = image.alt;
      viewer.showModal();
      source.classList.add('is-enlarged');
      if (!reducedMotion.matches) {
        animation = enlarged.animate([
          { transform:transformBetween(thumbnail, enlarged.getBoundingClientRect()) },
          { transform:'none' }
        ], { duration:360, easing:'cubic-bezier(.2,.75,.25,1)' });
      }
    });
  });
})();
