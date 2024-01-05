import './main.css';
import {createSudokuGrid} from "../components/createSudokuGrid.js";

document.querySelector('#app').innerHTML = `
  <div id="main">
    <h1>Sudoku</h1>
    <div id="game-border">
    </div>
  </div>
`;

createSudokuGrid(document.querySelector('#game-border'));