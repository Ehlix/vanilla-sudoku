import './app.css';
import { renderSudokuElement } from './sudokuGame/renderSudokuElement.js';

document.querySelector('#root').innerHTML = `
  <div id="app">
    <div id="appNavigation-block">
      <button class="changeColorTheme-button"></button>
    </div>
    <div id="sudoku">123</div>
  </div>
`;

const changeColorThemeButton = document.querySelector(
  '.changeColorTheme-button'
);
const colorTheme = localStorage.getItem('HelixSudokuGameColorTheme');
if (colorTheme === 'dark') {
  document.documentElement.classList.add('dark');
  changeColorThemeButton.innerHTML = `
    <span class="material-symbols-outlined">
      clear_night
    </span>`;
} else {
  document.documentElement.classList.remove('dark');
  changeColorThemeButton.innerHTML = `
    <span class="material-symbols-outlined">
      wb_sunny
    </span>`;
}
changeColorThemeButton.addEventListener('click', () => {
  document.documentElement.classList.toggle('dark');
  if (document.documentElement.classList.contains('dark')) {
    changeColorThemeButton.innerHTML = `
    <span class="material-symbols-outlined moon">
      clear_night
    </span>`;
    localStorage.setItem('HelixSudokuGameColorTheme', 'dark');
  } else {
    changeColorThemeButton.innerHTML = `
    <span class="material-symbols-outlined sun">
      wb_sunny
    </span>`;
    localStorage.setItem('HelixSudokuGameColorTheme', 'light');
  }
});

const sudoku = document.querySelector('#sudoku');
renderSudokuElement(sudoku);
