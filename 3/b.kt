import java.io.File;

data class CutData(val id: Int, val x: Int, val y: Int, val w: Int, val h: Int)

fun parseCuts(cut: String): CutData {
  var parser = Regex("#([0-9]+) @ ([0-9]+),([0-9]+): ([0-9]+)x([0-9]+)");
  var matchResult = parser.find(cut);
  var match = matchResult?.groupValues;
  var id = match?.getOrNull(1)?.toIntOrNull() ?: 0;
  var x = match?.getOrNull(2)?.toIntOrNull() ?: 0;
  var y = match?.getOrNull(3)?.toIntOrNull() ?: 0;
  var w = match?.getOrNull(4)?.toIntOrNull() ?: 0;
  var h = match?.getOrNull(5)?.toIntOrNull() ?: 0;
  return CutData(id, x, y, w, h);
}

fun checkUsage(fabric: MutableMap<String, Int>, cut: CutData): Boolean {
  for (i in cut.x until cut.x + cut.w) {
    for (j in cut.y until cut.y + cut.h) {
      var key: String = "$i x $j";
      var cell = fabric.getOrDefault(key, 0);
      if (cell > 1) {
        return false;
      }
    }
  }
  return true;
}

fun main3B() {
  var fabric: MutableMap<String, Int> = mutableMapOf();
  var input: List<CutData> = File("input.txt")
    .readText(Charsets.UTF_8)
    .split("\n")
    .map({ cut -> parseCuts(cut) });

  input.map({ cut: CutData -> run {
    for (i in cut.x until cut.x + cut.w) {
      for (j in cut.y until cut.y + cut.h) {
        var key: String = "$i x $j";
        var cell = fabric.getOrDefault(key, 0);
        fabric.set(key, cell + 1);
      }
    }
  }});

  var winner = input.first({ cut -> checkUsage(fabric, cut) });

  println(winner.id);
}
