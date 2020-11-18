import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import FocusManager from "./FocusManager";
import DateManager from "./DateManager";
import Picker from "./Picker";
import Input from "./Input";

function InputDatePicker(props) {
  const inputRef = useRef(null);
  const [showPicker, setShowPicker] = useState(false);
  const openPicker = setShowPicker.bind(null, true);
  const closePicker = setShowPicker.bind(null, false);
  function onFocus() {
    openPicker();
  }
  function onBlur() {
    closePicker();
  }
  function onChange(event, payload) {
    if (props.onChange) {
      props.onChange(event, payload);
    }
    if (payload.origin === "PICKER") {
      inputRef.current.focus();
      closePicker();
    }
  }
  function onClick() {
    openPicker();
  }
  return (
    <FocusManager onFocus={onFocus} onBlur={onBlur}>
      <DateManager onChange={onChange}>
        <Input inputRef={inputRef} onClick={onClick} />
        {showPicker && <Picker />}
      </DateManager>
    </FocusManager>
  );
}

InputDatePicker.propTypes = {
  onChange: PropTypes.func
};

export default InputDatePicker;
