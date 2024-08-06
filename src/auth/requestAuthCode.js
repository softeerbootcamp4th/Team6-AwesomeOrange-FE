import { fetchServer, handleError } from "@/common/fetchServer.js";

async function requestAuthCode(name, phoneNumber) {
  try {
    const body = { name, phoneNumber: phoneNumber.replace(/\D+/g, "") };
    await fetchServer("/api/v1/event-user/send-auth", {
      method: "post",
      body,
    });
    return "";
  } catch (e) {
    return handleError({
      400: "잘못된 요청 형식입니다.",
      409: "등록된 참여자 정보가 있습니다."
    })(e);
  }
}

export default requestAuthCode;
