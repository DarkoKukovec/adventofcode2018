import java.io.File;

fun countLetters(word: String): Map<String, Int> {
  var letters: MutableMap<String, Int> = mutableMapOf()

  word.split("").forEach({ letter -> run {
    if (letter != "") {
      var count: Int = letters.getOrDefault(letter, 0)
      letters.set(letter, count + 1)
    }
  }})

  return letters
}

fun main2A() {
  var twos: Int = 0;
  var threes: Int = 0;
  File("input.txt")
    .readText(Charsets.UTF_8)
    .split("\n")
    .forEach({
      word -> run {
        var letters = countLetters(word)
        if (letters.any({ count -> count.value == 3 })) {
          threes++
        }
        if (letters.any({ count -> count.value == 2 })) {
          twos++
        }
      }
    })
  println(twos * threes);
}
