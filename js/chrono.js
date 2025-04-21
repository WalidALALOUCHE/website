/**
 * Debate Chronometer
 * Used for timing debate interventions with configurable settings
 */

// Timer settings and state
const timerState = {
    // Timer configuration (in seconds)
    regularTime: 8 * 60, // 8 minutes for regular interventions
    replyTime: 4 * 60,   // 4 minutes for reply speeches
    warningTime: 60,     // 1 minute warning
    criticalTime: 15,    // 15 seconds critical warning
    
    // Current state
    currentTeam: null,       // 'gov' or 'opp'
    currentPosition: 1,      // Position in the debate (1-6)
    timeRemaining: 0,        // Time remaining in seconds
    totalTime: 0,            // Total time for current intervention
    timerRunning: false,     // Is the timer currently running
    timerInterval: null,     // Reference to the interval
    
    // Sound settings
    soundEnabled: true,
    warningSoundEnabled: true,
    criticalSoundEnabled: true,
    expiredSoundEnabled: true,
    
    // Sound objects
    warningSound: new Audio('assets/sounds/warning.mp3'),
    criticalSound: new Audio('assets/sounds/critical.mp3'),
    expiredSound: new Audio('assets/sounds/expired.mp3'),
    buttonSound: new Audio('assets/sounds/button-click.mp3')
};

// Speaking order definition
const speakingOrder = [
    { position: 1, team: 'gov', label: 'Gov 1st Speaker', time: 'regularTime' },
    { position: 2, team: 'opp', label: 'Opp 1st Speaker', time: 'regularTime' },
    { position: 3, team: 'gov', label: 'Gov 2nd Speaker', time: 'regularTime' },
    { position: 4, team: 'opp', label: 'Opp 2nd Speaker', time: 'regularTime' },
    { position: 5, team: 'opp', label: 'Opp Reply Speech', time: 'replyTime' },
    { position: 6, team: 'gov', label: 'Gov Reply Speech', time: 'replyTime' }
];

// DOM elements
const elements = {
    // Team selection
    teamButtons: document.querySelectorAll('.team-btn'),
    
    // Intervention info
    teamDisplay: document.getElementById('current-team'),
    interventionDisplay: document.getElementById('current-intervention'),
    
    // Speaking order items
    orderItems: document.querySelectorAll('.order-item'),
    
    // Timer
    timerDisplay: document.querySelector('.timer-display'),
    progressBar: document.querySelector('.progress-bar'),
    
    // Controls
    startBtn: document.getElementById('start-btn'),
    pauseBtn: document.getElementById('pause-btn'),
    resetBtn: document.getElementById('reset-btn'),
    nextBtn: document.getElementById('next-btn'),
    
    // Settings
    regularTimeInput: document.getElementById('regular-time'),
    finalTimeInput: document.getElementById('final-time'),
    warningTimeInput: document.getElementById('warning-time'),
    criticalTimeInput: document.getElementById('critical-time'),
    
    soundEnabledCheckbox: document.getElementById('sound-enabled'),
    warningSoundCheckbox: document.getElementById('warning-sound'),
    criticalSoundCheckbox: document.getElementById('critical-sound'),
    expiredSoundCheckbox: document.getElementById('expired-sound')
};

// Initialize the application
function init() {
    loadSettings();
    setupEventListeners();
    updateDisplays();
    updateButtonStates();
    highlightCurrentPosition();
    
    // Start with first position automatically selected
    goToPosition(1);
}

// Load settings from localStorage if available
function loadSettings() {
    if (localStorage.getItem('chrono-settings')) {
        try {
            const settings = JSON.parse(localStorage.getItem('chrono-settings'));
            
            // Timer settings
            timerState.regularTime = settings.regularTime || timerState.regularTime;
            timerState.replyTime = settings.replyTime || timerState.replyTime;
            timerState.warningTime = settings.warningTime || timerState.warningTime;
            timerState.criticalTime = settings.criticalTime || timerState.criticalTime;
            
            // Sound settings
            timerState.soundEnabled = settings.soundEnabled !== undefined ? settings.soundEnabled : timerState.soundEnabled;
            timerState.warningSoundEnabled = settings.warningSoundEnabled !== undefined ? settings.warningSoundEnabled : timerState.warningSoundEnabled;
            timerState.criticalSoundEnabled = settings.criticalSoundEnabled !== undefined ? settings.criticalSoundEnabled : timerState.criticalSoundEnabled;
            timerState.expiredSoundEnabled = settings.expiredSoundEnabled !== undefined ? settings.expiredSoundEnabled : timerState.expiredSoundEnabled;
            
            // Update settings inputs
            updateSettingsInputs();
        } catch (e) {
            console.error('Error loading settings:', e);
        }
    }
}

