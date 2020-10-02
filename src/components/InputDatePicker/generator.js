import chunk from "lodash/chunk";
import startOfWeek from "date-fns/startOfWeek";
import addDays from "date-fns/addDays";
import setDay from "date-fns/setDay";
import format from "date-fns/format";

export function buildWeeks(year, monthIndex) {
  const firstDayOfMonth = new Date(year, monthIndex);
  const firstDayOfCalendar = startOfWeek(firstDayOfMonth, { weekStartsOn: 0 });
  const weeks = new Array(6 * 7)
    .fill(0)
    .map((_, i) => addDays(firstDayOfCalendar, i));
  return chunk(weeks, 7);
}

export function buildDayNames(weekStartsOn) {
  return new Array(7)
    .fill(0)
    .map((_, i) => (i + weekStartsOn) % 7)
    .map(dayOfWeek => {
      const day = setDay(new Date(0), dayOfWeek);
      return format(day, "EEEEEE");
    });
}
