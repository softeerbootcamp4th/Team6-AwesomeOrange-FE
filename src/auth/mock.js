import { http, HttpResponse } from "msw";

const handlers = [
  http.post("/api/v1/event-user/send-auth", async ({ request }) => {
    const { name, phoneNumber } = await request.json();
    if (phoneNumber === "01019991999")
      return HttpResponse.json(
        { error: "중복된 사용자가 있음" },
        { status: 409 },
      );
    if (name.length < 2)
      return HttpResponse.json(
        { error: "응답 내용이 잘못됨" },
        { status: 400 },
      );
    if (phoneNumber.length >= 12)
      return HttpResponse.json(
        { error: "응답 내용이 잘못됨" },
        { status: 400 },
      );

    return HttpResponse.json({ return: true });
  }),
];

export default handlers;
