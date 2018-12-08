import java.io.File;

fun main5A() {
  var changes: Int;
  var polymer = File("input.txt")
    .readText(Charsets.UTF_8)
    .split("")
    .toMutableList();

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

  println(polymer.joinToString("").length);
}
