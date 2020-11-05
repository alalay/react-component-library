import React, { useState } from "react";
import PropTypes from "prop-types";
import FocusManager from "./FocusManager";
import DateManager from "./DateManager";
import Picker from "./Picker";
import Input from "./Input";

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
      <DateManager onChange={props.onChange}>
        <Input />
        {showPicker && <Picker />}
      </DateManager>
    </FocusManager>
  );
}

InputDatePicker.propTypes = {
  onChange: PropTypes.func
};

export default InputDatePicker;
