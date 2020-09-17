import React from "react";
import keycode from "keycode";

/**
 * Focus management on calendar:
 * 1. try to focus on the selected item;
 * 2. try to focus on 1st not disabled item;
 *
 * @param {ref} containerRef
 */
export function focusOnCalendar(containerRef) {
  // try to focus on the selected date
  let target = containerRef.querySelector('td[aria-current="date"] > button');
  if (!target) {
    // try to focus on 1st not disabled item
    target = containerRef.querySelector("td > button[disabled=false]");
  }

  if (!target) {
    target = containerRef.querySelector("td > button[data-value]");
  }

  if (target) {
    target.focus();
  }
}

function getAllItems(containerRef) {
  return containerRef.querySelectorAll("td > button[data-value]");
}
function focusOn(element) {
  if (element) {
    element.focus();
  }
}
function getDay(containerRef, index) {
  const allItems = getAllItems(containerRef);
  const indexToFocus = index < 0 ? allItems.length + index : index;
  return allItems[indexToFocus];
}
function focusOnDay(
  containerRef,
  indexToFocus,
  { goToPreviousMonth, goToNextMonth }
) {
  const allItems = getAllItems(containerRef);
  if (indexToFocus > allItems.length - 1) {
    goToNextMonth();
    setTimeout(() => {
      focusOn(getDay(containerRef, indexToFocus - allItems.length));
    });
  } else if (indexToFocus < 0) {
    goToPreviousMonth();
    setTimeout(() => {
      focusOn(getDay(containerRef, indexToFocus));
    });
  } else {
    focusOn(allItems[indexToFocus]);
  }
}

export function withCalendarGesture(WrappedComponent) {
  function CalendarGesture(props) {
    function onKeyDown(event, containerRef, dayIndex) {
      switch (event.keyCode) {
        case keycode.codes.down:
          // 先不stopPropagation
          focusOnDay(containerRef, dayIndex + 7, props);
          break;
        case keycode.codes.up:
          focusOnDay(containerRef, dayIndex - 7, props);
          break;
        case keycode.codes.left:
          focusOnDay(containerRef, dayIndex - 1, props);
          break;
        case keycode.codes.right:
          focusOnDay(containerRef, dayIndex + 1, props);
          break;
        default:
          break;
      }
    }
    return <WrappedComponent {...props} onKeyDown={onKeyDown} />;
  }
  return CalendarGesture;
}
