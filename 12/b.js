const fs = require('fs');

let state = '##.###.......#..#.##..#####...#...#######....##.##.##.##..#.#.##########...##.##..##.##...####..####'.split('');
const input = fs
  .readFileSync('input.txt', 'utf-8')
  .split('\n')
  .map((line) => {
    const [start, end] = line.split(' => ');
    return {start, end};
  })
  .reduce((map, line) => {
    map[line.start] = line.end;
    return map;
  }, {});

let offset = 0;
let diff = 0;
console.log(state.join(''));
for (let iteration = 0; iteration < 10000; iteration++) {
  let next = [];
  offset -= 2;

  for (let pos = -2; pos < state.length + 2; pos++) {
    let slice = state.slice(Math.max(0, pos - 2), Math.min(state.length, pos + 3)).join('');
    if (slice.length < 5 && pos < 2) {
      slice = slice.padStart(5, '.');
    } else if (slice.length < 5) {
      slice = slice.padEnd(5, '.');
    }
    next[pos + 2] = input[slice];
  }

  const firstFull = next.indexOf('#');
  offset += firstFull;
  state = next.slice(firstFull, next.lastIndexOf('#') + 1);
  diff = iteration + 1 - offset;
}

const sum = state.reduce((s, c, i) => {
  if (c === '#') {
    return s + i + 50000000000 - diff;
  }
  return s;
}, 0);

console.log(sum);
