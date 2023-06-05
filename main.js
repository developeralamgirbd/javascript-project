let drawing = [];
let currentStep = -1;
let selectedColor;

// Function to set the color
const setColor = (color) => {
    selectedColor = color;
};

// Function to toggle game content
const toggleContent = () => {
    const gameContent = document.getElementById("gameContent");
    gameContent.style.display = gameContent.style.display === "none" ? "block" : "none";
    createTable(12, 12);
};

// Function to handle click event on paint box cells
const paintCell = (cell) => {
    if (selectedColor) {
        const cellId = cell.getAttribute("id");
        console.log(cell)
        drawing.push({ cellId, color: selectedColor });
        cell.style.backgroundColor = selectedColor;
        currentStep++;
    }
};

// Function to undo the last step
const undo = () => {
    if (currentStep >= 0) {
        const step = drawing[currentStep];
        const cell = document.getElementById(step.cellId);
        cell.style.backgroundColor = "";
        currentStep--;
    }
};

// Function to redo the last undone step
const redo = () => {
    if (currentStep < drawing.length - 1) {
        currentStep++;
        const step = drawing[currentStep];
        const cell = document.getElementById(step.cellId);
        cell.style.backgroundColor = step.color;
    }
};

// Function to clear the drawing
const clearDrawing = () => {
    const paintBoxCells = document.querySelectorAll("#paintBox td");
    for (let i = 0; i < paintBoxCells.length; i++) {
        paintBoxCells[i].style.backgroundColor = "";
    }
    drawing = [];
    currentStep = -1;
};

// Function to capture the drawing as an image
document.getElementById("download_image").addEventListener("click", () => {
    html2canvas(document.getElementById("capture")).then((canvas) => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL();
        link.download = "drawing.png";
        link.click();
    });
});

document.querySelectorAll(".color-button").forEach((button) => {
    button.addEventListener("click", () => {
        const color = button.getAttribute("data-color");
        setColor(color);
    });
});

// Event listener for clear button
document.getElementById("clearButton").addEventListener("click", clearDrawing);

// Event listener for undo button
document.getElementById("undoButton").addEventListener("click", undo);

// Event listener for redo button
document.getElementById("redoButton").addEventListener("click", redo);

function createTable(rows, columns) {
    const table = document.getElementById('paintBox');
    table.innerHTML = '';

    let isMouseDown = false;

    for (let i = 0; i < rows; i++) {
        const row = document.createElement('tr');

        for (let j = 0; j < columns; j++) {
            const cell = document.createElement('td');
            cell.classList.add('cell');

            cell.dataset.prevColor = 'white';

            cell.onmousedown = function () {
                isMouseDown = true;
                this.dataset.prevColor =
                    `${this.dataset.prevColor},${cell.style.backgroundColor}` || 'white';

                if (currentColor) {
                    this.style.backgroundColor = currentColor;
                }
            };

            cell.onmouseover = function () {
                if (isMouseDown && currentColor) {
                    this.style.backgroundColor = currentColor;
                    this.dataset.prevColor =
                        `${this.dataset.prevColor},${cell.style.backgroundColor}` ||
                        'white';
                }
            };

            document.onmouseup = function () {
                isMouseDown = false;
            };

            row.appendChild(cell);
        }
        table.appendChild(row);
    }
}

// Example usage:
/*const rows = 5;
const columns = 5;
createTable(rows, columns);*/




