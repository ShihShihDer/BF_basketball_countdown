const audio14 = new Audio('sound/14S.mp3');
const audio24 = new Audio('sound/24S.mp3');
const buzzer = new Audio('sound/BUZZER.mp3'); // Add the buzzer sound
const countdownDisplay = document.getElementById('countdown-display');
let currentAudio = null;
let isPaused = false;
let countdownInterval = null; // Interval for the countdown logic

function playAudio(audio, seconds) {
    stopAudios();
    currentAudio = audio;
    currentAudio.play();
    // Immediately update the countdown display with the audio's duration.
    countdownDisplay.textContent = currentAudio.duration.toFixed(2); // 顯示兩位小數點以下的數字
    countdownInterval = setInterval(updateCountdownDisplay, 100); // Update more frequently for accuracy
}

function stopAudios() {
    clearInterval(countdownInterval); // Clear interval when stopping
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        currentAudio = null;
    }
    countdownDisplay.textContent = '';
}

function updateCountdownDisplay() {
    // Calculate the remaining time based on the audio's duration and current time.
    let remainingTime = currentAudio.duration - currentAudio.currentTime;
    countdownDisplay.textContent = remainingTime.toFixed(2); // 顯示兩位小數點以下的數字

    // If the audio is about to finish, we handle the ending here.
    if (remainingTime <= 0) {
        clearInterval(countdownInterval); // Stop the interval
        currentAudio = null; // Reset the current audio
        // The buzzer should play here only if it is not already playing.
        if (buzzer.paused) {
            buzzer.play(); // Play the buzzer sound
        }
        countdownDisplay.textContent = '時間到！';
    } else if (isPaused) {
        countdownDisplay.textContent = remainingTime.toFixed(2) + " (暫停)"; // 也顯示兩位小數點以下的數字
    }
}


function togglePause() {
    if (!currentAudio) return;

    if (!isPaused) {
        currentAudio.pause();
        isPaused = true;
        countdownDisplay.textContent += " (暫停)";

    } else {
        currentAudio.play();
        isPaused = false;
    }
}

document.getElementById('btn-reset').addEventListener('click', () => {
    stopAudios();
    clearInterval(countdownInterval); // Ensure the countdown is cleared
    countdownDisplay.textContent = '已重置'; // Display the reset message
    isPaused = false;
    totalSeconds = 0; // Reset the total seconds
});

document.getElementById('btn-pause').addEventListener('click', togglePause);

document.getElementById('btn-14').addEventListener('click', () => {
    playAudio(audio14);
});

document.getElementById('btn-24').addEventListener('click', () => {
    playAudio(audio24);
});