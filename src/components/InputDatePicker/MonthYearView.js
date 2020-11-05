import React from "react";
import PropTypes from "prop-types";
import ViewLayout from "./ViewLayout";
import MonthPicker from "./MonthPicker";
import { TertiaryButton, TertiaryIconButton } from "../Button";
import HeaderTitle from "./HeaderTitle";

function MonthYearView(props) {
  const {
    calendar,
    onSelectMonth,
    onBackClick,
    onSelectYear,
    onClickToday
  } = props;
  const { monthIndex, year } = calendar;
  return (
    <ViewLayout
      header={{
        leftElement: (
          <TertiaryIconButton icon="arrowleft" onClick={onBackClick} />
        ),
        middleElement: <HeaderTitle {...calendar} onSelectYear={onSelectYear} />
      }}
      bodyElement={
        <MonthPicker selectedMonthIndex={monthIndex} onSelect={onSelectMonth} />
      }
      footerElement={
        <TertiaryButton onClick={onClickToday}>today</TertiaryButton>
      }
    />
  );
}

MonthYearView.propTypes = {
  calendar: PropTypes.shape({
    year: PropTypes.number,
    monthIndex: PropTypes.number
  }),
  onSelectMonth: PropTypes.func,
  onSelectYear: PropTypes.func,
  onBackClick: PropTypes.func,
  onClickToday: PropTypes.func
};

export default MonthYearView;
