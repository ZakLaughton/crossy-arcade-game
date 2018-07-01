class Character {
  constructor() {
    this.sprite = 'images/';
    this.x = 0;
    this.y = 0;
  }

  update(dt){
    return null;
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
  }

  update(dt){
    super.update();
  }

  handleInput(input) {
    switch (input) {
      case 'up':
        this.y = this.y - 1;
        break;
      case 'right':
        this.x = this.x + 1;
        break;
      case 'down':
        this.y = this.y + 1;
        break;
      case 'left':
        this.x = this.x - 1;
        break;
    }
  }
}

class Bug extends Character {
  constructor(x, y) {
    super();
    this.sprite += 'enemy-bug.png';
    this.x = x;
    this.y = y;
  }

  update(dt){
    super.update();
  }
}

const player = new Player();
const allEnemies = [new Bug(4, 3)]

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
