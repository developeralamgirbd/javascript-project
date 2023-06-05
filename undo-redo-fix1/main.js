const paintBox = document.getElementById('paintBox');
const clearButton = document.getElementById('clearButton');
const undoButton = document.getElementById('undoButton');
const redoButton = document.getElementById('redoButton');
const colorButtons = document.querySelectorAll('.color-button');

const numRows = 10;
const numCols = 10;
let currentColor = '';
let paintHistory = [];
let currentStep = -1;

// Initialize the paint box grid
function initializePaintBox() {
    for (let i = 0; i < numRows; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < numCols; j++) {
            const cell = document.createElement('td');
            row.appendChild(cell);
        }
        paintBox.appendChild(row);
    }
}

// Set the color when a color button is clicked
function setColor(color) {
    currentColor = color;
    paintBox.style.cursor = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="30" height="30" fill="${color}"><circle cx="25" cy="25" r="20"/></svg>') 5 5, auto`;
}

// Handle paint box cell click event
function handlePaintBoxClick(event) {
    const cell = event.target;
    if (cell.tagName === 'TD' && currentColor !== '') {
        const rowIndex = cell.parentNode.rowIndex;
        const colIndex = cell.cellIndex;
        const step = { rowIndex, colIndex, color: cell.style.backgroundColor };
        paintCell(cell, rowIndex, colIndex);
        addToPaintHistory(step);
    }
}

// Paint the cell with the selected color
function paintCell(cell, rowIndex, colIndex) {
    cell.style.backgroundColor = currentColor;
}

// Add a paint step to the history
function addToPaintHistory(step) {
    if (currentStep !== paintHistory.length - 1) {
        paintHistory = paintHistory.slice(0, currentStep + 1);
    }
    paintHistory.push(step);
    currentStep++;
    updateUndoRedoButtons();
}

// Undo the last paint step
function undo() {
    if (currentStep >= 0) {
        const step = paintHistory[currentStep];
        const { rowIndex, colIndex, color } = step;
        const cell = paintBox.rows[rowIndex].cells[colIndex];
        cell.style.backgroundColor = color;
        currentStep--;
        updateUndoRedoButtons();
    }
}

// Redo the last undone paint step
function redo() {
    if (currentStep < paintHistory.length - 1) {
        currentStep++;
        const step = paintHistory[currentStep];
        const { rowIndex, colIndex, color } = step;
        const cell = paintBox.rows[rowIndex].cells[colIndex];
        cell.style.backgroundColor = currentColor;
        updateUndoRedoButtons();
    }
}

// Update the state of the undo and redo buttons
function updateUndoRedoButtons() {
    undoButton.disabled = currentStep < 0;
    redoButton.disabled = currentStep >= paintHistory.length - 1;
}

// Clear the paint box
function clearPaintBox() {
    const cells = paintBox.getElementsByTagName('td');
    for (let i = 0; i < cells.length; i++) {
        cells[i].style.backgroundColor = '';
    }
    paintHistory = [];
    currentStep = -1;
    updateUndoRedoButtons();
}

// Add event listeners to buttons and cells
function addEventListeners() {
    clearButton.addEventListener('click', clearPaintBox);
    undoButton.addEventListener('click', undo);
    redoButton.addEventListener('click', redo);
    colorButtons.forEach((button) => {
        button.addEventListener('click', () => setColor(button.dataset.color));

    });
    paintBox.addEventListener('click', handlePaintBoxClick);
    // paintBox.addEventListener('mouseover', handlePaintBoxClick);



}

// Initialize the paint app
function initializeApp() {
    initializePaintBox();
    addEventListeners();
}

// Initialize the app when the Start Game button is clicked
function toggleContent() {
    const gameContent = document.getElementById('gameContent');
    if (gameContent.style.display === 'none') {
        gameContent.style.display = 'block';
        initializeApp();
        // window.location.reload()
        startButton.textContent = 'Restart Game';
    } else {
        gameContent.style.display = 'none';
        clearPaintBox();
        startButton.textContent = 'Start Game';
    }
}