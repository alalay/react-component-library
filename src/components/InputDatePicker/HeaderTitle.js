import React from "react";
import PropTypes from "prop-types";
import format from "date-fns/format";
import { TertiaryButton } from "../Button";
import DropdownButton from "../DropdownButton";
import YearPicker from "./YearPicker";
import styled from "styled-components";
import { spacing } from "../../utils";

const HeaderTitleContainer = styled.div`
  display: flex;
  align-items: center;
`;

const MonthLabel = styled.span`
  margin-right: ${spacing.padding.small};
`;

function HeaderTitle(props) {
  const { year, monthIndex, onTitleClick, onSelectYear } = props;
  const firstDayOfMonth = new Date(year, monthIndex);
  const monthLabel = format(firstDayOfMonth, "MMMM");
  const yearLabel = format(firstDayOfMonth, "yyyy");
  if (onSelectYear) {
    return (
      <HeaderTitleContainer>
        <MonthLabel>{monthLabel}</MonthLabel>
        <DropdownButton title={yearLabel}>
          <YearPicker selectedYear={year} onSelectYear={onSelectYear} />
        </DropdownButton>
      </HeaderTitleContainer>
    );
  }
  return (
    <TertiaryButton modifiers={["small"]} onClick={onTitleClick}>
      {monthLabel} {yearLabel}
    </TertiaryButton>
  );
}

HeaderTitle.propTypes = {
  year: PropTypes.number,
  monthIndex: PropTypes.number,
  onTitleClick: PropTypes.func,
  onSelectYear: PropTypes.func
};

export default HeaderTitle;
