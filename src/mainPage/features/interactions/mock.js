import { http, HttpResponse } from "msw";

const eventParticipationDate = {
  dates: ["2024-09-09T06:46:21.585Z", "2024-09-11T06:46:21.585Z", "2024-09-13T06:46:21.585Z"],
};

const handlers = [
  http.get("/api/v1/event/draw/:eventId/participation", () =>
    HttpResponse.json(eventParticipationDate),
  ),
  http.post("/api/v1/event/draw/:eventId/participation", () => HttpResponse.json(true)),
];

export default handlers;
