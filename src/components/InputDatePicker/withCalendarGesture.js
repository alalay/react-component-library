import React from "react";
import keycode from "keycode";

const FIRST = 0;
const LAST = Number.POSITIVE_INFINITY;
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

/**
 * Focus on the item within the current calendar.
 * If the day index is out of the calendar's limits, it focuses on the limits.
 */
function focusWithinCurrentCalendar(calendarRef, indexToFocus) {
	const allItems = getAllItems(calendarRef);
	if (indexToFocus === FIRST || indexToFocus < 0) {
		focusOn(allItems[0]);
	} else if (indexToFocus === LAST || indexToFocus > allItems.length - 1) {
		focusOn(allItems[allItems.length - 1]);
	} else {
		focusOn(allItems[indexToFocus]);
	}
}
/**
 * Switch month and focus on the same focused day or the month's limits if it's out of the limits
 */
function switchMonth(calendarRef, indexToFocus, monthSwitcher) {
	monthSwitcher(() => {
		focusOn(focusWithinCurrentCalendar(calendarRef, indexToFocus));
	});
}


export function withCalendarGesture(WrappedComponent) {
  function CalendarGesture(props) {
    function onKeyDown(event, calendarRef, dayIndex) {
      switch (event.keyCode) {
        case keycode.codes.down:
          // 先不stopPropagation
          focusOnDay(calendarRef, dayIndex + 7, props);
          break;
        case keycode.codes.up:
          focusOnDay(calendarRef, dayIndex - 7, props);
          break;
        case keycode.codes.left:
          focusOnDay(calendarRef, dayIndex - 1, props);
          break;
        case keycode.codes.right:
          focusOnDay(calendarRef, dayIndex + 1, props);
          break;
        case keycode.codes["page up"]:
          event.stopPropagation();
          switchMonth(calendarRef, dayIndex, props.goToPreviousMonth);
          break;
        case keycode.codes["page down"]:
          event.stopPropagation();
          switchMonth(calendarRef, dayIndex, props.goToNextMonth);
          break;
        default:
          break;
      }
    }
    return <WrappedComponent {...props} onKeyDown={onKeyDown} />;
  }
  return CalendarGesture;
}
