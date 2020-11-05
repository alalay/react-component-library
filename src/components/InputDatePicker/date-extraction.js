import format from "date-fns/format";
export function dateToStr(date) {
  return format(date, "yyyy-MM-dd");
}
