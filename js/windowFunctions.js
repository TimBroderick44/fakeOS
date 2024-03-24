// windowFunctions.js
// Function to create a generic app window
function createAppWindow(title) {
    const appWindow = document.createElement("div");
    appWindow.className = "window";

    //Window Header across the top
    const windowHeader = createWindowHeader(title);
    appWindow.appendChild(windowHeader);

    // Underneath the header is the toolbar with 'file', 'edit', 'view' and 'help'
    const toolbar = createToolbar();
    appWindow.appendChild(toolbar);

    // Space for the functionality of the app.
    const windowContent = document.createElement("div");
    windowContent.className = "window__content";
    appWindow.appendChild(windowContent);

    // At the bottom of the window. (Especially important for the 'My Computer' app - see below )
    const windowFooter = document.createElement("div");
    windowFooter.className = "window__footer";
    appWindow.appendChild(windowFooter);

    // To make it look like 'Win95', need to seprate into separate divs.
    if (title === "Computer") {
        const windowFooterDiv1 = document.createElement("div");
        windowFooterDiv1.className = "window__footer__details";
        windowFooter.appendChild(windowFooterDiv1);

        const windowFooterDiv2 = document.createElement("div");
        windowFooterDiv2.className = "window__footer__blank";
        windowFooter.appendChild(windowFooterDiv2);
    }

    return appWindow;
}

// Creates the Window Header
function createWindowHeader(title) {
    const windowHeader = document.createElement("div");
    windowHeader.className = "window__header";

    // Div to hold the title and img - can apply styling
    const windowIconTitle = document.createElement("div");
    windowIconTitle.className = "window__header__block";
    windowHeader.appendChild(windowIconTitle);

    //Allows for an icon next to the title in the header
    const windowIcon = document.createElement("img");
    windowIcon.src = `./assets/${title.toLowerCase()}.png`;
    windowIcon.className = "window__header__block__icon";
    windowIconTitle.appendChild(windowIcon);

    // Title of the window
    const titleSpan = document.createElement("span");
    titleSpan.textContent = title;
    titleSpan.className = "window__header__block__title";
    windowIconTitle.appendChild(titleSpan);

    // Close button and the listener event -> Click and close the window.
    const closeBtn = document.createElement("button");
    closeBtn.className = "window__header__block--closebtn";
    closeBtn.textContent = "X";
    closeBtn.addEventListener("click", function () {
        this.closest(".window").remove();
    });
    windowHeader.appendChild(closeBtn);

    return windowHeader;
}

// Function to create the Toolbar under the Window Header.
function createToolbar() {
    const toolbar = document.createElement("div");
    toolbar.className = "window__toolbar";

    // Create Array of the different menus (i.e. File, Edit, View, Help) with their subItems (i.e. New, Open, Save, Exit)
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

    // Append children to parents
    toolbar.appendChild(fileMenu);
    toolbar.appendChild(editMenu);
    toolbar.appendChild(viewMenu);
    toolbar.appendChild(helpMenu);

    return toolbar;
}

// Function to create the dropdown menus for the toolbar
function createDropdownMenu(title, items) {
    const menu = document.createElement("div");
    menu.className = "window__toolbar__dropdown";

    // Title of the menu
    const menuTitle = document.createElement("span");
    menuTitle.style.padding = "4px";
    menuTitle.textContent = title;
    menu.appendChild(menuTitle);

    // Content of the dropdown
    const dropdownContent = document.createElement("div");
    dropdownContent.className = "window__toolbar__dropdown__content";
    items.forEach((item) => {
        const option = document.createElement("div");
        option.textContent = item;
        // Create class for styling
        option.className = "window__toolbar__dropdown__content__item";
        // Add listener for 'Windows-y' blue hover effect
        option.addEventListener("mouseenter", function () {
            this.style.backgroundColor = "#02007E";
            this.style.color = "white";
        });
        // Remove the above effect when the mouse leaves
        option.addEventListener("mouseleave", function () {
            this.style.backgroundColor = "";
            this.style.color = "";
        });
        //Append the item to the dropdown
        dropdownContent.appendChild(option);
    });
    // Append the dropdown content to the menu
    menu.appendChild(dropdownContent);

    // Show dropdown on hover over the title
    menuTitle.addEventListener("mouseenter", function () {
        dropdownContent.style.display = "block";
        menu.style.backgroundColor = "#02007E";
        menu.style.color = "white";
    });

    // Hide dropdown when mouse leaves the menu area
    menu.addEventListener("mouseleave", function () {
        dropdownContent.style.display = "none";
        menu.style.backgroundColor = "";
        menu.style.color = "";
    });

    return menu;
}

