import { http, HttpResponse } from "msw";

const eventParticipationDate = {
  dates: ["2024-09-09T06:46:21.585Z", "2024-09-11T06:46:21.585Z", "2024-09-13T06:46:21.585Z"],
};

const handlers = [
  http.get("/api/v1/event/draw/:eventId/participation", ({ request }) => {
    const token = request.headers.get("authorization");
    if (token === null) return HttpResponse.json({ dates: [] });

    return HttpResponse.json(eventParticipationDate);
  }),
  http.post("/api/v1/event/draw/:eventId/participation", ({ request }) => {
    const token = request.headers.get("authorization");
    if (token === null) return HttpResponse.json(false, { status: 401 });

    const dummyTodayStatus = "2024-09-10T12:00:00.000Z";
    if (eventParticipationDate.dates.includes(dummyTodayStatus))
      return HttpResponse.json(false, { status: 409 });

    eventParticipationDate.dates.push("2024-09-10T12:00:00.000Z");
    return HttpResponse.json(true);
  }),
  http.post("/api/v1/url/shorten", () =>
    HttpResponse.json({
      shortUrl: "o1PiWwlZZU",
    }),
  ),
];

export default handlers;
