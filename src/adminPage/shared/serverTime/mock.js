import { http, HttpResponse } from "msw";

const handlers = [
  http.get("/api/serverTime", () => {
    return HttpResponse.json({ timestamp: new Date() });
  }),
];

export default handlers;
