import { http, HttpResponse } from "msw";
import getRandomString from "@common/mock/getRandomString";

function getRandomUsers() {
  let users = [];
  const num = 15;
  for (let i = 0; i < num; i++) {
    users = [
      ...users,
      {
        id: i,
        userName: getRandomString(3),
        phoneNumber: "010-0000-0000",
        frameId: "event-test",
      },
    ];
  }
  return { users: users, totalPage: 15 };
}

const handlers = [http.get("/api/v1/admin/event-users", () => HttpResponse.json(getRandomUsers()))];

export default handlers;
