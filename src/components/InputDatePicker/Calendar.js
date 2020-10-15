import React, { useState } from "react";
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
  const today = new Date();
  const initialCalendar = {
    year: getYear(today),
    monthIndex: getMonth(today)
  };
  const [calendar, setCalendar] = useState(initialCalendar);
  return (
    <Picker>
      {isDateView ? (
        <DateView calendar={calendar} onSelectMonthYear={setCalendar} />
      ) : (
        <MonthYearView />
      )}
    </Picker>
  );
}

Calendar.propTypes = {
    
};

export default Calendar;
