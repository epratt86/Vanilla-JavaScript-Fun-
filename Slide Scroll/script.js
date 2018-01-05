//put debouncer at the top to prevent performance issues from logging all the scrolls
function debounce(func, wait = 20, immediate = true) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};


const sliderImages = document.querySelectorAll('.slide-in');

function checkSlide() {
    sliderImages.forEach(sliderImage => {
        //below gives us the pixel level where image will slide in
        const slideInAt = (window.scrollY + window.innerHeight) - sliderImage.height / 2;
        //scrollY gives us the horizontal pixels from top of browswer, add the innerHeight to find the bottom
        //subtract half of the height of 'sliderImage' so when half of image is showing, image slides in.
        const imageBottom = sliderImage.offsetTop + sliderImage.height;
        const isHalfShown = slideInAt > sliderImage.offsetTop;
        const isNotScrolledPast = window.scrollY < imageBottom;
        if (isHalfShown && isNotScrolledPast) {
            sliderImage.classList.add('active');
        } else {
            sliderImage.classList.remove('active');
        }
    });
};

window.addEventListener('scroll', debounce(checkSlide));