// page transition
const blackenter = document.querySelector('.blackenter');
const blackexit = document.querySelector('.blackexit');

addEventListener('DOMContentLoaded', () => {
    blackenter.style.opacity = '0';
    blackenter.style.visibility = 'hidden';
    
    applyTheme();

    setTimeout(() => {
        document.body.classList.remove('notransition');
        document.body.classList.add('transition');
    }, 250);
});

function handleLink(linkElements, targetPage) {
    linkElements.forEach(linkElement => {
        linkElement.addEventListener('click', () => {
            blackexit.style.visibility = 'visible';
            blackexit.style.opacity = '1';
            setTimeout(() => {
                window.location.href = targetPage;
            }, 250);
        });
    });
}

handleLink(document.querySelectorAll('.index'), 'index.html');
handleLink(document.querySelectorAll('.gallery'), 'gallery.html');

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

// scroll progress bar
function progressBar() {
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100;
    document.querySelector('.progressbar').style.width = scrolled + "%";
}

window.onscroll = function() {progressBar()};

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

header.style.setProperty('--header-height', header.offsetHeight + 10 + 'px');
menu.style.setProperty('--header-height', header.offsetHeight + 10 + 'px');
menu.style.setProperty('--hamburger-menu-height', menu.offsetHeight + 20 + 'px');

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
const modalcontents = document.querySelector('.modalcontents')
const imagecontainer = document.querySelector('#imagecontainer')
let alttext = document.getElementById('alttext');
const darkeningfactor = 0.25;

function darkenRGB(rgb, factor) {
    let [r, g, b] = rgb;
    r = Math.floor(r * (1 - factor));
    g = Math.floor(g * (1 - factor));
    b = Math.floor(b * (1 - factor));
    return [r, g, b];
}

async function getAverageColor(imageElement) {
    return new Promise(resolve => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.setAttribute('crossOrigin', '');

        img.onload = function() {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            let r = 0, g = 0, b = 0;

            for (let i = 0; i < imageData.data.length; i += 4) {
                r += imageData.data[i];
                g += imageData.data[i + 1];
                b += imageData.data[i + 2];
            }

            const pixelCount = imageData.data.length / 4;
            r = Math.floor(r / pixelCount);
            g = Math.floor(g / pixelCount);
            b = Math.floor(b / pixelCount);

            [r, g, b] = darkenRGB([r, g, b], darkeningfactor);

            resolve({ r, g, b });
        };

        img.src = imageElement.src;
    });
}

image.forEach(image => {
    image.addEventListener('click', () => {
        const activeImage = document.querySelector('.image.active');
        if (activeImage) {
            setTimeout(() => {
                activeImage.remove();
            }, 500);
        }

        const clone = image.cloneNode(true);
        alttext.textContent = clone.alt;
        clone.classList.add('active', 'shadow');
        clone.classList.remove('hover');
        header.classList.add('active');

        imagecontainer.appendChild(clone);
        imagemodal.style.display = 'flex';
        modalcontents.style.display = 'flex';
        document.body.style.overflow = 'hidden';

        getAverageColor(clone).then(avgColor => {
            clone.style.backgroundColor = `rgb(${avgColor.r}, ${avgColor.g}, ${avgColor.b})`;
        });

        setTimeout(() => {
            clone.style.transform = 'scale(1)';
            modalcontents.style.opacity = '1';
        }, 0);
    });
});

if (document.contains(imagemodal)) {
    document.addEventListener('click', (event) => {
        if (!event.target.classList.contains('image') && imagemodal.contains(event.target)) {
            imagemodal.classList.add('exiting');
            document.body.style.overflow = 'auto';
            modalcontents.style.opacity = '0';
            header.classList.remove('active')
            setTimeout(() => {
                const activeImage = document.querySelector('.image.active');
                if (activeImage) {
                    activeImage.style.transform = 'scale(0.95)';
                    activeImage.remove();
                }
                imagemodal.style.display = 'none';
                imagemodal.classList.remove('exiting');
            }, 500);
        }
    });
}

// theme switch
const themeswitch = document.querySelectorAll('.themeswitch');
let darkmode = sessionStorage.getItem('darkmode') === 'true';

function applyTheme() {
    if (darkmode, darkmode == true) {
        document.body.style.setProperty('--primarycolor', '#222');
        document.body.style.setProperty('--secondarycolor', '#000');
        document.body.style.setProperty('--other', '#fff');
    } else {
        document.body.style.setProperty('--primarycolor', '');
        document.body.style.setProperty('--secondarycolor', '');
        document.body.style.setProperty('--other', '');
    }
};

if (!sessionStorage.getItem('hasVisited')) {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        darkmode = true;
        sessionStorage.setItem('darkmode', darkmode);
    }
    sessionStorage.setItem('hasVisited', 'true');
}

themeswitch.forEach(themeswitch => {
    themeswitch.addEventListener('click', () => {
        darkmode = !darkmode;
        sessionStorage.setItem('darkmode', darkmode);
        applyTheme();
    });
});