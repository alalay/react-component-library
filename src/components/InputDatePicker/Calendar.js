import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import getYear from "date-fns/getYear";
import getMonth from "date-fns/getMonth";
import startOfDay from "date-fns/startOfDay";
import styled from "styled-components";
import DateView from "./DateView";
import MonthYearView from "./MonthYearView";
import { spacing, neutral } from "../../utils";

const Picker = styled.div`
  width: 29rem;
  height: 35rem;
  padding: ${spacing.padding.normal};
  border: solid 0.1rem ${neutral[300]};
`;

function Calendar(props) {
  const { selectedDate, onSelectDate } = props;
  const [isDateView, setDateView] = useState(true);
  const calendarRef = useRef(null);
  const today = new Date();
  const initialCalendar = {
    year: getYear(today),
    monthIndex: getMonth(today)
  };
  const [calendar, setCalendar] = useState(initialCalendar);

  function onSelectMonth(selectedMonthIndex) {
    setCalendar({ ...calendar, monthIndex: selectedMonthIndex });
  }
  function onSelectYear(selectedYear) {
    setCalendar({ ...calendar, year: selectedYear });
  }
  function onClickToday(e) {
    onSelectDate(e, startOfDay(new Date()));
  }
  const onSetMonthYearView = setDateView.bind(null, false);
  const onSetDateView = setDateView.bind(null, true);

  return (
    <Picker tabIndex={0} ref={calendarRef}>
      {isDateView ? (
        <DateView
          calendar={calendar}
          onSelectMonthYear={setCalendar}
          onTitleClick={onSetMonthYearView}
          selectedDate={selectedDate}
          onSelectDate={onSelectDate}
          onClickToday={onClickToday}
        />
      ) : (
        <MonthYearView
          calendar={calendar}
          onSelectMonth={onSelectMonth}
          onBackClick={onSetDateView}
          onSelectYear={onSelectYear}
          onClickToday={onClickToday}
        />
      )}
    </Picker>
  );
}

Calendar.propTypes = {
  selectedDate: PropTypes.instanceOf(Date),
  onSelectDate: PropTypes.func
};

export default Calendar;
