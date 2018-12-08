import java.io.File;

fun react(poly: List<String>): Int {
  var changes: Int;
  var polymer = poly.toMutableList();

  do {
    changes = 0;
    for (i in 1 until polymer.size) {
      if (
        polymer.get(i) != polymer.get(i - 1) &&
        polymer.get(i).toUpperCase() == polymer.get(i - 1).toUpperCase()
      ) {
        changes++;
        polymer.removeAt(i);
        polymer.removeAt(i - 1);
        break;
      }
    }
  } while(changes > 0)

  return polymer.joinToString("").length;
}

fun main5B() {
  var bestPolymerLength: Int = Int.MAX_VALUE;
  var polymer = File("input.txt")
    .readText(Charsets.UTF_8);

  var char: Char = 'A';
  while (char <= 'Z') {
    var poly = char.toString().toRegex(RegexOption.IGNORE_CASE).replace(polymer, "");
    var size = react(poly.split("").toMutableList());
    bestPolymerLength = listOf(bestPolymerLength, size).min()?: Int.MAX_VALUE;
    char++;
  }

  println(bestPolymerLength);
}
