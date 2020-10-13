import React from "react";
import PropTypes from "prop-types";
import ViewLayout from "./ViewLayout";
import DatePicker from "./DatePicker";
import { TertiaryButton, TertiaryIconButton } from "../Button";

function DateView(props) {
  return (
    <ViewLayout
      header={{
          leftElement: <TertiaryIconButton icon="arrowleft" />,
          middleElement: <p>month year</p>,
          rightElement: <TertiaryIconButton icon="arrowright" />
      }}
      bodyElement={
        <DatePicker
          calendar={{ year: 2020, monthIndex: 8 }}
          selectedDate={new Date(2020, 8, 29)}
        />
      }
      footerElement={<TertiaryButton>today</TertiaryButton>}
    />
  );
}

DateView.propTypes = {};

export default DateView;
