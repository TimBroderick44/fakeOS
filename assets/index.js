document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.getElementById("loadButton");
    const loadingScreen = document.getElementById("loading-screen");
    const loadingVideo = document.getElementById("loading-video");
    const startupSound = document.getElementById("startup-sound");

    startButton.addEventListener("click", () => {
        // Hide the start button and show the loading screen
        startButton.style.display = "none";
        loadingScreen.style.display = "block";

        document.body.style.cursor = "url(wait.cur), auto";

        // Play the loading screen video and startup sound
        loadingVideo.play();
        startupSound.play();

        let maxLoops = 3;
        let currentLoop = 0;

        loadingVideo.onended = () => {
            if (currentLoop < maxLoops - 1) {
                currentLoop++;
                loadingVideo.play();
            } else {
                loadingScreen.style.display = "none";
                document.body.style.cursor = "default";
                updateClock();

                // Initialize desktop icon click events
                const icons = document.querySelectorAll(".icon");
                icons.forEach((icon) => {
                    icon.addEventListener("click", (event) => {
                        // Remove selected class from all icons
                        icons.forEach((selectedIcon) => {
                            selectedIcon.classList.remove("selected");
                        });

                        // Add selected class to the clicked icon
                        icon.classList.add("selected");

                        // Stop propagation to prevent the document click event from firing
                        event.stopPropagation();
                    });
                });

                document
                    .getElementById("computer-icon")
                    .addEventListener("dblclick", () => {
                        openApp("computer-app", "Computer", initializeComputer);
                    });

                // Icon click events
                document
                    .getElementById("calculator-icon")
                    .addEventListener("dblclick", () => {
                        openApp(
                            "calculator-app",
                            "Calculator",
                            initializeCalculator
                        );
                    });

                document
                    .getElementById("minesweeper-icon")
                    .addEventListener("dblclick", () => {
                        openApp(
                            "minesweeper-app",
                            "Minesweeper",
                            initializeMinesweeper
                        );
                    });

                document
                    .getElementById("paint-icon")
                    .addEventListener("dblclick", () => {
                        openApp("paint-app", "Paint", initializePaintCanvas);
                    });
            }
        };
    });
});

function updateClock() {
    const clockElement = document.getElementById("clock");
    const currentTime = new Date();
    clockElement.textContent = currentTime.toLocaleTimeString();
    setTimeout(updateClock, 1000);
}

function openApp(appId, title, initializeFunction) {
    let appWindow = document.getElementById(appId);
    if (!appWindow) {
        appWindow = document.createElement("div");
        appWindow.id = appId;
        appWindow.className = "app-window";

        const windowHeader = document.createElement("div");
        windowHeader.className = "window-header";

        const titleSpan = document.createElement("span");
        titleSpan.textContent = title;
        windowHeader.appendChild(titleSpan);

        const closeBtn = document.createElement("button");
        closeBtn.className = "close-btn";
        closeBtn.textContent = "×";
        windowHeader.appendChild(closeBtn);

        appWindow.appendChild(windowHeader);

        const toolbar = document.createElement("div");
        toolbar.className = "window-toolbar";
        appWindow.appendChild(toolbar);

        // Toolbar items
        const fileMenu = createDropdownMenu("File", [
            "New",
            "Open",
            "Save",
            "Exit",
        ]);
        const editMenu = createDropdownMenu("Edit", [
            "Undo",
            "Cut",
            "Copy",
            "Paste",
        ]);
        const viewMenu = createDropdownMenu("View", ["Zoom In", "Zoom Out"]);
        const helpMenu = createDropdownMenu("Help", ["About", "Help Topics"]);

        // Append dropdown menus to the toolbar
        toolbar.appendChild(fileMenu);
        toolbar.appendChild(editMenu);
        toolbar.appendChild(viewMenu);
        toolbar.appendChild(helpMenu);

        const windowContent = document.createElement("div");
        windowContent.className = "window-content";
        appWindow.appendChild(windowContent);

        document.getElementById("desktop").appendChild(appWindow);

        closeBtn.addEventListener("click", () => {
            appWindow.remove();
        });

        if (initializeFunction) {
            initializeFunction(windowContent);
        }

        makeDraggable(appWindow);
        makeResizable(appWindow);
    }
}

document.getElementById("start-button").addEventListener("click", (event) => {
    createStartMenu();
    event.stopPropagation(); // Prevent click event from bubbling to the document
});

