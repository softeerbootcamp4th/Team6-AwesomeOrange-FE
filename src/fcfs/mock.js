import { http, HttpResponse } from "msw";

const handlers = [
  http.get("/api/serverTime", () => {
    return HttpResponse.json({ timestamp: "2024-08-08T02:46:39.977+00:00" });
  }),
  http.get("/api/v1/event/fcfs/:eventFrameId/info", async ({ request }) => {
    return HttpResponse.json({ nowDateTime: "2024-08-08T12:00:00.000Z", eventStatus: "waiting" });
  }),
];

export default handlers;
