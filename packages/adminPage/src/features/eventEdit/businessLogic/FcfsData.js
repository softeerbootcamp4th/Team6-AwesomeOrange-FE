import makeUUID from "./makeUUID.js";
import { DEFAULT_END_TIME, DEFATLT_PARTICIPANT, STEP } from "./constants.js";

const MINUTES = 60 * 1000;
const ONE_DAY = 24 * 60 * MINUTES;

function extractHourMinutes(date) {
  return date.getHours() * 60 + date.getMinutes();
}

function extractDate(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function verityTime(item, { startTime, endTime, prevSnapshot = {} } = {}) {
  const { start, end, date, ...rest } = item;

  let [newStart, newEnd] = [start ?? 0, end ?? DEFAULT_END_TIME].map((e) => Math.round(e / 5) * 5);

  // end가 start보다 더 작으면, 반드시 start가 end보다 더 작도록 치환
  if (newStart >= newEnd) {
    if (prevSnapshot.start !== newStart) {
      if (newEnd === 0) {
        newStart = 0;
        newEnd = newEnd + STEP;
      } else newStart = newEnd - STEP;
    } else {
      if (newStart === DEFAULT_END_TIME) {
        newStart = DEFAULT_END_TIME - STEP;
        newEnd = DEFAULT_END_TIME;
      } else newEnd = newStart + STEP;
    }
  }

  // date를 추가한 타임스탬프를 계산
  const startValue = date.valueOf() + newStart * MINUTES;
  const endValue = date.valueOf() + newEnd * MINUTES;

  // 만약 종료 시간이 전체 시작 시간보다 더 빠르거나, 시작 시간이 전체 종료 시간보다 더 늦는다면 전체를 무효화시킴.(제거)
  if (endTime <= startValue || startTime >= endValue) return null;

  // 시작시간과 종료시간을 전체 시작 시간에 맞도록 클리핑함.
  // 클리핑한 대상의 새로운 시작 시간이 23:55이거나 새로운 종료 시간이 00:00이면 무효한 시간으로 판별.(제거)
  if (startValue < startTime) {
    newStart = extractHourMinutes(startTime);
    if (newStart === DEFAULT_END_TIME) return null;
  }
  if (endValue > endTime) {
    newEnd = extractHourMinutes(endTime);
    if (newEnd === 0) return null;
  }

  return {
    date,
    start: newStart,
    end: newEnd,
    ...rest,
  };
}

function verifyItem(item, { startTime, endTime, prevSnapshot = {} } = {}) {
  const { date, ...rest } = item;

  // 만약 date가 입력 중이라면 item 그대로 반환. date가 빈 값이어도 item 그대로 반환.
  if (!date) return item;

  // date를 수정했을 때, date가 시작점/끝점에 맞도록 date를 조정함.
  let newDate = date;
  const startDate = extractDate(startTime);
  const endDate = extractDate(endTime);

  if (date < startDate || date > endDate) {
    if (prevSnapshot.date !== null) newDate = prevSnapshot.date;
    else if (date < startDate) newDate = startDate;
    else newDate = endDate;
  }

  const verified = verityTime({ date: newDate, ...rest }, { startTime, endTime, prevSnapshot });
  if (verified === null && prevSnapshot.date === null) return prevSnapshot;
  return verified;
}

function verifyItems(map, { startTime, endTime, prevSnapshot = new Map() }) {
  const result = new Map(map);
  for (let [key, unstableItem] of map) {
    const verifiedValue = verifyItem(unstableItem, {
      startTime,
      endTime,
      prevSnapshot: prevSnapshot.get(key),
    });
    if (verifiedValue === null) result.delete(key);
    else result.set(key, verifiedValue);
  }
  return result;
}

function hasDuplicatedDate(newDate, map) {
  if (newDate === undefined) return true;
  if (newDate === null) return false;
  const dateSet = new Set([...map.values()].map(({ date }) => date?.valueOf() ?? null));

  if (dateSet.has(newDate.valueOf())) return true;
  return false;
}

function getDefaultFcfsArray(
  startTime,
  endTime,
  config = { start: 0, end: DEFAULT_END_TIME, participantCount: DEFATLT_PARTICIPANT },
) {
  if (startTime === null || endTime === null) return [];

  const TIME_ZONE_OFFSET = new Date().getTimezoneOffset() * MINUTES;
  const startDate = Math.floor((startTime.valueOf() - TIME_ZONE_OFFSET) / ONE_DAY);
  const endDate = Math.floor((endTime.valueOf() - TIME_ZONE_OFFSET) / ONE_DAY);

  const length = endDate - startDate + 1;
  const baseDate = startDate * ONE_DAY + TIME_ZONE_OFFSET;
  const result = [];

  for (let i = 0; i < length; i++) {
    const rawItem = {
      date: new Date(baseDate + i * ONE_DAY),
      start: config.start ?? 0,
      end: config.end ?? DEFAULT_END_TIME,
      participantCount: config.participantCount ?? DEFATLT_PARTICIPANT,
      prizeInfo: "",
    };

    const item = verifyItem(rawItem, { startTime, endTime });
    if (item !== null) result.push([`auto_made_${i}`, item]);
  }

  return result;
}

function convertServerDataToClient({ id, startTime, endTime, ...rest }) {
  const TIME_ZONE_OFFSET = new Date().getTimezoneOffset() * MINUTES;
  const startTimeDate = new Date(startTime);
  const endTimeDate = new Date(endTime);

  const startDate = Math.floor((startTimeDate.valueOf() - TIME_ZONE_OFFSET) / ONE_DAY);
  const trueStartDate = new Date(startDate * ONE_DAY + TIME_ZONE_OFFSET);

  return {
    id,
    date: trueStartDate,
    start: extractHourMinutes(startTimeDate),
    end: extractHourMinutes(endTimeDate),
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
      const mapArr = rawData.map((item, i) => {
        return [
          item.id === undefined ? `temp_saved_${i}` : `determined_${item.id}`,
          convertServerDataToClient(item),
        ];
      });

      this.map = new Map(mapArr);
    } else if (rawData instanceof Map) this.map = new Map(rawData);
    else this.map = new Map();
  }
  static fillDefault(startTime, endTime, config) {
    const mapArr = getDefaultFcfsArray(startTime, endTime, config);
    return new FcfsData(new Map(mapArr));
  }
  get size() {
    return this.map.size;
  }
  add(
    data = {
      date: null,
      start: 0,
      end: DEFAULT_END_TIME,
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
  modify(key, data, { startTime, endTime }) {
    const newData = new FcfsData(this.map);
    const oldItem = newData.map.get(key);

    const verified = verifyItem(
      { ...oldItem, ...data },
      { startTime, endTime, prevSnapshot: oldItem },
    );
    if (verified === null) newData.map.delete(key);
    else {
      if (hasDuplicatedDate(verified.date, this.map)) verified.date = oldItem.date;

      newData.map.set(key, verified);
    }
    return newData;
  }
  modifyAll(data, { startTime, endTime }) {
    const newData = new FcfsData(this.map);
    for (let [key, value] of this.map) {
      newData.map.set(key, { ...value, ...data });
    }
    newData.map = verifyItems(newData.map, { startTime, endTime, prevSnapshot: this.map });
    return newData;
  }
  verifyDate(startTime, endTime) {
    const verifiedMap = verifyItems(this.map, { startTime, endTime, prevSnapshot: this.map });

    const newData = new FcfsData(verifiedMap);
    return newData;
  }
  *[Symbol.iterator]() {
    for (let [uniqueKey, item] of this.map) {
      yield { uniqueKey, ...item };
    }
  }
  toJSON() {
    return [...this.map.values()].map(convertClientDataToServer);
  }
}

export default FcfsData;
