import _ from 'lodash';
const Game = require('./game');

document.addEventListener('DOMContentLoaded', ()=> {
  const gameCanvas = document.getElementById('game-canvas');
  const canvasContext = gameCanvas.getContext('2d');

  const foregroundCanvas = document.getElementById('foreground-canvas');
  const foregroundCanvasContext = foregroundCanvas.getContext('2d');

  const game = new Game(
    canvasContext,
    gameCanvas,
    foregroundCanvasContext
  );

  game.openMenu();

});