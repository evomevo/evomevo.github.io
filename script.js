// page transition
const black = document.querySelector('.blackexit');

function handleLinkClick(linkElements, targetPage) {
    linkElements.forEach(linkElement => {
        linkElement.addEventListener('click', () => {
            black.style.visibility = 'visible';
            setTimeout(() => {
                black.style.opacity = '1';
            }, 0);
            setTimeout(() => {
                window.location.href = targetPage;
            }, 250);
        });
    });
}

handleLinkClick(document.querySelectorAll('.index'), 'index.html');
handleLinkClick(document.querySelectorAll('.gallery'), 'gallery.html');

// header scroll effect
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
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
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
menu.style.setProperty('--hamburger-menu-height', menu.offsetHeight + 'px');

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
        cardWrapper.scrollLeft = scrollLeft + distance;
    });
});

//gallery image
const image = document.querySelectorAll('.image');
const imagemodal = document.querySelector('.imagemodal');
const test333 = document.querySelector('.test333')

image.forEach(image => {
    image.addEventListener('click', () => {
        const activeImage = document.querySelector('.image.active');
        if (activeImage) {
            setTimeout(() => {
                activeImage.remove();
            }, 500);
        }

        const clone = image.cloneNode(true);
        clone.classList.add('active', 'shadow');
        clone.classList.remove('hover');

        test333.appendChild(clone);
        imagemodal.style.display = 'flex';
        test333.style.display = 'flex';
        document.body.style.overflow = 'hidden';

        setTimeout(() => {
            clone.style.maxHeight = '60svh';
            clone.style.maxWidth = '80vw'
            test333.style.opacity = '1';
        }, 0);
    });
});

if (document.contains(imagemodal)) {
    document.addEventListener('click', (event) => {
        if (!event.target.classList.contains('image') && imagemodal.contains(event.target)) {
            imagemodal.classList.add('exiting');
            document.body.style.overflow = 'auto';
            test333.style.opacity = '0';
            setTimeout(() => {
                const activeImage = document.querySelector('.image.active');
                if (activeImage) {
                    activeImage.style.maxHeight = '0';
                    activeImage.remove();
                }
                imagemodal.style.display = 'none';
                imagemodal.classList.remove('exiting');
            }, 500);
        }
    });
}