let countdown; //global variable
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
	//if any existing timers are running, clear them
	clearInterval(countdown);

	const now = Date.now();	//grabs current time stamp
	const then = now + seconds * 1000; //multiply by 1000 bc current time stamp is in milliseconds
	displayTimeLeft(seconds); //Call function below immediately to display time. Otherwise it waits a full sec
	displayEndTime(then);//for setInterval to begin running.

	countdown = setInterval(()=> {
		const secondsLeft = Math.round((then - Date.now()) / 1000);
		//make countDown stop at 0
		if (secondsLeft < 0) {
			clearInterval(countdown);
			return;
		}
		displayTimeLeft(secondsLeft);//displays how many seconds are left from initially calling above ^^^ 
	}, 1000);
}

function displayTimeLeft(seconds){
	const minutes = Math.floor(seconds / 60);
	const remainderSeconds = seconds % 60;
	//looks confusing, but code below adds the zero to numbers less than 10. example 2:02
	const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`; //displays time in minutes:seconds format
	timerDisplay.textContent = display;	//grabs the html element to display countdown on page
	document.title = display; // displays the countdown on the tab of browser window
}

function displayEndTime(timestamp){//what time you need to be back
	const end = new Date(timestamp);
	const hour = end.getHours();
	const adjustedHour = hour > 12 ? hour - 12 : hour; //makes time appear as 1:00 instead of 13:00
	const minutes = end.getMinutes();
	endTime.textContent = `Be Back At ${adjustedHour}:${minutes < 10 ? '0' : ''}${minutes}`;
}


function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));//when the buttons are clicked, run timer
document.customForm.addEventListener('submit', function(e) {
  e.preventDefault();//stops it from reloading page when custom time is inputted
  const mins = this.minutes.value;
  timer(mins * 60);
  this.reset();
});