import { http, HttpResponse } from "msw";

const handlers = [
  http.post("/api/v1/admin/auth/signin", async ({ request }) => {
    const { username, password } = await request.json();
    if (username !== "admin" && password !== "password1!") {
      return HttpResponse.json({ return: false }, { status: 401 });
    }

    return HttpResponse.json({ token: "test_token" });
  }),
];

export default handlers;
