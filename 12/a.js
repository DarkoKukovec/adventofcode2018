const fs = require('fs');

let state = '##.###.......#..#.##..#####...#...#######....##.##.##.##..#.#.##########...##.##..##.##...####..####';
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

state = state.padStart(120, '.');
state = state.padEnd(140, '.');
const offset = 20;

console.log(state);
for (let iteration = 0; iteration < 20; iteration++) {
  let next = [];

  for (let pos = 0; pos < state.length; pos++) {
    let slice = state.slice(Math.max(0, pos - 2), Math.min(state.length, pos + 3));
    if (slice.length < 5 && pos < 2) {
      slice = slice.padStart(5, '.');
    } else if (slice.length < 5) {
      slice = slice.padEnd(5, '.');
    }
    next[pos] = input[slice];
  }
  console.log(next.join(''));
  state = next.join('');
}

const sum = state.split('').reduce((s, c, i) => {
  if (c === '#') {
    return s + i - offset;
  }
  return s;
}, 0);

console.log(sum);
