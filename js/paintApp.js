// paintApp.js
function initializePaint(contentElement) {
    // Create a container for the paint application
    const paintContainer = document.createElement("div");
    paintContainer.className = "paint__app";

    // Create a clear button and add it to the paint container
    const clearButton = document.createElement("button");
    clearButton.textContent = "Clear";
    clearButton.className = "paint__app__clearbtn";
    paintContainer.appendChild(clearButton);

    // Create the color picker and add it to the paint container
    const colorPicker = document.createElement("input");
    colorPicker.type = "color";
    colorPicker.className = "paint__app__colorpicker";
    colorPicker.value = "#000000"; // default color
    paintContainer.appendChild(colorPicker);

    // Create the canvas and add it to the paint container
    const canvas = document.createElement("canvas");
    canvas.className = "paint__app__canvas";
    canvas.width = 400;
    canvas.height = 260;
    canvas.style.border = "1px solid black";
    paintContainer.appendChild(canvas);

    // Add the paint container to the contentElement
    contentElement.appendChild(paintContainer);

    // Initialize the canvas context (what kind of canvas you need) and set up painting functionality
    const ctx = canvas.getContext("2d");
    // Set the default line width
    ctx.lineWidth = 3;
    // Set the initial stroke style to the color picker's value
    ctx.strokeStyle = colorPicker.value;

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

    // Function to calculate the mouse position relative to the canvas element
    function getMousePos(canvas, evt) {
        // Get the bounding box of the canvas [Bounding Box = Includes everything BUT margin]
        // The DOMRect object contains properties such as left, top, right, bottom, width, and height.
        // By getting the dimensions and positions of the mouse, we can calculate the mouse position relative to the canvas and apply to smaller / higher scales.
        const rect = canvas.getBoundingClientRect();
        // Calculate the scale ratio between the displayed size and the actual drawing buffer size
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        // Return the mouse position relative to the canvas
        return {
            // evt.Client X & Y is the position of the mouse pointer relative to the browser window.
            // rect.left is the distance from the left edge of the browser window to the left edge of the canvas.
            // rect.top is the distance from the top edge of the browser window to the top edge of the canvas.
            // Scale X & Y is the above calculation for the scale to use.
            x: (evt.clientX - rect.left) * scaleX,
            y: (evt.clientY - rect.top) * scaleY,
        };
    }

    //Event listener for when to start drawing
    canvas.addEventListener("mousedown", (e) => {
        painting = true;
        // Get the current mouse position
        const pos = getMousePos(canvas, e);
        // Move the context path to the mouse position [ Doesn't actually draw anything ]
        ctx.moveTo(pos.x, pos.y);
        // Start a new drawing path || If not included, the lines will connect and it will be one continuous line.
        ctx.beginPath();
        //Call draw function to handle drawing
        draw(e);
    });

    // Event listener for finishing drawing
    canvas.addEventListener("mouseup", () => {
        painting = false;
        document.body.style.cursor = "";
    });

    // Event listener for drawing while the mouse is moving
    canvas.addEventListener("mousemove", (e) => {
        if (painting) {
            draw(e);
        }
    });

    // Function to draw a line on the canvas
    function draw(e) {
        // If not painting, don't draw
        if (!painting) return;
        document.body.style.cursor =
            'url("https://cur.cursors-4u.net/cursors/cur-11/cur1046.cur"), auto';
        // Get the current mouse position
        const pos = getMousePos(canvas, e);
        //Draw a line to the new position
        ctx.lineTo(pos.x, pos.y);
        // Render the line on the canvas
        ctx.stroke();
    }

    // Apply stylings specific to the "paint__app" window
    const appWindow = contentElement.closest(".window");
    if (appWindow) {
        appWindow.style.width = "500px";
        appWindow.style.minWidth = "490px";
        appWindow.style.height = "500px";
        appWindow.style.minHeight = "500px";
    }
}

export { initializePaint };
