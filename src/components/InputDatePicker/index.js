import React, { useState } from "react";
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
  function onKeyDown(event) {
    switch (event.keyCode) {
      case keycode.codes.esc:
        closePicker();
        break;
      default:
        break;
    }
  }
  return (
    <FocusManager
      onFocusIn={() => setShow(true)}
      onFocusOut={() => setShow(false)}
      onKeyDown={event => onKeyDown(event)}
    >
      <Manager
        onSelectDate={closePicker}
        onChange={props.onChange}
        onBlur={props.onBlur}
      >
        <Input />
        <Popper>{show && <Picker />}</Popper>
      </Manager>
    </FocusManager>
  );
}
