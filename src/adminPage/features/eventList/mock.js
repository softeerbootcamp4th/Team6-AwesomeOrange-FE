import { http, HttpResponse } from "msw";
import { makeLorem } from "@common/mock/utils.js";

function getEventsMock() {
  return Array.from({ length: 100 }, (_, i) => {
    const startTime = new Date(
      Date.now() - Math.floor(Math.random() * 86400 * 60 * 1000),
    );
    const endTime = startTime + Math.floor(Math.random() * 86400 * 30) * 1000;

    return {
      name: makeLorem(3, 7),
      eventType: Math.random() > 0.5 ? "fcfs" : "draw",
      startTime,
      endTime,
      eventId: `HD_240808_${i.toString().padStart(3, "0")}`
    };
  });
}

const dummyData = getEventsMock();

const handlers = [
  http.get("/api/v1/admin/events", async ({ request }) => {
    const url = new URL(request.url);
    const search = url.searchParams.get("search");
    const filter = url.searchParams.get("filter");
    const sort = url.searchParams.get("sort");
    const page = +url.searchParams.get("page") ?? 1;
    const size = +url.searchParams.get("size") ?? 5;

    const result = dummyData
      .filter( ({name})=>search === null ? true : name.includes(search) )
      .slice( page * size, (page + 1) * size );

    return HttpResponse.json(result);
  }),
];

export default handlers;