// Save settings to localStorage
function saveSettings() {
    const settings = {
        regularTime: timerState.regularTime,
        replyTime: timerState.replyTime,
        warningTime: timerState.warningTime,
        criticalTime: timerState.criticalTime,
        soundEnabled: timerState.soundEnabled,
        warningSoundEnabled: timerState.warningSoundEnabled,
        criticalSoundEnabled: timerState.criticalSoundEnabled,
        expiredSoundEnabled: timerState.expiredSoundEnabled
    };
    
    localStorage.setItem('chrono-settings', JSON.stringify(settings));
}

// Update the settings inputs with current values
function updateSettingsInputs() {
    elements.regularTimeInput.value = formatTimeInput(timerState.regularTime);
    elements.finalTimeInput.value = formatTimeInput(timerState.replyTime);
    elements.warningTimeInput.value = formatTimeInput(timerState.warningTime);
    elements.criticalTimeInput.value = formatTimeInput(timerState.criticalTime);
    
    elements.soundEnabledCheckbox.checked = timerState.soundEnabled;
    elements.warningSoundCheckbox.checked = timerState.warningSoundEnabled;
    elements.criticalSoundCheckbox.checked = timerState.criticalSoundEnabled;
    elements.expiredSoundCheckbox.checked = timerState.expiredSoundEnabled;
}

