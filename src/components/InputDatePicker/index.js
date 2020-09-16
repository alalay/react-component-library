import React, { useState, useRef } from "react";
import keycode from "keycode";
import styled from "styled-components";

import FocusManager from "./FocusManager.component";
import Picker from "./Picker";
import Input from "./Input";
import Manager from "./Manager";
import { neutral } from "../../utils";

const Popper = styled.div`
  width: 31rem;
  background: ${neutral[100]};
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2) inset;
  z-index: 1000;
`;

export function InputDatePicker(props) {
  const [show, setShow] = useState(false);
  const closePicker = setShow.bind(null, false);
  const openPicker = setShow.bind(null, true);
  const inputRef = useRef(null);
  function onClick() {
    openPicker();
  }
  function onKeyDown(event) {
    switch (event.keyCode) {
      case keycode.codes.esc:
        inputRef.current.focus();
        closePicker();
        break;
      default:
        break;
    }
  }
  return (
    <FocusManager
      onClick={onClick}
      onFocusIn={() => setShow(true)}
      onFocusOut={() => setShow(false)}
      onKeyDown={event => onKeyDown(event)}
    >
      <Manager
        onSelectDate={closePicker}
        onChange={props.onChange}
        onBlur={props.onBlur}
      >
        <Input ref={inputRef} />
        <Popper>{show && <Picker />}</Popper>
      </Manager>
    </FocusManager>
  );
}
