const closeMainMenu = () => {
    const element = document.getElementsByClassName('main-menu-section')[0];
    element.className = 'main-menu-section hidden'
}

const openMainMenu = () => {
    const element = document.getElementsByClassName('main-menu-section')[0];
    element.className = 'main-menu-section'
}

const Menu = {
    menuButtons(game){
        const musicButton = document.getElementById('music-button');
        const startButton = document.getElementById('start-button');
        const infoButton = document.getElementById('info-button');
        const closeInfo = document.getElementById('close-info');
        const selectSound = new Audio('../assets/sounds/select.mp3');
        selectSound.volume = 0.2;
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

        game.gameCanvas.addEventListener('keydown', (e) => {
            if (e.code === 'Escape' && game.gamePlaying) {
                e.preventDefault();
                backToMenu();
            }
        });

        infoButton.addEventListener('click', openInfo);
        closeInfo.addEventListener('click', openInfo);
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