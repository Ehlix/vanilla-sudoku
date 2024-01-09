import './main.css';
import {insertSudokuElement} from "./sudokuGame/insertSudokuElement.js";

document.querySelector('#app').innerHTML = `
  <div id="main">
    <h1>Sudoku</h1>
    <div id="sudoku"></div>
  </div>
`;

const sudoku = document.querySelector('#sudoku');
insertSudokuElement(sudoku)