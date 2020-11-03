import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import getYear from "date-fns/getYear";
import getMonth from "date-fns/getMonth";
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
  const onSetMonthYearView = setDateView.bind(null, false);
  const onSetDateView = setDateView.bind(null, true);
  useEffect(() => {
    calendarRef.current.focus();
  }, [isDateView]);
  return (
    <Picker tabIndex={0} ref={calendarRef}>
      {isDateView ? (
        <DateView
          calendar={calendar}
          onSelectMonthYear={setCalendar}
          onTitleClick={onSetMonthYearView}
        />
      ) : (
        <MonthYearView
          calendar={calendar}
          onSelectMonth={onSelectMonth}
          onBackClick={onSetDateView}
          onSelectYear={onSelectYear}
        />
      )}
    </Picker>
  );
}

Calendar.propTypes = {};

export default Calendar;
