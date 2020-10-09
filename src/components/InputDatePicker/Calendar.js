import React from "react";
import PropTypes from "prop-types";
import DateView from "./DateView";

function Calendar(props) {
  return (
    <DateView
      calendar={{ year: 2020, monthIndex: 8 }}
      selectedDate={new Date(2020, 8, 29)}
    />
  );
}

Calendar.propTypes = {};

export default Calendar;
