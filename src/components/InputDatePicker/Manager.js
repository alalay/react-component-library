import React, { useState } from "react";
import DateContext from "./Context";
import { dateToStr, strToDate } from "./date-extraction";

function Manager(props) {
  const [date, setDate] = useState(null);
  const [textInput, setTextInput] = useState("");
  const [errors, setErrors] = useState([]);

  function onChange(event, payload) {
    if (props.onChange) {
      props.onChange(event, payload);
    }
  }

  return (
    <DateContext.Provider
      value={{
        value: {
          textInput,
          date
        },
        onSelectDate: (event, date) => {
          const dateString = dateToStr(date)
          setDate(date);
          setErrors([]);
          setTextInput(dateString);
          onChange(event, {
            date,
            textInput: dateString,
            errors: [],
            origin: "PICKER"
          });
        },
        onInputChange: event => {
          let errors = [];
          const textInput = event.target.value;
          setTextInput(textInput);
          let date = null;
          if (textInput) {
            try {
              date = strToDate(textInput);
            } catch (dateErrors) {
              console.log(dateErrors[0]);

              errors = errors.concat(dateErrors);
            }
          }
          setErrors(errors);
          setDate(date);

          onChange(event, { date, textInput, errors, origin: "INPUT" });
        }
      }}
    >
      {props.children}
    </DateContext.Provider>
  );
}

export default Manager;
