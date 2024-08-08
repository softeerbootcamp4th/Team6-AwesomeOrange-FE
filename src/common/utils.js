export function clamp(target, min, max) {
  if (target < min) return min;
  if (target > max) return max;
  return target;
}

export function linearMap(ratio, min, max) {
  return ratio * (max - min) + min;
}

const HOURS = 24;
const MINUTES = 60;
const SECONDS = 60;

export function padNumber(number)
{
  return number.toString().padStart(2, "0")
}

export function convertSecondsToString(time)
{
  if(time < 0) return "00 : 00 : 00";

  const days = Math.floor(time / (HOURS * MINUTES * SECONDS));
  const hours = Math.floor( time / (MINUTES * SECONDS) ) % HOURS;
  const minutes = Math.floor( time / (SECONDS) ) % MINUTES;
  const seconds = time % SECONDS;

  return `${days > 0 ? days + " : " : ""}${[hours, minutes, seconds].map(padNumber).join(" : ")}`
}