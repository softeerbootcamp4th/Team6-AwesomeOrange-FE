import { http, HttpResponse } from "msw";

const handlers = [
  http.get("/api/serverTime", () => {
    return HttpResponse.json({ timestamp: "2024-08-08T06:00:00.500+00:00" });
  }),
  http.get("/api/v1/event/fcfs/:eventFrameId/info", () => {
    return HttpResponse.json({
      nowDateTime: "2024-08-08T05:00:02.000Z",
      eventStatus: "progress",
    });
  }),
  http.get("/api/v1/event/fcfs/participated", () => {
    return HttpResponse.json({ answerResult: false, winner: false });
  }),
];

export default handlers;
