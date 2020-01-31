const Defender = require('./defender');
const Player = require('./player');
const drawGameOver = require('./game_over');
const Menu = require('./menu');
const Background = require('./background');

class Game {
    constructor(ctx, gameCanvas, foregroundCtx) {
        this.ctx = ctx;
        this.gameCanvas = gameCanvas;
        this.player = new Player({ position: [100, 310] });
        this.obstacleInterval = 0;
        this.spawnRate = 60;
        this.nextSpawn = this.spawnRate + Math.floor(Math.random()*25)
        this.obstacles = [];
        this.muteMusic = false;

        this.jump = this.jump.bind(this);
        this.draw = this.draw.bind(this);
        this.resetGame = this.resetGame.bind(this);

        this.setSounds();
        this.createBackground(foregroundCtx);
        this.setButtonListeners();

        Menu.menuButtons(this);
    }

    openMenu() {
        if (!this.muteMusic) {
            this.menuMusic.volume = 0.7;
            this.menuMusic.play();
        }
    }

    toggleMute() {
        if (this.muteMusic) {
            this.muteMusic = false;
            if (this.gamePlaying) this.backgroundMusic.play();
            else this.menuMusic.play();
        } else {
            this.muteMusic = true;
            this.backgroundMusic.pause();
            this.menuMusic.pause();
        }
        return this.muteMusic;
    }

    setSounds() {
        this.backgroundMusic = new Audio('../assets/sounds/game-music.mp3');
        this.backgroundMusic.loop = true;
        this.menuMusic = new Audio('../assets/sounds/menu-music.mp3');
        this.menuMusic.loop = true;
        this.gameOverSound = new Audio('../assets/sounds/game-over.mp3');
    }

    jump(event) {
        if (event.code === 'Space' && this.gamePlaying) {
            event.preventDefault();
            if (!this.gameOver)
                this.player.toggleJump();
        }
    }
    
    setButtonListeners() {
        this.gameCanvas.addEventListener('keydown', this.jump);
        this.gameCanvas.addEventListener('keydown', this.resetGame);
    }

    pause() {
        this.paused = true;
    }

    unpause() {
        this.paused = false;
        if (this.gamePlaying) {
            this.draw();
        }
    }

    createObstacles() {
        if (this.obstacleInterval === 0 && this.obstacles.length < this.maxObstacles) {
            if (Math.random() < 0.8 && this.defenders < this.maxDefenders - 1) {
                this.nextSpawn = 8;
                this.defenders += 1;
                this.obstacles.push(this.generateObstacle(true));
            } else {
                this.defenders = 0;
                this.obstacles.push(this.generateObstacle());
            }
            this.obstacleInterval += 1;
        } else if (this.obstacleInterval === this.nextSpawn) {
            this.obstacleInterval = 0;
            this.nextSpawn = this.spawnRate + Math.floor(Math.random() * 25)
        } else {
            this.obstacleInterval += 1;
        }
    }

    generateObstacle(defender = false) {
        let obstacle = null;
        obstacle = new Defender({ startPos: [820, 249], speed: 7.8 });
        return obstacle;
    }

    createBackground(foregroundCtx) {
        const foregroundImage = new Image();
        foregroundImage.src = '../assets/images/court.jpeg';
        this.foreground = new Background(foregroundCtx, foregroundImage, 370, 720, 6);
    }

    start() {
        this.gameOverSound.pause();
        this.gameOverSound.currentTime = 0
        document.getElementById('game-canvas').focus();
        this.menuMusic.pause();
        this.menuMusic.currentTime = 0;
        if (!this.muteMusic) this.backgroundMusic.play();
        this.gamePlaying = true;
        this.gameOver = false;
        this.canReset = false;
        this.paused = false;
        this.defenders = 0;
        this.player.position = [100, 210];
        this.obstacles = [];
        this.maxObstacles = 3;
        this.draw();
    }

    stopGame() {
        this.backgroundMusic.pause();
        this.gameOverSound.currentTime = 0;
        this.gameOverSound.volume = 0.8;
        this.gameOverSound.play();
        setTimeout(() => {
            drawGameOver(this.ctx);
        }, 700);
        setTimeout(() => {
            this.canReset = true;
        }, 1400);
        this.gameOver = true;
    }

    resetGame(e) {
        if (e.key === 's' && this.canReset && !this.paused) {
            e.preventDefault();
            this.start();
        }
    }

    draw() {
        if (!this.gameOver && !this.paused) {
            requestAnimationFrame(this.draw);
            this.player.update(this.ctx);
            this.createObstacles();
            let deleteIdx = null;
            this.obstacles.forEach((obstacle, idx) => {
                obstacle.step(this.ctx);
                if (obstacle.outOfBounds()) {
                    deleteIdx = idx;
                }
                if (this.player.collidedWith(obstacle)) {
                    this.stopGame();
                }
            });
            if (deleteIdx !== null) {
                this.obstacles.splice(deleteIdx, 1);
            }
            this.foreground.draw();
        }
    }
}

module.exports = Game;