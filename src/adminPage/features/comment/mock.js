import { http, HttpResponse } from "msw";

function getRandomString(len) {
  // const startCode = 0xac00;
  // const endCode = 0xd7a3;

  const startCode = 0x0750;
  const endCode = 0x077f;

  let str = "";
  for (let i = 0; i < len; i++) {
    const randomCode =
      Math.floor(Math.random() * (endCode - startCode + 1)) + startCode;
    str += String.fromCharCode(randomCode);
  }

  return str;
}

function getSampleEventList() {
  const len = 10;
  let eventList = [];
  for (let i = 0; i < len; i++) {
    eventList = [
      ...eventList,
      {
        eventId: "HD_240909_00" + i,
        name: getRandomString(10),
      },
    ];
  }
  return eventList;
}

function getSampleCommentList() {
  const len = 15;
  let commentList = [];
  for (let i = 0; i < len; i++) {
    commentList = [
      ...commentList,
      {
        id: i,
        content: getRandomString(50),
        userName: getRandomString(5),
        createdAt: "2024-08-14T07:11:27.244Z",
      },
    ];
  }
  return { comments: commentList };
}

const handlers = [
  http.get("/api/v1/admin/events/hints", () =>
    HttpResponse.json(getSampleEventList()),
  ),
  http.get("/api/v1/admin/comments", () =>
    HttpResponse.json(getSampleCommentList()),
  ),
  http.delete("/api/v1/admin/comments", () => HttpResponse.json(true)),
];

export default handlers;
