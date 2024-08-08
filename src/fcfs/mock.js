import { http, HttpResponse } from "msw";

const handlers = [
  http.get("/api/serverTime", () => {
    return HttpResponse.json({ timestamp: "2024-08-08T02:00:00.500+00:00" });
  }),
  http.get("/api/v1/event/fcfs/:eventFrameId/info", async ({ request }) => {
    return HttpResponse.json({ nowDateTime: "2024-08-08T05:00:02.000Z", eventStatus: "waiting" });
  }),
  http.get("/api/v1/event/fcfs/participated", async ({ request }) => {
    return HttpResponse.json({ answerResult: true, winner: false });
  }),
];

export default handlers;
