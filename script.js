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
              const randomColor = getRandomColor(colorCount);
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

  function getRandomColor(colorCount) {

      const colors = ['red', 'green', 'blue', 'yellow', 'purple', 'orange', 'black', 'white', 'aqua', 'lightblue'];
      return colors[Math.floor(Math.random() * colorCount)];
  }

  function invertCrosswiseColors(row, column, array) {
    
      for (let i = 0; i < array[row].length; i++) {
          array[row][i].style.backgroundColor = invertColor(array[row][i].style.backgroundColor);   
      }

      for (let i = 0; i < array.length; i++) {
        if (i !== row) {
          array[i][column].style.backgroundColor = invertColor(array[i][column].style.backgroundColor);
        }
      }
  }

  function invertDiagonalColors(row, column, array) {

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

    return 'white';

    // This is for the case if the task requires to change each color to its opposite color.

      // if (color === 'black') {
      //   return 'white';
      // } else if (color === 'red') {
      //   return 'aqua';
      // } else if (color === 'green') {
      //   return 'purple';
      // } else if (color === 'lightblue') {
      //   return 'orange';
      // } else if (color === 'yellow') {
      //   return 'blue';
      // } else if (color === 'blue') {
      //   return 'yellow';
      // } else if (color === 'orange') {
      //   return 'lightblue';
      // } else if (color === 'purple') {
      //   return 'green';
      // } else if (color === 'aqua') {
      //   return 'red';
      // } else if (color === 'white') {
      //   return 'black';
      // }
  }
});

