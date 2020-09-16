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
