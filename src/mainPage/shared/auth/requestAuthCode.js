import { fetchServer, handleError } from "@/common/dataFetch/fetchServer.js";
import { EVENT_ID } from "@common/constants";

async function requestAuthCode(name, phoneNumber) {
  try {
    const body = { name, phoneNumber: phoneNumber.replace(/\D+/g, "") };
    await fetchServer(`/api/v1/event-user/send-auth/${EVENT_ID}`, {
      method: "post",
      body,
    });
    return "";
  } catch (e) {
    return handleError({
      400: "잘못된 요청 형식입니다.",
      409: "이미 등록된 전화번호가 존재합니다. 하단의 '이미 정보를 입력하신 적이 있으신가요?'를 클릭하세요.",
    })(e);
  }
}

export default requestAuthCode;
