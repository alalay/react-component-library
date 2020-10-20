import React from "react";
import PropTypes from "prop-types";
import ViewLayout from "./ViewLayout";
import MonthPicker from "./MonthPicker";
import { TertiaryButton, TertiaryIconButton } from "../Button";

function MonthYearView(props) {
  const { calendar, onSelectMonth, onBackClick } = props;
  const { monthIndex, year } = calendar;
  return (
    <ViewLayout
      header={{
        leftElement: (
          <TertiaryIconButton icon="arrowleft" onClick={onBackClick} />
        ),
        middleElement: (
          <span>
            {monthIndex} {year}
          </span>
        )
      }}
      bodyElement={
        <MonthPicker selectedMonthIndex={monthIndex} onSelect={onSelectMonth} />
      }
      footerElement={<TertiaryButton>today</TertiaryButton>}
    />
  );
}

MonthYearView.propTypes = {
  calendar: PropTypes.shape({
    year: PropTypes.number,
    monthIndex: PropTypes.number
  }),
  onSelectMonth: PropTypes.func,
  onBackClick: PropTypes.func
};

export default MonthYearView;
