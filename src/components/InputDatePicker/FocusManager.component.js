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
      {...omit(props, ["onFocusIn", "onFocusOut"])}
      tabIndex={0}
      onFocus={onFocus}
      onBlur={onBlur}
    ></div>
  );
}

export default FocusManager;
