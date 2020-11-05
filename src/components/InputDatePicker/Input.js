import React, { useContext } from "react";
import PropTypes from "prop-types";
import DateContext from "./DateContext";

function Input(props) {
  const { value } = useContext(DateContext);

  return <input value={value.textInput} />;
}

Input.propTypes = {};

export default Input;
