const featuesSwiper = new Swiper(".features__swiper", {
  slidesPerView: "auto",
  spaceBetween: 16,
  direction: 'vertical',
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next', // Кнопка следующего слайда
    prevEl: '.swiper-button-prev', // Кнопка предыдущего слайда
  },

  breakpoints: {
    1440: {
      slidesPerView: 4,
      spaceBetween: 24,
      direction: 'horizontal',
    }
  }
});