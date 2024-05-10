const cardWrappers = document.querySelectorAll('.cardwrapper');

cardWrappers.forEach(cardWrapper => {
    const sliders = cardWrapper.querySelectorAll('.card');
    let dragging = false;
    let startX;
    let scrollLeft;

    sliders.forEach(slider => {
        slider.addEventListener('mousedown', (e) => {
            dragging = true;
            startX = e.clientX;
            scrollLeft = cardWrapper.scrollLeft;
        });
        slider.addEventListener('mouseleave', () => {
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
        cardWrapper.scrollLeft = scrollLeft + distance * 3;
    });
});
