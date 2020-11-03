import React, { useState } from "react";
import PropTypes from "prop-types";
import Calendar from "./Calendar";
import FocusManager from "./FocusManager";

function InputDatePicker(props) {
  const [showPicker, setShowPicker] = useState(false);
  const openPicker = setShowPicker.bind(null, true);
  const closePicker = setShowPicker.bind(null, false);
  function onFocus() {
    openPicker();
  }
  function onBlur() {
    closePicker();
  }
  return (
    <FocusManager onFocus={onFocus} onBlur={onBlur}>
      <input />
      {showPicker && <Calendar />}
    </FocusManager>
  );
}

InputDatePicker.propTypes = {};

export default InputDatePicker;
