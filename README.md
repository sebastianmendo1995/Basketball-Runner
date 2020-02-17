# Basketball Runner

## Preview
[[ https://github.com/sebastianmendo1995/Basketball-Runner/blob/master/assets/images/game.png ]]

You can test this project [here](https://sebastianmendo1995.github.io/Basketball-Runner/dist/)

## Setup

Run the following commands:

```
npm install
npm start
```

## Technologies

* Node.js
* NPM
* Babel
* Webpack
* HTML5 Canvas
* Firebase


## Dev Notes

### High Scores

For this project we make used of Firebase that will help us to store the highest scores ever register.

```
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
```

To submit a high score we used the following code: 

```
    const submitNewHighScore = () => {
    let ref = game.database.ref('scores');
    let newName = document.getElementById('name-input').value

    let data = {
        name: newName,
        score: game.score.score
    }
    ref.push(data)

    }
```


### Difficulty Parrallax Background

The Parallax background effect was created by having multiple canvas layers.

```
  const gameCanvas = document.getElementById('game-canvas');
  const canvasContext = gameCanvas.getContext('2d');

  const foregroundCanvas = document.getElementById('foreground-canvas');
  const foregroundCanvasContext = foregroundCanvas.getContext('2d');
```

```
    createBackground(foregroundCtx) {
        const foregroundImage = new Image();
        foregroundImage.src = '../assets/images/court.jpeg';
        this.foreground = new Background(foregroundCtx, foregroundImage, 370, 720, 6);
    }
```