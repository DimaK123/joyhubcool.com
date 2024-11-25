const burgerButton = document.querySelector('.nav__burger-menu');
const closeButton = document.querySelector('.nav__close-menu');
const page = document.querySelector('.page');
const pageMenu = document.querySelector('.page__menu');
const headerNav = document.querySelector('.header__nav');
const menuLinks = document.querySelectorAll('.nav__t2');
const menu = document.querySelector('.page__menu');

console.log(menuLinks);
console.log(menu);

burgerButton.addEventListener('click', () => {
  page.classList.add('page--with-menu');
  pageMenu.classList.add('page__menu--visible');
});

closeButton.addEventListener('click', () => {
  page.classList.remove('page--with-menu');
  pageMenu.classList.remove('page__menu--visible');
});

window.addEventListener('scroll', function() {
  const scrollPosition = window.scrollY;

  if (scrollPosition > 80) {
    headerNav.classList.add('nav--scrolled');
  } else {
    headerNav.classList.remove('nav--scrolled');
  }
});

menuLinks.forEach(link => {
  link.addEventListener('click', () => {
    page.classList.remove('page--with-menu');
    menu.classList.remove('page__menu--visible');
  })
})

