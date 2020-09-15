import React from "react";
import chunk from "lodash/chunk";
import format from "date-fns/format";
import addMonths from "date-fns/addMonths";
import styled, { css } from "styled-components";
import { neutral } from "../../utils";
import { TertiaryButton } from "../Button";

const pickerAction = props => css`
  font-size: 1.2rem;
`;

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
  ${pickerAction}

  height: 5.7rem;
  width: 100%;

  background: transparent;
  border: none;
  padding: 0;
`;

function buildMonths(size) {
  const months = new Array(12)
    .fill(0)
    .map((_, i) => i)
    .map(monthIndex => ({
      index: monthIndex,
      name: format(addMonths(new Date(0), monthIndex), "MMMM")
    }));
  return chunk(months, size);
}

function MonthPicker(props) {
  const months = buildMonths(3);
  return (
    <MonthTable>
      <tbody>
        {months.map(row => (
          <MonthRow>
            {row.map(month => (
              <MonthCol>
                <MonthButton
                  onClick={event => props.onSelect(event, month.index)}
                >
                  {month.name}
                </MonthButton>
              </MonthCol>
            ))}
          </MonthRow>
        ))}
      </tbody>
    </MonthTable>
  );
}

export default MonthPicker;
