import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import startOfDay from "date-fns/startOfDay";

import DateView from "./DateView.component";
import MonthYearView from "./MonthYearView.component";

import { spacing, neutral } from "../../utils";
import { TertiaryButton } from "../Button";
import { getYear, getMonth } from "date-fns/esm";
import { focusOnCalendar } from "./withCalendarGesture";

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
  const pickerRef = useRef(null);
  const selectedDate = props.selectedDate || new Date();

  const initialCalendar = {
    year: getYear(selectedDate),
    monthIndex: getMonth(selectedDate)
  };
  const [calendar, setCalendar] = useState(initialCalendar);

  const setView = dateView => {
    setDateView(dateView);
    setTimeout(() => focusOnCalendar(pickerRef.current));
  };
  const setMonthYearView = setView.bind(null, false);
  const onSetDateView = setView.bind(null, true);
  const onSelectCalendarMonthYear = selection => setCalendar(selection);
  const onSelectCalendarMonth = (event, selectedMonthIndex) =>
    setCalendar({ ...calendar, monthIndex: selectedMonthIndex });
  const onSelectCalendarYear = (event, selectedYear) =>
    setCalendar({ ...calendar, year: selectedYear });

  useEffect(() => {
    if (props.selectedDate) {
      const nextDate = props.selectedDate || new Date();
      setCalendar({
        year: getYear(nextDate),
        monthIndex: getMonth(nextDate)
      });
    }
  }, [props.selectedDate]);

  function onSelectDate(event, date) {
    event.persist();
    setTimeout(() => {
      props.onSelectDate(event, date);
    });
  }
  function onClickToday(event) {
    onSelectDate(event, startOfDay(new Date()));
  }

  return (
    <CalendarPickerContainer tabIndex={0} ref={pickerRef}>
      {isDateView ? (
        <DateView
          calendar={calendar}
          onTitleClick={setMonthYearView}
          onSelectMonthYear={onSelectCalendarMonthYear}
          onSelectDate={onSelectDate}
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
        <TertiaryButton modifiers={["small"]} onClick={onClickToday}>
          today
        </TertiaryButton>
      </CalendarFooter>
    </CalendarPickerContainer>
  );
}

export default CalendarPicker;
