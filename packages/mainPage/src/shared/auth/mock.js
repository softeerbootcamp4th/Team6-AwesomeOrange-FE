import { http, HttpResponse } from "msw";

function isValidInput(name, phoneNumber) {
  return name.length >= 2 && phoneNumber.length < 12 && phoneNumber.startsWith("01");
}

const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ0ZWFtLW9yYW5nZSIsImlhdCI6MTcyNDA0NDc5MCwiZXhwIjoxNzI0MDQ4MzkwLCJzdWIiOiJldmVudFVzZXIiLCJ1c2VyTmFtZSI6Iuq5gOyCoeu6qSIsInVzZXJJZCI6ImtpbXBpcHB5YXAiLCJyb2xlIjoiZXZlbnRfdXNlciJ9.m5m_PkwmYz5Mt-kjn28435bQtwgph3WO-2J42X82lCg";

const handlers = [
  http.post("/api/v1/event-user/send-auth/:eventFrameId", async ({ request }) => {
    const { name, phoneNumber } = await request.json();
    if (phoneNumber === "01019991999")
      return HttpResponse.json({ error: "중복된 사용자가 있음" }, { status: 409 });
    if (!isValidInput(name, phoneNumber))
      return HttpResponse.json({ error: "응답 내용이 잘못됨" }, { status: 400 });

    return new HttpResponse();
  }),

  http.post("/api/v1/event-user/check-auth/:eventFrameId", async ({ request }) => {
    const { name, phoneNumber, authCode } = await request.json();

    if (!isValidInput(name, phoneNumber))
      return HttpResponse.json({ error: "응답 내용이 잘못됨" }, { status: 400 });
    if (+authCode < 500000 === false)
      return HttpResponse.json({ error: "인증번호 일치 안 함" }, { status: 401 });
    return HttpResponse.json({ token });
  }),

  http.post("/api/v1/event-user/login/:eventFrameId", async ({ request }) => {
    const { name, phoneNumber } = await request.json();

    if (!isValidInput(name, phoneNumber))
      return HttpResponse.json({ error: "응답 내용이 잘못됨" }, { status: 400 });
    if (name !== "오렌지" || phoneNumber !== "01019991999")
      return HttpResponse.json({ error: "사용자 없음" }, { status: 404 });
    return HttpResponse.json({ token });
  }),
];

export default handlers;
