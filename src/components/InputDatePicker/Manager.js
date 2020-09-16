import React, { useState } from "react";
import DateContext from "./Context";
import { dateToStr, strToDate, isDateValid } from "./date-extraction";

function Manager(props) {
  const [date, setDate] = useState(null);
  const [textInput, setTextInput] = useState("");
  const [errors, setErrors] = useState([]);
  
  return (
    <DateContext.Provider
      value={{
        value: {
          textInput,
          date
        },
        onSelectDate: (event, date) => {
          setDate(date);
          setTextInput(dateToStr(date));
          if (props.onChange) {
            props.onChange(event, { date, errors, origin: 'PICKER' });
          }
        },
        onInputChange: event => {
          const textInput = event.target.value;
          setTextInput(textInput);
          if (textInput) {
            try {
              const date = strToDate(textInput);
              setDate(date);
            } catch (dateErrors) {
              setErrors(dateErrors);
              setDate(null);
            }
          } else {
            setDate(null);
          }
          if (props.onChange) {
            props.onChange(event, { date, errors });
          }
        }
      }}
    >
      {props.children}
    </DateContext.Provider>
  );
}

export default Manager;
