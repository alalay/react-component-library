import React, { useMemo, useRef } from "react";
import PropTypes from "prop-types";
import { tint } from "polished";
import styled, { css } from "styled-components";
import getDate from "date-fns/getDate";
import dateFnsIsToday from "date-fns/isToday";
import getMonth from "date-fns/getMonth";
import isSameDay from "date-fns/isSameDay";
import { buildWeeks, buildDayNames } from "./generator";
import { TertiaryButton } from "../Button";
import { neutral, spacing, defaultTheme } from "../../utils";
import { selectedStyle } from "./mixins";
import withCalendarGesture from "./withCalendarGesture";

const CalendarTable = styled.table`
  position: relative;
  width: 100%;
`;

const CalendarHeader = styled.tr`
  &:after {
    content: "";
    width: 100%;
    border-bottom: 0.1rem solid ${neutral[300]};
    position: absolute;
    left: 0;
    top: 2.3rem;
  }
  th {
    padding-bottom: ${spacing.padding.small};
  }
`;

const CalendarRow = styled.tr`
  height: 3.6rem;
  text-align: center;
`;

const CalendarDay = styled(TertiaryButton)`
  height: 2.4rem;
  width: 2.4rem;
  line-height: 2.4rem;
  padding: 0;
  border: none;
  border-radius: 50%;

  ${props =>
    props.isToday &&
    css`
      background-color: ${tint(0.9, defaultTheme.primaryColor)};
      border: 0.1rem solid ${defaultTheme.primaryColor};
    `}

  ${props =>
    !props.isCurrentMonth &&
    css`
      opacity: 0.5;
    `}

    ${selectedStyle}
`;
function DatePicker(props) {
  const { selectedDate, calendar, onSelectDate } = props;
  const { year, monthIndex } = calendar;
  const weeks = useMemo(() => buildWeeks(year, monthIndex), [year, monthIndex]);
  const dayNames = useMemo(() => buildDayNames(0), []);
  const calendarRef = useRef(null)
  return (
    <CalendarTable ref={calendarRef}>
      <thead>
        <CalendarHeader>
          {dayNames.map((dayName, i) => (
            <th key={i}>{dayName}</th>
          ))}
        </CalendarHeader>
      </thead>
      <tbody>
        {weeks.map((week, i) => (
          <CalendarRow key={i}>
            {week.map((day, j) => {
              const isToday = dateFnsIsToday(day);
              const isCurrentMonth = getMonth(day) === monthIndex;
              const isSelected = isSameDay(day, selectedDate);
              // aria-current
              const buttonProps = {};
              const date = getDate(day);
              if (isSelected) {
                buttonProps["aria-current"] = "date";
              }
              if (isCurrentMonth) {
                buttonProps["data-value"] = date;
              }
              return (
                <td key={j}>
                  <CalendarDay
                    isToday={isToday}
                    isCurrentMonth={isCurrentMonth}
                    isSelected={isSelected}
                    onClick={e => onSelectDate(e, day)}
                    onKeyDown={e => props.onKeyDown(e, calendarRef.current, date - 1)}
                    {...buttonProps}
                  >
                    {date}
                  </CalendarDay>
                </td>
              );
            })}
          </CalendarRow>
        ))}
      </tbody>
    </CalendarTable>
  );
}

DatePicker.propTypes = {
  calendar: PropTypes.shape({
    year: PropTypes.number,
    monthIndex: PropTypes.number
  }),
  selectedDate: PropTypes.instanceOf(Date),
  onSelectDate: PropTypes.func
};

export default withCalendarGesture(DatePicker);
