const fs = require('fs');

let coo = fs
  .readFileSync('input.txt', 'utf-8')
  .split('\n')
  .map((line, index) => {
    const c = line.split(', ');
    return {
      index,
      x: ~~c[0],
      y: ~~c[1],
    };
  });

function distance(point1, point2) {
  return Math.abs(point1.x - point2.x) + Math.abs(point1.y - point2.y);
}

function nearest(x, y) {
  const dist = coo.map((c) => ({
    c,
    d: distance(c, {x, y}),
  }));

  const minDist = Math.min(...dist.map((d) => d.d));
  return dist.filter((d) => d.d === minDist);
}

const maxX = Math.max(...coo.map((c) => c.x));
const maxY = Math.max(...coo.map((c) => c.y));

const infinite = new Set();
const map = {};

for (let x = -maxX; x <= 2 * maxX; x++) {
  map[x] = map[x] || {};
  for (let y = -maxY; y <= 2 * maxY; y++) {
    const n = nearest(x, y);
    map[x][y] = (n.length === 1) ? n[0].c.index : null;
    if (x === -maxX || x === 2 * maxX || y === - maxY || y === 2 * maxY) {
      infinite.add(map[x][y]);
    }
  }
}

const sizes = {};

Object.keys(map).forEach((x) => {
  Object.keys(map[x]).forEach((y) => {
    const id = map[x][y];
    if (!infinite.has(~~id)) {
      sizes[id]= ~~sizes[id] + 1;
    }
  });
});

const maxArea = Math.max(...Object.keys(sizes).map((s) => sizes[s]));

console.log(maxArea);
