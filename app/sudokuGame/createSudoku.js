export const sudokuLib = {
  '6': {
    blockRows: 2,
    blockCols: 3,
    emptySlots: 20, //1-20(24)
  },
  '8': {
    blockRows: 2,
    blockCols: 4,
    emptySlots: 30, //1-30(34)
  },
  '9': {
    blockRows: 3,
    blockCols: 3,
    emptySlots: 40, //1-40(44)
  },
  '10': {
    blockRows: 2,
    blockCols: 5,
    emptySlots: 49, //1-45(49)
  },
  '12': {
    blockRows: 3,
    blockCols: 4,
    emptySlots: 60, //1-60(64)
  },
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
  const generateSudokuGrid = (cells = 9, emptySlots) => {
    const blockRowsLength = sudokuLib[cells].blockRows;
    const blockColsLength = sudokuLib[cells].blockCols;
    if (!emptySlots || emptySlots > sudokuLib[cells].emptySlots) {
      emptySlots = sudokuLib[cells].emptySlots;
    }
    let filledGrid = false;

    const fillSudokuGrid = (grid) => {
      const allRowsFilled = grid.every((_, rowIndex) => {
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

      // const currCharsCol = grid.reduce((col, row, rowIndex) => {
      //   (rowIndex !== currRowIndex) && col.push(row[currColIndex]);
      //   return col;
      // }, []);
      const currCharsCol = grid
        .filter((_, rowIndex) => rowIndex !== currRowIndex)
        .map(row => row[currColIndex]);

      const currCharsBlock = [];

      for (let i = rowCoords[currRowIndex]; i < rowCoords[currRowIndex] + blockRowsLength; i++) {
        for (let j = colCoords[currColIndex]; j < colCoords[currColIndex] + blockColsLength; j++) {
          if (i === currRowIndex && j === currColIndex) {
            continue;
          }
          currCharsBlock.push(grid[i][j]);
        }
      }
      // const currChars = Array.from(new Set(currRow.concat(currCharsCol, currCharsBlock)));
      const currChars = Array.from(new Set([...currRow, ...currCharsCol, ...currCharsBlock]));
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

    let runsCount = 200;
    while (runsCount && !filledGrid) {
      runsCount -= 1;
      filledGrid = fillSudokuGrid(Array.from({length: cells}, () => Array.from({length: cells}, () => 0)));
    }

    const userGrid = removeSlotsInFilledGrid(filledGrid);
    const testStrSudoku = filledGrid.flatMap((v) => v).join('');

    let searchSolutionCount = 250;
    while (searchSolutionCount > 0) {
      const filledUserGrid = structuredClone(userGrid);
      fillSudokuGrid(filledUserGrid);
      if (testStrSudoku !== filledUserGrid.flatMap((v) => v).join('')) {
        return generateSudokuGrid(cells, emptySlots);
      }
      searchSolutionCount -= 1;
    }
    return [filledGrid, userGrid];
  };
  return generateSudokuGrid(cells, emptySlots)
};