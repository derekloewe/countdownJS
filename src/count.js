const dateInfo = {
    fullDate: null,
    date: null,
    day: null,
    month: null,
    year: null,
    timezone: null,
    style: null,
    id: null
};

function doubleNumber(number) {
    return ("0" + number).slice(-2);
}

/**
 * 
 * @param {string} id [Html Element of the ID to get the date]
 * @param {date} countdownDate [Date and TIme to countdown to]
 */

function countdown(id, countdownDate) {
    //console.log(id)
    let date = new Date();
    let countdownDates = new Date(countdownDate);
    let timediff = (countdownDates - date) / 1000;

    let days = parseInt(timediff / 86400);
    timediff = timediff % 86400;

    let hours = parseInt(timediff / 3600);
    timediff = timediff % 3600;

    let minutes = parseInt(timediff / 60);
    let seconds = parseInt(timediff % 60);

    if (days <= 9) {
        days = doubleNumber(days);
    }

    if (hours <= 9) {
        hours = doubleNumber(hours);
    }

    id.innerHTML = days + ":" + hours + ":" + minutes + ":" + seconds;
    setTimeout(function () {
        setTimeout(countdown(id, countdownDate), 1000);
    });
}


function test() {
    id = document.querySelector('.countdown');
    date = id.dataset.cdDate;
    time = id.dataset.cdTime;
    timeZone = id.dataset.cdTimeZone;
    utc = id.dataset.cdUTC;
    let check = setTimeout(countdown(id, new Date(date + " " + time)), 1000);
}
test();


/**
 * Quick and easy way for progress bar.
 */

let pTime = 0;
let p;

function progBar() {
    p = setInterval(() => {
        if (pTime < 100) {
            pTime++;
        } else {
            document.getElementById("progStatus").innerHTML = "Done";
            clearInterval(p);
        }
        document.getElementById("prog1").style.width = pTime + "%";
        //console.log(pTime)
    }, 1000);

}


/**
 * Section for Stop Watch timer
 */
let totalTime;
let run;
let stopedTIme;

/**
 * 
 * @param {bool} option [Option for if the runing of the function is the first itme or not used for start and resume button]
 */
function timerRun(option) {

    console.log("ran");
    let input = document.getElementById("timerText").value;
    let hours = parseInt(input.substring(0, 2));
    let minutes = parseInt(input.substring(3, 5));
    let seconds = parseInt(input.substring(6, 8));

    totalTime = seconds + (minutes * 60) + (hours * 60 * 60);

    if(!isNaN(totalTime)){
        if(option){
            totalTime = stopedTIme;
        }
        run = setInterval(timer,1000);
    }else{
        alert("not a number")
    }

}


/**
 * Actual timer function 
 */
function timer() {

    let hour = parseInt(totalTime / 3600);
    let mins = parseInt(totalTime / 60);
    let secs = parseInt(totalTime % 60);
/* 
    console.log("hour: " + hour);
    console.log("min: " + mins);
    console.log("Sec: " + secs);
 */
    document.getElementById("timerOutput").innerHTML = hour + "h:" + mins + "m:" + secs + "s";
    totalTime--;
    stopedTIme = totalTime;
    if (secs == 0 && mins == 0 && hour == 0) {
        clearInterval(run);
    }
}

/**
 * 
 * @param {Event} e [fuction for key up in the timer box to format the timer correctly]
 */
function timerInput(e) {
    let input = document.getElementById(e.target.id);
    input = input.value.split(':').join('');

    let fInput = input.match(/.{1,2}/g).join(":");
    document.getElementById(e.target.id).value = fInput;
}

document.getElementById("timerText").addEventListener("keyup", timerInput);