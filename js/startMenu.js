// startMenu.js

function createStartMenu() {
    const existingMenu = document.querySelector(".startbar__menu");
    // if already open (or exists), close it.
    if (existingMenu) {
        existingMenu.remove();
    }

    // Create the menu
    const menu = document.createElement("div");
    menu.className = "startbar__menu";

    //Create the Windows 95 logo down the left side.
    const title = document.createElement("div");
    title.className = "startbar__menu__title";
    title.textContent = "Windows95";
    menu.appendChild(title);

    // Create a div that holds all the items (without the title) for styling.
    const menuContainer = document.createElement("div");
    menuContainer.className = "startbar__menu__all";

    // Create an array of items with their id, icon and any subitems
    // Array makes it MUCH easier to work with later.
    const menuItems = [
        {
            name: "Programs",
            id: "programs",
            icon: "./assets/program-group.png",
            subItems: [
                {
                    name: "Accessories",
                    icon: "./assets/program-group.png",
                    id: "accessories",
                },
                {
                    name: "StartUp",
                    icon: "./assets/program-group.png",
                    id: "startup",
                },
                {
                    name: "Explorer",
                    icon: "./assets/explorer.png",
                    id: "explorer",
                },
                {
                    name: "Exchange",
                    icon: "./assets/inbox.png",
                    id: "exchange",
                },
                {
                    name: "MS-DOS",
                    icon: "./assets/msdos.png",
                    id: "msdos",
                },
            ],
        },
        {
            name: "Documents",
            id: "documents",
            icon: "./assets/folder.png",
            subItems: [
                {
                    name: "Not_suss.doc",
                    icon: "./assets/word.png",
                    id: "not-suss",
                },
                {
                    name: "tax-evade.xls",
                    icon: "./assets/excel.png",
                    id: "tax-evade",
                },
                {
                    name: "password.doc",
                    icon: "./assets/word.png",
                    id: "password",
                },
                {
                    name: "untitled.doc",
                    icon: "./assets/word.png",
                    id: "untitled",
                },
                {
                    name: "needajoke.xls",
                    icon: "./assets/excel.png",
                    id: "needajoke",
                },
            ],
        },
        {
            name: "Settings",
            id: "settings",
            icon: "./assets/batfile.png",
            subItems: [
                {
                    name: "Control Panel",
                    icon: "./assets/control.png",
                    id: "control-panel",
                },
                {
                    name: "Printers",
                    icon: "./assets/printer.png",
                    id: "printers",
                },
                {
                    name: "Taskbar...",
                    icon: "./assets/task.png",
                    id: "taskbar",
                },
                {
                    name: "Regedit",
                    icon: "./assets/registry.png",
                    id: "regedit",
                },
                {
                    name: "Self-destruct",
                    icon: "./assets/batfile.png",
                    id: "self-destruct",
                },
            ],
        },
        // Single-line menu items without subItems
        { name: "Find", icon: "./assets/find.png", id: "find" },
        { name: "Help", icon: "./assets/help.png", id: "help" },
        { name: "Run", icon: "./assets/run.png", id: "run" },
        { name: "Shutdown", icon: "./assets/shutdown.png", id: "shutdown" },
    ];

    //Append children to their parents.
    const all = createMenuItems(menuItems);
    menuContainer.appendChild(all);
    menu.appendChild(menuContainer);

    document.querySelector(".desktop").appendChild(menu);

    // Add functionality to some of the items (e.g. Self-destruct, shutdown, etc.)
    addEventListeners(menu);
}

function createMenuItems(menuItems) {
    // Create a document fragment to hold all the menu items
    // Why createDocumentFragment??? Can create whole sub trees 'off-DOM' --> Better performance || Reduced reflows
    // E.g. 'for' loop that attaches <div>s -> Create subtree and then attach to the DOM.
    const fragment = document.createDocumentFragment();

    // Create sub tree to attach later to the DOM (as above)
    menuItems.forEach((item) => {
        const menuItem = document.createElement("div");
        menuItem.className = "startbar__menu__item";
        menuItem.id = item.id;

        const icon = document.createElement("img");
        icon.src = item.icon;
        icon.className = "startbar__menu__icon";
        menuItem.appendChild(icon);

        const textNode = document.createTextNode(item.name);
        menuItem.appendChild(textNode);

        // Listener -> When the mouse enters, background will change to blue & text to white.
        menuItem.addEventListener("mouseenter", function () {
            this.style.backgroundColor = "#02007E";
            this.style.color = "white";
        });

        // Revert the above.
        menuItem.addEventListener("mouseleave", function () {
            this.style.backgroundColor = "";
            this.style.color = "";
        });

        // if there are subItems (if it exists and there's actually things in it) create the menu for it.
        if (item.subItems && item.subItems.length) {
            const subMenu = createSubMenu(item.subItems);
            menuItem.appendChild(subMenu);
        }

        // Finally, append it to the DOM.
        fragment.appendChild(menuItem);
    });

    return fragment;
}

// Set up the submenu
function createSubMenu(subItems) {
    const subMenu = document.createElement("div");
    subMenu.className = "startbar__menu__submenu";

    // Loop creating divs while setting the IDs
    subItems.forEach((subItem) => {
        const subMenuItem = document.createElement("div");
        subMenuItem.className = "startbar__menu__submenu__item";
        subMenuItem.id = subItem.id;

        // Create the icon and append
        const subIcon = document.createElement("img");
        subIcon.src = subItem.icon;
        subIcon.className = "startbar__menu__submenu__icon";
        subMenuItem.appendChild(subIcon);

        // Text for the subMenu items (i.e. the names of each)
        const subItemText = document.createTextNode(subItem.name);
        subMenuItem.appendChild(subItemText);

        // Append to parent
        subMenu.appendChild(subMenuItem);

        // Similar listener to main menu items (i.e. Blue background with white text)
        subMenuItem.addEventListener("mouseenter", function () {
            this.style.backgroundColor = "#02007E";
            this.style.color = "white";
        });

        // Revert back
        subMenuItem.addEventListener("mouseleave", function () {
            this.style.backgroundColor = "";
            this.style.color = "";
        });
    });

    return subMenu;
}

// Function to add functionality to the menu and subMenu items.
// (Some are funny / Easter Eggs for the user to have fun with)
function addEventListeners(menu) {
    menu.addEventListener("click", function (event) {
        const { target } = event;
        if (target.id === "self-destruct") {
            playSelfDestructSequence();
        } else if (target.id === "shutdown") {
            window.close();
        } else if (target.id === "run") {
            window.open("https://hackertyper.net/", "_blank");
        }
    });
}

// Funny Easter Egg
// If the user clicks 'Self-destruct', there is a countdown and then a jump scare.
function playSelfDestructSequence() {
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
}

// Close the start menu when clicking outside of it
document.addEventListener("click", function (event) {
    const startMenu = document.querySelector(".startbar__menu");
    const startButton = document.querySelector(".startbar__button");
    const dottedStartButton = document.querySelector(
        ".startbar__button--dotted"
    );
    if (
        // If the start menu is open and the click is outside of the start menu and the start button
        // event.target ==> Where the 'event' happened (from the above listener, the click of either start menu or start button)
        startMenu &&
        !startButton.contains(event.target) &&
        !startMenu.contains(event.target)
    ) {
        //Remove the start menu and stylings
        startMenu.remove();
        startButton.style.boxShadow = "";
        dottedStartButton.style.border = "";
    }
});

export {createStartMenu };
