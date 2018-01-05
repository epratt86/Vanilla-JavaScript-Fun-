//Grab the image and scroll by clicking mouse down.
const slider = document.querySelector('.items');

let isDown = false;
let startX;
let scrollLeft;

//On the mousedown event, add the classlist of active to the slider as well as mouse cords.
slider.addEventListener('mousedown', (e)=> {
	isDown = true;
	slider.classList.add('active');
	startX = e.pageX - slider.offsetLeft;
	scrollLeft = slider.scrollLeft;
});

//Once mouse has left the target remove active class.
slider.addEventListener('mouseleave', ()=> {
	isDown = false;
	slider.classList.remove('active');
});

//Removes active class on mouseup
slider.addEventListener('mouseup', ()=> {
	isDown = false;
	slider.classList.remove('active');
});

//If the mouse is down and mouse moves, move image. 
slider.addEventListener('mousemove', (e)=> {
	if(!isDown) return;
	e.preventDefault();
	const x = e.pageX - slider.offsetLeft;
	const walk = (x - startX) * 3;
	slider.scrollLeft = scrollLeft - walk;
});