import React from "react";
import ViewLayout from "./ViewLayout.component";
import MonthPicker from "./MonthPicker.component";
import HeaderTitle from "./HeaderTitle.component";
import { TertiaryIconButton } from "../Button";

function MonthYearView(props) {
  const { calendar } = props;
  return (
    <ViewLayout
      header={{
        leftElement: (
          <TertiaryIconButton
            modifiers={["small"]}
            icon="arrowleft"
            onClick={props.onSelectDateView}
          />
        ),
        middleElement: (
          <HeaderTitle
            {...calendar}
            withYearPicker
            onSelectYear={props.onSelectYear}
          />
        )
      }}
      bodyElement={
        <MonthPicker
          onSelect={props.onSelectMonth}
          selectedMonthIndex={calendar.monthIndex}
        />
      }
    ></ViewLayout>
  );
}

export default MonthYearView;
