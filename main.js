/*
  main.js
  otto core
  copyright (c) 2020 sporeball
  MIT license
*/

// elements
const timer = document.getElementById("timer");
const stop = document.getElementById("stop");
const otto = document.getElementById("otto");

// oscillator setup
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

var oscillator = audioCtx.createOscillator();
oscillator.type = 'sine';

var volume = audioCtx.createGain();
volume.gain.value = 0.005;
oscillator.connect(volume);
volume.connect(audioCtx.destination);

oscillator.frequency.setValueAtTime(0, audioCtx.currentTime);
oscillator.start();

// other setup
var time = 300;
var minutes, seconds;

// utils
interval = () => {
  time--;
  setTime();
  if (time == 0) {
    clearInterval(i);
    oscillator.frequency.setValueAtTime(880, audioCtx.currentTime);
    timer.style.opacity = 1;
    stop.style.visibility = "visible";
    otto.src = "res/otto_yell.png";
    otto.style.opacity = 1;
  }
}

setTime = () => {
  minutes = Math.floor(time / 60);
  seconds = time % 60;
  timer.innerHTML = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

stop.onclick = () => {
  time = 300;
  setTime();
  oscillator.frequency.setValueAtTime(0, audioCtx.currentTime);
  timer.style.opacity = 0.75;
  stop.style.visibility = "hidden";
  otto.src = "res/otto_indifferent.png";
  otto.style.opacity = 0.75;
  i = setInterval(interval, 1000);
}

// initialization
setTime();
var i = setInterval(interval, 1000);
