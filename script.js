const estudo = document.querySelector('.estudo');
const descanso = document.querySelector('.descanso');
const bMoreTime = document.querySelector('.bMoreTime');
const bLessTime = document.querySelector('.bLessTime');
const bMoreSleep = document.querySelector('.bMoreSleep');
const bLessSleep = document.querySelector('.bLessSleep');
const bStart = document.querySelector('.bStart');
const bPause = document.querySelector('.bPause');
const bStop = document.querySelector('.bStop');
const showTime = document.querySelector('.showTime');
const sleepTimer = document.querySelector('.sleepTime');

let time = 1500;
let sleep = 300;
let finalTime = 0;
let finalSleep = 0;
let min, sec, minSl, secSl;
let pomo;//funcão tempo estudo
let doro;//funcção tempo pausa
let parar = 0;

function conversor () {
    min = parseInt(time / 60);
    sec = time % 60;
    minSl = parseInt(sleep / 60);
    secSl = sleep % 60;
}

function contador () {
    function hour () {
        conversor(); //tempo em min sec
        time -= 1;
        showTime.innerHTML = `${min}:${sec}`;
        if (time < 0) {
            clearInterval(pomo);
            contaDoro();
            time = finalTime;
            refresh();
        }
    }
    clearInterval(doro);
    clearInterval(pomo);
    pomo = setInterval(hour, 1);
}

function contaDoro () {
    function sleepTime () {
        conversor();
        sleep -= 1;
        sleepTimer.innerHTML = `${minSl}:${secSl}`;
        if (sleep < 0) {
            clearInterval(doro);
            parar += 1;
            sleep = finalSleep;
            refresh();
            if (parar <= 3) {
                contador();
            }
        }
    }
    doro = setInterval(sleepTime, 1);
}

function reset () {
    time = 1500;
    sleep = 300;
    finalTime = 0;
    finalSleep = 0;
    parar = 0;
    refresh();
    clearInterval(doro);
    clearInterval(pomo);
}

function refresh () {
    estudo.value = parseInt(time / 60);
    descanso.value = parseInt(sleep / 60);
    showTime.innerHTML = `${parseInt(time / 60)}:${parseInt(time % 60)}`;
    sleepTimer.innerHTML = `${parseInt(sleep / 60)}:${parseInt(sleep % 60)}`;

}

estudo.value = parseInt(time / 60);
descanso.value = parseInt(sleep / 60);
showTime.innerHTML = `${parseInt(time / 60)}:${parseInt(time % 60)}`;
sleepTimer.innerHTML = `${parseInt(sleep / 60)}:${parseInt(sleep % 60)}`;

bMoreTime.onclick = function () {
    time += 60;
    finalTime = time;
    refresh();
};

bLessTime.onclick = function () {
    time -= 60;
    finalTime = time;
    refresh();
};

bMoreSleep.onclick = function () {
    sleep += 60;
    finalSleep = sleep;
    refresh();
};

bLessSleep.onclick = function () {
    sleep -= 60;
    finalSleep = sleep;
    refresh();
};

bStart.onclick = function () {
    if (finalSleep == 0 || finalTime == 0) {
        finalSleep = sleep;
        finalTime = time;
    }
    if (sleep != finalSleep) {
        clearInterval(doro);
        contaDoro();
    } else if (parar == 4) {
        reset();
    } else {
        contador();
    }
};

bPause.onclick = function () {
    clearInterval(doro);
    clearInterval(pomo);
};

bStop.onclick = function () {
    reset();
};