class DrawGradeData {
  constructor(rawData) {
    if (rawData == null) this.data = [{ grade: 1, count: 0, prizeInfo: "" }];
    else this.data = [...rawData].sort((a, b) => a.grade - b.grade);
  }
  get size() {
    return this.data.length;
  }
  modify(data) {
    const newData = new DrawGradeData(this.data);
    const key = data.grade - 1;
    newData.data[key] = { ...this.data[key], ...data };
    return newData;
  }
  adjustCount(count) {
    if (count < 1) return this;
    const originLength = this.data.length;
    if (count === originLength) return this;

    const newData = new DrawGradeData(this.data);
    if (count > originLength) {
      for (let i = originLength; i < count; i++) {
        newData.data.push({ grade: i + 1, count: 0, prizeInfo: "" });
      }
    } else newData.data.splice(count, Infinity);
    return newData;
  }
  *[Symbol.iterator]() {
    yield* this.data;
  }
  toJSON() {
    return this.data;
  }
}

export default DrawGradeData;
