/**
 * Convert date to yyyy-mm-dd format
 * @param {Date} date Date object to be converted
 */
export function formatDate(date) {
  let d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

export function formatDate1(date) {
  // TODO: define this constants from i18n
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  let d = new Date(date);
  let year = d.getFullYear();
  let day = "" + d.getDate();
  if (day.length < 2) day = "0" + day;

  return [year, months[d.getMonth()], day].join(" ");
}
