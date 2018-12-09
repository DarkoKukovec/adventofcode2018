const fs = require('fs');

let metaSum = 0;

function getNode(list, index) {
  const childrenCount = list[index];
  const metaCount = list[index + 1];
  let newIndex = index + 2;
  const children = [];
  for (let i = 0; i < childrenCount; i++) {
    const [node, nextIndex] = getNode(list, newIndex);
    children.push(node);
    newIndex = nextIndex;
  }
  const meta = list.slice(newIndex, newIndex + metaCount);
  metaSum = meta.reduce((s, v) => s + v, metaSum);
  newIndex += metaCount;
  return [{children, meta}, newIndex];
}

const input = fs
  .readFileSync('input.txt', 'utf-8')
  .split(/\s+/)
  .map(Number);

const [nodes, _] = getNode(input, 0);

console.log(metaSum);
