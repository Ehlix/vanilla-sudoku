import './app.css';
import {insertSudokuElement} from "./sudokuGame/insertSudokuElement.js";

document.querySelector('#root').innerHTML = `
  <div id="app">
    <h1>Sudoku</h1>
    <div id="sudoku"></div>
  </div>
`;

const sudoku = document.querySelector('#sudoku');
insertSudokuElement(sudoku)
