import { http, HttpResponse } from "msw";

// function delay(ms) {
//   return new Promise((res) => setTimeout(res, ms));
// }

const handlers = [
  http.get("/api/serverTime", () => {
    return HttpResponse.json({ timestamp: "2024-08-08T06:00:00.500+00:00" });
  }),
  http.get("/api/v1/event/fcfs/:eventFrameId/info", () => {
    return HttpResponse.json({
      nowDateTime: "2024-08-08T06:00:10.000Z",
      eventStatus: "progress",
    }, {status: 404});
  }),
  http.get("/api/v1/event/fcfs/participated", async ({ request }) => {
    const token = request.headers.get("authorization");
    if (token === null) return HttpResponse.json({ answerResult: false, winner: false });

    //await delay(10000);

    return HttpResponse.json({ answerResult: false, winner: false });
  }),
  http.post("/api/v1/event/fcfs/:eventFrameId", async ({ request }) => {
    const { eventAnswer } = await request.json();

    const answerResult = eventAnswer === 3;
    const winner = false;

    const token = request.headers.get("authorization");
    if (token === null) return HttpResponse.json(false, { status: 401 });

    if (typeof eventAnswer !== "number")
      return HttpResponse.json(false, { status: 400 });

    return HttpResponse.json({ answerResult, winner });
  }),
];

export default handlers;
