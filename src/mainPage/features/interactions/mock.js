import { http, HttpResponse } from "msw";

const handlers = [
  http.get("/api/v1/draw/:eventDrawId", () =>
    HttpResponse.json(["20240909", "20240911"]),
  ),
  http.post("/api/v1/draw/:eventDrawId", () => HttpResponse.json(true)),
];

export default handlers;