function createStartMenu() {
    // Close any existing start menu
    const existingMenu = document.getElementById("start-menu");
    if (existingMenu) {
        existingMenu.remove();
    }

    const menu = document.createElement("div");
    menu.id = "start-menu";
    menu.className = "start-menu";

    const all = document.createElement("div");
    all.id = "menu-all";
    all.className = "menu-all";

    const title = document.createElement("div");
    title.className = "menu-title";
    title.textContent = "Windows95";
    menu.appendChild(title);

    const menuItems = [
        {
            name: "Programs",
            subItems: [
                {
                    name: "Accessories",
                    icon: "./program-group.png",
                    id: "accessories",
                },
                {
                    name: "StartUp",
                    icon: "./program-group.png",
                    id: "startup",
                },
                {
                    name: "Explorer",
                    icon: "./explorer.png",
                    id: "explorer",
                },
                {
                    name: "Exchange",
                    icon: "./inbox.png",
                    id: "exchange",
                },
                {
                    name: "MS-DOS",
                    icon: "./msdos.png",
                    id: "msdos",
                },
            ],
            icon: "./program-group.png", // Example icon file name
        },
        {
            name: "Documents",
            subItems: [
                { name: "Not_suss.doc", icon: "./word.png", id: "not-suss" },
                { name: "tax-evade.xls", icon: "./excel.png", id: "tax-evade" },
                { name: "password.doc", icon: "./word.png", id: "password" },
                { name: "untitled.doc", icon: "./word.png", id: "untitled" },
                { name: "needajoke.xls", icon: "./excel.png", id: "needajoke" },
            ],
            icon: "./folder.png",
        },
        {
            name: "Settings",
            subItems: [
                {
                    name: "Control Panel",
                    icon: "./control.png",
                    id: "control-panel",
                },
                {
                    name: "Printers",
                    icon: "./printer.png",
                    id: "printers",
                },
                { name: "Taskbar...", icon: "./task.png", id: "taskbar" },
                {
                    name: "Regedit",
                    icon: "./registry.png",
                    id: "regedit",
                },
                {
                    name: "Self-destruct",
                    icon: "./batfile.png",
                    id: "self-destruct",
                },
            ],
            icon: "batfile.png",
        },
        // Single-line menu items without subItems
        { name: "Find", icon: "./find.png", id: "find" },
        { name: "Help", icon: "./help.png", id: "help" },
        { name: "Run", icon: "run.png", id: "run" },
        { name: "Shutdown", icon: "shutdown.png", id: "shutdown" },
    ];

    menuItems.forEach((item) => {
        const menuItem = document.createElement("div");
        menuItem.className = "menu-item";
        menuItem.id = item.id;

        const icon = document.createElement("img");
        icon.src = item.icon; // Set the icon image source
        icon.className = "menu-icon"; // Assign a class for styling
        menuItem.appendChild(icon);

        const textNode = document.createTextNode(item.name);
        menuItem.appendChild(textNode);

        menuItem.addEventListener("mouseenter", function () {
            this.style.backgroundColor = "#02007E";
            this.style.color = "white";
            const subMenu = this.querySelector(".sub-menu");
            if (subMenu) subMenu.style.display = "flex"; // Show sub-menu
        });
        menuItem.addEventListener("mouseleave", function () {
            this.style.backgroundColor = "";
            this.style.color = "";
            const subMenu = this.querySelector(".sub-menu");
            if (subMenu) subMenu.style.display = "none"; // Hide sub-menu
        });

        if (item.subItems && item.subItems.length) {
            const subMenu = document.createElement("div");
            subMenu.className = "sub-menu";
            item.subItems.forEach((subItem) => {
                const subMenuItem = document.createElement("div");
                subMenuItem.className = "sub-menu-item";
                subMenuItem.id = subItem.id;

                // Add icon to sub-menu item if it's an object with name and icon
                if (
                    typeof subItem === "object" &&
                    subItem.name &&
                    subItem.icon
                ) {
                    const subIcon = document.createElement("img");
                    subIcon.src = subItem.icon;
                    subIcon.className = "menu-icon";
                    subMenuItem.appendChild(subIcon);

                    subMenuItem.appendChild(
                        document.createTextNode(subItem.name)
                    );
                } else {
                    // If subItem is just a string
                    subMenuItem.appendChild(document.createTextNode(subItem));
                }

                subMenu.appendChild(subMenuItem);

                subMenuItem.addEventListener("mouseenter", function () {
                    this.style.backgroundColor = "#02007E";
                    this.style.color = "white";
                });
                subMenuItem.addEventListener("mouseleave", function () {
                    this.style.backgroundColor = "";
                    this.style.color = "";
                });
            });
            menuItem.appendChild(subMenu);
        }

        all.appendChild(menuItem);
    });

    menu.appendChild(all);
    document.getElementById("desktop").appendChild(menu);

    addEventListeners();
}

