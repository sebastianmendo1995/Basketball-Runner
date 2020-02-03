
class Score {
    constructor(){
        this.score = 0;
        this.multiplier = [1, 3, 7];
        this.time = 0;
        this.timer();
    }

    setScore(database){
        const ref = database.ref('scores')
        ref.on('value', this.gotData, this.errData);
    }

    gotData(data){
        const scoreboard = document.getElementById('high-scores'); //selecting the ul that will contain all the high scores
        while (scoreboard.firstChild) {
            scoreboard.removeChild(scoreboard.firstChild)
        }
        const scores = data.val();
        let keys = Object.keys(data.val())
        for(let i = 0; i < keys.length; i++){
            let name = scores[keys[i]].name        
            let score = scores[keys[i]].score   
            const liScore = document.createElement('li');
            liScore.innerHTML = `${name} <span class="right-score">${score}</span>`;
            scoreboard.appendChild(liScore)
        }
    }

    errData(err){
        console.log('Firebase error!!!')
        console.log(err)
    }

    draw(ctx){
        const text = `Score: ${this.score}`
        ctx.font = '20px sans-serif';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 4;
        ctx.fillStyle = 'white';
        ctx.textAlign = 'left';
        ctx.strokeText(text, 640, 40);
        ctx.fillText(text, 640, 40);
        this.increaseScore();
    }

    increaseScore(){
        if(this.multiplier < 20){
            this.score += this.multiplier[0]
        } else if(this.multiplier<40){
            this.score += this.multiplier[1]
        } else {
            this.score += this.multiplier[2]
        }
    }
    
    checkHighScore(database) {
        const scores = document.querySelectorAll('.right-score');
        let arrScores = Array.prototype.slice.call(scores);
        if(arrScores[4].innerHTML < this.score){
            return true
        } else {
            return false
        }
    }
    

    timer(){
        setInterval( () => {
            this.time += 1
        }, 1000)
    }

    
}

module.exports = Score;