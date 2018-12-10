const fs = require('fs');

function getMap(coos, time) {
  const map = [];
  coos.forEach((coo) => {
    const x = coo.pos.x + time * coo.vel.x;
    const y = coo.pos.y + time * coo.vel.y;
    map[x] = map[x] || [];
    map[x][y] = true;
  })
  return map;
}

function getMinMax(map) {
  const minX = Math.min(...Object.keys(map));
  const maxX = Math.max(...Object.keys(map));
  const minY = Math.min(...map.map((line) => Math.min(...Object.keys(line).map(Number))).filter(Boolean));
  const maxY = Math.max(...map.map((line) => Math.max(...Object.keys(line).map(Number))).filter(Boolean))

  return {minX, maxX, minY, maxY};
}

function outputMap(map) {
  const {minX, maxX, minY, maxY} = getMinMax(map);

  for (let j = minY; j <= maxY; j++) {
    let line = '';

    for (let i = minX; i <= maxX; i++) {
      line += (map[i] && map[i][j]) ? '#' : '.';
    }

    console.log(line);
  }
}

const input = fs
  .readFileSync('input.txt', 'utf-8')
  .split('\n')
  .map((line) => {
    const data = line.match(/<\s*(-?\d+),\s*(-?\d+)>\s*velocity=<\s*(-?\d+),\s*(-?\d+)>/);
    return {
      pos: {
        x: ~~data[1],
        y: ~~data[2],
      },
      vel: {
        x: ~~data[3],
        y: ~~data[4],
      },
    };
  });

const minXCoo = input.reduce((min, curr) => (curr.pos.x < min.pos.x) ? curr : min);
let time = Math.floor(Math.abs(minXCoo.pos.x) / Math.abs(minXCoo.vel.x));

while(true) {
  const map = getMap(input, time);
  const {minX, maxX, minY, maxY} = getMinMax(map);
  if (minX >=0 && minY >=0 && (maxY - minY) < 15) {
    console.log(time);
    outputMap(map);
    break;
  }
  time++;
}
