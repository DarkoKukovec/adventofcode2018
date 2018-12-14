const recipes = 170641;
const nextRecipes = 10;
let pos1 = 0;
let pos2 = 1;
const scores = [3, 7];

while ((recipes + nextRecipes) > scores.length) {
  const next = (scores[pos1] + scores[pos2]).toString().split('').map(Number);
  scores.push(...next);
  pos1 = (pos1 + scores[pos1] + 1) % scores.length;
  pos2 = (pos2 + scores[pos2] + 1) % scores.length;
}

console.log(scores.slice(recipes, recipes + 1 + nextRecipes).join(''));
