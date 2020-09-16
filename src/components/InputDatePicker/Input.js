import React, { useContext, forwardRef } from "react";
import DateContext from "./Context";

function Input(props, ref) {
  const { value, onInputChange } = useContext(DateContext);
  return <input value={value.textInput} onChange={onInputChange} ref={ref} />;
}

export default forwardRef(Input);
