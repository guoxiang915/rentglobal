/**
 * Convert date to mm:dd AM/PM format
 * @param {Date} date Date object to be converted
 */
export function formatHrMin(date) {
  const d = new Date(date);
  return d.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
}

/**
 * Convert date to yyyy-mm-dd format
 * @param {Date} date Date object to be converted
 */
export function formatDate(date) {
  const d = new Date(date);
  let month = `${d.getMonth() + 1}`;
  let day = `${d.getDate()}`;
  const year = d.getFullYear();

  if (month.length < 2) month = `0${month}`;
  if (day.length < 2) day = `0${day}`;

  return [year, month, day].join('-');
}

/**
 * Convert date to yyyy mon dd format
 * @param {Date} date Date object to be converted
 */
export function formatDate1(date) {
  // TODO: define this constants from i18n
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const d = new Date(date);
  const year = d.getFullYear();
  let day = `${d.getDate()}`;
  if (day.length < 2) day = `0${day}`;

  return [year, months[d.getMonth()], day].join(' ');
}

/**
 * Get weekday of date
 * @param {Date} date Date object to be converted
 */
export function getWeekday(date) {
  const weekdays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  return weekdays[new Date(date).getDay()];
}

/**
 * Get first day of week from date
 * @param {Date} date Date object for getting weekday
 */
export function getFirstDayOfWeek(date) {
  const d = new Date(date);
  return new Date(d.setDate(d.getDate() - d.getDay()));
}

/**
 * Format number with commas per thousands
 */
export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * Format number with spaces per thousands
 */
export function numberWithSpaces(x, length) {
  if (length) {
    return x.toString().padStart(length, '0').replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  } else {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }
}
