import React from "react";
import styled from "styled-components";

import { buildMonths } from "./generator";
import { TertiaryButton } from "../Button";
import { neutral, spacing } from "../../utils";
import { pickerAction } from "./mixins";

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

  ${pickerAction}
`;

function MonthPicker(props) {
  const months = buildMonths(3);
  return (
    <MonthTable>
      {months.map(row => (
        <tr>
          {row.map(month => {
            const isSelected = month.index === props.selectedMonthIndex;
            const tdProps = {};
            if (isSelected) {
              tdProps["aria-current"] = "date";
            }
            return (
              <MonthCell {...tdProps}>
                <MonthButton
                  tabIndex={isSelected ? 0 : -1}
                  onClick={event => props.onSelect(event, month.index)}
                  isSelected={isSelected}
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

export default MonthPicker;
