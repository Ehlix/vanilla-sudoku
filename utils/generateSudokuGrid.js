export const sudokuLib = {
  '6': {
    blockRows: 2,
    blockCols: 3,
    emptySlots: 17,
  },
  '8': {
    blockRows: 2,
    blockCols: 4,
    emptySlots: 20,
  },
  '9': {
    blockRows: 3,
    blockCols: 3,
    emptySlots: 25,
  },
  '10': {
    blockRows: 2,
    blockCols: 5,
    emptySlots: 35,
  },
  '12': {
    blockRows: 3,
    blockCols: 4,
    emptySlots: 69,
  },
  '14': {
    blockRows: 2,
    blockCols: 7,
    emptySlots: 90,
  },
  '15': {
    blockRows: 3,
    blockCols: 5,
    emptySlots: 120,
  },
  '16': {
    blockRows: 4,
    blockCols: 4,
    emptySlots: 180,
  },
};

export const generateSudokuGrid = (cells = 9, emptySlots) => {
  const blockRowsLength = sudokuLib[cells].blockRows;
  const blockColsLength = sudokuLib[cells].blockCols;
  emptySlots = emptySlots || sudokuLib[cells].emptySlots;
  let filledGrid = false;
  let runsCount = 250;

  const fillSudokuGrid = (grid) => {
    const allRowsFilled = grid.every((row, rowIndex) => {
      let filledRow = false;
      let runsCount = 250;
      while (runsCount && !filledRow) {
        runsCount -= 1;
        filledRow = fillRow(grid, rowIndex);
      }
      return filledRow && (grid[rowIndex] = filledRow);
    });
    return allRowsFilled && grid;
  };

  const fillRow = (grid, rowIndex) => {
    const newRow = grid[rowIndex].slice();
    const rowIsFilled = newRow.every((v, colIndex) => {
      let chars = allowedChars(grid, newRow, rowIndex, colIndex);
      return v || chars && (newRow[colIndex] = chars.sort(() => Math.random() - 0.5)[0]);
    });
    return rowIsFilled && newRow;
  };

  const allowedChars = (grid, currRow, currRowIndex, currColIndex) => {
    const charsPool = Array.from({length: cells}, (_, i) => i + 1);
    const rowCoords = generateLibRowOrCol(blockRowsLength);
    const colCoords = generateLibRowOrCol(blockColsLength);

    const currCharsCol = grid.reduce((col, row, rowIndex) => {
      (rowIndex !== currRowIndex) && col.push(row[currColIndex]);
      return col;
    }, []);

    const currCharsBlock = [];

    for (let i = rowCoords[currRowIndex]; i < (rowCoords[currRowIndex] + blockRowsLength); i++) {
      for (let j = colCoords[currColIndex]; j < (colCoords[currColIndex] + blockColsLength); j++) {
        if ((i === currRowIndex) && (j === currColIndex)) {
          continue;
        }
        currCharsBlock.push(grid[i][j]);
      }
    }
    const currChars = Array.from(new Set(currRow.concat(currCharsCol, currCharsBlock)));
    const res = charsPool.filter((v) => !currChars.includes(v));
    return res.length > 0 ? res : false;
  };

  //Create array with block start coordinates by rows or columns
  const generateLibRowOrCol = (blockLength) => {
    let sum = 0;
    return Array.from({length: cells / blockLength}, (_, i) => {
      sum = i ? sum + blockLength : 0;
      return Array.from({length: blockLength}, () => sum);
    }).flatMap((v) => v);
  };

  const removeSlotsInFilledGrid = () => {
    const lib = Array.from({length: cells}, (_, i) => i);
    const userGrid = structuredClone(filledGrid);
    while (emptySlots > 0 && emptySlots < (cells ** 2)) {
      const randomRow = lib.sort(() => Math.random() - 0.5)[0];
      const randomCol = lib.sort(() => Math.random() - 0.5)[0];
      if (userGrid[randomRow][randomCol]) {
        emptySlots -= 1;
        userGrid[randomRow][randomCol] = 0;
      }
    }
    return userGrid;
  };

  while (runsCount && !filledGrid) {
    runsCount -= 1;
    filledGrid = fillSudokuGrid(Array.from({length: cells}, () => Array.from({length: cells}, () => 0)));
  }

  return removeSlotsInFilledGrid(filledGrid);
};