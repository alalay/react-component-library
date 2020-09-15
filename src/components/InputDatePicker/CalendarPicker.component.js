import React, { useState, useEffect } from "react";
import styled from "styled-components";
import startOfDay from "date-fns/startOfDay";

import DateView from "./DateView.component";
import MonthYearView from "./MonthYearView.component";

import { spacing, neutral } from "../../utils";
import { TertiaryButton } from "../Button";
import { getYear, getMonth } from "date-fns/esm";
const CalendarPickerContainer = styled.div`
  width: 29rem;
  height: 34rem;
  padding: ${spacing.padding.normal};
`;

const CalendarFooter = styled.div`
  &:before {
    content: "";
    border-bottom: 0.1rem solid ${neutral[300]};
    display: block;
    margin-bottom: 15px;
  }
`;
function CalendarPicker(props) {
  const [isDateView, setDateView] = useState(true);
  const selectedDate = props.selectedDate || new Date();

  const initialCalendar = {
    year: getYear(selectedDate),
    monthIndex: getMonth(selectedDate)
  };
  const [calendar, setCalendar] = useState(initialCalendar);

  const setMonthYearView = setDateView.bind(null, false);
  const onSetDateView = setDateView.bind(null, true);
  const onSelectCalendarMonthYear = selection => setCalendar(selection);
  const onSelectCalendarMonth = (event, selectedMonthIndex) =>
    setCalendar({ ...calendar, monthIndex: selectedMonthIndex });
  const onSelectCalendarYear = (event, selectedYear) =>
    setCalendar({ ...calendar, year: selectedYear });
  const onClickToday = event =>
    props.onSelectDate(event, startOfDay(new Date()));

  useEffect(() => {
    if (props.selectedDate) {
      const nextDate = props.selectedDate || new Date();
      setCalendar({
        year: getYear(nextDate),
        monthIndex: getMonth(nextDate)
      });
    }
  }, [props.selectedDate]);

  return (
    <CalendarPickerContainer>
      {isDateView ? (
        <DateView
          calendar={calendar}
          onTitleClick={setMonthYearView}
          onSelectMonthYear={onSelectCalendarMonthYear}
          onSelectDate={props.onSelectDate}
          selectedDate={props.selectedDate}
        />
      ) : (
        <MonthYearView
          calendar={calendar}
          onSelectMonth={onSelectCalendarMonth}
          onSelectYear={onSelectCalendarYear}
          onSelectDateView={onSetDateView}
        />
      )}
      <CalendarFooter>
        <TertiaryButton onClick={onClickToday}>today</TertiaryButton>
      </CalendarFooter>
    </CalendarPickerContainer>
  );
}

export default CalendarPicker;
