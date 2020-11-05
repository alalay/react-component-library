import React, { useState } from "react";
import PropTypes from "prop-types";
import DateContext from "./DateContext";
import { dateToStr } from "./date-extraction";

function DateManager(props) {
  const [state, setState] = useState({ date: null, textInput: "" });
  function onSelectDate(e, date) {
    const nextState = {
      date,
      textInput: dateToStr(date)
    };
    setState(nextState);
    if (props.onChange) {
      props.onChange(e, nextState);
    }
  }
  return (
    <DateContext.Provider
      value={{
        value: state,
        onSelectDate
      }}
    >
      {props.children}
    </DateContext.Provider>
  );
}

DateManager.propTypes = {};

export default DateManager;
