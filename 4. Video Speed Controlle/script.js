document.querySelector("#play").onclick = play;
document.querySelector("#stop").onclick = stop;
document.querySelector("#volume").oninput = videoVolume;
const speed = document.querySelector(".speed");
const bar = speed.querySelector(".speed-bar");
const video = document.querySelector(".flex");
const toggle = document.querySelector(".toggle");
const skipButtons = document.querySelectorAll("[data-skip]");

let display;
let progress;

progress = document.querySelector("#progress");

video.ontimeupdate = progressUpdate;

function handleMove(moveParam) {
  const countPage = moveParam.pageY - this.offsetTop;
  const percent = countPage / this.offsetHeight;
  const min = 0.4;
  const max = 4;
  const height = Math.round(percent * 100) + "%";
  const playbackRate = percent * (max - min) + min;
  bar.style.height = height;
  bar.textContent = playbackRate.toFixed(2) + "×";
  video.playbackRate = playbackRate;
}

speed.addEventListener("mousemove", handleMove);

function play() {
  video.paused ? video.play() : video.pause();
}

function updateButton() {
  const icon = this.paused ? "►" : "❚ ❚";
  toggle.textContent = icon;
}

function pause() {
  video.pause();
}
function stop() {
  video.pause();
  video.currentTime = 0;
}

function videoVolume() {
  let v = this.value;
  video.volume = v / 100;
}

function videoSpeed() {
  let vid = this.value;
  video.playbackRate = vid / 100;
}

function progressUpdate() {
  let progressDuration = video.duration;
  let progressCurrentTime = video.currentTime;
  progress.value = (100 * progressCurrentTime) / progressDuration;
  document.querySelector("#out").innerHTML = video.currentTime;
}

video.ontimeupdate = progressUpdate;
function progressUpdate() {
  progress.value = (100 * video.currentTime) / video.duration;
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

video.addEventListener("click", play);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);

skipButtons.forEach((button) => button.addEventListener("click", skip));
