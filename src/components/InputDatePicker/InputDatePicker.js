import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import DateView from "./DateView";
import { spacing, neutral } from "../../utils";

const Picker = styled.div`
  width: 29rem;
  height: 35rem;
  padding: ${spacing.padding.normal};
  border: solid 0.1rem ${neutral[300]};
`;

function InputDatePicker(props) {
  return (
    <Picker>
      <DateView />
    </Picker>
  );
}

InputDatePicker.propTypes = {};

export default InputDatePicker;
