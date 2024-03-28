// minesweeperApp.js

// Function to init Minesweeper App
function initializeMinesweeper(contentElement) {
    createMinesweeperGrid(contentElement);

    //  Make it easier to skip adding the resizers
    const appWindow = contentElement.closest(".window");
    if (appWindow) {
        // Add an identifier to the Minesweeper window
        appWindow.dataset.app = "minesweeper"; //
    }
}

// Function that creates the Minesweeper grid
function createMinesweeperGrid(contentElement) {
    const rows = 8;
    const cols = 8;
    const grid = document.createElement("div");
    grid.className = "minesweeper__app";

    // Creates matrix of cells [for loop in for loop]
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const cell = document.createElement("div");
            cell.className = "minesweeper__app__cell";
            cell.addEventListener("click", () => revealCell(cell, grid));
            grid.appendChild(cell);
        }
    }

    // Ensure the cells are empty and append.
    contentElement.innerHTML = "";
    contentElement.appendChild(grid);

    const appWindow = contentElement.closest(".window");
    if (appWindow) {
        appWindow.style.minWidth = "350px"; // Lock the width
        appWindow.style.minHeight = "100px"; // Lock the height
        appWindow.style.resize = "none"; // Prevent resizing
    }
}

// Function for revealing cells [Cells are not predetermined - it's randomly decided when clicked]
function revealCell(cell, grid) {
    // Make 20% chance for bomb
    if (Math.random() > 0.8) {
        cell.classList.add("mine");
        cell.textContent = "💣";
        cell.style.backgroundColor = "red";
        var explosionSound = new Audio("./assets/bomb.mp3");
        explosionSound.play();
        setTimeout(function () {
            gameOver(grid);
        }, 1000);
        // If not a bomb, obviously safe
    } else {
        cell.classList.add("safe");
        cell.textContent = "😎";
        cell.style.backgroundColor = "#adff2f";
    }
}

// Function for when the player loses
function gameOver(grid) {
    // Create the dialog overlay
    const overlay = document.createElement("div");
    overlay.className = "minesweeper__app__overlay";

    // Create the dialog box
    const dialog = document.createElement("div");
    dialog.className = "minesweeper__app__overlay__dialog";
    dialog.innerHTML = `<p>You lose! Would you like to play again?</p><div id="minesweeper__buttons"><button id="play-again">Yes</button><button id="close-dialog">No</button></div>`;

    overlay.appendChild(dialog);
    grid.parentNode.appendChild(overlay);

    // Listener for clicking 'yes'
    document.getElementById("play-again").addEventListener("click", () => {
        overlay.remove();
        createMinesweeperGrid(grid.parentNode);
    });

    // Listener for clicking 'no'
    document.getElementById("close-dialog").addEventListener("click", () => {
        // Find the closest ancestor which is the app window
        const appWindow = overlay.closest(".window");
        // Remove the app window
        appWindow.remove();
        // Remove the overlay
        overlay.remove();
    });
}
export { initializeMinesweeper };
