package task0B;

import java.io.File;

fun main0B() {
  println(
    File("input.txt")
      .readText(Charsets.UTF_8)
      .split(" ")
      .map({
        word: String -> word.toUpperCase()
      })
      .joinToString("-")
  )
}