function addEventListeners() {
    const selfDestructButton = document.getElementById("self-destruct");
    const selfDestructVideo = document.getElementById("self-destruct-video");

    if (selfDestructButton) {
        selfDestructButton.addEventListener("click", function () {
            // Play the self-destruct video in fullscreen
            if (selfDestructVideo) {
                selfDestructVideo.style.display = "block"; // Make the video visible
                selfDestructVideo.play(); // Start playing the video

                // Request fullscreen for a more immersive experience
                if (selfDestructVideo.requestFullscreen) {
                    selfDestructVideo.requestFullscreen();
                } else if (selfDestructVideo.webkitRequestFullscreen) {
                    // Safari
                    selfDestructVideo.webkitRequestFullscreen();
                } else if (selfDestructVideo.msRequestFullscreen) {
                    // IE11
                    selfDestructVideo.msRequestFullscreen();
                }
            }

            selfDestructVideo.onended = () => {
                // Close the window or do something else when the video ends
                window.close(); // 
            };
        });
    }
    const shutdown = document.getElementById("shutdown");
    if (shutdown) {
        shutdown.addEventListener("click", function () {
            window.close();
        });
    }
}

// Close the start menu when clicking outside of it
document.addEventListener("click", function (event) {
    const startMenu = document.getElementById("start-menu");
    const startButton = document.getElementById("start-button");
    if (
        startMenu &&
        !startButton.contains(event.target) &&
        !startMenu.contains(event.target)
    ) {
        startMenu.remove();
    }
});

function createDropdownMenu(title, items) {
    const menu = document.createElement("div");
    menu.className = "dropdown";

    const menuTitle = document.createElement("span");
    menuTitle.textContent = title;
    menu.appendChild(menuTitle);

    const dropdownContent = document.createElement("div");
    dropdownContent.className = "dropdown-content";

    items.forEach((item) => {
        const option = document.createElement("div");
        option.textContent = item;
        option.addEventListener("mouseover", function () {
            this.style.backgroundColor = "#000080";
            this.style.color = "white";
        });
        option.addEventListener("mouseout", function () {
            this.style.backgroundColor = "#c3bec3";
            this.style.color = "black";
        });
        dropdownContent.appendChild(option);
    });

    menu.appendChild(dropdownContent);

    menu.addEventListener("click", function (event) {
        // Close all other dropdowns
        document.querySelectorAll(".dropdown-content").forEach((element) => {
            if (element !== dropdownContent) {
                element.style.display = "none";
            }
        });

        // Toggle the clicked dropdown
        dropdownContent.style.display =
            dropdownContent.style.display === "none" ? "block" : "none";
        event.stopPropagation(); // Prevent the click from propagating to the window
    });

    return menu;
}

function makeDraggable(element) {
    const header = element.querySelector(".window-header");
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    header.addEventListener("mousedown", function (e) {
        isDragging = true;
        offsetX = e.clientX - element.offsetLeft;
        offsetY = e.clientY - element.offsetTop;
        header.style.cursor = "move";
    });

    document.addEventListener("mousemove", function (e) {
        if (isDragging) {
            element.style.left = `${e.clientX - offsetX}px`;
            element.style.top = `${e.clientY - offsetY}px`;
        }
    });

    document.addEventListener("mouseup", function () {
        isDragging = false;
        header.style.cursor = "";
    });
}

