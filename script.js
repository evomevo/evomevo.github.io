//header scroll
document.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    const logo = document.querySelector('.logo');
    //const bars = document.querySelectorAll('.bar');
  
    if (window.scrollY > 0) {
        header.classList.add('scrolled', 'shadow');
        logo.classList.add('scrolled');
        //bars.forEach(bar => bar.classList.add('scrolled'));
    } else {
        header.classList.remove('scrolled', 'shadow');
        logo.classList.remove('scrolled');
        //bars.forEach(bar => bar.classList.remove('scrolled'));
    }
});

//card drag scrolling
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
        card.addEventListener('mouseleave', () => {
            dragging = false;
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
        cardWrapper.scrollLeft = scrollLeft + distance * 2.5;
    });
});