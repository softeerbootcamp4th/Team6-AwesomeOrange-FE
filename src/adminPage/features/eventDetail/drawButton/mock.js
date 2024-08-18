import { http, HttpResponse } from "msw";

let result = [];

const handlers = [
  http.post("/api/v1/admin/draw/:eventId/draw", () => {
    result = [
      {
        "ranking": 1,
        "name": "김삡뺩",
        "phoneNumber": "010-1234-5678"
      },
      {
        "ranking": 1,
        "name": "이삡뺩",
        "phoneNumber": "010-9012-3456"
      }
    ]
    return new HttpResponse(null, { status: 201 });
  }),
  http.get("/api/v1/admin/draw/:eventId/winners", () => {
    return HttpResponse.json(result);
  }),
];

export default handlers;
