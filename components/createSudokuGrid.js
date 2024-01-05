import {generateSudokuGrid, sudokuLib} from "../utils/generateSudokuGrid.js";


export const createSudokuGrid = (element, cells, emptySlots) => {
  let grid = generateSudokuGrid(cells, emptySlots);
  const blockRowLength = sudokuLib[cells || 9]['blockRows'];
  const blockColLength = sudokuLib[cells || 9]['blockCols'];
  let rowSum = 0;
  let colSum = 0;
  const allRowBorders = Array.from({length: cells || 9 / blockRowLength}, () => rowSum += blockRowLength);
  const allColBorders = Array.from({length: cells || 9 / blockColLength}, () => colSum += blockColLength);

  const findCelButton = (curRow, curCol) => {
    return document.querySelector(`tr:nth-child(${selectRow})>td:nth-child(${selectCol}) > button`);
  };


  //Sudoku grid element
  const table = document.createElement('table');
  let selectRow;
  let selectCol;
  grid.forEach((row, rowIndex) => {
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
        button.innerHTML = ' ';
        button.classList.add('cellButton');
        button.addEventListener('click', () => {
          button.classList.remove('qq');
          if (selectRow && selectCol) {
            const prevCell = findCelButton(selectRow, selectCol);
            prevCell.classList.remove('selectCellButton');
          }
          if (rowIndex === 0 && colIndex === 0) {
            button.classList.add('cellLTR');
          }
          if (rowIndex === 0 && (colIndex === ((cells - 1) || 8))) {
            button.classList.add('cellRTR');
          }
          if ((rowIndex === ((cells - 1) || 8)) && (colIndex === ((cells - 1) || 8))) {
            button.classList.add('cellRBR');
          }
          if ((rowIndex === ((cells - 1) || 8)) && colIndex === 0) {
            button.classList.add('cellLBR');
          }
          selectRow = rowIndex + 1;
          selectCol = colIndex + 1;
          button.classList.add('selectCellButton');
        });
        td.appendChild(button);
      }
      tr.appendChild(td);
    });
    table.appendChild(tr);
  });

  //
  const newGameButton = document.createElement('button');
  newGameButton.innerHTML = 'New game';
  newGameButton.addEventListener('click', () => {
    element.innerHTML = '';
    createSudokuGrid(element, cells, emptySlots);
  });

  //Buttons group: chose numbers to insert
  const buttonsDiv = document.createElement('div');
  buttonsDiv.id = 'insertButtons-block';
  const numberToInsert = Array.from({length: cells || 9}, (_, i) => i + 1);
  numberToInsert.forEach((v) => {
    const button = document.createElement('button');
    button.innerHTML = v.toString();
    button.addEventListener('click', () => {
      if (!selectRow || !selectCol) {
        return;
      }
      const currCel = findCelButton(selectRow, selectCol);
      currCel.innerHTML = v.toString();
      grid[selectRow - 1][selectCol - 1] = Number(v);
    });
    buttonsDiv.appendChild(button);
  });


  element.appendChild(newGameButton);
  element.appendChild(table);
  element.appendChild(buttonsDiv);
};
