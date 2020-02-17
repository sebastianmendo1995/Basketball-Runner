const closeMainMenu = () => {
    const element = document.getElementsByClassName('main-menu-section')[0];
    element.className = 'main-menu-section hidden'
    const gameOver = document.getElementsByClassName('game-over')[0]
    gameOver.className = 'game-over'
}

const openMainMenu = () => {
    const element = document.getElementsByClassName('main-menu-section')[0];
    element.className = 'main-menu-section'
    const gameOver = document.getElementsByClassName('game-over')[0]
    gameOver.className = 'game-over close'
}

const Menu = {
    menuButtons(game){
        const musicButton = document.getElementById('music-button');
        const startButton = document.getElementById('start-button');
        const infoButton = document.getElementById('info-button');
        const closeInfo = document.getElementById('close-info');
        const selectSound = new Audio('../assets/sounds/select.mp3');
        const gameMuteButton = document.getElementById('mute-button');
        const gameMenuButton = document.getElementById('menu-button');
        const submitNewScore = document.getElementById('submit-highscore');

        const openInfo = (e) => {
            const infoArticle = document.getElementsByClassName('info-article')[0];
            if (infoArticle.className === 'info-article hidden') {
                infoArticle.className = 'info-article';
                playSelectSound();
                game.unpause();
            } else {
                infoArticle.className = 'info-article hidden';
                playSelectSound();
                game.pause();
            }
        }
        
        const playSelectSound = () => {
            selectSound.pause();
            selectSound.currentTime = 0;
            selectSound.play();
        }

        const backToMenu = () => {
            game.gameOver = true;
            game.gamePlaying = false;
            game.backgroundMusic.pause();
            game.backgroundMusic.currentTime = 0;
            playSelectSound();
            game.openMenu();
            document.getElementById('game-over-menu').className += ' close';
            openMainMenu();
            game.ctx.clearRect(0, 0, 800, 400);
            document.getElementById('game-canvas').focus();
        };

        const muteToggle = () => {
            if (game.toggleMute()) {
                musicButton.className = 'music-button toggled';
                gameMuteButton.className = 'mute-button toggled'
            } else {
                musicButton.className = 'music-button';
                gameMuteButton.className = 'mute-button'
            }
            playSelectSound();
            document.getElementById('game-canvas').focus();
        }

        const submitNewHighScore = () => {
            let ref = game.database.ref('scores');
            let newName = document.getElementById('name-input').value

            let data = {
                name: newName,
                score: game.score.score
            }
            ref.push(data)
            
        }

        game.gameCanvas.addEventListener('keydown', (e) => {
            if (e.code === 'Escape' && game.gamePlaying) {
                e.preventDefault();
                backToMenu();
            }
        });

        infoButton.addEventListener('click', openInfo);
        closeInfo.addEventListener('click', openInfo);
        musicButton.addEventListener('click', muteToggle);
        gameMenuButton.addEventListener('click', backToMenu);
        gameMuteButton.addEventListener('click', muteToggle);
        submitNewScore.addEventListener('click', submitNewHighScore);

        startButton.addEventListener('click', (e) => {
            closeMainMenu();
            playSelectSound();
            setTimeout(() => game.start(), 200);
        });
    },
    closeMainMenu: closeMainMenu,
    openMainMenu: openMainMenu,

}

module.exports = Menu;