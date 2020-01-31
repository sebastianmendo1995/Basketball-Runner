const Obstacle = require('./obstacle');

const DEFENDER_HITBOX_OFFSET = {
    posX: 20,
    posY: 20,
    sizeX: 100,
    sizeY: 100,
};

class Defender extends Obstacle{
    constructor(options){
        options.hitboxOffset = DEFENDER_HITBOX_OFFSET;
        super(options);
        this.sprite = options.sprite;
        this.defender = new Image();
        this.defender.src = '../assets/images/defender-img2.png';
        this.width = 200
        this.height = 148;
    }

    draw(ctx){
        ctx.drawImage(
            this.defender,
            0,
            0,
            this.width,
            this.height,
            this.position[0],
            this.position[1],
            this.width,
            this.height
        );
    }
}

module.exports = Defender;