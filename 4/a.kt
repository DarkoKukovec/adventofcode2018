import java.io.File;

data class MostAsleep(val time: Int, val id: String)

fun main4A() {
  var lastGuard: String = "";
  var guards: MutableMap<String, MutableMap<Int, Int>> = mutableMapOf();
  File("input.txt")
    .readText(Charsets.UTF_8)
    .split("\n")
    .sorted()
    .map({ line: String -> run {
      var matchResult = Regex("\\s([0-9]+):([0-9]+)").find(line);
      var match = matchResult?.groupValues;
      var time: Int = 0;
      if ((match?.getOrNull(1)?.toIntOrNull() ?: 0) == 0) {
        time = match?.getOrNull(2)?.toIntOrNull() ?: 0;
      }
      var action: Int = 0;
      if (line.indexOf("begins shift") != -1) {
        lastGuard = Regex("Guard #([0-9]+)").find(line)?.groupValues?.getOrNull(1) ?: "";
      } else if (line.indexOf("falls asleep") != -1) {
        action = 1;
      } else if (line.indexOf("wakes up") != -1) {
        action = -1;
      }

      var guard = guards.getOrPut(lastGuard) { mutableMapOf() }
      for (i in time until 60) {
        guard.set(i, guard.getOrDefault(i, 0) + action);
      }
    }});

    var mostAsleep = MostAsleep(0, "");
    guards.keys.forEach({ id -> run {
      var timetable = guards.getOrDefault(id, mutableMapOf()).toList().map { it.component2() };
      var time = timetable.reduce { sum: Int, value: Int -> sum + value };
      if (time > mostAsleep.time) {
        mostAsleep = MostAsleep(time, id);
      }
    }});

    var timetable = guards.getOrDefault(mostAsleep.id, mutableMapOf()).toList().map { it.component2() };
    var maxAsleepTimes = timetable.max() ?: 0;
    var mostAsleepTime = timetable.indexOf(maxAsleepTimes);

    println(mostAsleep.id.toInt() * mostAsleepTime);
}
