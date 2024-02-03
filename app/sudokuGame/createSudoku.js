export const sudokuLib = {
  6: {
    blockRows: 2,
    blockCols: 3,
    emptySlots: 24, //1-23(25)
    emptyGrid: [
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    charsPool: [1, 2, 3, 4, 5, 6],
    allRowBorders: [2, 4, 6],
    allColBorders: [3, 6],
  },
  8: {
    blockRows: 2,
    blockCols: 4,
    emptySlots: 36, //1-36(38)
    emptyGrid: [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ],
    charsPool: [1, 2, 3, 4, 5, 6, 7, 8],
    allRowBorders: [2, 4, 6, 8],
    allColBorders: [4, 8],
  },
  9: {
    blockRows: 3,
    blockCols: 3,
    emptySlots: 44, //1-44(47)
    emptyGrid: [
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
    charsPool: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    allRowBorders: [3, 6, 9],
    allColBorders: [3, 6, 9],
  },
  10: {
    blockRows: 2,
    blockCols: 5,
    emptySlots: 48, //1-50(52)
    emptyGrid: [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
    charsPool: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    allRowBorders: [2, 4, 6, 8, 10],
    allColBorders: [5, 10],
  },
  // 12: {
  //   blockRows: 3,
  //   blockCols: 4,
  //   emptySlots: 66, //1-66(68)
  //   emptyGrid: [
  //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   ],
  //   charsPool: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  //   allRowBorders: [3, 6, 9, 12],
  //   allColBorders: [4, 8, 12],
  // },
  // '14': {
  //   blockRows: 2,
  //   blockCols: 7,
  //   emptySlots: 70, //1-70(74)
  // },
  // '15': {
  //   blockRows: 3,
  //   blockCols: 5,
  //   emptySlots: 80, //1-80(85)
  // },
  // '16': {
  //   blockRows: 4,
  //   blockCols: 4,
  //   emptySlots: 90, //1-90(99)
  // },
};

export const createSudoku = (cells, emptySlots) => {
  const generateSudokuGrid = () => {
    const fillSudokuGrid = (grid) => {
      const allRowsFilled = grid.every((_, rowIndex) => {
        let filledRow = false;
        let runsCount = 95;
        while (runsCount && !filledRow) {
          runsCount--;
          filledRow = fillRow(grid, rowIndex);
        }
        return filledRow && (grid[rowIndex] = filledRow);
      });
      return allRowsFilled && grid;
    };

    const fillRow = (grid, rowIndex) => {
      const newRow = grid[rowIndex].slice();

      for (let colIndex = 0; colIndex < cells; colIndex++) {
        if (!newRow[colIndex]) {
          const chars = allowedChars(grid, newRow, rowIndex, colIndex);

          if (chars) {
            newRow[colIndex] = chars[Math.floor(Math.random() * chars.length)];
          } else {
            return false;
          }
        }
      }
      return newRow;
    };

    const allowedChars = (grid, currRow, currRowIndex, currColIndex) => {
      const charsPool = sudokuLib[cells]['charsPool'];
      const currChars = currRow.slice();
      //column
      for (let i = 0; i < cells; i++) {
        if (i !== currRowIndex) {
          currChars.push(grid[i][currColIndex]);
        }
      }
      const startRow =
        Math.floor(currRowIndex / blockRowsLength) * blockRowsLength;
      const startCol =
        Math.floor(currColIndex / blockColsLength) * blockColsLength;
      //block
      for (let i = startRow; i < startRow + blockRowsLength; i++) {
        for (let j = startCol; j < startCol + blockColsLength; j++) {
          if (i === currRowIndex && j === currColIndex) {
            continue;
          }
          currChars.push(grid[i][j]);
        }
      }
      const res = charsPool.filter((v) => !currChars.includes(v));
      return res.length ? res : null;
    };

    const removeSlotsInFilledGrid = (grid) => {
      let runsCount = emptySlots;
      const newGrid = grid.map((v) => v.slice());

      while (runsCount > 0) {
        const randomRow = Math.floor(Math.random() * cells);
        const randomCol = Math.floor(Math.random() * cells);

        if (newGrid[randomRow][randomCol]) {
          runsCount--;
          newGrid[randomRow][randomCol] = 0;
        }
      }

      return newGrid;
    };

    let filledGrid;
    let runsCount = 3150;
    while (runsCount && !filledGrid) {
      runsCount--;
      filledGrid = fillSudokuGrid(emptyGrid.map((v) => v.slice()));
    }
    filledGrid || generateSudokuGrid();

    const testStrSudoku = filledGrid.join();
    const userGrid = removeSlotsInFilledGrid(filledGrid);
    let userGridTestFill;
    let searchSolutionCount = 200;

    while (searchSolutionCount > 0) {
      userGridTestFill = userGrid.map((v) => v.slice());
      fillSudokuGrid(userGridTestFill);
      if (testStrSudoku !== userGridTestFill.join()) {
        return false;
      }
      searchSolutionCount--;
    }
    return [filledGrid, userGrid];
  };

  const emptyGrid = sudokuLib[cells]['emptyGrid'];
  const blockRowsLength = sudokuLib[cells].blockRows;
  const blockColsLength = sudokuLib[cells].blockCols;
  if (!emptySlots || emptySlots > sudokuLib[cells].emptySlots) {
    emptySlots = sudokuLib[cells].emptySlots;
  }

  let res;
  let rerunsCount = 100000;
  while (rerunsCount && !res) {
    rerunsCount--;
    res = generateSudokuGrid();
  }
  return res || false;
};
