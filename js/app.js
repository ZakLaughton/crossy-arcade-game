class Character {
  constructor() {
    this.sprite = 'images/';
    this.x = 2;
    this.y = 5;
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y = 83);
  }
}

class Player extends Character {
  constructor() {
    super();
    this.sprite += 'char-cat-girl.png';
  }
}

class Bug extends Character {
  constructor(x, y) {
    super();
    this.sprite += 'enemy-bug.png';
    this.x = x;
    this.y = y;
  }
}

const player = new Player();
const allEnemies = [new Bug(0, 0)]

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
