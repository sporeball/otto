/*
  main.js
  otto core
  copyright (c) 2020 sporeball
  MIT license
*/

// elements
const timer = document.getElementById("timer");
const stop = document.getElementById("stop");

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
    stop.style.display = "block";
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
  stop.style.display = "none";
  i = setInterval(interval, 1000);
}

// initialization
setTime();
var i = setInterval(interval, 1000);
