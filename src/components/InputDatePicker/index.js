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
  const [picked, setPicked] = useState(false);
  const closePicker = setShow.bind(null, false);
  const openPicker = setShow.bind(null, true);
  const inputRef = useRef(null);

  function onClick(event) {
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
      onKeyDown={event => onKeyDown(event)}
    >
      <Manager onChange={onChange} onBlur={props.onBlur}>
        <Input ref={inputRef} />
        <Popper onMouseDown={event => event.stopPropagation()}>
          {show && <Picker />}
        </Popper>
      </Manager>
    </FocusManager>
  );
}
