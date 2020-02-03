import _ from 'lodash';
const Game = require('./game');


document.addEventListener('DOMContentLoaded', ()=> {
  const gameCanvas = document.getElementById('game-canvas');
  const canvasContext = gameCanvas.getContext('2d');

  const foregroundCanvas = document.getElementById('foreground-canvas');
  const foregroundCanvasContext = foregroundCanvas.getContext('2d');

  var firebaseConfig = {
    apiKey: "AIzaSyBa0Ax2QQvHr-ATihGli8IP9UJ0M67Eh_k",
    authDomain: "basketball-runner.firebaseapp.com",
    databaseURL: "https://basketball-runner.firebaseio.com",
    projectId: "basketball-runner",
    storageBucket: "basketball-runner.appspot.com",
    messagingSenderId: "215548747807",
    appId: "1:215548747807:web:705d17258f4a02bf8f352a",
    measurementId: "G-RLMEW16HV2"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // firebase.analytics();

  let database = firebase.database();
  // let ref = database.ref('scores');
  // let data = {
  //   name: "Abel",
  //   score: 10500
  // }

  // ref.push(data)

  const game = new Game(
    database,
    canvasContext,
    gameCanvas,
    foregroundCanvasContext
  );

  game.openMenu();

});