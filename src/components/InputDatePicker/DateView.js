import React from "react";
import ViewLayout from "./ViewLayout";
import DatePicker from "./DatePicker";
import { TertiaryIconButton } from "../Button";

function DateView(props) {
  const { calendar, selectedDate } = props;
  return (
    <ViewLayout
      bodyElement={
        <DatePicker calendar={calendar} selectedDate={selectedDate} />
      }
      header={{
        leftElement: <TertiaryIconButton icon="arrowleft" />,
        middleElement: <p>month year</p>,
        rightElement: <TertiaryIconButton icon="arrowright" />
      }}
    />
  );
}

DateView.propTypes = {
  ...DatePicker.PropTypes
};

export default DateView;
