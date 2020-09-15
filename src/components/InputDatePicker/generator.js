import chunk from "lodash/chunk";
import startOfWeek from "date-fns/startOfWeek";
import addDays from "date-fns/addDays";
import setDay from "date-fns/setDay";
import format from "date-fns/format";
import getYear from "date-fns/getYear";

function buildWeeks(year, month) {
  const firstDayOfMonth = new Date(year, month);
  const firstDayOfCalendar = startOfWeek(firstDayOfMonth, { weekStartsOn: 0 });
  const dates = new Array(7 * 6)
    .fill(0)
    .map((_, i) => addDays(firstDayOfCalendar, i));
  return chunk(dates, 7);
}
function buildDayNames(firstDayOfWeek = 0) {
  return new Array(7)
    .fill(0)
    .map((_, i) => (i + firstDayOfWeek) % 7)
    .map(dayOfWeek => setDay(new Date(), dayOfWeek))
    .map(day => format(day, "EEEEEE"));
}

function buildYears(middle, window = 3) {
  const middleYear = middle ? middle : getYear(new Date());
  const start = middleYear - window;
  const end = middleYear + window;
  const years = [];
  for (let i = start; i <= end; i++) {
    years.push(i);
  }
  return years;
}

export { buildWeeks, buildYears, buildDayNames };
