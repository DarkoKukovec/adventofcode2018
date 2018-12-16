const fs = require('fs');

function compareArr(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  return arr1.every((x, i) => x === arr2[i]);
}

const operations = {
  addr(reg, a, b, c) {
    reg[c] = reg[a] + reg[b];
  },
  addi(reg, a, b, c) {
    reg[c] = reg[a] + b;
  },
  mulr(reg, a, b, c) {
    reg[c] = reg[a] * reg[b];
  },
  muli(reg, a, b, c) {
    reg[c] = reg[a] * b;
  },
  banr(reg, a, b, c) {
    reg[c] = reg[a] & reg[b];
  },
  bani(reg, a, b, c) {
    reg[c] = reg[a] & b;
  },
  borr(reg, a, b, c) {
    reg[c] = reg[a] | reg[b];
  },
  bori(reg, a, b, c) {
    reg[c] = reg[a] | b;
  },
  setr(reg, a, _, c) {
    reg[c] = reg[a];
  },
  seti(reg, a, _, c) {
    reg[c] = a;
  },
  gtir(reg, a, b, c) {
    reg[c] = a > reg[b] ? 1 : 0;
  },
  gtri(reg, a, b, c) {
    reg[c] = reg[a] > b ? 1 : 0;
  },
  gtrr(reg, a, b, c) {
    reg[c] = reg[a] > reg[b] ? 1 : 0;
  },
  eqir(reg, a, b, c) {
    reg[c] = a === reg[b] ? 1 : 0;
  },
  eqri(reg, a, b, c) {
    reg[c] = reg[a] === b ? 1 : 0;
  },
  eqrr(reg, a, b, c) {
    reg[c] = reg[a] === reg[b] ? 1 : 0;
  },
};

const [testsRaw, _] = fs.readFileSync('input.txt', 'utf-8').split('\n\n\n');
const tests = testsRaw.split('\n\n').map((test) => {
  const [before, op, after] = test.split('\n');
  return {
    after: after.match(/\[(\d+),\s+(\d+),\s+(\d+),\s+(\d+)\]/).slice(1, 5).map(Number),
    before: before.match(/\[(\d+),\s+(\d+),\s+(\d+),\s+(\d+)\]/).slice(1, 5).map(Number),
    op: op.split(/\s+/).map(Number),
  };
});

let count = 0;
tests.forEach((test) => {
  const couldMatch = Object.keys(operations).filter((opName) => {
    const reg = test.before.slice();
    operations[opName](reg, ...test.op.slice(1));
    return compareArr(reg, test.after);
  });
  if (couldMatch.length >= 3) {
    count++;
  }
});

console.log(count);
