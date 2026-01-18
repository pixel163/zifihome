document.addEventListener('DOMContentLoaded', function () {
  const slider = document.querySelector('.hero-slider');
  const slides = document.querySelectorAll('.hero-slide');
  const prevBtn = document.querySelector('.hero-nav.prev');
  const nextBtn = document.querySelector('.hero-nav.next');

  let index = 0;
  const total = slides.length;

  function showSlide() {
    slider.style.transition = 'transform 0.6s ease-in-out';
    slider.style.transform = `translateX(-${index * 100}%)`;
  }

  /* ========= BUTTON ========= */
  nextBtn.addEventListener('click', () => {
    index++;
    if (index >= total) index = 0;
    showSlide();
    resetAutoSlide();
  });

  prevBtn.addEventListener('click', () => {
    index--;
    if (index < 0) index = total - 1;
    showSlide();
    resetAutoSlide();
  });

  /* ========= SWIPE (MOBILE) ========= */
  let startX = 0;
  let endX = 0;

  slider.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  });

  slider.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
    resetAutoSlide();
  });

  function handleSwipe() {
    const threshold = 50;

    if (startX - endX > threshold) {
      index++;
      if (index >= total) index = 0;
      showSlide();
    }

    if (endX - startX > threshold) {
      index--;
      if (index < 0) index = total - 1;
      showSlide();
    }
  }

  /* ========= AUTO SLIDE ========= */
  let autoSlide = setInterval(nextAuto, 5000);

  function nextAuto() {
    index++;
    if (index >= total) index = 0;
    showSlide();
  }

  function resetAutoSlide() {
    clearInterval(autoSlide);
    autoSlide = setInterval(nextAuto, 5000);
  }
});
