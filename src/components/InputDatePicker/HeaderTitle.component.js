import React from "react";
import format from "date-fns/format";
import styled from 'styled-components'

import { TertiaryButton } from "../Button";
import DropdownButton from "./DropdownButton.component";
import YearPicker from "./YearPicker.component";
import { spacing } from "../../utils";

const HeaderContainer  = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${spacing.padding.small};
`;

function HeaderTitle(props) {
  const { year, monthIndex, onTitleClick } = props;
  const yearLabel = format(new Date(year, monthIndex), "yyyy");
  const monthLabel = format(new Date(year, monthIndex), "MMMM");

  if (!props.withYearPicker) {
    return (
      <div>
        <TertiaryButton modifiers={["small"]} onClick={onTitleClick}>
          {monthLabel} {yearLabel}
        </TertiaryButton>
      </div>
    );
  }
  return (
    <HeaderContainer>
      <span>{monthLabel}</span>
      <DropdownButton title={yearLabel}>
        <YearPicker selectedYear={year} onSelectYear={props.onSelectYear} />
      </DropdownButton>
    </HeaderContainer>
  );
}

export default HeaderTitle;
