const fs = require('fs');

function getUnitList(map) {
  const list = [];

  for (let x = 0; x < map.length; x++) {
    for (let y = 0; y < map[x].length; y++) {
      if (map[x][y].unit) {
        list.push({ x, y, unit: map[x][y].unit, hit: map[x][y].hit });
      }
    }
  }

  return list;
}

function getNeighbors(pos) {
  return [
    { x: pos.x - 1, y: pos.y },
    { x: pos.x, y: pos.y - 1 },
    { x: pos.x, y: pos.y + 1 },
    { x: pos.x + 1, y: pos.y },
  ];
}

function isReadyToAttack(map, unit) {
  const attackRange = getNeighbors(unit)
    .filter((coo) => map[coo.x][coo.y].unit == enemy[unit.unit])
    .reduce((next, curr) => {
      if (map[curr.x][curr.y].hit < next.hit) {
        return { hit: map[curr.x][curr.y].hit, x: curr.x, y: curr.y };
      }
      return next;
    }, { hit: Infinity });
  if (attackRange.hit === Infinity) {
    return null;
  }
  return attackRange;
}

function attack(map, attacker, attacked, units) {
  map[attacked.x][attacked.y].hit -= 3;
  if (map[attacked.x][attacked.y].hit < 0) {
    map[attacked.x][attacked.y] = '.';
    const attackedIndex = units.filter(Boolean).findIndex((u) => u.x === attacked.x && u.y === attacked.y);
    units[attackedIndex] = null;
  }
  return true;
}

function tryAttack(map, unit, units) {
  const nextAttack = isReadyToAttack(map, unit);
  return nextAttack ? attack(map, unit, nextAttack, units) : false;
}

function findMove(map, targetUnit, positions, depth) {
  let nextPositions = [];
  positions.filter((pos) => map[pos.x][pos.y] === '.').forEach((pos) => {
    map[pos.x][pos.y] = depth;
    const newPositions = getNeighbors(pos)
      .filter((pos) => !nextPositions.find((item) => item.x === pos.x && item.y === pos.y));
    nextPositions.push(...newPositions);
  });
  if (nextPositions.some((pos) => map[pos.x][pos.y].unit === targetUnit)) {
    return depth;
  } else if (nextPositions.length === 0) {
    return Infinity;
  }
  return findMove(map, targetUnit, nextPositions, depth + 1);
}

function getNextMove(map, unit) {
  const targetUnit = enemy[unit.unit];

  const nextMove = getNeighbors(unit)
    .reduce((next, curr) => {
      const mapCopy = map.map((row) => row.slice());
      mapCopy[unit.x][unit.y] = '.';
      const distance = findMove(mapCopy, targetUnit, [curr], 1);
      if (distance < next.distance) {
        return { distance, x: curr.x, y: curr.y };
      }
      return next;
    }, { distance: Infinity });

  return nextMove.distance === Infinity ? null : nextMove;
}

function tryMove(map, unit) {
  const nextMove = getNextMove(map, unit);
  if (nextMove) {
    map[nextMove.x][nextMove.y] = map[unit.x][unit.y];
    map[unit.x][unit.y] = '.';
    unit.x = nextMove.x;
    unit.y = nextMove.y;
    return true;
  }
  return false;
}

