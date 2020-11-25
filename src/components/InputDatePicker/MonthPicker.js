import React, { useRef } from "react";
import PropTypes from "prop-types";
import { buildMonths } from "./generator";
import styled, { css } from "styled-components";
import { neutral, spacing, defaultTheme } from "../../utils";
import { TertiaryButton } from "../Button";
import { selectedStyle } from "./mixins";
import { withMonthCalendarGesture } from "./withCalendarGesture";

const MonthTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: ${spacing.padding.normal};
`;

const MonthCell = styled.td`
  width: 33.3%;
  border: 0.1rem solid ${neutral[300]};
`;

const MonthButton = styled(TertiaryButton)`
  height: 5.7rem;
  width: 100%;
  padding: 0;
  font-size: 1.2rem;

  ${selectedStyle}
`;

function MonthPicker(props) {
  const { selectedMonthIndex, onSelect } = props;
  const months = buildMonths();
  const calendarRef = useRef(null);
  return (
    <MonthTable ref={calendarRef}>
      {months.map((row, i) => (
        <tr key={i}>
          {row.map((month, j) => {
            const isSelected = month.index === selectedMonthIndex;
            const buttonProps = { "data-value": month.index };
            if (isSelected) {
              buttonProps["aria-current"] = "month";
            }
            return (
              <MonthCell key={j}>
                <MonthButton
                  isSelected={isSelected}
                  onClick={() => onSelect(month.index)}
                  onKeyDown={e =>
                    props.onKeyDown(e, calendarRef.current, month.index)
                  }
                  {...buttonProps}
                >
                  {month.name}
                </MonthButton>
              </MonthCell>
            );
          })}
        </tr>
      ))}
    </MonthTable>
  );
}

MonthPicker.propTypes = {
  selectedMonthIndex: PropTypes.number,
  onSelect: PropTypes.func
};

export default withMonthCalendarGesture(MonthPicker, 3);
