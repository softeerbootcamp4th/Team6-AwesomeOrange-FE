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

export function padNumber(number) {
  return number.toString().padStart(2, "0");
}

export function convertSecondsToString(time) {
  if (time < 0) return "00 : 00 : 00";

  const days = Math.floor(time / (HOURS * MINUTES * SECONDS));
  const hours = Math.floor(time / (MINUTES * SECONDS)) % HOURS;
  const minutes = Math.floor(time / SECONDS) % MINUTES;
  const seconds = time % SECONDS;

  return `${days > 0 ? days + " : " : ""}${[hours, minutes, seconds].map(padNumber).join(" : ")}`;
}

export function formatDate(rawDate, format) {
  const date = new Date(rawDate);

  const components = {
      'YYYY': date.getFullYear(),
      'YY': String(date.getFullYear()).slice(-2),
      'MM': String(date.getMonth() + 1).padStart(2, '0'),
      'M': date.getMonth() + 1,
      'DD': String(date.getDate()).padStart(2, '0'),
      'D': date.getDate(),
      'hh': String(date.getHours()).padStart(2, '0'),
      'h': date.getHours(),
      'mm': String(date.getMinutes()).padStart(2, '0'),
      'm': date.getMinutes(),
      'ss': String(date.getSeconds()).padStart(2, '0'),
      's': date.getSeconds()
  };

  return format.replace(/YYYY|YY|MM|M|DD|D|hh|h|mm|m|ss|s/g, match => components[match]);
}

export async function getServerPresiseTime() {
  const startClientTime = performance.now();
  const { timestamp: serverTime } = await fetch("/api/serverTime").then((e) =>
    e.json(),
  ).catch( ()=>new Date() );
  const networkPayloadTime = performance.now() - startClientTime;

  return new Date(serverTime).getTime() + networkPayloadTime;
}

export function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