const enemy = { G: 'E', E: 'G' };
const map = fs
  .readFileSync('input.txt', 'utf-8')
  .split('\n')
  .map((line) => line.split('').map((unit) => {
    return (unit === '#' || unit === '.') ? unit : { unit, attack: 3, hit: 200, rounds: 0 };
  }));

  const fs = require('fs');

  const enemy = { G: 'E', E: 'G' };

  function getUnitList(map) {
    const list = [];

    for (let x = 0; x < map.length; x++) {
      for (let y = 0; y < map[x].length; y++) {
        if (map[x][y].unit) {
          list.push({ x, y, unit: map[x][y].unit, hit: map[x][y].hit });
        }
      }
    }

    return list;
  }

  function getNeighbors(pos) {
    return [
      { x: pos.x - 1, y: pos.y },
      { x: pos.x, y: pos.y - 1 },
      { x: pos.x, y: pos.y + 1 },
      { x: pos.x + 1, y: pos.y },
    ];
  }

  function isReadyToAttack(map, unit) {
    const attackRange = getNeighbors(unit)
      .filter((coo) => map[coo.x][coo.y].unit == enemy[unit.unit])
      .reduce((next, curr) => {
        if (map[curr.x][curr.y].hit < next.hit) {
          return { hit: map[curr.x][curr.y].hit, x: curr.x, y: curr.y };
        }
        return next;
      }, { hit: Infinity });
    if (attackRange.hit === Infinity) {
      return null;
    }
    return attackRange;
  }

  function attack(map, attacker, attacked, units) {
    map[attacked.x][attacked.y].hit -= map[attacker.x][attacker.y].attack;
    if (map[attacked.x][attacked.y].hit < 0) {
      map[attacked.x][attacked.y] = '.';
      const attackedIndex = units.filter(Boolean).findIndex((u) => u.x === attacked.x && u.y === attacked.y);
      units[attackedIndex] = null;
    }
    return true;
  }

  function tryAttack(map, unit, units) {
    const nextAttack = isReadyToAttack(map, unit);
    return nextAttack ? attack(map, unit, nextAttack, units) : false;
  }

  function findMove(map, targetUnit, positions, depth) {
    let nextPositions = [];
    positions.filter((pos) => map[pos.x][pos.y] === '.').forEach((pos) => {
      map[pos.x][pos.y] = depth;
      const newPositions = getNeighbors(pos)
        .filter((pos) => !nextPositions.find((item) => item.x === pos.x && item.y === pos.y));
      nextPositions.push(...newPositions);
    });
    if (nextPositions.some((pos) => map[pos.x][pos.y].unit === targetUnit)) {
      return depth;
    } else if (nextPositions.length === 0) {
      return Infinity;
    }
    return findMove(map, targetUnit, nextPositions, depth + 1);
  }

  function getNextMove(map, unit) {
    const targetUnit = enemy[unit.unit];

    const nextMove = getNeighbors(unit)
      .reduce((next, curr) => {
        const mapCopy = map.map((row) => row.slice());
        mapCopy[unit.x][unit.y] = '.';
        const distance = findMove(mapCopy, targetUnit, [curr], 1);
        if (distance < next.distance) {
          return { distance, x: curr.x, y: curr.y };
        }
        return next;
      }, { distance: Infinity });

    return nextMove.distance === Infinity ? null : nextMove;
  }

  function tryMove(map, unit) {
    const nextMove = getNextMove(map, unit);
    if (nextMove) {
      map[nextMove.x][nextMove.y] = map[unit.x][unit.y];
      map[unit.x][unit.y] = '.';
      unit.x = nextMove.x;
      unit.y = nextMove.y;
      return true;
    }
    return false;
  }

  function fight(map) {
    while(true) {
      const units = getUnitList(map);

      for (let unit of units) {
        if (!unit) {
          continue;
        }


        if (!tryAttack(map, unit, units)) {
          if (tryMove(map, unit)) {
            tryAttack(map, unit, units);
          }
        }

        map[unit.x][unit.y].rounds++;
        const lastRound = units
          .filter(Boolean)
          .map((item) => item.unit)
          .reduce((found, current) => found === current ? found : false);

        if (lastRound) {
          const roundCount = Math.min(...units.filter(Boolean).map((u) => map[u.x][u.y].rounds));
          const hitSum = getUnitList(map).reduce((sum, curr) => sum + curr.hit, 0);
          return roundCount * hitSum;
        }
      }
    }
  }

const map = fs
  .readFileSync('input.txt', 'utf-8')
  .split('\n')
  .map((line) => line.split('').map((unit) => {
    return (unit === '#' || unit === '.') ? unit : { unit, attack: 3, hit: 200, rounds: 0 };
  }));

console.log(fight(map));


