const fs = require('fs');

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
  newIndex += metaCount;
  return [{children, meta}, newIndex];
}

function getNodeValue(node) {
  if (!node) {
    return 0;
  } else if (node.children.length) {
    return node.meta.reduce((s, v) => s + getNodeValue(node.children[v - 1]), 0);
  } else {
    return node.meta.reduce((s, v) => s + v);
  }
}

const input = fs
  .readFileSync('input.txt', 'utf-8')
  .split(/\s+/)
  .map(Number);

const [nodes, _] = getNode(input, 0);

console.log(getNodeValue(nodes));
