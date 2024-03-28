console.log("Working");
// main.js
import {
    displayLoadingScreen,
    playMedia,
    hideLoadingScreen,
    updateClock,
} from "./utils.js";
import {
    startButton,
    loadingVideo,
    desktop,
    icons,
    startMenuButton,
    dottedStartButton,
} from "./dom.js";
import { createStartMenu } from "./startMenu.js";
import { initializeComputer } from "./computerApp.js";
import { initializeCalculator } from "./calculatorApp.js";
import { initializeMinesweeper } from "./minesweeperApp.js";
import { initializePaint } from "./paintApp.js";
import { openApp } from "./appFunctions.js";

// DOMContentLoaded => Wait until the DOM is loaded and then do this.
document.addEventListener("DOMContentLoaded", () => {
    startButton.addEventListener("click", () => {
        // Need the user to 'engage' with the screen (click a button) so that the video can play.
        displayLoadingScreen();
        // Video to make it seem 'loading'
        playMedia();

        // Video is short so loop to make seem longer.
        let currentLoop = 0;
        const maxLoops = 3;

        loadingVideo.onended = () => {
            if (currentLoop < maxLoops - 1) {
                currentLoop++;
                loadingVideo.play();
            } else {
                // Remove the loading screen and set up the desktop.
                hideLoadingScreen();
                setupDesktopIcons();
            }
        };
    });

    // Update the clock every second
    updateClock();

    // Set up the desktop, icons, etc.
    function setupDesktopIcons() {
        const desktop = document.querySelector(".desktop");
        const icons = document.querySelectorAll(".desktop__block__icon");

        // Set up listener so if selected looks selected ('blue' windows-y color)
        // First remove all, then add for the selected icon.
        desktop.addEventListener("click", (event) => {
            const icon = event.target.closest(".desktop__block__icon");
            if (icon) {
                icons.forEach((selectedIcon) =>
                    selectedIcon.classList.remove(
                        "desktop__block__icon--selected"
                    )
                );
                icon.classList.add("desktop__block__icon--selected");
            }
        });

        // Set up the listeners for the desktop icons (i.e. double click to open the 'apps')
        desktop.addEventListener("dblclick", (event) => {
            const target = event.target.closest(".desktop__block__icon");
            if (target) {
                switch (
                    target.classList[1] // [0] is the BEM naming conventions [1] is the second class attached (i.e. the name of the app)
                ) {
                    case "computer":
                        openApp(
                            ".computer__app",
                            "Computer",
                            initializeComputer
                        );
                        break;
                    case "calculator":
                        openApp(
                            ".calculator__app",
                            "Calculator",
                            initializeCalculator
                        );
                        break;
                    case "minesweeper":
                        openApp(
                            ".minesweeper__app",
                            "Minesweeper",
                            initializeMinesweeper
                        );
                        break;
                    case "paint":
                        openApp(".paint__app", "Paint", initializePaint);
                        break;
                }
            }
        });
    }

    // Set up the listener for the start menu button (i.e clicking it will open the start menu and the styline of the button while the menu is opened).
    document;
    startMenuButton.addEventListener("click", (event) => {
        createStartMenu();
        startMenuButton.style.boxShadow =
            "inset -3px -5px 5px 0px #6361619f, inset 2px 2px 3px 1px #363434a4";
        dottedStartButton.style.border = "1px dotted black";
        event.stopPropagation();
    });
    // If the start menu is open and the click is outside of the start menu and the start button
    // event.target ==> Where the 'event' happened (from the above listener, the click of either start menu or start button)
    document.addEventListener("click", (event) => {
        const startMenu = document.querySelector(".startbar__menu");
        if (
            startMenu &&
            !startMenuButton.contains(event.target) &&
            !startMenu.contains(event.target)
        ) {
            startMenu.remove();
            startMenuButton.style.boxShadow = "";
            dottedStartButton.style.border = "";
        }
    });
});
