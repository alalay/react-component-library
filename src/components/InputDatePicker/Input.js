import React, { useContext } from "react";
import PropTypes from "prop-types";
import DebounceInput from "react-debounce-input";
import DateContext from "./DateContext";

function Input(props) {
  const { value, onInputChange } = useContext(DateContext);

  return (
    <DebounceInput
      debounceTimeout={300}
      value={value.textInput}
      onChange={onInputChange}
      {...props}
    />
  );
}

Input.propTypes = {};

export default Input;
