import React, { useContext } from "react";
import DateContext from "./Context";
import CalendarPicker from "./CalendarPicker.component";

function Picker(props) {
  const { value, onSelectDate } = useContext(DateContext);
  return (
    <CalendarPicker selectedDate={value.date} onSelectDate={onSelectDate} />
  );
}

export default Picker;
