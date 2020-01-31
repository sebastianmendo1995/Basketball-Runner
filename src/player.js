const PLAYER_HITBOX_OFFSET = {
    posX: 3,
    posY: 9,
    sizeX: 110,
    sizeY: 150,
};

class Player {
    constructor(options) {
        this.position = options.position;
        this.character = new Image();
        this.character.src = "../assets/images/baller-sprites2.png";
        this.currentFrame = 0;
        this.cols = 7;
        this.refreshFrame = 0;

        this.gameOver = false;
        this.jumpSound = new Audio('../assets/sounds/jump.mp3');
        this.jumpSound.volume = 0.3;
        this.jumping = false;
        this.jumpCount = 0;
    }

    jump() {
        const gravity = 0.40;
        const initialSpeed = 12;

        if(this.jumping) {
            if(this.jumpCount === 0 || !this.onGround()){
                this.position[1] -= initialSpeed - gravity * this.jumpCount;
                this.jumpCount ++;
            } else {
                this.position[1] = 210;
                this.jumpCount = 0;
                this.jumping = false;
            }
        }
    }

    onGround() {
        return this.position[0] === 100 && this.position[1] >= 210;
    }

    toggleJump() {
        this.jumping = true;
        if(this.onGround()){
            this.jumpSound.play();
        }
    }

    draw(ctx, srcX, srcY) {
        ctx.clearRect(0, 0, 800, 400);
        ctx.drawImage(
            this.character,
            srcX,
            srcY,
            this.width,
            this.height,
            this.position[0],
            this.position[1],
            this.width,
            this.height
        )
    }

    update(ctx) {
        this.jump();
        let x;
        let y;
        let srcX;
        let srcY;
        if(this.jumping){
            x = 50;
            y = 500
            this.width = 150;
            this.height = 250;
            this.cols = 14
        } else {
            x = 379;
            y = 39;
            this.width = 150;
            this.height = 200;
            this.cols = 7;
        }

        this.refreshFrame += 1;

        if(this.refreshFrame >= 4){
            this.currentFrame = ++this.currentFrame % this.cols;
            this.refreshFrame = 0;
        }
        srcX = (this.currentFrame * this.width) + x;
        srcY = y;
        this.draw(ctx, srcX, srcY);
    }

    collidedWith(obstacle) {
        const playerHitbox = this.hitbox();
        const obstacleHitbox = obstacle.hitbox();
        return !(
            playerHitbox.maxX < obstacleHitbox.minX ||
            playerHitbox.minX > obstacleHitbox.maxX ||
            playerHitbox.maxY < obstacleHitbox.minY || 
            playerHitbox.minY > obstacleHitbox.maxY
        );
    }

    hitbox() {
        return {
            minX: this.position[0] + PLAYER_HITBOX_OFFSET.posX,
            maxX: this.position[0] + PLAYER_HITBOX_OFFSET.posX + PLAYER_HITBOX_OFFSET.sizeX,
            minY: this.position[1] + PLAYER_HITBOX_OFFSET.posY,
            maxY: this.position[1] + PLAYER_HITBOX_OFFSET.posY + PLAYER_HITBOX_OFFSET.sizeY,
        };
    }
}

module.exports = Player;
