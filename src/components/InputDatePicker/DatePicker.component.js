import React, { useRef } from "react";
import { tint } from "polished";
import memoize from "lodash/memoize";
import getDate from "date-fns/getDate";
import isToday from "date-fns/isToday";
import getMonth from "date-fns/getMonth";
import isSameDay from "date-fns/isSameDay";

import { buildWeeks, buildDayNames } from "./generator";
import styled, { css } from "styled-components";
import { TertiaryButton } from "../Button";
import { neutral, defaultTheme, spacing } from "../../utils";
import { pickerAction } from "./mixins";
import { withCalendarGesture } from "./withCalendarGesture";

const getDayNames = memoize(buildDayNames);

const Table = styled.table`
  width: 100%;
  position: relative;
`;

const TRow = styled.tr`
  &:after {
    content: "";
    border-bottom: 0.1rem solid ${neutral[300]};
    width: 100%;
    position: absolute;
    left: 0;
    top: 2.3rem;
  }
  th {
    text-align: center;
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
  background: transparent;
  border: none;
  border-radius: 50%;
  line-height: 2.4rem;
  padding: 0;

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

  ${pickerAction}
`;

function isCurrentMonth(date, monthIndex) {
  return getMonth(date) === monthIndex;
}
function DatePicker(props) {
  const getWeeks = memoize(buildWeeks, (year, month) => `${year}-${month}`);
  const { year, monthIndex } = props.calendar;
  const containerRef = useRef(null);
  const weekDayNames = getDayNames(0);
  return (
    <Table ref={containerRef}>
      <thead>
        <TRow>
          {weekDayNames.map((weekDay, i) => (
            <th key={i}>{weekDay}</th>
          ))}
        </TRow>
      </thead>
      <tbody>
        {getWeeks(year, monthIndex).map(week => (
          <CalendarRow>
            {week.map(date => {
              const day = getDate(date);
              const tdProps = {};
              const isSelected = isSameDay(date, props.selectedDate);
              if (isSelected) {
                tdProps["aria-current"] = "date";
              }
              const buttonProps = isCurrentMonth(date, monthIndex)
                ? { "data-value": day }
                : undefined;
              return (
                <td {...tdProps}>
                  <CalendarDay
                    modifiers={["small"]}
                    onClick={event => props.onSelectDate(event, date)}
                    isToday={isToday(date)}
                    isCurrentMonth={isCurrentMonth(date, monthIndex)}
                    isSelected={isSelected}
                    {...buttonProps}
                    onKeyDown={event =>
                      props.onKeyDown(event, containerRef.current, day - 1)
                    }
                  >
                    {getDate(date)}
                  </CalendarDay>
                </td>
              );
            })}
          </CalendarRow>
        ))}
      </tbody>
    </Table>
  );
}
export default withCalendarGesture(DatePicker);
