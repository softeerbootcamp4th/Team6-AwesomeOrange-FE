import { http, HttpResponse } from "msw";
// import getRandomString from "@common/mock/getRandomString";

const handlers = [
  http.get("/api/v1/admin/users", () => HttpResponse.json([])),
];

export default handlers;
