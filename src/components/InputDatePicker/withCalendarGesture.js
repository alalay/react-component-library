import React from "react";
import keycode from "keycode";
import omit from "lodash/omit";

const FIRST = 0;
const LAST = Number.POSITIVE_INFINITY;

function focusOn(element) {
  if (element) {
    element.focus();
  }
}
/**
 * 1.尝试focus到选中的日期/月份上
 * 2.尝试focus到当月的第一天
 */
export function focusOnCalendar(calendarRef) {
  let target = calendarRef.querySelector("td > button[aria-current]");
  if (!target) {
    target = calendarRef.querySelector("td > button[data-value]");
  }

  focusOn(target);
}

function getDay(calendarRef, indexToFocus) {
  const allItems = calendarRef.querySelectorAll("td > button[data-value]");
  const index =
    indexToFocus < 0 ? indexToFocus + allItems.length : indexToFocus;
  return allItems[index];
}

function focusOnDay(
  calendarRef,
  indexToFocus,
  { goToNextMonth, goToPreviousMonth } = {}
) {
  const allItems = calendarRef.querySelectorAll("td > button[data-value]");
  if (indexToFocus > allItems.length - 1) {
    goToNextMonth();
    setTimeout(() => {
      focusOn(getDay(calendarRef, indexToFocus - allItems.length));
    });
  } else if (indexToFocus < 0) {
    goToPreviousMonth();
    setTimeout(() => {
      focusOn(getDay(calendarRef, indexToFocus));
    });
  } else {
    focusOn(allItems[indexToFocus]);
  }
}
function focusWithinCalendar(calendarRef, indexToFocus) {
  const allItems = calendarRef.querySelectorAll("td > button[data-value]");
  if (indexToFocus < 0) {
    focusOn(allItems[0]);
  } else if (indexToFocus > allItems.length - 1) {
    focusOn(allItems[allItems.length - 1]);
  } else {
    focusOn(allItems[indexToFocus]);
  }
}
/**
 * 1.切换月份
 * 2.focus到相同的日期上。
 * @param {*} calendarRef
 * @param {*} indexToFocus
 * @param {*} monthSwitcher
 */
function switchMonth(calendarRef, indexToFocus, monthSwitcher) {
  monthSwitcher();
  setTimeout(() => {
    focusWithinCalendar(calendarRef, indexToFocus);
  });
}

export default function withCalendarGesture(WrappedComponent) {
  function CalenaderGesture(props) {
    const { goToNextMonth, goToPreviousMonth } = props;
    function onKeyDown(event, calendarRef, dayIndex) {
      switch (event.keyCode) {
        case keycode.codes.down:
          event.stopPropagation();
          focusOnDay(calendarRef, dayIndex + 7, { goToNextMonth });
          break;
        case keycode.codes.up:
          event.stopPropagation();
          focusOnDay(calendarRef, dayIndex - 7, { goToPreviousMonth });
          break;
        case keycode.codes.right:
          event.stopPropagation();
          focusOnDay(calendarRef, dayIndex + 1, { goToNextMonth });
          break;
        case keycode.codes.left:
          event.stopPropagation();
          focusOnDay(calendarRef, dayIndex - 1, { goToPreviousMonth });
          break;
        case keycode.codes["page up"]:
          event.stopPropagation();
          switchMonth(calendarRef, dayIndex, goToPreviousMonth);
          break;
        case keycode.codes["page down"]:
          event.stopPropagation();
          switchMonth(calendarRef, dayIndex, goToNextMonth);
          break;
        case keycode.codes.home:
          event.stopPropagation();
          focusWithinCalendar(calendarRef, FIRST);
          break;
        case keycode.codes.end:
          event.stopPropagation();
          focusWithinCalendar(calendarRef, LAST);
          break;
        default:
          break;
      }
    }
    return <WrappedComponent {...props} onKeyDown={onKeyDown} />;
  }

  return CalenaderGesture;
}

export function withMonthCalendarGesture(WrappedComponent, rowSize) {
  class MonthCalendarGesture extends React.Component {
    constructor(props) {
      super(props);
      this.onKeyDown = this.onKeyDown.bind(this);
      this.preventScroll = this.preventScroll.bind(this);
    }

    componentDidMount() {
      this.ref.addEventListener("keydown", this.preventScroll);
    }

    componentWillUnmount() {
      this.ref.removeEventListener("keydown", this.preventScroll);
    }

    onKeyDown(event, calendarRef, monthIndex) {
      switch (event.keyCode) {
        case keycode.codes.left:
          event.stopPropagation();
          focusWithinCalendar(calendarRef, monthIndex - 1);
          break;
        case keycode.codes.right:
          event.stopPropagation();
          focusWithinCalendar(calendarRef, monthIndex + 1);
          break;
        case keycode.codes.up:
          event.stopPropagation();
          focusWithinCalendar(calendarRef, monthIndex - rowSize);
          break;
        case keycode.codes.down:
          event.stopPropagation();
          focusWithinCalendar(calendarRef, monthIndex + rowSize);
          break;
        case keycode.codes.home:
          event.stopPropagation();
          focusWithinCalendar(calendarRef, FIRST);
          break;
        case keycode.codes.end:
          event.stopPropagation();
          focusWithinCalendar(calendarRef, LAST);
          break;
        default:
          break;
      }
    }

    preventScroll(event) {
      const arrows = [
        keycode.codes.left,
        keycode.codes.right,
        keycode.codes.up,
        keycode.codes.down,
        keycode.codes.home,
        keycode.codes.end
      ];
      if (arrows.includes(event.keyCode)) {
        event.preventDefault();
      }
    }

    render() {
      return (
        <div
          ref={ref => {
            this.ref = ref;
          }}
        >
          <WrappedComponent {...this.props} onKeyDown={this.onKeyDown} />
        </div>
      );
    }
  }

  MonthCalendarGesture.propTypes = {
    ...omit(WrappedComponent.propTypes, "onKeyDown")
  };
  MonthCalendarGesture.displayName = `MonthCalendarGesture(${WrappedComponent.displayName})`;

  return MonthCalendarGesture;
}
