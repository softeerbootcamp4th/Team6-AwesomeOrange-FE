import { fetchServer, handleError } from "@/common/dataFetch/fetchServer.js";

async function requestLogin(name, phoneNumber) {
  try {
    const body = { name, phoneNumber: phoneNumber.replace(/\D+/g, "") };
    const { token } = await fetchServer("/api/v1/event-user/login", {
      method: "post",
      body,
    });
    return token;
  } catch (e) {
    return handleError({
      400: "잘못된 요청 형식입니다.",
      404: "등록된 참여자 정보가 없습니다.",
    })(e);
  }
}

export default requestLogin;
