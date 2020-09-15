import React, { useState } from "react";
import DateContext from "./Context";
import { dateToString, stringToDate, isDateValid } from "./date-extraction";

function Manager(props) {
  const [date, setDate] = useState(null);
  const [textInput, setTextInput] = useState("");
  const [error, setError] = useState({});
  return (
    <DateContext.Provider
      value={{
        value: {
          textInput,
          date
        },
        onSelectDate: (event, date) => {
          setDate(date);
          setTextInput(dateToString(date));
          props.onSelectDate(event);
          if (props.onChange) {
            props.onChange(event, date);
          }
        },
        onInputChange: event => {
          const textInput = event.target.value;
          setTextInput(textInput);
          if (textInput) {
            try {
              const date = stringToDate(textInput);
              if (isDateValid(date)) {
                setDate(date);
              }
            } catch (e) {
              setError(e);
              setDate(null);
            }
          } else {
            setDate(null);
          }
        }
      }}
    >
      {props.children}
    </DateContext.Provider>
  );
}

export default Manager;
