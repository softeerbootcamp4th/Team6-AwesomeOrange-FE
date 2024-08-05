import { http, HttpResponse } from "msw";

function randArr(arr) {
  let idx = Math.floor(Math.random() * arr.length);
  return arr[idx];
}

function makeLorem(min, max) {
  const loremipsum =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.".split(
      " ",
    );

  let result = [];
  let cnt = Math.floor(Math.random() * (max - min)) + min;
  for (let i = 0; i < cnt; i++) {
    result.push(randArr(loremipsum));
  }
  return result.join(" ");
}

function getCommentMock() {
  return Array.from({ length: 20 }, (_, i) => {
    return {
      id: i * 100 + Math.floor(Math.random() * 99),
      content: makeLorem(5, 12),
      userName: makeLorem(1, 1),
      createdAt: new Date(
        Date.now() - Math.floor(Math.random() * 86400 * 60 * 1000),
      ),
    };
  });
}

const handlers = [
  http.get("/api/v1/comment", async () => {
    return HttpResponse.json({ comments: getCommentMock() });
  }),
];

export default handlers;
