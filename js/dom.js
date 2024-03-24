// DOM element selectors
const startButton = document.querySelector(".startup__button");
const loadingScreen = document.querySelector(".loading");
const loadingVideo = document.querySelector(".loading__video");
const startupSound = document.querySelector(".loading__sound");
const desktop = document.querySelector(".desktop");
const icons = document.querySelectorAll(".desktop__block__icon");
const clockElement = document.querySelector(".taskbar__clock");
const startMenuButton = document.querySelector(".startbar__button");
const dottedStartButton = document.querySelector(".startbar__button--dotted");

// Exporting DOM elements for use in other modules
export {
    startButton,
    loadingScreen,
    loadingVideo,
    startupSound,
    desktop,
    icons,
    clockElement,
    startMenuButton,
    dottedStartButton
};
