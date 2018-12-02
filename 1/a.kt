import java.io.File;

fun main1A() {
  println(
    File("input.txt")
      .readText(Charsets.UTF_8)
      .split("\n")
      .map({ item: String -> item.toInt()})
      .reduce({sum: Int, curr: Int -> sum + curr})
  )
}
