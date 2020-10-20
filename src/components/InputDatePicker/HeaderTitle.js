import React from "react";
import PropTypes from "prop-types";
import format from "date-fns/format";
import { TertiaryButton } from "../Button";

function HeaderTitle(props) {
  const { year, monthIndex, onTitleClick } = props;
  const firstDayOfMonth = new Date(year, monthIndex);
  const monthLabel = format(firstDayOfMonth, "MMMM");
  const yearLabel = format(firstDayOfMonth, "yyyy");
  return (
    <TertiaryButton modifiers={["small"]} onClick={onTitleClick}>
      {monthLabel} {yearLabel}
    </TertiaryButton>
  );
}

HeaderTitle.propTypes = {
  year: PropTypes.number,
  monthIndex: PropTypes.number,
  onTitleClick: PropTypes.func
};

export default HeaderTitle;
