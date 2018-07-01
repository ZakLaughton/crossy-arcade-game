class Character {
  constructor() {
    this.sprite = 'images/';
    this.x = 3;
    this.y = 7;
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