function makeResizable(element) {
    if (element.dataset.app === "minesweeper") {
        // Skip resizing for Minesweeper window
        return;
    }
    const minWidth = 200; // Minimum resizable width
    const minHeight = 220; // Minimum resizable height

    const resizerTopLeft = document.createElement("div");
    const resizerTopRight = document.createElement("div");
    const resizerBottomLeft = document.createElement("div");
    const resizerBottomRight = document.createElement("div");

    resizerTopLeft.className = "resizer top-left";
    resizerTopRight.className = "resizer top-right";
    resizerBottomLeft.className = "resizer bottom-left";
    resizerBottomRight.className = "resizer bottom-right";

    element.appendChild(resizerTopLeft);
    element.appendChild(resizerTopRight);
    element.appendChild(resizerBottomLeft);
    element.appendChild(resizerBottomRight);

    let original_width,
        original_height,
        original_mouse_x,
        original_mouse_y,
        original_x,
        original_y;
    let original_lineWidth, imageData;

    const canvas = element.querySelector("canvas");
    if (canvas) {
        original_lineWidth = canvas.getContext("2d").lineWidth;
        imageData = canvas.toDataURL();
    }

    const resizers = [
        resizerTopLeft,
        resizerTopRight,
        resizerBottomLeft,
        resizerBottomRight,
    ];
    resizers.forEach((resizer) => {
        resizer.addEventListener("mousedown", function (e) {
            e.preventDefault();
            original_width = parseFloat(
                getComputedStyle(element)
                    .getPropertyValue("width")
                    .replace("px", "")
            );
            original_height = parseFloat(
                getComputedStyle(element)
                    .getPropertyValue("height")
                    .replace("px", "")
            );
            original_mouse_x = e.clientX;
            original_mouse_y = e.clientY;
            original_x = element.getBoundingClientRect().left;
            original_y = element.getBoundingClientRect().top;

            if (canvas) {
                imageData = canvas.toDataURL(); // Save the current canvas image before resizing
            }

            window.addEventListener("mousemove", resize);
            window.addEventListener("mouseup", stopResize);
        });

        function resize(e) {
            const dx = e.clientX - original_mouse_x;
            const dy = e.clientY - original_mouse_y;

            if (resizer.classList.contains("top-left")) {
                const width = original_width - dx;
                const height = original_height - dy;
                if (width > minWidth) {
                    element.style.width = width + "px";
                    element.style.left = original_x + dx + "px";
                }
                if (height > minHeight) {
                    element.style.height = height + "px";
                    element.style.top = original_y + dy + "px";
                }
            } else if (resizer.classList.contains("top-right")) {
                const width = original_width + dx;
                const height = original_height - dy;
                if (width > minWidth) {
                    element.style.width = width + "px";
                }
                if (height > minHeight) {
                    element.style.height = height + "px";
                    element.style.top = original_y + dy + "px";
                }
            } else if (resizer.classList.contains("bottom-left")) {
                const width = original_width - dx;
                const height = original_height + dy;
                if (width > minWidth) {
                    element.style.width = width + "px";
                    element.style.left = original_x + dx + "px";
                }
                if (height > minHeight) {
                    element.style.height = height + "px";
                }
            } else if (resizer.classList.contains("bottom-right")) {
                const width = original_width + dx;
                const height = original_height + dy;
                if (width > minWidth) {
                    element.style.width = width + "px";
                }
                if (height > minHeight) {
                    element.style.height = height + "px";
                }
            }

            if (canvas) {
                // Resize the canvas to fit the new dimensions
                canvas.width = element.clientWidth - 20;
                canvas.height = element.clientHeight - 175;

                const ctx = canvas.getContext("2d");
                ctx.lineWidth = original_lineWidth; // Reset the line width after resizing

                const img = new Image();
                img.onload = function () {
                    // Redraw the saved image onto the canvas
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                };
                img.src = imageData;
            }
        }

        function stopResize() {
            window.removeEventListener("mousemove", resize);
        }
    });
}

function initializeComputer(contentElement) {
    contentElement.innerHTML = `
            <div class="drives__block">
                <div class="drives__block__drive">
                    <img src="./floppy.png" />
                    <p>Floppy(A:)</p>
                </div>
                <div class="drives__block__drive">
                    <img src="./c.png" />
                    <p>(C:)</p>
                </div>
                <div class="drives__block__drive">
                    <img src="./d.png" />
                    <p>New (D:)</p>
                </div>
                <div class="drives__block__drive">
                    <img src="./folder.png" />
                    <p>Control Panel</p>
                </div>
                <div class="drives__block__drive">
                    <img src="./printer.png" />
                    <p>Printers</p>
                </div>
                <div class="drives__block__drive">
                    <img src="./folder.png" />
                    <p>Dial-Up </br> Networking</p>
                </div>
            </div>
    `;

    // Add click event to each drive to toggle the selected class
    contentElement
        .querySelectorAll(".drives__block__drive")
        .forEach((drive) => {
            drive.addEventListener("click", (event) => {
                // Remove selected class from all drives
                document
                    .querySelectorAll(".drives__block__drive.selected")
                    .forEach((selectedDrive) => {
                        selectedDrive.classList.remove("selected");
                    });

                // Add selected class to the clicked drive
                drive.classList.add("selected");

                // Stop propagation to prevent the document click event from firing
                event.stopPropagation();
            });
        });

    // Add click event to the document to remove the selected class when clicking outside
    document.addEventListener("click", () => {
        document
            .querySelectorAll(".drives__block__drive.selected")
            .forEach((selectedDrive) => {
                selectedDrive.classList.remove("selected");
            });
    });

    const appWindow = contentElement.closest(".app-window");
    if (appWindow) {
        appWindow.style.width = "440px";
        appWindow.style.height = "350px";
        appWindow.style.minHeight = "440px";
        appWindow.style.minWidth = "440px";
    }
}

