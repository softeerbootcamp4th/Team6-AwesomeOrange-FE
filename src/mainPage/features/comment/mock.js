import { http, HttpResponse } from "msw";
import { makeLorem } from "@common/mock/utils.js";

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

const commentSet = new Set();

const handlers = [
  http.get("/api/v1/comment/info", ({ request }) => {
    const token = request.headers.get("authorization");

    if (token === null) return HttpResponse.json({ submitted: false });
    return HttpResponse.json({ submitted: false });
  }),
  http.get("/api/v1/comment/:eventFrameId", () => {
    return HttpResponse.json({ comments: getCommentMock() });
  }),
  http.post("/api/v1/comment/:eventFrameId", async ({ request }) => {
    const token = request.headers.get("authorization");

    if (token === null) return HttpResponse.json(false, { status: 401 });

    const { content } = await request.json();

    if (commentSet.has(token)) return HttpResponse.json(true, { status: 409 });
    if (content.includes("시발"))
      return HttpResponse.json(true, { status: 400 });

    commentSet.add(token);
    return HttpResponse.json(true, { status: 200 });
  }),
];

export default handlers;
