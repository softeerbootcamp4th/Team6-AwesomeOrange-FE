import { http, HttpResponse } from "msw";
import { makeLorem } from "@common/mock/utils.js";

function getEventsMock() {
  return Array.from({ length: 100 }, (_, i) => {
    const startTime = new Date(
      Date.now() - 86400 * 30 * 1000 + Math.floor(Math.random() * 86400 * 60 * 1000),
    );
    const endTime = new Date(startTime.getTime() + Math.floor(Math.random() * 86400 * 120) * 1000);

    return {
      name: makeLorem(3, 7),
      eventType: Math.random() > 0.5 ? "fcfs" : "draw",
      startTime,
      endTime,
      eventId: `HD_240808_${i.toString().padStart(3, "0")}`,
    };
  });
}

const dummyData = getEventsMock();

function filterData(filterParam) {
  const filterKey = filterParam.split(",");
  return function (data) {
    if (filterKey.length === 0) return true;
    for (let key of filterKey) {
      if (key === "fcfs" && data.eventType === "fcfs") return true;
      if (key === "draw" && data.eventType === "draw") return true;
    }
    return false;
  };
}

function compareString(a, b) {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}

function sortData(sortParam) {
  const sortKey = sortParam.split(",").map((keyValue) => keyValue.split(":"));
  return function (a, b) {
    for (let [key, sorter] of sortKey) {
      const pm = sorter === "desc" ? -1 : 1;
      if (key === "eventId") {
        const compared = compareString(a.eventId, b.eventId) * pm;
        if (compared !== 0) return compared;
      }
      if (key === "name") {
        const compared = compareString(a.name, b.name) * pm;
        if (compared !== 0) return compared;
      }
      if (key === "startTime") {
        const compared = (a.startTime - b.startTime) * pm;
        if (compared !== 0) return compared;
      }
      if (key === "endTime") {
        const compared = (a.endTime - b.endTime) * pm;
        if (compared !== 0) return compared;
      }
      if (key === "eventType") {
        const compared = compareString(a.eventType, b.eventType) * pm;
        if (compared !== 0) return compared;
      }
    }
    return 0;
  };
}

const handlers = [
  http.get("/api/v1/admin/events", async ({ request }) => {
    const url = new URL(request.url);
    const search = url.searchParams.get("search");
    const filter = url.searchParams.get("type");
    const sort = url.searchParams.get("sort");
    const page = +url.searchParams.get("page") ?? 1;
    const size = +url.searchParams.get("size") ?? 5;

    const filteredData = dummyData
      .filter(({ name }) => (search === null ? true : name.includes(search)))
      .filter(filterData(filter))
      .sort(sortData(sort));

    const contents = filteredData.slice(page * size, (page+1) * size);

    return HttpResponse.json({
      contents,
      totalPages: Math.ceil(filteredData.length / size),
      number: page,
      size,
    });
  }),
  http.delete("/api/v1/admin/events", async ({ request }) => {
    const { eventIds } = await request.json();

    for (let id of eventIds) {
      const index = dummyData.findIndex(({ eventId }) => eventId === id);
      if (index === -1) continue;
      dummyData.splice(index, 1);
    }

    return HttpResponse.json(true);
  }),
];

export default handlers;
