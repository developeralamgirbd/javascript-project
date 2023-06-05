function toggleContent() {
  const gameContent = document.getElementById('gameContent');
  const startButton = document.getElementById('startButton');

  createTable(12, 12);

  if (gameContent.style.display === 'none') {
    gameContent.style.display = 'block';
    startButton.style.display = 'none';
  } else {
    gameContent.style.display = 'none';
  }

  function capture() {
    const captureElement = document.querySelector('#paintBox');
    html2canvas(captureElement)
      .then((canvas) => {
        canvas.style.display = 'none';
        document.body.appendChild(canvas);
        return canvas;
      })
      .then((canvas) => {
        const image = canvas.toDataURL('image/png');
        const a = document.createElement('a');
        a.setAttribute('download', 'my-image.png');
        a.setAttribute('href', image);
        a.click();
        canvas.remove();
      });
  }

  function clearDrawingBoard() {
    const cells = document.getElementsByClassName('cell');

    for (let i = 0; i < cells.length; i++) {
      cells[i].style.backgroundColor = '#fff';
    }
  }

  function undo() {
    const cells = document.getElementsByClassName('cell');

    for (let i = 0; i < cells.length; i++) {
      const cell = cells[i];
      const { prevColor } = cell.dataset;

      if (prevColor) {
        const color = prevColor.split(',').filter((c) => c);

        cell.dataset.redoColor = cell.style.backgroundColor;
        cell.style.backgroundColor = color.pop();
        if (color.length === 0) {
          cell.dataset.prevColor = 'white';
        } else {
          cell.dataset.prevColor = color.join(',');
        }
      }
    }
  }

  function redo() {
    const cells = document.getElementsByClassName('cell');

    for (let i = 0; i < cells.length; i++) {
      const cell = cells[i];
      const { redoColor } = cell.dataset;

      cell.dataset.prevColor = cell.style.backgroundColor;

      if (redoColor) {
        cell.style.backgroundColor = redoColor;
        delete cell.dataset.redoColor;
      }
    }
  }

  const captureButton = document.querySelector('#download_image');
  const undoButton = document.getElementById('undoButton');
  const clearButton = document.getElementById('clearButton');
  const redoButton = document.getElementById('redoButton');

  clearButton.addEventListener('click', clearDrawingBoard);
  undoButton.addEventListener('click', undo);
  redoButton.addEventListener('click', redo);
  captureButton.addEventListener('click', capture);
}

let currentColor = '';

function setColor(color) {
  currentColor = color;
}

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

        // this.dataset.prevColor =  cell.style.backgroundColor || 'white';
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






// Initialize variables
/*
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
    createTable(12, 12)
};

// Function to handle click event on paint box cells
const paintCell = (cell) => {
    if (selectedColor) {
        const cellId = cell.getAttribute("id");
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
*/

/*

// Initialize variables
// Initialize variables
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
};

// Function to handle click event on paint box cells
const paintCell = (cell) => {
  if (selectedColor) {
    const cellId = cell.getAttribute("id");
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
      cell.classList.add('id');

      cell.dataset.prevColor = 'white';

      cell.addEventListener('mousedown', function () {
        isMouseDown = true;
        paintCell(this); // Call the paintCell function passing the current cell
      });

      cell.addEventListener('mouseover', function () {
        if (isMouseDown) {
          paintCell(this); // Call the paintCell function passing the current cell
        }
      });

      document.addEventListener('mouseup', function () {
        isMouseDown = false;
      });

      row.appendChild(cell);
    }
    table.appendChild(row);
  }
}
*/





