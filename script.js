document.addEventListener('DOMContentLoaded', function () {

  const generateWallButton = document.getElementById('generate-wall');
  const generateAdditionalWallButton = document.getElementById('generate-additional-wall');
  const wallContainer = document.getElementById('wall');
  const additionalWallContainer = document.getElementById('additional-wall');

  generateWallButton.addEventListener('click', function () {

      const wall = [];
      const width = document.getElementById('width').value;
      const height = document.getElementById('height').value;
      const colorCount = document.getElementById('color-count').value;

      generateWall(width, height, colorCount, wall, wallContainer, invertCrosswiseColors);
  });

  generateAdditionalWallButton.addEventListener('click', function () {

    const additionalWall = [];
    const width = document.getElementById('width').value;
    const height = document.getElementById('height').value;
    const colorCount = document.getElementById('color-count').value;

    generateWall(width, height, colorCount, additionalWall, additionalWallContainer, invertDiagonalColors);
  });

  function generateWall(width, height, colorCount, array, container, inverter) {

      container.innerHTML = '';

      for (let i = 0; i < height; i++) {
          const row = [];
          const rowElement = document.createElement('div');
          rowElement.classList.add('row');

          for (let j = 0; j < width; j++) {
              const brick = document.createElement('div');
              brick.classList.add('brick');
              const randomColor = generateRandomColor(colorCount);
              brick.style.backgroundColor = randomColor;
              brick.addEventListener('click', function () {
                  inverter(i, j, array);
              });

              row.push(brick);
              rowElement.appendChild(brick);
          }

          array.push(row);
          container.appendChild(rowElement);
      }
  }

  function getRandomColor() {

      const red = Math.floor(Math.random() * 255);
      const green = Math.floor(Math.random() * 255);
      const blue = Math.floor(Math.random() * 255);
      const randomColor = `rgb(${red}, ${green}, ${blue})`;

      return randomColor;
  }

  function generateRandomColor(colorCount) {

    const colors = [];

    for (let i = 0; i < colorCount; i++) {
      const randomColor = getRandomColor();
      colors.push(randomColor);
    }
    const randomColor = colors[Math.floor(Math.random() * colorCount)];

    return randomColor;
  }

  function invertCrosswiseColors(row, column, array, color) {
    
      for (let i = 0; i < array[row].length; i++) {
          array[row][i].style.backgroundColor = invertColor(array[row][i].style.backgroundColor);   
      }

      for (let i = 0; i < array.length; i++) {
        if (i !== row) {
          array[i][column].style.backgroundColor = invertColor(array[i][column].style.backgroundColor);
        }
      }
  }

  function invertDiagonalColors(row, column, array, color) {

    for (let i = 0; i < array.length; i++) {
      const j = column + (i - row);
      if (j >= 0 && j < array[i].length) {
          array[i][j].style.backgroundColor = invertColor(array[i][j].style.backgroundColor);
      }
    }

    for (let i = 0; i < array.length; i++) {
      const j = column - (i - row);
      if (j >= 0 && j < array[i].length && i !== row) {
          array[i][j].style.backgroundColor = invertColor(array[i][j].style.backgroundColor);
      }
    }
  }

  function invertColor(color) {
   
    const parts = color.match(/\d+/g);
    const [r, g, b] = parts;

    const oppositeR = 255 - parseInt(r, 10);
    const oppositeG = 255 - parseInt(g, 10);
    const oppositeB = 255 - parseInt(b, 10);

    const oppositeColor = `rgb(${oppositeR}, ${oppositeG}, ${oppositeB})`;

    return oppositeColor;
  }
});

