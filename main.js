/*
  main.js
  otto core
  copyright (c) 2020 sporeball
  MIT license
*/

// dependencies
const dayjs = require("dayjs");
const ext_duration = require("dayjs/plugin/duration");
dayjs.extend(ext_duration);

// elements
const header = document.getElementById("header");
const timer = document.getElementById("timer");
const d_stop = document.getElementById("d_stop");
const stop = document.getElementById("stop");
const d_reflection = document.getElementById("d_reflection");
const reflect = document.getElementById("reflect");
const otto = document.getElementById("otto");

// variables
var time;
var minutes, seconds;
var active; // is the timer going off?

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

// utils
interval = () => {
  time--;
  if (!active) setTime();
  if (time == 0) {
    active = true;
    time = 300;
    oscillator.frequency.setValueAtTime(880, audioCtx.currentTime);
    header.style.opacity = 1;
    d_stop.style.display = "block";
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
  active = false;
  setTime();
  oscillator.frequency.setValueAtTime(0, audioCtx.currentTime);

  timer.classList.add("small");
  d_stop.style.display = "none";
  d_reflection.style.display = "block";
  otto.src = "res/otto_indifferent.png";
  otto.style.opacity = 0.75;
}

submit = (e) => {
  e.preventDefault();

  timer.classList.remove("small");
  header.style.opacity = 1;
  d_reflection.style.display = "none";
}

// initialization
var now = dayjs();
var date = now.startOf("s").add(1, "s"); // nearest second

var i;

setTimeout(() => {
  var rounded = date.startOf("m").add(5 - date.minute() % 5, "m"); // nearest 5 minutes
  time = dayjs.duration(rounded.diff(date)).asSeconds();
  setTime();
  i = setInterval(interval, 1000);
  reflect.addEventListener("submit", submit);
}, date.diff(now));
