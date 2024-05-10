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