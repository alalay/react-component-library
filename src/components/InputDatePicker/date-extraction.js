import format from "date-fns/format";
import parse from "date-fns/parse";

const DEFAULT_DATE_FORMAT = "yyyy-MM-dd";

export function dateToStr(date) {
  return format(date, DEFAULT_DATE_FORMAT);
}

export function strToDate(dateString) {
  let date;
  try {
    date = parse(dateString, DEFAULT_DATE_FORMAT, new Date());
  } catch(e) {
    throw(e)
  }
  return date;
}
export function isDateValid(date) {
  return date instanceof Date && !isNaN(date.getTime());
}