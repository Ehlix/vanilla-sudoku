import './sudokuGrid.css';
import {createSudoku, sudokuLib} from "./createSudoku.js";


export const insertSudokuElement = (element, newCells, newEmptySlots) => {
  let gameShell = document.createElement('div');
  gameShell.id = 'gameShell';

  //loading
  const loading = document.createElement('div');
  loading.style.cssText = 'font-size:30px';
  loading.innerHTML = 'Loading';
  const spin = document.createElement('div');
  spin.innerHTML = 'progress_activity';
  spin.classList.add('material-symbols-outlined');
  element.innerHTML = '';
  gameShell.append(loading, spin);
  element.append(gameShell);

  //initial variables
  const cells = newCells || 9;
  const emptySlots = newEmptySlots || sudokuLib[cells]['emptySlots'];
  const blockRowLength = sudokuLib[cells]['blockRows'];
  const blockColLength = sudokuLib[cells]['blockCols'];
  let rowSum = 0;
  let colSum = 0;
  const allRowBorders = Array.from({length: cells / blockRowLength}, () => rowSum += blockRowLength);
  const allColBorders = Array.from({length: cells / blockColLength}, () => colSum += blockColLength);
  let solutionGrid, initialGrid, userGrid;
  let selectRow = null;
  let selectCol = null;
  let displayCells = cells;
  let wrongAnswerCount = 0;

  const renderGrid = () => {
    gameShell.innerHTML = '';

    if (wrongAnswerCount > 3) {
      const gameOver = document.createElement('div');
      gameOver.style.cssText = 'font-size:30px; margin-bottom:5px';
      gameOver.innerHTML = 'Game Over';
      element.innerHTML = '';
      let newGameButton = document.createElement('button');
      newGameButton.innerHTML = 'New game';
      newGameButton.addEventListener('click', () => {
        insertSudokuElement(element, displayCells);
      });

      gameShell.append(gameOver, newGameButton);
      element.append(gameShell);
      return;
    }

    //New game block
    const navigationBlock = document.createElement('div');
    navigationBlock.id = 'navigation-block';
    {
      //Buttons group: select cells length
      const buttonsInsertCellsModalBlock = document.createElement('div');
      buttonsInsertCellsModalBlock.id = 'insertCells-block';
      const buttonShowModalInsertCellsBlock = document.createElement('button');
      buttonShowModalInsertCellsBlock.id = 'buttonShowModalInsertCellsBlock';
      buttonShowModalInsertCellsBlock.innerHTML = displayCells + '/' + displayCells;
      buttonShowModalInsertCellsBlock.addEventListener('click', () => {
        const displayStyle = buttonsInsertCellsModalBlock.style;
        displayStyle.display === 'flex' ?
          (displayStyle.display = 'none')
          : (displayStyle.display = 'flex');
      });

      Object.keys(sudokuLib).forEach((v) => {
        const button = document.createElement('button');
        button.innerHTML = v + '/' + v;
        button.addEventListener('click', () => {
          displayCells = v;
          renderGrid();
        });
        buttonsInsertCellsModalBlock.append(button);
      });

      //New game button
      const newGameButton = document.createElement('button');
      newGameButton.innerHTML = 'New game';
      newGameButton.addEventListener('click', () => {
        insertSudokuElement(element, displayCells);
      });
      const newGameBlock = document.createElement('div');
      newGameBlock.id = 'newGame-block';
      newGameBlock.append(newGameButton, buttonShowModalInsertCellsBlock);


      navigationBlock.append(newGameBlock, buttonsInsertCellsModalBlock);
    }

    //Wrong answers count
    const wrongAnswersElem = document.createElement('div');
    wrongAnswersElem.id = 'wrongAnswersElem';
    if (wrongAnswerCount === 1) {
      wrongAnswersElem.style.background = '#fca7a7';
    } else if (wrongAnswerCount === 2) {
      wrongAnswersElem.style.background = '#f58585';
    } else if (wrongAnswerCount > 2) {
      wrongAnswersElem.style.background = '#f66d6d';
    }
    wrongAnswersElem.innerHTML = wrongAnswerCount.toString() + '/3';
    navigationBlock.append(wrongAnswersElem);

    //Reset button
    const resetButton = document.createElement('button');
    resetButton.id = 'resetButton';
    resetButton.innerHTML = 'Reset';
    resetButton.addEventListener('click', () => {

    });
    navigationBlock.prepend(resetButton);

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
        if (allColBorders.includes((colIndex))) {
          td.classList.add('gridColBorder');
        }
        if (v) {
          td.innerHTML = v.toString();
        } else {
          const button = document.createElement('button');
          button.innerHTML = userGrid[rowIndex][colIndex] || ' ';
          button.classList.add('cellButton');
          if (rowIndex === 0 && colIndex === 0) {
            button.classList.add('cellLTR');
          } else if (rowIndex === 0 && (colIndex === (cells - 1))) {
            button.classList.add('cellRTR');
          } else if ((rowIndex === ((cells - 1))) && (colIndex === (cells - 1))) {
            button.classList.add('cellRBR');
          } else if ((rowIndex === (cells - 1)) && colIndex === 0) {
            button.classList.add('cellLBR');
          }
          if (selectRow === rowIndex && selectCol === colIndex) {
            button.classList.add('selectCellButton');
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

    //Buttons group: chose numbers to insert
    const buttonsInsertNumberBlock = document.createElement('div');
    buttonsInsertNumberBlock.id = 'insertNumberButtons-block';
    const numberToInsert = Array.from({length: cells}, (_, i) => i + 1);
    numberToInsert.forEach((v) => {
      const button = document.createElement('button');
      button.innerHTML = v.toString();

      //insert number to grid
      button.addEventListener('click', (e) => {
        e.preventDefault();
        if (selectRow === null || selectCol === null) {
          return;
        }
        userGrid[selectRow][selectCol] = Number(v);
        if (userGrid[selectRow][selectCol] !== solutionGrid[selectRow][selectCol]) {
          wrongAnswerCount += 1;
        }
        renderGrid();
      });
      buttonsInsertNumberBlock.append(button);
    });
    borderGrid.append(table);
    gameShell.append(navigationBlock, borderGrid, buttonsInsertNumberBlock);
    element.innerHTML = '';
    element.append(gameShell);
  };


  setTimeout(() => {
    [solutionGrid, initialGrid] = createSudoku(newCells, emptySlots);
    userGrid = structuredClone(initialGrid);
    console.log(initialGrid);
    console.log(solutionGrid);
    setTimeout(() => renderGrid(), 500);
  }, 500);
};
