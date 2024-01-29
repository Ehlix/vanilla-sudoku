import './sudokuGrid.css';
import { createSudoku, sudokuLib } from './createSudoku.js';

export const insertSudokuElement = (element, newCells, newEmptySlots) => {
  let outerGameShell = document.createElement('div');
  outerGameShell.id = 'outerGameShell';
  let innerGameShell = document.createElement('div');
  innerGameShell.id = 'innerGameShell';
  const navigationBlock = document.createElement('div');
  navigationBlock.id = 'navigation-block';
  outerGameShell.append(navigationBlock);

  //loading
  const loading = document.createElement('div');
  loading.style.cssText = 'font-size:30px';
  loading.innerHTML = 'Loading';
  const spin = document.createElement('div');
  spin.innerHTML = 'hourglass_empty';
  spin.classList.add('material-symbols-outlined');
  element.innerHTML = '';
  innerGameShell.append(loading, spin);
  outerGameShell.append(innerGameShell);
  element.append(outerGameShell);

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

  const renderNavigation = () => {
    navigationBlock.innerHTML = '';
    //Buttons group: select cells length
    const buttonsInsertCellsModalBlock = document.createElement('div');
    buttonsInsertCellsModalBlock.id = 'insertCells-block';
    const buttonShowModalInsertCellsBlock = document.createElement('button');
    buttonShowModalInsertCellsBlock.id = 'buttonShowModalInsertCellsBlock';
    buttonShowModalInsertCellsBlock.textContent =
      displayCells + '/' + displayCells;
    buttonShowModalInsertCellsBlock.addEventListener('click', () => {
      const displayStyle = buttonsInsertCellsModalBlock.style;
      displayStyle.display === 'flex'
        ? (displayStyle.display = 'none')
        : (displayStyle.display = 'flex');
    });

    Object.keys(sudokuLib).forEach((v) => {
      const button = document.createElement('button');
      button.textContent = v + '/' + v;
      button.addEventListener('click', () => {
        displayCells = v;
        renderNavigation();
      });
      buttonsInsertCellsModalBlock.append(button);
    });

    //New game button
    const newGameButton = document.createElement('button');
    newGameButton.innerHTML = '<span>New Game</span>';
    newGameButton.addEventListener('click', () => {
      insertSudokuElement(element, displayCells);
    });
    const newGameBlock = document.createElement('div');
    newGameBlock.id = 'newGame-block';
    newGameBlock.append(newGameButton, buttonShowModalInsertCellsBlock);

    navigationBlock.append(newGameBlock, buttonsInsertCellsModalBlock);

    //Wrong answers count
    const wrongAnswersElem = document.createElement('div');
    wrongAnswersElem.id = 'wrongAnswersElem';
    if (wrongAnswerCount === 1) {
      wrongAnswersElem.style.background = 'var(--erc-1)';
    } else if (wrongAnswerCount === 2) {
      wrongAnswersElem.style.background = 'var(--erc-2)';
    } else if (wrongAnswerCount > 2) {
      wrongAnswersElem.style.background = 'var(--erc-3)';
    }
    wrongAnswersElem.textContent = wrongAnswerCount.toString() + '/3';
    navigationBlock.append(wrongAnswersElem);

    //Reset button
    const resetButton = document.createElement('button');
    if (wrongAnswerCount > 2) {
      resetButton.disabled = true;
    }
    resetButton.id = 'resetButton';
    resetButton.innerHTML = '<span>Reset</span>';
    resetButton.addEventListener('click', () => {
      userGrid = initialGrid.map((v) => v.slice());
      wrongAnswerCount = 0;
      renderGrid();
      renderNavigation();
    });
    navigationBlock.prepend(resetButton);
  };

  const renderGrid = () => {
    innerGameShell.innerHTML = '';

    //Game over
    if (wrongAnswerCount >= 3) {
      numberToInsert = null;
      gameOverText = 'Game Over';
    }

    //Sudoku completed
    if (solutionGrid.join() === userGrid.join()) {
      numberToInsert = null;
      gameOverText = 'Congratulations! You completed the Sudoku!';
      selectCol = null;
      selectRow = null;
    }

    //Buttons group: chose numbers to insert
    const renderInsertNumberButtons = () => {
      const buttonsInsertNumberBlock = document.createElement('div');
      buttonsInsertNumberBlock.id = 'insertNumberButtons-block';
      numberToInsert.forEach((v) => {
        const button = document.createElement('button');
        button.innerHTML = `<span>${v.toString()}</span>`;

        //insert number to grid
        button.addEventListener('click', (e) => {
          e.preventDefault();
          if (selectRow === null || selectCol === null) {
            return;
          }
          userGrid[selectRow][selectCol] = Number(v);
          if (
            userGrid[selectRow][selectCol] !==
            solutionGrid[selectRow][selectCol]
          ) {
            wrongAnswerCount += 1;
          }
          renderNavigation();
          renderGrid();
        });
        buttonsInsertNumberBlock.append(button);
        innerGameShell.append(buttonsInsertNumberBlock);
      });
    };

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

    const renderGameOver = () => {
      const gameCompleted = document.createElement('div');
      gameCompleted.classList.add('gameOver');
      const text = document.createElement('span');
      text.textContent = gameOverText;
      gameCompleted.append(text);
      border2grid.append(gameCompleted);
    };

    const shadowGrid = document.createElement('div');
    shadowGrid.id = 'shadowGrid';
    const border2grid = document.createElement('div');
    border2grid.id = 'border2grid';
    numberToInsert ? renderInsertNumberButtons() : renderGameOver();
    border2grid.append(shadowGrid);
    border2grid.append(table);
    borderGrid.append(border2grid);
    innerGameShell.prepend(borderGrid);
    element.innerHTML = '';
    outerGameShell.append(innerGameShell);
    element.append(outerGameShell);
  };

  renderNavigation();
  setTimeout(() => {
    [solutionGrid, initialGrid] = createSudoku(cells, emptySlots);
    userGrid = initialGrid.map((v) => v.slice());
    console.log(initialGrid);
    console.log(solutionGrid);
    setTimeout(() => renderGrid(), 500);
  }, 500);
};
