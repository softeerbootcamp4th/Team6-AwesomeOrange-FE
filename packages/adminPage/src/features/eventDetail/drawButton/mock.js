import { http, HttpResponse } from "msw";
import getRandomString from "@common/mock/getRandomString.js";

let result = [];

function makeDrawComplete() {
  const newResult = [];
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 5 * (1 + i); j++) {
      newResult.push({
        ranking: i + 1,
        name: getRandomString(4),
        phoneNumber:
          "010" +
          Math.floor(Math.random() * 99999999)
            .toString()
            .padStart(8, "0"),
      });
    }
  }
  return newResult;
}

const handlers = [
  http.post("/api/v1/admin/draw/:eventId/draw", () => {
    result = makeDrawComplete();
    return new HttpResponse(null, { status: 201 });
  }),
  http.get("/api/v1/admin/draw/:eventId/winners", () => {
    return HttpResponse.json(result);
  }),
];

export default handlers;