// Global click listener to close dropdowns when clicking outside
document.addEventListener("click", () => {
    document
        .querySelectorAll(".window__toolbar__dropdown__content")
        .forEach((dropdown) => {
            dropdown.style.display = "none";
        });
});

// Function that runs through the different functions affecting dragging, resizing, etc.
function makeAppWindowInteractive(appWindow) {
    makeDraggable(appWindow);
    makeResizable(appWindow);
}

// Function to make an element draggable within the desktop area
function makeDraggable(element) {
    const header = element.querySelector(".window__header");
    // Set it so that not being dragged
    let isDragging = false;
    // Init offset variables to record where the mouse is relative to the top-left corner of the element
    let offsetX = 0;
    let offsetY = 0;

    // Listener for the mouse down event on the header to start dragging
    header.addEventListener("mousedown", function (e) {
        // Set the dragging state to true
        isDragging = true;
        // Calculate the horizontal offset between the mouse and the element
        offsetX = e.clientX - element.offsetLeft;
        // Calculate the vertical offset between the mouse and the element
        offsetY = e.clientY - element.offsetTop;
        header.style.cursor = "move";
    });

    // Listen for the mouse move event on the entire document to move the element
    document.addEventListener("mousemove", function (e) {
        // Check if being dragged
        if (isDragging) {
            // Set the new position of the element based on mouse location and offset
            element.style.left = `${e.clientX - offsetX}px`;
            element.style.top = `${e.clientY - offsetY}px`;
        }
    });

    // Listen for event and stop dragging
    document.addEventListener("mouseup", function () {
        // Resets the dragging
        isDragging = false;
        // Resets the cursor
        header.style.cursor = "";
    });
}

// Function that allows windows to be resized
function makeResizable(element) {
    // Skip resizing for Minesweeper and Calculator windows
    if (
        element.dataset.app === "minesweeper" ||
        element.dataset.app === "calculator"
    ) {
        // Skip resizing for Minesweeper and Calculator windows
        return;
    }
    const minWidth = 200;
    const minHeight = 220;

    // Create div to act as location of listener
    const resizerBottomRight = document.createElement("div");
    resizerBottomRight.className = "resizer bottom-right";
    element.appendChild(resizerBottomRight);

    // Adds a listener to the 'resizer'
    resizerBottomRight.addEventListener("mousedown", function (e) {
        //Prevents actions like text selections, etc.
        e.preventDefault();

        // Store the initial heights so able to use later.
        const original_width = parseFloat(
            getComputedStyle(element, null).width.replace("px", "")
        );
        const original_height = parseFloat(
            getComputedStyle(element, null).height.replace("px", "")
        );

        // Store the mouse's starting positions .
        const original_mouse_x = e.clientX;
        const original_mouse_y = e.clientY;

        // If there is a canvas, get the context (2D as opposed to WebGL or other canvases) and save anything already drawn.
        let canvas = document.querySelector(".paint__app__canvas");
        let ctx = canvas ? canvas.getContext("2d") : null;
        let imageData = ctx ? canvas.toDataURL() : null;
        // Save line width and color so when resized remains the same.
        let original_lineWidth = ctx ? ctx.lineWidth : 1;
        let original_color = ctx ? ctx.strokeStyle : "#000000";

        // add listeners to handle to the resizing.
        window.addEventListener("mousemove", resize);
        window.addEventListener("mouseup", stopResize);

        // Actual function to resize.
        function resize(e) {
            // Calculates the new width and height based on mouse movement.
            // e.clientX & Y ==> final mouse position
            // So in plain English => The original width plus the distance the mouse moved is the new height & width.
            const width = original_width + (e.clientX - original_mouse_x);
            const height = original_height + (e.clientY - original_mouse_y);

            // Check adhereing to the minWidth and minHeight
            if (width > minWidth) {
                element.style.width = width + "px";
            }

            if (height > minHeight) {
                element.style.height = height + "px";
            }

            // If there's a canvas (i.e. the paint__app), resize and redraw the canvas
            if (canvas) {
                // Resize the canvas
                // Minus values for accomodating margins, borders, etc.
                canvas.width = element.clientWidth - 20;
                canvas.height = element.clientHeight - 190;

                // Reapply the context settings (acquired earlier)
                ctx = canvas.getContext("2d");
                ctx.lineWidth = original_lineWidth;
                ctx.strokeStyle = original_color;

                // Redraw the saved image
                const img = new Image();
                img.onload = function () {
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                };
                img.src = imageData;
            }
        }

        // Stop resizing
        function stopResize() {
            window.removeEventListener("mousemove", resize);
        }
    });
}

export { createAppWindow, makeAppWindowInteractive };
