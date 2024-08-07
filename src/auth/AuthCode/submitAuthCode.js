import { fetchServer, handleError } from "@/common/fetchServer.js";
import { EVENT_ID } from "@/common/constants.js";

async function submitAuthCode(name, phoneNumber, authCode) {
  try {
    const body = {
      name,
      phoneNumber: phoneNumber.replace(/\D+/g, ""),
      authCode,
    };
    const { token } = await fetchServer(
      `/api/v1/event-user/check-auth/${EVENT_ID}`,
      {
        method: "post",
        body,
      },
    );
    return token;
  } catch (e) {
    return handleError({
      400: "잘못된 요청 형식입니다.",
      401: "인증번호가 틀렸습니다. 다시 입력하세요.",
    })(e);
  }
}

export default submitAuthCode;
