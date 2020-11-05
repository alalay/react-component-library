import React, { useContext } from "react";
import PropTypes from "prop-types";
import DateContext from "./DateContext";
import Calendar from "./Calendar";

function Picker(props) {
  const { value, onSelectDate } = useContext(DateContext);
  return <Calendar selectedDate={value.date} onSelectDate={onSelectDate} />;
}

Picker.propTypes = {};

export default Picker;
