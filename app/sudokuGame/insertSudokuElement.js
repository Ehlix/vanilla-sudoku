import './sudokuGrid.css';
import { createSudoku, sudokuLib } from './createSudoku.js';

export const insertSudokuElement = (element, newCells, newEmptySlots) => {
  //initial variables
  const cells = newCells || 9;
  const emptySlots = newEmptySlots || sudokuLib[cells]['emptySlots'];
  const allRowBorders = sudokuLib[cells]['allRowBorders'];
  const allColBorders = sudokuLib[cells]['allColBorders'];
  let numberToInsert = sudokuLib[cells]['charsPool'];
  let solutionGrid, initialGrid, userGrid;
  let selectRow = null;
  let selectCol = null;
  let displayCells = cells;
  let wrongAnswerCount = 0;
  let gameOverText;
  //DOM
  const outerGameShell = document.createElement('div');
  outerGameShell.id = 'outerGameShell';
  const innerGameShell = document.createElement('div');
  innerGameShell.id = 'innerGameShell';
  const navigationBlock = document.createElement('div');
  navigationBlock.id = 'navigation-block';
  const buttonsInsertNumberBlock = document.createElement('div');
  buttonsInsertNumberBlock.id = 'insertNumberButtons-block';
  //Buttons group: select cells length
  const selectCellsModalBlock = document.createElement('div');
  selectCellsModalBlock.id = 'selectCells-block';
  const showModalButton = document.createElement('button');
  showModalButton.id = 'showModalButton';
  showModalButton.innerHTML = `<span>${
    displayCells + '/' + displayCells
  }<span/>`;
  showModalButton.addEventListener('click', (e) => {
    e.preventDefault;
    if (!showModalButton.classList.contains('activeButton')) {
      showModalButton.classList.add('activeButton');
      setTimeout(() => showModalButton.classList.remove('activeButton'), 300);
    }
    const displayStyle = selectCellsModalBlock.style;
    displayStyle.display === 'flex'
      ? (displayStyle.display = 'none')
      : (displayStyle.display = 'flex');
  });
  document.addEventListener('click', (e) => {
    const clickInsideButton = showModalButton.contains(e.target);
    const clickInsideModal = selectCellsModalBlock.contains(e.target);
    if (!clickInsideButton && !clickInsideModal) {
      selectCellsModalBlock.style.display = 'none';
    }
  });
  Object.keys(sudokuLib).forEach((v) => {
    const button = document.createElement('button');
    button.textContent = v + '/' + v;
    button.addEventListener('click', () => {
      displayCells = v;
      showModalButton.innerHTML = `<span>${
        displayCells + '/' + displayCells
      }<span/>`;
      selectCellsModalBlock.style.display = 'none';
    });
    selectCellsModalBlock.append(button);
  });

  //New game button
  const newGameButton = document.createElement('button');
  newGameButton.innerHTML = '<span>New Game</span>';
  newGameButton.addEventListener('click', () => {
    if (!newGameButton.classList.contains('activeButton')) {
      newGameButton.classList.add('activeButton');
      setTimeout(() => insertSudokuElement(element, displayCells), 200);
    }
  });
  const newGameBlock = document.createElement('div');
  newGameBlock.id = 'newGame-block';
  //Wrong answers elem
  const wrongAnswersElem = document.createElement('div');
  wrongAnswersElem.id = 'wrongAnswersElem';
  //Reset button
  const resetButton = document.createElement('button');
  resetButton.id = 'resetButton';
  resetButton.innerHTML = '<span>Reset</span>';
  resetButton.addEventListener('click', (e) => {
    e.preventDefault;
    if (!resetButton.classList.contains('activeButton')) {
      resetButton.classList.add('activeButton');
      setTimeout(() => resetButton.classList.remove('activeButton'), 300);
    }
    if (gameOverText) {
      return;
    }
    userGrid = initialGrid.map((v) => v.slice());
    wrongAnswerCount = 0;
    renderGrid();
    changeWrongAnswers();
  });
  //
  const changeWrongAnswers = () => {
    if (wrongAnswerCount === 0) {
      wrongAnswersElem.style.background = 'var(--mc-6)';
    } else if (wrongAnswerCount === 1) {
      wrongAnswersElem.style.background = 'var(--erc-1)';
    } else if (wrongAnswerCount === 2) {
      wrongAnswersElem.style.background = 'var(--erc-2)';
    } else if (wrongAnswerCount > 2) {
      wrongAnswersElem.style.background = 'var(--erc-3)';
    }
    wrongAnswersElem.textContent = wrongAnswerCount.toString() + '/3';
  };
  //Render navigation
  newGameBlock.append(newGameButton, showModalButton);
  navigationBlock.append(newGameBlock, selectCellsModalBlock);
  navigationBlock.append(wrongAnswersElem);
  navigationBlock.prepend(resetButton);
  changeWrongAnswers();
  //Render buttons group: chose numbers to insert
  const renderInsertNumberButtons = () => {
    buttonsInsertNumberBlock.innerHTML = '';
    if (!numberToInsert) {
      return;
    }
    numberToInsert.forEach((v) => {
      const button = document.createElement('button');
      button.innerHTML = `<span>${v.toString()}</span>`;
      //insert number to grid
      button.addEventListener('click', (e) => {
        e.preventDefault();
        if (!button.classList.contains('activeButton')) {
          button.classList.add('activeButton');
          setTimeout(() => button.classList.remove('activeButton'), 300);
        }
        if (selectRow === null || selectCol === null) {
          return;
        }
        userGrid[selectRow][selectCol] = Number(v);
        if (
          userGrid[selectRow][selectCol] !== solutionGrid[selectRow][selectCol]
        ) {
          wrongAnswerCount += 1;
        }
        changeWrongAnswers();
        renderGrid();
      });
      buttonsInsertNumberBlock.append(button);
      outerGameShell.append(buttonsInsertNumberBlock);
    });
  };

  const renderGridSkeleton = () => {
    innerGameShell.innerHTML = '';
    //loading
    const loading = document.createElement('div');
    loading.classList.add('loading');
    loading.innerHTML = '<span>Loading<span/>';
    const spin = document.createElement('div');
    spin.innerHTML = 'hourglass_empty';
    spin.classList.add('material-symbols-outlined');
    loading.append(spin);
    //
    const borderGrid = document.createElement('div');
    borderGrid.id = 'borderGrid';
    const table = document.createElement('table');
    const grid = sudokuLib[cells]['emptyGrid'];
    grid.forEach((row, rowIndex) => {
      const tr = document.createElement('tr');
      if (allRowBorders.includes(rowIndex)) {
        tr.classList.add('gridRowBorder');
      }
      row.forEach((_, colIndex) => {
        const td = document.createElement('td');
        if (allColBorders.includes(colIndex)) {
          td.classList.add('gridColBorder');
        }
        td.textContent = '';
        tr.appendChild(td);
      });
      table.appendChild(tr);
    });
    const gameCompleted = document.createElement('div');
    gameCompleted.classList.add('gameOver');
    gameCompleted.append(loading);
    const border2grid = document.createElement('div');
    border2grid.id = 'border2grid';
    const shadowGrid = document.createElement('div');
    shadowGrid.id = 'shadowGrid';
    !numberToInsert && gameOver();
    border2grid.append(gameCompleted, shadowGrid, table);
    borderGrid.append(border2grid);
    innerGameShell.append(borderGrid);
  };

  const renderGrid = () => {
    innerGameShell.innerHTML = '';
    //Game over
    if (wrongAnswerCount >= 3) {
      numberToInsert = null;
      gameOverText = 'Game Over';
      renderInsertNumberButtons();
    }
    //Sudoku completed
    if (solutionGrid.join() === userGrid.join()) {
      numberToInsert = null;
      gameOverText = 'Congratulations! You completed the Sudoku!';
      selectCol = null;
      selectRow = null;
      renderInsertNumberButtons();
    }
    //Sudoku grid element
    const borderGrid = document.createElement('div');
    borderGrid.id = 'borderGrid';
    const table = document.createElement('table');

    initialGrid.forEach((row, rowIndex) => {
      const tr = document.createElement('tr');
      if (allRowBorders.includes(rowIndex)) {
        tr.classList.add('gridRowBorder');
      }
      row.forEach((v, colIndex) => {
        const td = document.createElement('td');
        if (allColBorders.includes(colIndex)) {
          td.classList.add('gridColBorder');
        }
        if (v) {
          td.textContent = v.toString();
        } else {
          const button = document.createElement('button');
          button.textContent = userGrid[rowIndex][colIndex] || '';
          button.classList.add('cellButton');
          if (rowIndex === 0 && colIndex === 0) {
            button.classList.add('cellTL');
          } else if (rowIndex === 0 && colIndex === cells - 1) {
            button.classList.add('cellTR');
          } else if (rowIndex === cells - 1 && colIndex === cells - 1) {
            button.classList.add('cellBR');
          } else if (rowIndex === cells - 1 && colIndex === 0) {
            button.classList.add('cellBL');
          }
          if (selectRow === rowIndex && selectCol === colIndex) {
            button.classList.add('selectCellButton');
          }
          if (
            userGrid[rowIndex][colIndex] &&
            userGrid[rowIndex][colIndex] !== solutionGrid[rowIndex][colIndex]
          ) {
            button.classList.add('errorCellButton');
          } else {
            button.classList.remove('errorCellButton');
          }
          button.addEventListener('click', (e) => {
            e.preventDefault();
            selectRow = rowIndex;
            selectCol = colIndex;
            renderGrid();
          });
          td.appendChild(button);
        }
        tr.appendChild(td);
      });
      table.appendChild(tr);
    });

    const gameOver = () => {
      const gameCompleted = document.createElement('div');
      gameCompleted.classList.add('gameOver');
      gameCompleted.innerHTML = `<span>${gameOverText}</span>`;
      border2grid.append(gameCompleted);
    };
    const border2grid = document.createElement('div');
    border2grid.id = 'border2grid';
    const shadowGrid = document.createElement('div');
    shadowGrid.id = 'shadowGrid';
    !numberToInsert && gameOver();
    border2grid.append(shadowGrid, table);
    borderGrid.append(border2grid);
    innerGameShell.append(borderGrid);
  };
  element.innerHTML = '';
  element.append(outerGameShell);
  outerGameShell.append(navigationBlock, innerGameShell);
  renderGridSkeleton();
  renderInsertNumberButtons();
  setTimeout(() => {
    [solutionGrid, initialGrid] = createSudoku(cells, emptySlots);
    userGrid = initialGrid.map((v) => v.slice());
    console.log(initialGrid);
    console.log(solutionGrid);
    3;
    setTimeout(() => {
      renderGrid(false);
      renderInsertNumberButtons();
    }, 500);
  }, 500);
};
