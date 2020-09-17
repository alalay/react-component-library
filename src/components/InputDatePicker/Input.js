import React, { useContext, forwardRef } from "react";
import DebounceInput from "react-debounce-input";
import DateContext from "./Context";

function Input(props, ref) {
  const { value, onInputChange } = useContext(DateContext);
  return (
    <DebounceInput
      debounceTimeout={300}
      value={value.textInput}
      onChange={onInputChange}
      ref={ref}
    />
  );
}

export default forwardRef(Input);
