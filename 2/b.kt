import java.io.File;

fun same(word1: String, word2: String): String {
  var same: String = ""
  var w1 = word1.split("")
  var w2 = word2.split("")

  for (i in w1.size - 1 downTo 0) {
    if (w1[i] == w2[i]) {
      same = w1[i] + same
    }
  }

  return same
}

fun main2B() {
  var words = File("input.txt").readText(Charsets.UTF_8).split("\n")
  for (index in words.size - 1 downTo 0) {
    for (i in words.size - 1 downTo index) {
      if (same(words[index], words[i]).length == 25) {
        println(same(words[index], words[i]))
        break
      }
    }
  }
}
