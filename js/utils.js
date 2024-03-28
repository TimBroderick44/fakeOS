// utils.js
import {
    startButton,
    loadingScreen,
    loadingVideo,
    startupSound,
    clockElement,
} from "./dom.js";

// Function to display the loading screen
function displayLoadingScreen() {
    startButton.style.display = "none";
    loadingScreen.style.display = "block";
    document.body.style.cursor = "url(./assets/wait.cur), auto";
}

// Function to play the loading video and startup sound
function playMedia() {
    loadingVideo.play().catch(console.error);
    startupSound.play().catch(console.error);
}

// Function to hide the loading screen
function hideLoadingScreen() {
    loadingScreen.style.display = "none";
    document.body.style.cursor = "default";
}

// Function to update the clock every second
function updateClock() {
    clockElement.textContent = new Date().toLocaleTimeString();
    setTimeout(updateClock, 1000);
}

export { displayLoadingScreen, playMedia, hideLoadingScreen, updateClock };
