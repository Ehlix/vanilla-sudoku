import './sudokuGrid.css';
import { createSudoku, sudokuLib } from './createSudoku.js';

export const renderSudokuElement = (element) => {
  const renderGridSkeleton = () => {
    const allRowBorders = sudokuLib[cells]['allRowBorders'];
    const allColBorders = sudokuLib[cells]['allColBorders'];
    borderGrid2.innerHTML = '';
    borderGrid1.innerHTML = '';
    //loading
    const loading = document.createElement('div');
    loading.classList.add('loading');
    loading.innerHTML = '<span>Loading<span/>';
    const spin = document.createElement('div');
    spin.innerHTML = 'hourglass_empty';
    spin.classList.add('material-symbols-outlined', 'hourglass_empty');
    loading.append(spin);
    //grid
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
    const shadowGrid = document.createElement('div');
    shadowGrid.id = 'shadowGrid';
    borderGrid1.append(table)
    borderGrid2.append(shadowGrid, gameCompleted, borderGrid1);
  };
  const renderGrid = () => {
    // const emptySlots = newEmptySlots || sudokuLib[cells]['emptySlots'];
    const allRowBorders = sudokuLib[cells]['allRowBorders'];
    const allColBorders = sudokuLib[cells]['allColBorders'];
    borderGrid2.innerHTML = '';
    borderGrid1.innerHTML = '';
    //Game over
    if (wrongAnswerCount >= 3) {
      timer('stop');
      gameOverText = 'Game Over';
    }
    //Sudoku completed
    if (solutionGrid.join() === userGrid.join()) {
      timer('stop');
      gameOverText = 'Congratulations! You completed the Sudoku!';
      selectCol = null;
      selectRow = null;
    }
    //Sudoku grid element
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
          // if (rowIndex === 0 && colIndex === 0) {
          //   button.classList.add('cellTL');
          // } else if (rowIndex === 0 && colIndex === cells - 1) {
          //   button.classList.add('cellTR');
          // } else if (rowIndex === cells - 1 && colIndex === cells - 1) {
          //   button.classList.add('cellBR');
          // } else if (rowIndex === cells - 1 && colIndex === 0) {
          //   button.classList.add('cellBL');
          // }
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
      borderGrid2.append(gameCompleted);
    };
    const shadowGrid = document.createElement('div');
    shadowGrid.id = 'shadowGrid';
    gameOverText && gameOver();
    borderGrid1.append(table);
    borderGrid2.append(shadowGrid, borderGrid1);
  };
  //insert buttons group: chose numbers to insert
  const renderInsertNumberButtons = () => {
    insertNumbersBlock.innerHTML = '';
    if (gameOverText) {
      return;
    }
    let numberToInsert = sudokuLib[cells]['charsPool'];
    numberToInsert.forEach((v) => {
      const button = document.createElement('button');
      button.innerHTML = `<span>${v.toString()}</span>`;
      //insert number to grid
      button.addEventListener('click', (e) => {
        e.preventDefault();
        if (!button.classList.contains('active-button')) {
          button.classList.add('active-button');
          setTimeout(() => button.classList.remove('active-button'), 400);
        }
        if (gameOverText || selectRow === null || selectCol === null) {
          return;
        }
        userGrid[selectRow][selectCol] = Number(v);
        if (
          userGrid[selectRow][selectCol] !== solutionGrid[selectRow][selectCol]
        ) {
          wrongAnswerCount += 1;
        }
        renderWrongAnswers();
        renderGrid();
      });
      insertNumbersBlock.append(button);
    });
  };

  const renderWrongAnswers = () => {
    if (!wrongAnswerCount) {
      wrongAnswersElem.style.background = 'var(--mc-2)';
      wrongAnswersElem.style.color = 'var(--mc-6)';
      wrongAnswersElem.style.borderColor = 'var(--mc-6)';
    } else if (wrongAnswerCount === 1) {
      wrongAnswersElem.style.color = 'var(--erc-1)';
      wrongAnswersElem.style.borderColor = 'var(--erc-1)';
    } else if (wrongAnswerCount === 2) {
      wrongAnswersElem.style.color = 'var(--erc-2)';
      wrongAnswersElem.style.borderColor = 'var(--erc-2)';
    } else if (wrongAnswerCount > 2) {
      wrongAnswersElem.style.color = 'var(--erc-3)';
      wrongAnswersElem.style.borderColor = 'var(--erc-3)';
    }
    wrongAnswersElem.firstElementChild.textContent = `${wrongAnswerCount.toString()}/3`;
  };
  //Game shell
  element.innerHTML = `
  <div id="gameShell">
    <h1>Sudoku</h1>
    <div id="gameNavigation-block">
      <div class="timer-element">
        <span>00:00:0<span/>
      </div>
      <div id="newGame-block">
        <button class="newGame-button">
          <span>New Game<span/>
        </button>
        <button class="showModalBlock-button">
          <span><span/>
        </button>
      </div>
      <div id="selectCells-block" style="display: none;">
      </div>
      <div class="wrongAnswers-element">
        <span>0/3</span>
      </div>
    </div>
    <div id="borderGrid3">
      <div id="borderGrid2"></div>
    </div>
    <div id="insertNumbers-block"></div>
    </div>
  </div>
  `;
  //DOM elements
  const borderGrid1 = document.createElement('div');
  borderGrid1.id = 'borderGrid1';
  const borderGrid2 = element.querySelector('#borderGrid2');
  const insertNumbersBlock = element.querySelector('#insertNumbers-block');
  const newGameButton = element.querySelector('.newGame-button');
  const wrongAnswersElem = element.querySelector('.wrongAnswers-element');
  const selectCellsModalBlock = element.querySelector('#selectCells-block');
  const showModalBlockButton = element.querySelector('.showModalBlock-button');
  const timerElement = element.querySelector('.timer-element>span');
  //initial variables
  let cells = 9;
  let wrongAnswerCount = 0;
  let displayCells = cells;
  let selectRow = null;
  let selectCol = null;
  let solutionGrid, initialGrid, userGrid;
  let gameOverText;
  let intervalId;
  //new game button
  newGameButton.addEventListener('click', () => {
    if (!newGameButton.classList.contains('active-button')) {
      newGameButton.classList.add('active-button');
      setTimeout(() => newGameButton.classList.remove('active-button'), 400);
    }
    render();
  });
  //show modal block
  showModalBlockButton.innerHTML = `<span>${cells}x${cells}</span>`;
  showModalBlockButton.addEventListener('click', (e) => {
    e.preventDefault;
    if (!showModalBlockButton.classList.contains('active-button')) {
      showModalBlockButton.classList.add('active-button');
      setTimeout(
        () => showModalBlockButton.classList.remove('active-button'),
        400
      );
    }
    const displayStyle = selectCellsModalBlock.style;
    displayStyle.display === 'flex'
      ? (displayStyle.display = 'none')
      : (displayStyle.display = 'flex');
  });
  //modal block
  document.addEventListener('click', (e) => {
    const clickInsideButton = showModalBlockButton.contains(e.target);
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
      showModalBlockButton.innerHTML = `<span>${v}x${v}</span>`;
      selectCellsModalBlock.style.display = 'none';
    });
    selectCellsModalBlock.append(button);
  });
  //timer
  const timer = (mode) => {
    const timeStart = new Date();
    switch (mode) {
      case 'start': {
        clearInterval(intervalId);
        intervalId = null;
        timerElement.textContent = '00:00:00';
        intervalId = setInterval(() => {
          const timeNow = new Date();
          const timeDiff = new Date(timeNow - timeStart);
          const milliseconds = String(timeDiff.getMilliseconds())
            .padStart(2, '0')
            .substring(0, 1);
          const seconds = String(timeDiff.getSeconds()).padStart(2, '0');
          const minutes = String(timeDiff.getMinutes()).padStart(2, '0');
          timerElement.textContent = `${minutes}:${seconds}:${milliseconds}0`;
        }, 100);
        break;
      }
      case 'stop': {
        clearInterval(intervalId);
        intervalId = null;
        break;
      }
      case 'clear': {
        clearInterval(intervalId);
        intervalId = null;
        timerElement.textContent = '00:00:00';
        break;
      }
    }
  };
  //render
  const render = () => {
    timer('clear');
    cells = displayCells;
    wrongAnswerCount = 0;
    selectRow = null;
    selectCol = null;
    gameOverText = null;
    renderWrongAnswers();
    renderGridSkeleton();
    renderInsertNumberButtons();
    setTimeout(() => {
      [solutionGrid, initialGrid] = createSudoku(cells);
      userGrid = initialGrid.map((v) => v.slice());
      setTimeout(() => {
        renderGrid();
        timer('start');
      }, 500);
    }, 500);
  };
  render();
};
