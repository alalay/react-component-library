import React from "react";
import styled from "styled-components";

import { buildMonths } from "./generator";
import { TertiaryButton } from "../Button";
import { neutral } from "../../utils";
import { pickerAction } from "./mixins";

const MonthTable = styled.table`
  width: 100%;
  tbody {
    border: 0.1rem solid ${neutral[300]};
  }
`;

const MonthRow = styled.tr`
  border-bottom: 0.1rem solid ${neutral[300]};
  &:last-child {
    border-bottom: none;
  }
`;
const MonthCol = styled.td`
  border-right: 0.1rem solid ${neutral[300]};
  width: 33.3%;
`;
const MonthButton = styled(TertiaryButton)`
  height: 5.7rem;
  width: 100%;

  background: transparent;
  border: none;
  padding: 0;

  ${pickerAction}
`;

function MonthPicker(props) {
  const months = buildMonths(3);
  return (
    <MonthTable>
      <tbody>
        {months.map(row => (
          <MonthRow>
            {row.map(month => {
              const isSelected = month.index === props.selectedMonthIndex;
              const tdProps = {};
              if (isSelected) {
                tdProps["aria-current"] = "date";
              }
              return (
                <MonthCol {...tdProps}>
                  <MonthButton
                    tabIndex={isSelected ? 0 : -1}
                    onClick={event => props.onSelect(event, month.index)}
                    isSelected={isSelected}
                  >
                    {month.name}
                  </MonthButton>
                </MonthCol>
              );
            })}
          </MonthRow>
        ))}
      </tbody>
    </MonthTable>
  );
}

export default MonthPicker;
