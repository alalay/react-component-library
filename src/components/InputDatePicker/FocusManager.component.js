import React from "react";
import omit from "lodash/omit";

function FocusManager(props) {
  let timeout;
  const onFocus = () => {
    if (timeout) {
      clearTimeout(timeout);
    }
    if (props.onFocusIn) {
      props.onFocusIn();
    }
  };
  const onBlur = () => {
    timeout = setTimeout(() => {
      if (props.onFocusOut) {
        props.onFocusOut();
      }
    });
  };

  return (
    <div
      onFocus={onFocus}
      onBlur={onBlur}
      {...omit(props, ["onFocusIn", "onFocusOut"])}
    ></div>
  );
}

export default FocusManager;
