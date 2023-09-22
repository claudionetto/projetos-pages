
const buttonMenu = document.getElementById('button-menu');
const navigationMenu = document.querySelector('.navigation');

const showMenu = () => {
    buttonMenu.classList.toggle('button--active');
    navigationMenu.classList.toggle('navigation--active')
}

buttonMenu.addEventListener('click', showMenu);