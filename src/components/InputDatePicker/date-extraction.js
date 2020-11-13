import format from "date-fns/format";
import lastDayOfMonth from "date-fns/lastDayOfMonth";
import getDate from "date-fns/getDate";
import setDate from "date-fns/setDate";

export function dateToStr(date) {
  return format(date, "yyyy-MM-dd");
}
function getDateRegexp(dateFormat) {
  //MM-dd-yyyy ['MM',dd yyyy]
  const dateFormatAsRegexp = dateFormat
    .replace(/[A-Za-z]{4}/g, "([0-9]{4})")
    .replace(/[A-Za-z]{2}/g, "([0-9]{2})");
  return {
    regexp: new RegExp(`^\\s*${dateFormatAsRegexp}\\s*$`),
    partsOrder: dateFormat.split(/[^A-Za-z]/)
  };
}
function DatePickerException(code) {
  this.code = code;
}
export function strToDate(strToParse, dateFormat = "yyyy-MM-dd") {
  const { regexp, partsOrder } = getDateRegexp(dateFormat);
  const dateMatches = strToParse.match(regexp); // 2020-11-11, 2020 11 11;
  const dateErrors = [];

  console.log(dateMatches);
  
  if (!dateMatches) {
    dateErrors.push(new DatePickerException("INVALID_DATE_FORMAT"));
    throw dateErrors;
  }

  const yearIndex = partsOrder.indexOf("yyyy");
  const monthIndex = partsOrder.indexOf("MM");
  const dayIndex = partsOrder.indexOf("dd");

  const yearString = dateMatches[yearIndex + 1];
  const monthString = dateMatches[monthIndex + 1];
  const dayString = dateMatches[dayIndex + 1];

  const month = parseInt(monthString, 10);
  console.log(monthString, month);
  if (month === 0 || month > 12) {
    dateErrors.push(new DatePickerException("INVALID_MONTH_NUMBER"));
  }
  const day = parseInt(dayString, 10);
  if (day === 0) {
    dateErrors.push(new DatePickerException("INVALID_DAY_NUMBER"));
  }
  const year = parseInt(yearString, 10);
  const monthDate = new Date(year, month - 1);
  const lastDay = lastDayOfMonth(monthDate);
  if (day > getDate(lastDay)) {
    dateErrors.push(new DatePickerException('INVALID_DAY_OF_MONTH'));
  }

  if (dateErrors.length > 0) {
    throw dateErrors;
  }
  return setDate(monthDate, day);
}
