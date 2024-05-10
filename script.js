// header scroll
document.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    const headerElems = document.querySelectorAll('#headerelem');

    headerElems.forEach(elem => {
        if (window.scrollY > 0) {
            elem.classList.add('scrolled');
        } else {
            elem.classList.remove('scrolled');
        }
    });

    if (window.scrollY > 0) {
        header.classList.add('scrolled', 'shadow');
    } else {
        header.classList.remove('scrolled', 'shadow');
    }
});

// hamburger menu
const header = document.querySelector('header');
const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.hamburgermenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    menu.classList.toggle('active');
});

document.body.addEventListener('click', (event) => {
    if (event.target !== hamburger && event.target !== menu && event.target.closest('.hamburger') !== hamburger) {
        hamburger.classList.remove('active');
        menu.classList.remove('active');
    }
});

menu.style.setProperty('--header-height', header.offsetHeight + 'px');

// card drag scrolling
const cardWrappers = document.querySelectorAll('.cardwrapper');

cardWrappers.forEach(cardWrapper => {
    const cards = cardWrapper.querySelectorAll('.card');
    let dragging = false;
    let startX;
    let scrollLeft;

    cards.forEach(card => {
        card.addEventListener('mousedown', (e) => {
            dragging = true;
            startX = e.clientX;
            scrollLeft = cardWrapper.scrollLeft;
        });
    });

    window.addEventListener('mouseup', () => {
        dragging = false;
    });

    cardWrapper.addEventListener('mousemove', (e) => {
        if(!dragging) {
            return;
        }

        const distance = startX - e.clientX;
        cardWrapper.scrollLeft = scrollLeft + distance * 2;
    });
});