const panels = document.querySelectorAll('.panel'); //grabs all panels

function toggleOpen() {
    this.classList.toggle('open');//adds class of 'open' when clicked
};

function toggleActive(e) {
    if (e.propertyName.includes('flex')) {
        this.classList.toggle('open-active');//adds class of 'open-active' when clicked
    }
};

panels.forEach(panel => panel.addEventListener('click', toggleOpen));
panels.forEach(panel => panel.addEventListener('transitionend', toggleActive));