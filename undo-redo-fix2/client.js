// Initialize variables
let currentColor = null;
let prevColor = null;
let paintBox = document.getElementById("paintBox");
let capturing = false;
let undoStack = [];
let redoStack = [];

// Add event listeners to color buttons
let colorButtons = document.querySelectorAll(".color-button");
colorButtons.forEach((button) => {
    button.addEventListener("click", () => {
        currentColor = button.dataset.color;
        prevColor = currentColor;
    });
});

// Add event listener to clear button
let clearButton = document.getElementById("clearButton");
clearButton.addEventListener("click", clearPaintBox);

// Add event listener to undo button
let undoButton = document.getElementById("undoButton");
undoButton.addEventListener("click", undoPaint);

// Add event listener to redo button
let redoButton = document.getElementById("redoButton");
redoButton.addEventListener("click", redoPaint);

// Add event listener to capture button
let captureButton = document.getElementById("captureButton");
captureButton.addEventListener("click", captureCanvas);

// Add event listeners for arrow key support
document.addEventListener("keydown", handleArrowKeys);

// Function to toggle the display of game content
function toggleContent() {
    let startButton = document.getElementById("startButton");
    let gameContent = document.getElementById("gameContent");
    startButton.style.display = "none";
    gameContent.style.display = "block";
    generatePaintBox();
}

// Function to generate the paint box grid
function generatePaintBox() {
    for (let i = 0; i < 10; i++) {
        let row = document.createElement("tr");
        for (let j = 0; j < 10; j++) {
            let cell = document.createElement("td");
            cell.addEventListener("click", () => {
                if (currentColor) {
                    paintCell(cell);
                }
            });
            row.appendChild(cell);
        }
        paintBox.appendChild(row);
    }
}

// Function to paint a cell with the selected color
function paintCell(cell) {
    if (capturing) {
        return;
    }
    let prevColor = cell.style.backgroundColor;
    cell.style.backgroundColor = currentColor;
    undoStack.push({ cell, prevColor });
}

// Function to clear the entire paint box
function clearPaintBox() {
    if (capturing) {
        return;
    }
    let cells = paintBox.getElementsByTagName("td");
    for (let i = 0; i < cells.length; i++) {
        cells[i].style.backgroundColor = "";
    }
    undoStack = [];
    redoStack = [];
}

// Function to undo the last paint operation
function undoPaint() {
    if (capturing) {
        return;
    }
    if (undoStack.length > 0) {
        let { cell, prevColor } = undoStack.pop();
        cell.style.backgroundColor = prevColor;
        redoStack.push({ cell, prevColor });
    }
}

// Function to redo the last undone paint operation
function redoPaint() {
    if (capturing) {
        return;
    }
    if (redoStack.length > 0) {
        let { cell, prevColor } = redoStack.pop();
        cell.style.backgroundColor = currentColor;
        undoStack.push({ cell, prevColor });
    }
}

// Function to handle arrow keys for color selection
function handleArrowKeys(event) {
    if (event.key === "ArrowUp") {
        changeColor("red");
    } else if (event.key === "ArrowRight") {
        changeColor("green");
    } else if (event.key === "ArrowDown") {
        changeColor("blue");
    } else if (event.key === "ArrowLeft") {
        changeColor("purple");
    }
}

// Function to change the current color
function changeColor(color) {
    currentColor = color;
    prevColor = currentColor;
}

// Function to capture the canvas and save as an image
function captureCanvas() {
    if (capturing) {
        return;
    }
    capturing = true;
    html2canvas(paintBox).then((canvas) => {
        let image = canvas.toDataURL("image/png");
        let link = document.createElement("a");
        link.href = image;
        link.download = "painting.png";
        link.click();
        capturing = false;
    });
}
