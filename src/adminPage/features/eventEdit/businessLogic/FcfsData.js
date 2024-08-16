import makeUUID from "./makeUUID.js";
import { DEFAULT_END_TIME, DEFATLT_PARTICIPANT } from "./constants.js";

const MINUTES = 60 * 1000;
const ONE_DAY = 24 * 60 * MINUTES;

function extractHourMinutes(date) {
  return date.getHours() * 60 + date.getMinutes();
}

function getDefaultFcfsArray(
  startTime,
  endTime,
  config = { start: 0, end: DEFAULT_END_TIME, participantCount: DEFATLT_PARTICIPANT },
) {
  if (startTime === null || endTime === null) return [];

  const TIME_ZONE_OFFSET = new Date().getTimezoneOffset() * MINUTES;
  const startDate = Math.floor(
    (startTime.valueOf() - TIME_ZONE_OFFSET) / ONE_DAY,
  );
  const endDate = Math.floor((endTime.valueOf() - TIME_ZONE_OFFSET) / ONE_DAY);

  const length = endDate - startDate + 1;
  const trueStartDate = startDate * ONE_DAY + TIME_ZONE_OFFSET;

  return Array.from({ length }, (_, i) => {
    const dateValue = trueStartDate + i * ONE_DAY;
    const start =
      dateValue + config.start * MINUTES < startTime
        ? extractHourMinutes(startTime)
        : config.start;
    const end =
      dateValue + config.end * MINUTES > endTime
        ? extractHourMinutes(endTime)
        : config.end;

    return [
      `auto_made_${i}`,
      {
        date: new Date(dateValue),
        start,
        end,
        participantCount: config.participantCount,
        prizeInfo: "",
      },
    ];
  });
}

function convertServerDataToClient({ id, startTime, endTime, ...rest }) {
  const TIME_ZONE_OFFSET = new Date().getTimezoneOffset() * MINUTES;
  const startDate = Math.floor(
    (startTime.valueOf() - TIME_ZONE_OFFSET) / ONE_DAY,
  );
  const trueStartDate = new Date(startDate * ONE_DAY + TIME_ZONE_OFFSET);

  return {
    id,
    date: trueStartDate,
    start: extractHourMinutes(startTime),
    end: extractHourMinutes(endTime),
    ...rest,
  };
}

function convertClientDataToServer({ id, date, start, end, ...rest }) {
  const dateBase = date.valueOf();
  return {
    id,
    startTime: new Date(dateBase + start * MINUTES),
    endTime: new Date(dateBase + end * MINUTES),
    ...rest,
  };
}

class FcfsData {
  constructor(rawData) {
    if (Array.isArray(rawData)) {
      const mapArr = rawData.map((item) => {
        return [`determined_${item.id}`, convertServerDataToClient(item)];
      });

      this.map = new Map(mapArr);
    } else if (rawData instanceof Map) this.map = new Map(rawData);
    else this.map = new Map();
  }
  static fillDefault(startTime, endTime, config) {
    const mapArr = getDefaultFcfsArray(startTime, endTime, config);
    return new FcfsData(new Map(mapArr));
  }
  add(
    data = {
      startTime: null,
      endTime: null,
      participantCount: DEFATLT_PARTICIPANT,
      prizeInfo: "",
    },
  ) {
    const newData = new FcfsData(this.map);
    newData.map.set(`user_created_${makeUUID()}`, data);
    return newData;
  }
  delete(key) {
    const newData = new FcfsData(this.map);
    newData.map.delete(key);
    return newData;
  }
  modify(key, data = {}) {
    const newData = new FcfsData(this.map);
    const oldItem = newData.map.get(key);
    newData.map.set(key, { ...oldItem, ...data });
    return newData;
  }
  modifyAll(data, { startTime, endTime } = {}) {
    const newData = new FcfsData(this.map);
    const { start: newStart, end: newEnd, ...others } = data;
    delete others.date;

    for (let [key, item] of this.map) {
      const itemStartTime = item.date.valueOf() + newStart * MINUTES;
      const itemEndTime = item.date.valueOf() + newEnd * MINUTES;

      const start =
        newStart === undefined
          ? item.start
          : itemStartTime < startTime
            ? extractHourMinutes(startTime)
            : newStart;
      const end =
        newEnd === undefined
          ? item.end
          : itemEndTime > endTime
            ? extractHourMinutes(endTime)
            : newEnd;

      newData.map.set(key, { ...item, start, end, ...others });
    }
    return newData;
  }
  verifyDate(startTime, endTime) {
    const newData = new FcfsData(this.map);
    for (let [key, item] of this.map) {
      const itemStartTime = item.date.valueOf() + item.start * MINUTES;
      const itemEndTime = item.date.valueOf() + item.end * MINUTES;

      if (itemStartTime > endTime || itemEndTime < startTime) {
        newData.map.delete(key);
        continue;
      }
      if (startTime <= itemStartTime && itemEndTime <= endTime) continue;

      const copied = { ...item };
      if (itemEndTime > endTime) copied.end = extractHourMinutes(endTime);
      if (itemStartTime < startTime)
        copied.start = extractHourMinutes(startTime);
      newData.map.set(key, copied);
    }
    return newData;
  }
  *[Symbol.iterator]() {
    for (let [key, item] of this.map) {
      yield { key, ...item };
    }
  }
  toJSON() {
    return [...this.map.values()].map(convertClientDataToServer);
  }
}

export default FcfsData;
