/**
 * Represents a character in the game.
 * @param {string} sprite - Location of image file for bug.
 * @param {number} x - x coordinate of character.
 * @param {number} y - y coordinate of character.
 */
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

/**
 * Represents the main player controlled by the user.
 * @param {number} lives - Number of lives left in the game.
 * @param {number} points - Number of times player has reached the water.
 */
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

  /**
   * Move player based on key pressed.
   */
  handleInput(input) {
    switch (input) {
      case 'up':
        if (this.y > 0) { this.y = this.y - 1; }
        break;
      case 'right':
        if (this.x < 4) { this.x = this.x + 1; }
        break;
      case 'down':
        if (this.y < 5) { this.y = this.y + 1; }
        break;
      case 'left':
        if (this.x > 0) { this.x = this.x - 1; }
        break;
    }
  }

  /**
   * If the player hits a bug, reset the player and lose a life.
   */
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
    });
  }

  /**
   * Resets player, points, lives, and enemy count.
   */
  newGame() {
    this.lives = 3;
    this.points = 0;
    this.updateScore();
    const hearts = document.querySelectorAll('.lives li');
    for (let heart of hearts) {
      heart.querySelector('i').classList = "fa fa-heart";
    }
    for (let i = 3; i < allEnemies.length; i++) {
      delete allEnemies[i];
    }
    this.reset();
  }

  /**
   * Writes the player.score to the page.
   */
  updateScore() {
    document.getElementsByClassName('score')[0].innerHTML = this.points;
  }

  /**
   * Add a point and reset the player if they reach the water.
   */
  checkWin() {
    if (this.y === 0) {
      this.points += 1;
      // Add a bug every 5 moves
      if (this.points % 5 === 0) {
        allEnemies.push(new Bug(1, 'left', true));
      }
      this.updateScore();
      this.reset();
    }
  }

  /**
   * Sends the player back to start.
   */
  reset() {
    this.x = 2;
    this.y = 5;
  }
}

/**
 * Represents a bug enemy.
 * @param {boolean} isRandomized - Switch to randomize direction and position on each reset.
 * @param {string} direction - Direction of travel (left or right).
 */
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
      this.reset();
    } else {
      this.x += (dt * this.speed);
    }
  }

  /**
   * Restarts the bug on its path.
   */
  reset(){
    // For randomized bugs, pick new direction/location.
    if (this.isRandomized) {
      let directions = ['left', 'right'];
      this.direction = directions[Math.floor(Math.random() * 2)];
      this.sprite = `images/enemy-bug-${this.direction}.png`;
      this.startingX = this.direction === 'right' ? -1 : 5;
      this.x = this.startingX;
      this.y = Math.floor(Math.random() * 3) + 1;
    }
    let newSpeed = (Math.random() * 2 + 1);
    if (this.direction === 'left') { newSpeed *= -1; }
    this.speed = newSpeed;
    this.x = this.startingX;
  }
}

// Initialize player and enemies
const player = new Player();
const allEnemies = [new Bug(1, 'right'), new Bug(2, 'left'), new Bug(3, 'right')];

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
