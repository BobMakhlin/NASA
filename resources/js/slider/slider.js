const sliderLeftButtons = document.getElementsByClassName('slider__left-button');
const sliderRightButtons = document.getElementsByClassName('slider__right-button');

initLeftButtons();
initRightButtons();


function initLeftButtons() {
    for (let button of sliderLeftButtons) {
        button.addEventListener('click', onLeftButtonClicked);
    }
}
function initRightButtons() {
    for (let button of sliderRightButtons) {
        button.addEventListener('click', onRightButtonClicked);
    }
}

function onLeftButtonClicked(event) {
    let button = event.target;
    let slider = button.closest('.slider');
    let activeItem = slider.querySelector('.slider__item_active');

    let targetItem = activeItem.previousElementSibling;

    if (!targetItem) return;

    activeItem.classList.remove('slider__item_active');
    targetItem.classList.add('slider__item_active');
}
function onRightButtonClicked(event) {
    let button = event.target;
    let slider = button.closest('.slider');
    let activeItem = slider.querySelector('.slider__item_active');

    let targetItem = activeItem.nextElementSibling;

    if (!targetItem) return;

    activeItem.classList.remove('slider__item_active');
    targetItem.classList.add('slider__item_active');
}
