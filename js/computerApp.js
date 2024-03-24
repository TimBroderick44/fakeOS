// computerApp.js

// Count the number of icons in the "My Computer" app.
function FooterIconCount() {
    const footerDetails = document.querySelector(".window__footer__details");
    const iconCount = document.querySelectorAll(".myComputer__drive").length;
    footerDetails.textContent = `${iconCount} object(s)`;
}

// Creates the drives with the "My Computer" app.
function createDrive(drive) {
    const driveElement = document.createElement("div");
    driveElement.className = "myComputer__drive";
    //Allow for imgs and labels
    driveElement.innerHTML = `<img src="${drive.img}" /><p>${drive.label}</p>`;
    // Listener that allows for the icons to be highlighted blue (same as icons on desktop)
    driveElement.addEventListener("click", (event) => {
        document
            // Take off first
            .querySelectorAll(".myComputer__drive--selected")
            .forEach((selectedDrive) => {
                selectedDrive.classList.remove("myComputer__drive--selected");
            });
        // Add class
        driveElement.classList.add("myComputer__drive--selected");
        // Stop the event from bubbling up to the document
        // Bubbling up ==> Only one listener 'activates' & parent elements have no influence.
        event.stopPropagation();
    });
    return driveElement;
}

// Function to initialize the "My Computer" app
function initializeComputer(contentElement) {
    const computerBackground = document.querySelector(".window");
    computerBackground.style.backgroundColor = "white";

    const drivesBlock = document.createElement("div");
    drivesBlock.className = "myComputer";

    // Array of drives with their imgs and labels
    const drives = [
        { img: "./assets/floppy.png", label: "Floppy (A:)" },
        { img: "./assets/c.png", label: "(C:)" },
        { img: "./assets/d.png", label: "New (D:)" },
        { img: "./assets/folder.png", label: "Control Panel" },
        { img: "./assets/printer.png", label: "Printers" },
        { img: "./assets/folder.png", label: "Dial-Up Networking" },
    ];

    // Append to parents
    drives.forEach((drive) => {
        drivesBlock.appendChild(createDrive(drive));
    });

    contentElement.appendChild(drivesBlock);

    // Add a click event listener to the whole document to handle clicks anywhere on the page
    document.addEventListener("click", () => {
        // Check if the click was outside any element with the class ".myComputer__drive"
        const outsideClick = !event.target.closest(".myComputer__drive");
        // If the click was outside, remove the "--selected" class
        // from all elements with the class ".myComputer__drive--selected"
        if (outsideClick) {
            document
                .querySelectorAll(".myComputer__drive--selected")
                .forEach((selectedDrive) => {
                    selectedDrive.classList.remove(
                        "myComputer__drive--selected"
                    );
                });
        }
    });

    FooterIconCount();

    // Apply styling specific to the "My Computer" app, if it exists
    const appWindow = contentElement.closest(".window");
    if (appWindow) {
        appWindow.style.width = "500px";
        appWindow.style.minWidth = "490px";
        appWindow.style.height = "450px";
        appWindow.style.minHeight = "280px";
    }
}

export { initializeComputer };
