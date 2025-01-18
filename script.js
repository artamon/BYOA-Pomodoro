let timeLeft;
let timerId = null;
let isWorkTime = true;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');
const modeText = document.getElementById('mode-text');
const toggleModeButton = document.getElementById('toggle-mode');

const WORK_TIME = 25 * 60; // 25 minutes in seconds
const BREAK_TIME = 5 * 60; // 5 minutes in seconds

function updateDisplay(timeLeft) {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
    
    // Update page title if timer is running and in break mode
    if (timerId !== null && !isWorkTime) {
        document.title = `(${timeString}) Break Time`;
    } else {
        document.title = 'Pomodoro Timer';
    }
}

function switchMode() {
    isWorkTime = !isWorkTime;
    timeLeft = isWorkTime ? WORK_TIME : BREAK_TIME;
    modeText.textContent = isWorkTime ? 'Work Time' : 'Break Time';
    toggleModeButton.textContent = isWorkTime ? 'Switch to Break' : 'Switch to Work';
    toggleModeButton.classList.toggle('break-mode', !isWorkTime);
    toggleModeButton.classList.toggle('work-mode', isWorkTime);
    updateDisplay(timeLeft);
}

function startTimer() {
    if (timerId !== null) return;
    
    if (!timeLeft) {
        timeLeft = WORK_TIME;
    }

    startButton.textContent = 'Pause';
    
    timerId = setInterval(() => {
        timeLeft--;
        updateDisplay(timeLeft);
        
        if (timeLeft === 0) {
            clearInterval(timerId);
            timerId = null;
            startButton.textContent = 'Start';
            switchMode();
            alert(isWorkTime ? 'Break time is over! Time to work!' : 'Work time is over! Take a break!');
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timerId);
    timerId = null;
    startButton.textContent = 'Start';
}

function resetTimer() {
    clearInterval(timerId);
    timerId = null;
    isWorkTime = true;
    timeLeft = WORK_TIME;
    startButton.textContent = 'Start';
    modeText.textContent = 'Work Time';
    document.title = 'Pomodoro Timer';  // Reset title when timer is reset
    updateDisplay(timeLeft);
}

startButton.addEventListener('click', () => {
    if (timerId === null) {
        startTimer();
    } else {
        pauseTimer();
    }
});

resetButton.addEventListener('click', resetTimer);

toggleModeButton.addEventListener('click', () => {
    clearInterval(timerId);
    timerId = null;
    startButton.textContent = 'Start';
    switchMode();
});

// Initialize display
timeLeft = WORK_TIME;
updateDisplay(timeLeft);

toggleModeButton.classList.add('work-mode');  // Initialize with work mode styling 