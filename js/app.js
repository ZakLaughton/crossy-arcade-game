class Character {
  constructor() {
    this.sprite = 'images/';
    this.x = 0;
    this.y = 0;
  }

  update(dt){
    this.isOutOfBoundsUp = this.y < -1;
    this.isOutOfBoundsRight = this.x > 5;
    this.isOutOfBoundsDown = this.y > 5;
    this.isOutOfBoundsLeft = this.x < -1;
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x * 101, (this.y * 83) - 10);
  }
}

class Player extends Character {
  constructor() {
    super();
    this.sprite += 'char-cat-girl.png';
    this.x = 2;
    this.y = 5;
    this.lives = 3;
    this.points = 0;
  }

  update(dt){
    super.update();
  }

  handleInput(input) {
    switch (input) {
      case 'up':
        if (this.y > 0) { this.y = this.y - 1 }
        break;
      case 'right':
        if (this.x < 4) { this.x = this.x + 1 }
        break;
      case 'down':
        if (this.y < 5) { this.y = this.y + 1 }
        break;
      case 'left':
        if (this.x > 0) { this.x = this.x - 1 }
        break;
    }
  }

  checkCollisions() {
    const lives = document.querySelectorAll('.lives li');
    allEnemies.forEach(function(enemy) {
      if (enemy.y === player.y) {
        if (enemy.x - 0.5 < player.x && enemy.x + 0.5 > player.x ) {
          player.lives -= 1;
          if (player.lives === 2) {
            lives[2].querySelector('i').classList = "fa fa-heart-o";
            player.reset();
          } else if (player.lives === 1) {
            lives[1].querySelector('i').classList = "fa fa-heart-o";
            player.reset();
          } else if (player.lives === 0) {
            player.newGame();
          }
        }
      }
    })
  }

  newGame() {
    this.lives = 3;
    this.points = 0;
    this.updateScore();
    const hearts = document.querySelectorAll('.lives li');
    for (let heart of hearts) {
      heart.querySelector('i').classList = "fa fa-heart";
    }
    this.reset();
  }

  updateScore() {
    document.getElementsByClassName('score')[0].innerHTML = this.points;
  }

  checkWin() {
    if (this.y === 0) {
      this.points += 1;
      this.updateScore();
      this.reset();
    }
  }

  reset() {
    this.x = 2;
    this.y = 5;
  }
}

class Bug extends Character {
  constructor(y, direction, isRandomized = false) {
    super();
    this.isRandomized = isRandomized;
    this.direction = direction;
    this.sprite += `enemy-bug-${this.direction}.png`;
    this.startingX = this.direction === 'right' ? -1 : 5;
    this.x = this.startingX;
    this.y = y;
    this.speed = (Math.random() * 2 + 1);
  }

  update(dt){
    super.update();
    if (this.isOutOfBoundsRight || this.isOutOfBoundsLeft) {
      this.reset()
    } else {
      this.x += (dt * this.speed);
    }
  }

  reset(){
    if (this.isRandomized) {
      let directions = ['left', 'right'];
      this.direction = directions[Math.floor(Math.random() * 2)]
      this.sprite = `images/enemy-bug-${this.direction}.png`;
      this.startingX = this.direction === 'right' ? -1 : 5;
      this.x = this.startingX;
      this.y = Math.floor(Math.random() * 3) + 1;
    }
    let newSpeed = (Math.random() * 2 + 1);
    if (this.direction === 'left') { newSpeed *= -1};
    this.speed = newSpeed;
    this.x = this.startingX;
  }
}

const player = new Player();
const allEnemies = [new Bug(1, 'right'), new Bug(2, 'left'), new Bug(3, 'right'), new Bug(1, 'right', true)]

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
