import { http, HttpResponse } from "msw";

function delay(ms)
{
  return new Promise(res=>setTimeout(res, ms));
}

const handlers = [
  http.get("/api/serverTime", () => {
    return HttpResponse.json({ timestamp: "2024-08-08T06:00:00.500+00:00" });
  }),
  http.post("/api/v1/event/fcfs/:eventFrameId", async ({request}) => {
    const { eventAnswer } = await request.json();

    await delay(2000);

    const answerResult = eventAnswer === 3;
    const winner = false;

    const token = request.headers.get("authorization");
    if (token === null) return HttpResponse.json(false, { status: 401 });

    if(typeof eventAnswer !== "number") return HttpResponse.json(false, { status: 400 });

    return HttpResponse.json({answerResult, winner});
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
