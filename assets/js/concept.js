(() => {
  const motionMedia = document.querySelectorAll('video');
  const ratedMedia = document.querySelectorAll('[data-playback-rate]');
  const toggles = document.querySelectorAll('[data-media-toggle]');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  ratedMedia.forEach((item) => {
    item.addEventListener('loadedmetadata', () => {
      item.playbackRate = Number(item.dataset.playbackRate) || 1;
    });
  });

  toggles.forEach((toggle) => {
    const video = document.getElementById(toggle.getAttribute('aria-controls'));
    if (!video) return;

    const syncToggle = () => {
      toggle.textContent = video.paused ? 'Play' : 'Pause';
    };

    toggle.addEventListener('click', () => {
      if (video.paused) {
        video.play().catch(syncToggle);
      } else {
        video.pause();
      }
    });

    video.addEventListener('play', syncToggle);
    video.addEventListener('pause', syncToggle);
    syncToggle();
  });

  const respectMotionPreference = () => {
    if (reducedMotion.matches) motionMedia.forEach((item) => item.pause());
  };
  reducedMotion.addEventListener('change', respectMotionPreference);
  respectMotionPreference();
})();
