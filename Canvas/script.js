//Turn the DOM into a blank canvas to draw on.
const canvas = document.querySelector('#draw');
//Context is the thing that you draw on, not the actual HTML
const ctx = canvas.getContext('2d');
//Add the width/height property to variable 'canvas'. Set as windows width/height.
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
//Pen stroke and style.
ctx.strokeStyle = '#BADA55';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 100;
//Start off so nothing is happening until the mousedown event.
let isDrawing = false;
//Initial cordinates
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

//Function to perform when drawing (moused down)
function draw(e){
    if(!isDrawing) return; //stops if not moused down.
        ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
        ctx.beginPath();//start from
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX, e.offsetY);//end at
        ctx.stroke();
        //update the values of lastX and lastY so drawing doesn't always begin at 0,0
        [lastX, lastY] = [e.offsetX, e.offsetY];
        hue++;//as hue increases, it goes around the rainbow. Once it hits 360 it starts over.
        if(hue >= 360){
            hue = 0;
        }
        if(ctx.lineWidth >= 100 || ctx.lineWidth <= 1){
            direction = !direction;
        }
        if(direction){
            ctx.lineWidth++;
        } else {
            ctx.lineWidth--;
        }
};

canvas.addEventListener('mousedown', (e)=> {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', ()=> isDrawing = false);
canvas.addEventListener('mouseout', ()=> isDrawing = false);
