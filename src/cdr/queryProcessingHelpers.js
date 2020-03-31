/**
 * If time is in format returned from CDR, then make more human readable by removing T and
 * milliseconds. Otherwise leave alone generally.
 * @param time
 * @returns {string}
 */
// eslint-disable-next-line import/prefer-default-export
export function formatTime(time) {
  return time.indexOf('.') !== -1 ? time.replace(/T/, ' ')
    .substring(0, time.indexOf('.')) : time.replace(/T/, ' ');
}
