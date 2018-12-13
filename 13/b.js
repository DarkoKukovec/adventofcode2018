const fs = require('fs');

const map = fs
  .readFileSync('input.txt', 'utf-8')
  .split('\n')
  .map((line) => line.split(''));

let carts = [];
const mapOnly = [];

const directions = {
  LEFT: [0, -1],
  RIGHT: [0, 1],
  UP: [-1, 0],
  DOWN: [1, 0],
}

const turns = {
  LEFT: 0,
  STRAIGHT: 1,
  RIGHT: 2
}

for (let x = 0; x < map.length; x++) {
  mapOnly[x] = [];

  for (let y = 0; y < map[x].length; y++) {
    if (map[x][y] === '<') {
      carts.push({
        x,
        y,
        direction: directions.LEFT,
        nextTurn: turns.LEFT,
      });
      mapOnly[x][y] = '-';
    } else if (map[x][y] === '>') {
      carts.push({
        x,
        y,
        direction: directions.RIGHT,
        nextTurn: turns.LEFT,
      });
      mapOnly[x][y] = '-';
    } else if (map[x][y] === '^') {
      carts.push({
        x,
        y,
        direction: directions.UP,
        nextTurn: turns.LEFT,
      });
      mapOnly[x][y] = '|';
    } else if (map[x][y] === 'v') {
      carts.push({
        x,
        y,
        direction: directions.DOWN,
        nextTurn: turns.LEFT,
      });
      mapOnly[x][y] = '|';
    } else {
      mapOnly[x][y] = map[x][y];
    }
  }
}

let iteration = 0;
while(true) {
  const forRemoval = [];
  carts.sort((a, b) => a.x - b.x);
  carts.sort((a, b) => a.y - b.y);
  for (let i = 0; i < carts.length; i++) {
    const cart = carts[i];
    const x = cart.x += cart.direction[0];
    const y = cart.y += cart.direction[1];
    const crash = carts.find((c) => c.x === cart.x && c.y === cart.y && c !== cart);
    if (crash) {
      forRemoval.push(cart, crash);
    }
    if (mapOnly[x][y] === '\\') {
      if (cart.direction === directions.UP) cart.direction = directions.LEFT;
      else if (cart.direction === directions.DOWN) cart.direction = directions.RIGHT;
      else if (cart.direction === directions.LEFT) cart.direction = directions.UP;
      else if (cart.direction === directions.RIGHT) cart.direction = directions.DOWN;
    } else if (mapOnly[x][y] === '/') {
      if (cart.direction === directions.UP) cart.direction = directions.RIGHT;
      else if (cart.direction === directions.DOWN) cart.direction = directions.LEFT;
      else if (cart.direction === directions.LEFT) cart.direction = directions.DOWN;
      else if (cart.direction === directions.RIGHT) cart.direction = directions.UP;
    } else if (mapOnly[x][y] === '+') {
      if (cart.nextTurn === turns.LEFT) {
        if (cart.direction === directions.UP) cart.direction = directions.LEFT;
        else if (cart.direction === directions.DOWN) cart.direction = directions.RIGHT;
        else if (cart.direction === directions.LEFT) cart.direction = directions.DOWN;
        else if (cart.direction === directions.RIGHT) cart.direction = directions.UP;
        cart.nextTurn = turns.STRAIGHT;
      } else if (cart.nextTurn === turns.RIGHT) {
        if (cart.direction === directions.UP) cart.direction = directions.RIGHT;
        else if (cart.direction === directions.DOWN) cart.direction = directions.LEFT;
        else if (cart.direction === directions.LEFT) cart.direction = directions.UP;
        else if (cart.direction === directions.RIGHT) cart.direction = directions.DOWN;
        cart.nextTurn = turns.LEFT;
      } else {
        cart.nextTurn = turns.RIGHT;
      }
    }
  }
  iteration++;
  carts = carts.filter((c) => forRemoval.indexOf(c) === -1);

  if (carts.length === 1) {
    console.log(carts[0].y, carts[0].x);
    process.exit(0);
  }
}
