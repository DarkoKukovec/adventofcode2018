package task0B;

import java.io.File;

fun main0B(): String {
  return File("input.txt")
    .readText(Charsets.UTF_8)
    .split(" ")
    .map({
      word: String -> word.toUpperCase()
    })
    .joinToString("-")
}
