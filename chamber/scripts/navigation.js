const menuButton = document.querySelector('#menu-button');
const navigation = document.querySelector('#navigation');

if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    navigation.classList.toggle('open');
    const isOpen = navigation.classList.contains('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });
}
