const serialNumber = 5468;

function getCellPower(X, Y) {
  const rackId = X + 10;
  return Math.floor(((rackId * Y + serialNumber) * rackId) % 1000 / 100) - 5;
}

function getSum(x, y, size) {
  let sum = 0;
  for (let i = 1; i <= size; i++) {
    for (let j = 1; j <= size; j++) {
      sum += getCellPower(x + i, y + j);
    }
  }
  return sum;
}

const maxCapacity = {
  x: null,
  y: null,
  size: 0,
  capacity: -Infinity,
};

for (let x  = 0; x < 300; x++) {
  for (let y = 0; y < 300; y++) {
    const maxCoo = Math.max(x, y);
    const maxSize = 300 - maxCoo;
    for (let size = 1; size <= maxSize; size++) {
      const sum = getSum(x, y, size);
      if (sum > maxCapacity.capacity) {
        maxCapacity.capacity = sum;
        maxCapacity.x = x + 1;
        maxCapacity.y = y + 1;
        maxCapacity.size = size;
        console.log(maxCapacity);
      }
    }
  }
}

console.log(maxCapacity);
