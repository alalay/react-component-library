import React from "react";
import PropTypes from "prop-types";
import DateView from "./DateView";
import styled from "styled-components";
import { spacing } from "../../utils";

const Picker = styled.div`
  width: 29rem;
  height: 34rem;
  padding: ${spacing.padding.normal};
`;

function InputDatePicker(props) {
  return (
    <Picker>
      <DateView
        calendar={{ year: 2020, monthIndex: 8 }}
        selectedDate={new Date(2020, 8, 29)}
      />
    </Picker>
  );
}

InputDatePicker.propTypes = {};

export default InputDatePicker;
