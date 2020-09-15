import React, { useContext } from "react";
import DateContext from "./Context";

function Input(props) {
  const { value, onInputChange } = useContext(DateContext);
  return <input value={value.textInput} onChange={onInputChange} />;
}

export default Input;
