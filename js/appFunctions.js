// appFunctions.js
import {
    createAppWindow,
    makeAppWindowInteractive,
} from "./windowFunctions.js";
import { desktop } from "./dom.js"; // Assuming desktop is exported from dom.js

// Function to open the app windows (i.e. Computer, Calculator, Minesweeper & Paint)
function openApp(appSelector, title, initializeFunction) {
    let appWindow = document.querySelector(appSelector);
    // If it's not already open, open it
    if (!appWindow) {
        //Create the window
        appWindow = createAppWindow(title);
        // Apend the window to the desktop
        desktop.appendChild(appWindow);

        // Select the 'part/panel' for the actual content of each app (e.g. Canvas of the paint app.)
        const windowContent = appWindow.querySelector(".window__content");
        // Check that it actually has a function and the above content exists. If so, init the app.
        if (initializeFunction && windowContent) {
            initializeFunction(windowContent);
        }

        // Function to add bells and whistles to the window. (i.e Toolbar with menus)
        makeAppWindowInteractive(appWindow);
    }
}

export { openApp };
