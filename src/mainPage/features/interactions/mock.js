import { http, HttpResponse } from "msw";

const eventParticipationDate = {
  dates: ["2024-09-09T06:46:21.585Z", "2024-09-11T06:46:21.585Z", "2024-09-13T06:46:21.585Z"],
};

const handlers = [
  http.get("/api/v1/event/draw/:eventId/participation", () =>
    HttpResponse.json(eventParticipationDate, {status: 404}),
  ),
  http.post("/api/v1/event/draw/:eventId/participation", () => HttpResponse.json(true)),
  http.post("/api/v1/url/shorten", () =>
    HttpResponse.json({
      shortUrl: "o1PiWwlZZU",
    }),
  ),
];

export default handlers;
