import React, { useState, useRef } from "react";
import keycode from "keycode";
import styled from "styled-components";

import FocusManager from "./FocusManager.component";
import Picker from "./Picker";
import Input from "./Input";
import Manager from "./Manager";
import { neutral } from "../../utils";
import { focusOnCalendar } from "./withCalendarGesture";

const Popper = styled.div`
  width: 31rem;
  background: ${neutral[100]};
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2) inset;
  z-index: 1000;
`;

export function InputDatePicker(props) {
  const [show, setShow] = useState(false);
  const [picked, setPicked] = useState(false);
  const closePicker = setShow.bind(null, false);
  const openPicker = setShow.bind(null, true);
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  function onClick(event) {
    openPicker();
  }
  function onKeyDown(event) {
    switch (event.keyCode) {
      case keycode.codes.esc:
        inputRef.current.focus();
        closePicker();
        break;
      case keycode.codes.down:
        if (event.target !== inputRef.current) {
          return;
        }
        if (!show) {
          openPicker();
        } else {
          focusOnCalendar(containerRef.current);
        }
        break;
      default:
        break;
    }
  }
  function onChange(event, payload) {
    if (payload.origin === "PICKER") {
      setPicked(true);
      inputRef.current.focus();
      closePicker();
    }
    if (props.onChange) {
      props.onChange(event, payload);
    }
  }
  function onFocus() {
    if (!picked) {
      openPicker();
    }
  }
  return (
    <FocusManager
      onClick={onClick}
      onFocusIn={onFocus}
      onFocusOut={() => setShow(false)}
      onKeyDown={onKeyDown}
      style={{ display: "inline-block" }}
    >
      <Manager onChange={onChange} onBlur={props.onBlur}>
        <Input ref={inputRef} />
        <Popper
          onMouseDown={event => event.stopPropagation()}
          ref={containerRef}
        >
          {show && <Picker />}
        </Popper>
      </Manager>
    </FocusManager>
  );
}
