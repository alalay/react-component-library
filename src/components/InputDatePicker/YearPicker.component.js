import React, { useState } from "react";
import { buildYears } from "./generator";
import styled from "styled-components";
import { TertiaryIconButton, TertiaryButton } from "../Button";

const YearPickerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const YearsList = styled.ol`
  list-style: none;
  padding: 0;
  margin: 0;
`;

function YearPicker(props) {
  const [yearsWindow, setYearsWindow] = useState(
    buildYears(props.selectedYear, 3)
  );
  function getMiddleYear() {
    return yearsWindow[Math.floor(yearsWindow.length / 2)];
  }
  function scroll(pace) {
    setYearsWindow(buildYears(getMiddleYear() + pace, 3));
  }
  function onWheel(event) {
    event.preventDefault();
    const { deltaY } = event;
    const absolutePath = Math.round(Math.log(Math.abs(deltaY)));
    let pace = deltaY > 0 ? 1 : -1;
    if (absolutePath > 5) {
      pace *= Math.floor(absolutePath / 2);
    }
    scroll(pace);
  }
  const onScrollUp = event => {
    event.stopPropagation();
    scroll(-1);
  };
  const onScrollDown = event => {
    event.stopPropagation();
    scroll(1);
  };
  return (
    <YearPickerContainer onWheel={onWheel}>
      <TertiaryIconButton
        modifiers={["small"]}
        icon="arrowup"
        onClick={onScrollUp}
      />
      <YearsList>
      {yearsWindow.map(year => (
        <li>
          <TertiaryButton
            modifiers={["small"]}
            onClick={event => props.onSelectYear(event, year)}
          >
            {year}
          </TertiaryButton>
        </li>
      ))}
      </YearsList>
      <TertiaryIconButton
        modifiers={["small"]}
        icon="arrowdown"
        onClick={onScrollDown}
      />
    </YearPickerContainer>
  );
}

export default YearPicker;
