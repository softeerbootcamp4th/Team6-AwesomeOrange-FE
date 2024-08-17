import makeUUID from "./makeUUID.js";

class DrawPolicyData {
  constructor(rawData) {
    if (Array.isArray(rawData)) {
      const mapArr = rawData.map(({ id, ...rest }) => {
        return [
          `determined_${id}`,
          {
            id,
            ...rest,
          },
        ];
      });

      this.map = new Map(mapArr);
    } else if (rawData instanceof Map) this.map = new Map(rawData);
    else this.map = new Map();
  }
  get size() {
    return this.map.size;
  }
  add(data) {
    const newData = new DrawPolicyData(this.map);
    newData.map.set(`user_created_${makeUUID()}`, data);
    return newData;
  }
  delete(key) {
    const newData = new DrawPolicyData(this.map);
    newData.map.delete(key);
    return newData;
  }
  modify(key, data = {}) {
    const newData = new DrawPolicyData(this.map);
    const oldItem = newData.map.get(key);
    newData.map.set(key, { ...oldItem, ...data });
    return newData;
  }
  *[Symbol.iterator]() {
    for (let [key, item] of this.map) {
      yield { key, ...item };
    }
  }
  toJSON() {
    return [...this.map.values()];
  }
}

export default DrawPolicyData;
