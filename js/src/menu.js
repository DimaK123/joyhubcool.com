const burgerButton = document.querySelector('.nav__burger-menu');
const closeButton = document.querySelector('.nav__close-menu');
const page = document.querySelector('.page');
const pageMenu = document.querySelector('.page__menu');

burgerButton.addEventListener('click', () => {
  page.classList.add('page--with-menu');
  pageMenu.classList.add('page__menu--visible');
});

closeButton.addEventListener('click', () => {
  page.classList.remove('page--with-menu');
  pageMenu.classList.remove('page__menu--visible');
});

// const menuLinks = document.querySelectorAll(".nav__link"); // Ссылки в меню
// const menu = document.querySelector(".page__menu"); // Меню

// if (menuLinks && menu) {
//   menuLinks.forEach(link => {
//     link.addEventListener("click", () => {
//       page.classList.remove("page--with-menu");
//       menu.classList.remove("page__menu--visible");
//     });
//   });
// } else {
//   console.error("Элементы не найдены! Проверьте классы.");
// }