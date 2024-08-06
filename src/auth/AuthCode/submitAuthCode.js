import { fetchServer, HTTPError } from "@/common/fetchServer.js";
import { EVENT_ID } from "@/common/constants.js";

async function submitAuthCode(name, phoneNumber, authCode) {
  try {
    const body = {
      name,
      phoneNumber: phoneNumber.replace(/\D+/g, ""),
      authCode,
    };
    await fetchServer(`/api/v1/event-user/check-auth/${EVENT_ID}`, {
      method: "post",
      body,
    });
    return "";
  } catch (e) {
    if (e instanceof HTTPError) {
      if (e.status === 400) throw new Error("잘못된 요청 형식입니다.");
      if (e.status === 401)
        throw new Error("인증번호가 틀렸습니다. 다시 입력하세요.");
      throw new Error("서버와의 통신 중 오류가 발생했습니다.");
    }
    console.error(e);
    throw new Error("알 수 없는 오류입니다. 프론트엔드 개발자에게 제보하세요.");
  }
}

export default submitAuthCode;