// Format time in seconds to MM:SS format for inputs
function formatTimeInput(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Parse time input from MM:SS format to seconds
function parseTimeInput(timeString) {
    const [minutes, seconds] = timeString.split(':').map(part => parseInt(part, 10));
    return (minutes * 60) + seconds;
}

// Set up all event listeners
function setupEventListeners() {
    // Team selection buttons
    elements.teamButtons.forEach(button => {
        button.addEventListener('click', () => {
            selectTeam(button.dataset.team);
            playButtonSound();
        });
    });
    
    // Order items (for quick selection)
    elements.orderItems.forEach(item => {
        item.addEventListener('click', () => {
            goToPosition(parseInt(item.dataset.position, 10));
            playButtonSound();
        });
    });
    
    // Control buttons
    elements.startBtn.addEventListener('click', () => {
        startTimer();
        playButtonSound();
    });
    
    elements.pauseBtn.addEventListener('click', () => {
        pauseTimer();
        playButtonSound();
    });
    
    elements.resetBtn.addEventListener('click', () => {
        resetTimer();
        playButtonSound();
    });
    
    elements.nextBtn.addEventListener('click', () => {
        nextPosition();
        playButtonSound();
    });
    
    // Settings inputs
    elements.regularTimeInput.addEventListener('change', () => {
        try {
            timerState.regularTime = parseTimeInput(elements.regularTimeInput.value);
            saveSettings();
            resetTimer();
        } catch (e) {
            console.error('Invalid time format:', e);
            elements.regularTimeInput.value = formatTimeInput(timerState.regularTime);
        }
    });
    
    elements.finalTimeInput.addEventListener('change', () => {
        try {
            timerState.replyTime = parseTimeInput(elements.finalTimeInput.value);
            saveSettings();
            resetTimer();
        } catch (e) {
            console.error('Invalid time format:', e);
            elements.finalTimeInput.value = formatTimeInput(timerState.replyTime);
        }
    });
    
    elements.warningTimeInput.addEventListener('change', () => {
        try {
            timerState.warningTime = parseTimeInput(elements.warningTimeInput.value);
            saveSettings();
        } catch (e) {
            console.error('Invalid time format:', e);
            elements.warningTimeInput.value = formatTimeInput(timerState.warningTime);
        }
    });
    
    elements.criticalTimeInput.addEventListener('change', () => {
        try {
            timerState.criticalTime = parseTimeInput(elements.criticalTimeInput.value);
            saveSettings();
        } catch (e) {
            console.error('Invalid time format:', e);
            elements.criticalTimeInput.value = formatTimeInput(timerState.criticalTime);
        }
    });
    
    // Sound settings
    elements.soundEnabledCheckbox.addEventListener('change', () => {
        timerState.soundEnabled = elements.soundEnabledCheckbox.checked;
        saveSettings();
    });
    
    elements.warningSoundCheckbox.addEventListener('change', () => {
        timerState.warningSoundEnabled = elements.warningSoundCheckbox.checked;
        saveSettings();
    });
    
    elements.criticalSoundCheckbox.addEventListener('change', () => {
        timerState.criticalSoundEnabled = elements.criticalSoundCheckbox.checked;
        saveSettings();
    });
    
    elements.expiredSoundCheckbox.addEventListener('change', () => {
        timerState.expiredSoundEnabled = elements.expiredSoundCheckbox.checked;
        saveSettings();
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboardShortcuts);
}

// Handle keyboard shortcuts
function handleKeyboardShortcuts(event) {
    // Space - Start/Pause timer
    if (event.code === 'Space') {
        event.preventDefault();
        if (timerState.timerRunning) {
            pauseTimer();
        } else {
            startTimer();
        }
        playButtonSound();
    }
    
    // R - Reset timer
    if (event.code === 'KeyR') {
        resetTimer();
        playButtonSound();
    }
    
    // N - Next position
    if (event.code === 'KeyN') {
        nextPosition();
        playButtonSound();
    }
    
    // G - Select Government team
    if (event.code === 'KeyG') {
        selectTeam('gov');
        playButtonSound();
    }
    
    // O - Select Opposition team
    if (event.code === 'KeyO') {
        selectTeam('opp');
        playButtonSound();
    }
    
    // 1-6 - Go to position
    if (event.code.startsWith('Digit') || event.code.startsWith('Numpad')) {
        const digit = parseInt(event.key, 10);
        if (digit >= 1 && digit <= 6) {
            goToPosition(digit);
            playButtonSound();
        }
    }
}

// Select a team manually
function selectTeam(team) {
    timerState.currentTeam = team;
    
    // Update UI
    elements.teamButtons.forEach(button => {
        button.classList.remove('active');
        if (button.dataset.team === team) {
            button.classList.add('active');
        }
    });
    
    updateDisplays();
    updateButtonStates();
    resetTimer();
}

// Go to a specific position in the debate
function goToPosition(position) {
    if (position < 1 || position > 6) return;
    
    pauseTimer();
    
    // Get the speaking order item for this position
    const speakingItem = speakingOrder[position - 1];
    
    // Update state
    timerState.currentPosition = position;
    timerState.currentTeam = speakingItem.team;
    
    // Update UI
    elements.teamButtons.forEach(button => {
        button.classList.remove('active');
        if (button.dataset.team === speakingItem.team) {
            button.classList.add('active');
        }
    });
    
    updateDisplays();
    highlightCurrentPosition();
    resetTimer();
}

// Move to the next position in the debate
function nextPosition() {
    let nextPos = timerState.currentPosition + 1;
    if (nextPos > 6) nextPos = 1;
    goToPosition(nextPos);
}

// Highlight the current position in the speaking order
function highlightCurrentPosition() {
    elements.orderItems.forEach(item => {
        item.classList.remove('active');
        const position = parseInt(item.dataset.position, 10);
        if (position === timerState.currentPosition) {
            item.classList.add('active');
        }
    });
}

// Start the timer
function startTimer() {
    if (!timerState.currentTeam || timerState.timerRunning || timerState.timeRemaining <= 0) return;
    
    timerState.timerRunning = true;
    timerState.timerInterval = setInterval(updateTimer, 1000);
    
    updateButtonStates();
}

// Pause the timer
function pauseTimer() {
    if (!timerState.timerRunning) return;
    
    timerState.timerRunning = false;
    clearInterval(timerState.timerInterval);
    
    updateButtonStates();
}

// Reset the timer
function resetTimer() {
    pauseTimer();
    
    // Set the appropriate time based on the position
    const speakingItem = speakingOrder[timerState.currentPosition - 1];
    timerState.totalTime = timerState[speakingItem.time];
    
    timerState.timeRemaining = timerState.totalTime;
    
    // Reset UI
    elements.timerDisplay.classList.remove('warning', 'critical', 'expired');
    updateTimeDisplay();
    updateProgressBar();
    updateButtonStates();
}

// Update the timer (called every second)
function updateTimer() {
    if (timerState.timeRemaining <= 0) {
        timerExpired();
        return;
    }
    
    timerState.timeRemaining--;
    
    // Check if we need to play sounds or change the display
    checkTimerThresholds();
    
    updateTimeDisplay();
    updateProgressBar();
}

// Check if we've crossed any timer thresholds
function checkTimerThresholds() {
    // Warning threshold
    if (timerState.timeRemaining === timerState.warningTime) {
        elements.timerDisplay.classList.add('warning');
        elements.timerDisplay.classList.remove('critical');
        playSound('warning');
    }
    
    // Critical threshold
    if (timerState.timeRemaining === timerState.criticalTime) {
        elements.timerDisplay.classList.remove('warning');
        elements.timerDisplay.classList.add('critical');
        playSound('critical');
    }
}

// Handle timer expiration
function timerExpired() {
    pauseTimer();
    timerState.timeRemaining = 0;
    elements.timerDisplay.classList.remove('warning', 'critical');
    elements.timerDisplay.classList.add('expired');
    updateTimeDisplay();
    updateProgressBar();
    playSound('expired');
}

// Update the time display
function updateTimeDisplay() {
    const minutes = Math.floor(timerState.timeRemaining / 60);
    const seconds = timerState.timeRemaining % 60;
    elements.timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Update the progress bar
function updateProgressBar() {
    const progress = timerState.timeRemaining / timerState.totalTime;
    elements.progressBar.style.transform = `scaleX(${progress})`;
    
    // Change color based on time remaining
    if (timerState.timeRemaining <= timerState.criticalTime) {
        elements.progressBar.style.backgroundColor = 'var(--critical-color)';
    } else if (timerState.timeRemaining <= timerState.warningTime) {
        elements.progressBar.style.backgroundColor = 'var(--warning-color)';
    } else {
        elements.progressBar.style.backgroundColor = 'var(--primary-color)';
    }
}

// Update team and intervention displays
function updateDisplays() {
    if (timerState.currentTeam) {
        const teamName = timerState.currentTeam === 'gov' ? 'Government' : 'Opposition';
        elements.teamDisplay.textContent = teamName;
        
        // Find the speaking order item
        const speakingItem = speakingOrder.find(item => 
            item.position === timerState.currentPosition
        );
        
        elements.interventionDisplay.textContent = speakingItem ? speakingItem.label : '-';
    } else {
        elements.teamDisplay.textContent = '-';
        elements.interventionDisplay.textContent = '-';
    }
}

// Update the state of the control buttons
function updateButtonStates() {
    const teamSelected = timerState.currentTeam !== null;
    const timerRunning = timerState.timerRunning;
    const timerFinished = timerState.timeRemaining <= 0;
    
    elements.startBtn.disabled = !teamSelected || timerRunning || timerFinished;
    elements.pauseBtn.disabled = !timerRunning;
    elements.resetBtn.disabled = !teamSelected;
}

// Play a sound effect
function playSound(type) {
    if (!timerState.soundEnabled) return;
    
    switch (type) {
        case 'warning':
            if (timerState.warningSoundEnabled) {
                timerState.warningSound.play().catch(e => console.error('Error playing warning sound:', e));
            }
            break;
        case 'critical':
            if (timerState.criticalSoundEnabled) {
                timerState.criticalSound.play().catch(e => console.error('Error playing critical sound:', e));
            }
            break;
        case 'expired':
            if (timerState.expiredSoundEnabled) {
                timerState.expiredSound.play().catch(e => console.error('Error playing expired sound:', e));
            }
            break;
        case 'button':
            if (timerState.soundEnabled) {
                timerState.buttonSound.play().catch(e => console.error('Error playing button sound:', e));
            }
            break;
    }
}

// Play button click sound
function playButtonSound() {
    playSound('button');
}

// Initialize when the DOM is loaded
document.addEventListener('DOMContentLoaded', init); 