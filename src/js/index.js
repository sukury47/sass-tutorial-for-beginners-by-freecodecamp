import { routes, getCurrentRoute } from './routes.js';

const menuBtn = document.querySelector('.menu-btn');
const hamburger = document.querySelector(
  '.menu-btn__burger'
);
const nav = document.querySelector('.nav');
const menuNav = document.querySelector('.menu-nav');
const navItems = document.querySelectorAll(
  '.menu-nav__item'
);

let showMenu = false;

(() => {
  const currentRoute = getCurrentRoute();

  //mark where am I
  (() => {
    const element = document.querySelector(
      '.menu-nav__link[href="' + currentRoute.path + '"]'
    );

    element.parentNode.classList.add('active');
  })();

  const shouldFooterShowVertically = () => {
    return (
      ['about', 'projects'].indexOf(currentRoute.key) > -1
    );
  };

  const footerElement = document.querySelector('footer');

  if (shouldFooterShowVertically()) {
    footerElement.classList.add('footer--vertical');
  } else {
    footerElement.classList.remove('footer--vertical');
  }
})();

menuBtn.addEventListener('click', () => {
  if (!showMenu) {
    hamburger.classList.add('open');
    nav.classList.add('open');
    menuNav.classList.add('open');
    navItems.forEach((navItem) =>
      navItem.classList.add('open')
    );
    showMenu = true;
  } else {
    hamburger.classList.remove('open');
    nav.classList.remove('open');
    menuNav.classList.remove('open');
    navItems.forEach((navItem) =>
      navItem.classList.remove('open')
    );
    showMenu = false;
  }
});
