let timer;
let startTime;
let running = false;
let laps = [];

function startStop() {
  if (running) {
    clearInterval(timer);
    running = false;
  } else {
    startTime = Date.now() - (laps.reduce((acc, lap) => acc + lap, 0) || 0);
    timer = setInterval(updateDisplay, 10);
    running = true;
  }
}

function pauseResume() {
  if (running) {
    clearInterval(timer);
    running = false;
  } else {
    startTime = Date.now();
    timer = setInterval(updateDisplay, 10);
    running = true;
  }
}

function reset() {
  clearInterval(timer);
  running = false;
  laps = [];
  document.querySelector('.stopwatch').textContent = '00:00:00';
  document.getElementById('lapTimes').textContent = '';
}

function updateDisplay() {
  const elapsedTime = Date.now() - startTime;
  const formattedTime = formatTime(elapsedTime);
  document.querySelector('.stopwatch').textContent = formattedTime;
}

function formatTime(time) {
  const hours = Math.floor(time / (1000 * 60 * 60));
  const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((time % (1000 * 60)) / 1000);
  const milliseconds = Math.floor((time % 1000) / 10);
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${pad(milliseconds)}`;
}

function pad(num) {
  return num.toString().padStart(2, '0');
}

function lap() {
  if (running) {
    const lapTime = Date.now() - startTime - laps.reduce((acc, lap) => acc + lap, 0);
    laps.push(lapTime);
    const formattedLapTime = formatTime(lapTime);
    const lapTimesElement = document.getElementById('lapTimes');
    const lapElement = document.createElement('div');
    lapElement.textContent = `Lap ${laps.length}: ${formattedLapTime}`;
    lapTimesElement.appendChild(lapElement);
  }
}