function initializeCalculator(contentElement) {
    // Set the HTML structure
    contentElement.innerHTML = `
        <div class="calculator">
            <div class="display">0</div>

            <div class="keypad">
                <button class="btn divide">/</button>
                <button class="btn multiply">*</button>
                <button class="btn subtract">-</button>
                <button class="btn number">7</button>
                <button class="btn number">8</button>
                <button class="btn number">9</button>
                <button class="btn number">4</button>
                <button class="btn number">5</button>
                <button class="btn number">6</button>
                <button class="btn number">1</button>
                <button class="btn number">2</button>
                <button class="btn number">3</button>
                <button class="btn dot">.</button>
                <button class="btn number">0</button>
                <button class="btn add">+</button>
                <button class="btn clear">C</button>
                <button class="btn equals">=</button>
            </div>
        </div>
    `;

    // Initialize variables
    let firstNumber = "";
    let secondNumber = "";
    let operation = null;
    const display = document.querySelector(".display");

    // Function to update the display
    function updateDisplay(value) {
        display.textContent = value;
    }

    // Handle number buttons
    document.querySelectorAll(".btn.number, .btn.dot").forEach((button) => {
        button.addEventListener("click", function () {
            if (operation === null) {
                firstNumber += this.textContent;
                updateDisplay(firstNumber);
            } else {
                secondNumber += this.textContent;
                updateDisplay(secondNumber);
            }
        });
    });

    // Handle operation buttons
    document
        .querySelectorAll(".btn.divide, .btn.multiply, .btn.subtract, .btn.add")
        .forEach((button) => {
            button.addEventListener("click", function () {
                if (firstNumber !== "") {
                    operation = this.textContent;
                }
            });
        });

    // Perform calculation
    function calculate() {
        firstNumber = parseFloat(firstNumber);
        secondNumber = parseFloat(secondNumber);
        let result = 0;
        switch (operation) {
            case "+":
                result = firstNumber + secondNumber;
                break;
            case "-":
                result = firstNumber - secondNumber;
                break;
            case "*":
                result = firstNumber * secondNumber;
                break;
            case "/":
                if (secondNumber !== 0) {
                    result = firstNumber / secondNumber;
                } else {
                    result = "Error";
                }
                break;
        }
        return result;
    }

    // Handle equals button
    document
        .querySelector(".btn.equals")
        .addEventListener("click", function () {
            if (
                firstNumber !== "" &&
                operation !== null &&
                secondNumber !== ""
            ) {
                const result = calculate();
                updateDisplay(result);
                // Reset for next calculation
                firstNumber = result.toString();
                secondNumber = "";
                operation = null;
            }
        });

    // Handle clear button
    document.querySelector(".btn.clear").addEventListener("click", function () {
        firstNumber = "";
        secondNumber = "";
        operation = null;
        updateDisplay("0");
    });

    const appWindow = contentElement.closest(".app-window");
    if (appWindow) {
        appWindow.style.width = "420px"; //
        appWindow.style.minHeight = "580px"; //
    }
}

function initializeMinesweeper(contentElement) {
    createMinesweeperGrid(contentElement);

    const appWindow = contentElement.closest(".app-window");
    if (appWindow) {
        appWindow.dataset.app = "minesweeper"; // Add an identifier to the Minesweeper window
    }
}

