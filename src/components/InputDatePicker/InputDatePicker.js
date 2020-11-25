import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import keycode from "keycode";
import FocusManager from "./FocusManager";
import DateManager from "./DateManager";
import Picker from "./Picker";
import Input from "./Input";
import { focusOnCalendar } from "./withCalendarGesture";

function InputDatePicker(props) {
  const inputRef = useRef(null);
  const containerRef = useRef(null);
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

  function onKeyDown(event) {
    switch (event.keyCode) {
      case keycode.codes.esc:
        if (showPicker) {
          inputRef.current.focus();
          closePicker();
        }
        break;
      case keycode.codes.down:
        if (!showPicker) {
          openPicker();
        } else {
          focusOnCalendar(containerRef.current);
        }
        break;

      default:
        break;
    }
  }
  return (
    <FocusManager onFocus={onFocus} onBlur={onBlur} onKeyDown={onKeyDown}>
      <DateManager onChange={onChange}>
        <Input inputRef={inputRef} onClick={onClick} />
        {showPicker && (
          <div ref={containerRef}>
            <Picker />
          </div>
        )}
      </DateManager>
    </FocusManager>
  );
}

InputDatePicker.propTypes = {
  onChange: PropTypes.func
};

export default InputDatePicker;
