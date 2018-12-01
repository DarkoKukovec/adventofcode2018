package task0A;

import java.io.File;

fun main1B() {
  var freq: MutableList<Int> = mutableListOf()
  var curr: Int = 0
  var changes: List<Int> = File("input.txt")
    .readText(Charsets.UTF_8)
    .split("\n")
    .map({ item: String -> item.toInt()})
  var position: Int = 0;

  while (!freq.contains(curr)) {
    freq.add(curr);
    curr += changes[position % changes.size]
    position++
  }

  println(curr);
}
