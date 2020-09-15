import React from "react";

import ViewLayout from "./ViewLayout.component";
import HeaderTitle from "./HeaderTitle.component";
import DatePicker from "./DatePicker.component";
import { TertiaryIconButton } from "../Button";

function euclideanModulo(dividend, divisor) {
  const modulo = ((dividend % divisor) + divisor) % divisor;
  return modulo;
}

function DateView(props) {
  const { onTitleClick } = props;
  const { year, monthIndex } = props.calendar;
  const incrementMonthIndex = monthIncrement => {
    const monthIncremented = euclideanModulo(monthIndex + monthIncrement, 12);
    const yearIncrement = Math.floor((monthIndex + monthIncrement) / 12);
    const yearIncremented = year + yearIncrement;
    props.onSelectMonthYear({
      monthIndex: monthIncremented,
      year: yearIncremented
    });
  };
  const goToPreviousMonth = incrementMonthIndex.bind(null, -1);
  const goToNextMonth = incrementMonthIndex.bind(null, 1);

  return (
    <ViewLayout
      header={{
        leftElement: (
          <TertiaryIconButton
            modifiers={["small"]}
            icon="arrowleft"
            onClick={goToPreviousMonth}
          />
        ),
        middleElement: (
          <HeaderTitle
            year={year}
            monthIndex={monthIndex}
            onTitleClick={onTitleClick}
          />
        ),
        rightElement: (
          <TertiaryIconButton
            modifiers={["small"]}
            icon="arrowright"
            onClick={goToNextMonth}
          />
        )
      }}
      bodyElement={
        <DatePicker
          calendar={props.calendar}
          onSelectDate={props.onSelectDate}
          selectedDate={props.selectedDate}
        />
      }
    />
  );
}
export default DateView;
