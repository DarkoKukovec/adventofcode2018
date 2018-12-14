const target = '170641';
let pos1 = 0;
let pos2 = 1;
let scores = [3, 7];

let latest = '37';

while (latest.indexOf(target) < 0) {
  const next = (~~scores[pos1] + ~~scores[pos2]).toString();
  scores.push(...next.split('').map(Number))
  latest = (latest + next).slice(-20);
  pos1 = (pos1 + scores[pos1] + 1) % scores.length;
  pos2 = (pos2 + scores[pos2] + 1) % scores.length;
}

console.log(scores.join('').indexOf(target));