function createMinesweeperGrid(contentElement) {
    const rows = 8;
    const cols = 8;
    const grid = document.createElement("div");
    grid.className = "minesweeper-grid";
    grid.style.display = "grid";
    grid.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    grid.style.gap = "2px";
    grid.style.border = "1px solid black";
    grid.style.width = "100%"; // Grid width is 100% of the container's width
    grid.style.maxWidth = "400px"; // Maximum width can be set as per design requirements
    grid.style.aspectRatio = "1"; // Maintain the aspect ratio to keep the grid square

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const cell = document.createElement("div");
            cell.className = "grid-cell";
            cell.addEventListener("click", () => revealCell(cell, grid));
            grid.appendChild(cell);
        }
    }

    contentElement.innerHTML = "";
    contentElement.appendChild(grid);

    // The app window size adjustment might not be necessary if the grid scales with the container
    const appWindow = contentElement.closest(".app-window");
    if (appWindow) {
        appWindow.style.width = "420px"; // Lock the width
        appWindow.style.height = "480px"; // Lock the height
        appWindow.style.resize = "none"; // Prevent resizing
    }
}

function revealCell(cell, grid) {
    if (Math.random() > 0.8) {
        cell.classList.add("mine");
        cell.textContent = "💣";
        cell.style.backgroundColor = "red";
        var explosionSound = new Audio("./bomb.mp3");
        explosionSound.play();
        const cells = grid.querySelectorAll(".grid-cell");
        // cells.forEach((cell) => {
        //     cell.removeEventListener("click", () => revealCell(cell, grid));
        // });
        setTimeout(function () {
            gameOver(grid);
        }, 1000);
    } else {
        cell.classList.add("safe");
        cell.textContent = "😎";
        cell.style.backgroundColor = "#adff2f";
    }
}

function gameOver(grid) {
    // Create the dialog overlay
    const overlay = document.createElement("div");
    overlay.className = "minesweeper__overlay";

    // Create the dialog box
    const dialog = document.createElement("div");
    dialog.className = "minesweeper__overlay__dialog";
    dialog.innerHTML = `<p>You lose! Would you like to play again?</p><div id="minesweeper__buttons"><button id="play-again">Yes</button><button id="close-dialog">No</button></div>`;

    overlay.appendChild(dialog);
    grid.parentNode.appendChild(overlay);

    document.getElementById("play-again").addEventListener("click", () => {
        overlay.remove();
        createMinesweeperGrid(grid.parentNode);
    });

    document.getElementById("close-dialog").addEventListener("click", () => {
        // Find the closest ancestor which is the app window
        const appWindow = overlay.closest(".app-window");
        appWindow.remove(); // Remove the app window
        overlay.remove(); // Remove the overlay
    });
}

function initializePaintCanvas(contentElement) {
    // Create a container for the paint application
    const paintContainer = document.createElement("div");
    paintContainer.className = "window-content paint";

    // Create a clear button and add it to the paint container
    const clearButton = document.createElement("button");
    clearButton.textContent = "Clear";
    clearButton.className = "paint__clear";
    paintContainer.appendChild(clearButton);

    // Create the color picker and add it to the paint container
    const colorPicker = document.createElement("input");
    colorPicker.type = "color";
    colorPicker.id = "color-picker";
    colorPicker.value = "#000000"; // default color
    paintContainer.appendChild(colorPicker);

    // Create the canvas and add it to the paint container
    const canvas = document.createElement("canvas");
    canvas.id = "paint-canvas";
    canvas.width = 275;
    canvas.height = 300;
    canvas.style.border = "1px solid black";
    paintContainer.appendChild(canvas);

    // Add the paint container to the contentElement
    contentElement.appendChild(paintContainer);

    // Initialize the canvas context and set up painting functionality
    const ctx = canvas.getContext("2d");
    ctx.lineWidth = 5; // Set the default line width
    ctx.strokeStyle = colorPicker.value; // Set the initial stroke style to the color picker's value

    // Update the stroke style whenever the user picks a new color
    colorPicker.addEventListener("change", (e) => {
        ctx.strokeStyle = e.target.value;
    });

    // Clear the canvas when the clear button is clicked
    clearButton.addEventListener("click", () => {
        // Clear the entire canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

    let painting = false;

    const getMousePos = (canvas, evt) => {
        const rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top,
        };
    };

    canvas.addEventListener("mousedown", (e) => {
        painting = true;
        const pos = getMousePos(canvas, e);
        ctx.moveTo(pos.x, pos.y);
        ctx.beginPath();
        draw(e);
    });

    canvas.addEventListener("mouseup", () => {
        painting = false;
        document.body.style.cursor = ""; // Corrected this line
    });

    canvas.addEventListener("mousemove", (e) => {
        if (painting) {
            draw(e);
        }
    });

    function draw(e) {
        if (!painting) return;
        document.body.style.cursor =
            'url("https://cur.cursors-4u.net/cursors/cur-11/cur1046.cur"), auto';
        const pos = getMousePos(canvas, e);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
    }
}
