import React from "react";
import PropTypes from "prop-types";
import ViewLayout from "./ViewLayout";
import DatePicker from "./DatePicker";
import HeaderTitle from "./HeaderTitle";
import { TertiaryButton, TertiaryIconButton } from "../Button";

function modulo(m, n) {
  return ((m % n) + n) % n;
}
function DateView(props) {
  const { calendar, onSelectMonthYear } = props;
  const { monthIndex, year } = calendar;

  function incrementMonthIndex(increment) {
    const incrementedMonthIndex = modulo(monthIndex + increment, 12);
    const incrementedYear = year + Math.floor((monthIndex + increment) / 12);
    onSelectMonthYear({
      year: incrementedYear,
      monthIndex: incrementedMonthIndex
    });
  }

  const goToPreviousMonth = incrementMonthIndex.bind(null, -1);
  const goToNextMonth = incrementMonthIndex.bind(null, 1);
  return (
    <ViewLayout
      header={{
        leftElement: (
          <TertiaryIconButton icon="arrowleft" onClick={goToPreviousMonth} />
        ),
        middleElement: <HeaderTitle year={year} monthIndex={monthIndex} />,
        rightElement: (
          <TertiaryIconButton icon="arrowright" onClick={goToNextMonth} />
        )
      }}
      bodyElement={
        <DatePicker calendar={calendar} selectedDate={new Date(2020, 8, 29)} />
      }
      footerElement={<TertiaryButton>today</TertiaryButton>}
    />
  );
}

DateView.propTypes = {
  calendar: DatePicker.propTypes.calendar,
  onSelectMonthYear: PropTypes.func
};

export default DateView;
