import format from "date-fns/format";
import lastDayOfMonth from "date-fns/lastDayOfMonth";
import { getDate } from "date-fns";
import { setDate } from "date-fns/esm";

const DEFAULT_DATE_FORMAT = "yyyy-MM-dd";

function DatePickerException(code) {
  this.code = code;
}

/**
 * Build date regexp from date format.
 * It returns the YYYY, MM, DD parts order too.
 * @param {string} dateFormat
 */
function getDateRegexp(dateFormat) {
  // ([0-9]{4})-([0-9]{2})-([0-9]{2})
  const dateFormatAsRegexp = dateFormat
    .replace(/[A-Za-z]{4}/g, "([0-9]{4})")
    .replace(/[A-Za-z]{2}/g, "([0-9]{2})");
  // YYYY-MM-DD => ['YYYY','MM','DD']
  const partsOrder = dateFormat.split(/[^A-Za-z]/);

  return {
    partsOrder,
    regexp: new RegExp(`^\\s*${dateFormatAsRegexp}\\s*$`)
  };
}

export function dateToStr(date) {
  return format(date, DEFAULT_DATE_FORMAT);
}

export function strToDate(strToParse, dateFormat = "YYYY-MM-DD") {
  const dateErrors = [];
  const { partsOrder, regexp } = getDateRegexp(dateFormat);
  // match results: [ '2020-09-15', '2020', '09', '15', index: 0, input: '2020-09-15' ]
  const dateMatches = strToParse.match(regexp);
  if (!dateMatches) {
    dateErrors.push(new DatePickerException("INVALID_DATE_FORMAT"));
    throw dateErrors;
  }
  const yearIndex = partsOrder.indexOf("YYYY");
  const monthIndex = partsOrder.indexOf("MM");
  const dayIndex = partsOrder.indexOf("DD");

  const monthString = dateMatches[monthIndex + 1];
  const month = parseInt(monthString, 10);
  if (month === 0 || month > 12) {
    dateErrors.push(new DatePickerException("INVALID_MONTH_NUMBER"));
  }

  const dayString = dateMatches[dayIndex + 1];
  const day = parseInt(dayString, 10);
  if (day === 0) {
    dateErrors.push(new DatePickerException("INVALID_DAY_NUMBER"));
  }

  const yearString = dateMatches[yearIndex + 1];
  const year = parseInt(yearString, 10);
  const monthDate = new Date(year, month - 1);
  const lastDateOfMonth = lastDayOfMonth(monthDate);
  if (day > getDate(lastDateOfMonth)) {
    dateErrors.push(new DatePickerException("INVALID_DAY_OF_MONTH"));
  }
  if (dateErrors.length > 0) {
    throw dateErrors;
  }
  return setDate(monthDate, day);
}
export function isDateValid(date) {
  return date instanceof Date && !isNaN(date.getTime());
}
