const lastMarble = 70723;
const playerCount = 427;
const scores = Array.from({length: playerCount}).map(() => 0);

let currentMarble = { value: 0 };
currentMarble.next = currentMarble.prev = currentMarble;

function removeMarble(currentMarble) {
  currentMarble.prev.next = currentMarble.next;
  currentMarble.next.prev = currentMarble.prev;
  return { removedValue: currentMarble.value, currentMarble: currentMarble.next };
}

function appendMarble(currentMarble, value) {
  const newMarble = { value, next: currentMarble.next, prev: currentMarble };
  newMarble.prev.next = newMarble.next.prev = newMarble;
  return newMarble;
}

for (let nextMarble = 1; nextMarble <= lastMarble; nextMarble++) {
  if (nextMarble % 23) {
    currentMarble = appendMarble(currentMarble.next, nextMarble);
  } else {
    const data = removeMarble(currentMarble.prev.prev.prev.prev.prev.prev.prev);
    scores[nextMarble % playerCount] += nextMarble + data.removedValue;
    currentMarble = data.currentMarble;
  }
}

console.log(Math.max(...scores));
