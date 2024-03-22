/**
 * Given a time in seconds, returns a string of the time with the following format: hh:mm:ss
 * @param time The duration.
 * @returns A string of the time with the following ofrmat: hh:mm:ss
 */
export const formatTimestamp = (time: number) => {
  const seconds = Math.floor(time % 60);
  const minutes = Math.floor(time / 60) % 60;
  const hours = Math.floor(time / 3600);

  if (hours === 0) {
    return `${minutes}:${leadingZeroFormatter.format(seconds)}`;
  } else {
    return `${hours}:${leadingZeroFormatter.format(
      minutes
    )}:${leadingZeroFormatter.format(seconds)}`;
  }
};

const leadingZeroFormatter = new Intl.NumberFormat("en-US", {
  minimumIntegerDigits: 2,
});
