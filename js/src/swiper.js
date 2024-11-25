const featuesSwiper = new Swiper(".features__swiper", {
  slidesPerView: "auto",
  spaceBetween: 16,
  direction: 'vertical',
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  breakpoints: {
    1440: {
      slidesPerView: 4,
      spaceBetween: 24,
      direction: 'horizontal',
    }
  }
});

const userReviewsSwiper = new Swiper(".user-reviews__swiper", {
  slidesPerView: "auto",
  spaceBetween: 16,
  direction: 'vertical',
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  breakpoints: {
    1440: {
      slidesPerView: 4,
      spaceBetween: 24,
      direction: 'horizontal',
    }
  }
});