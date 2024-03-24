// Init the calculator function
function initializeCalculator(contentElement) {
    //Make it easier to skip adding resizers
    const calculatorWindow = contentElement.closest(".window");
    if (calculatorWindow) {
        // Add an identifier to the Calculator window
        calculatorWindow.dataset.app = "calculator";
    }

    // Create elements and append to parent/s.
    const calculator = document.createElement("div");
    calculator.className = "calculator__app";

    const display = document.createElement("div");
    display.className = "calculator__app__display";
    display.textContent = "0";
    calculator.appendChild(display);

    const keypad = document.createElement("div");
    keypad.className = "calculator__app__keypad";

    // Array of buttons in order of appearance on the calc.
    const buttons = [
        { text: "/", cls: "divide" },
        { text: "*", cls: "multiply" },
        { text: "-", cls: "subtract" },
        { text: "7", cls: "number" },
        { text: "8", cls: "number" },
        { text: "9", cls: "number" },
        { text: "4", cls: "number" },
        { text: "5", cls: "number" },
        { text: "6", cls: "number" },
        { text: "1", cls: "number" },
        { text: "2", cls: "number" },
        { text: "3", cls: "number" },
        { text: ".", cls: "dot" },
        { text: "0", cls: "number" },
        { text: "+", cls: "add" },
        { text: "C", cls: "clear" },
        { text: "=", cls: "equals" },
    ];

    //For each button, give them a specific class name and generic one. Append.
    buttons.forEach((button) => {
        const buttonElement = document.createElement("button");
        buttonElement.className = `calculator__app__btn__${button.cls} calculator__app__btn`;
        buttonElement.textContent = button.text;
        keypad.appendChild(buttonElement);
    });

    calculator.appendChild(keypad);
    contentElement.appendChild(calculator);

    // Initialize variables
    let firstNumber = "";
    let secondNumber = "";
    let operation = null;

    // Function to update the display
    function updateDisplay(value) {
        display.textContent = value;
    }

    // Handle number and dot buttons
    document
        .querySelectorAll(
            ".calculator__app__btn__number, .calculator__app__btn__dot"
        )
        .forEach((button) => {
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
        .querySelectorAll(
            ".calculator__app__btn__divide, .calculator__app__btn__multiply, .calculator__app__btn__subtract, .calculator__app__btn__add"
        )
        .forEach((button) => {
            button.addEventListener("click", function () {
                if (firstNumber !== "") {
                    operation = this.textContent;
                }
            });
        });

    // Perform calculation
    const operations = {
        "+": (a, b) => a + b,
        "-": (a, b) => a - b,
        "*": (a, b) => a * b,
        "/": (a, b) => (b !== 0 ? a / b : "Error"),
    };

    function calculate(firstNumber, secondNumber, operation) {
        firstNumber = parseFloat(firstNumber);
        secondNumber = parseFloat(secondNumber);
        return operations[operation](firstNumber, secondNumber);
    }

    // Handle equals button
    document
        .querySelector(".calculator__app__btn__equals")
        .addEventListener("click", function () {
            // if there are numbers and an operation, calculate the result
            if (
                firstNumber !== "" &&
                operation !== null &&
                secondNumber !== ""
            ) {
                const result = calculate(firstNumber, secondNumber, operation);
                updateDisplay(result);
                firstNumber = result.toString();
                secondNumber = "";
                operation = null;
            }
        });

    // Handle clear button
    document
        .querySelector(".calculator__app__btn__clear")
        .addEventListener("click", function () {
            firstNumber = "";
            secondNumber = "";
            operation = null;
            updateDisplay("0");
        });
}

export { initializeCalculator };
