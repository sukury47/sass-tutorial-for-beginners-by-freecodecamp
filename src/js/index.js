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

const activateNavLink = () => {
  const getPath = () => {
    const url = window.location.href;

    return url.replace(
      /https?:\/\/[a-zA-Z\d\.]*(:\d+)?\//,
      ''
    );
  };

  const activeNavLink = document.querySelector(
    '.menu-nav__link[href="' + getPath() + '"]'
  );

  activeNavLink.parentNode.classList.add('active');
};

activateNavLink();

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
