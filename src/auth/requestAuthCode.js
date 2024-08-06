import { fetchServer, HTTPError } from "@/common/fetchServer.js";

async function requestAuthCode(name, phoneNumber) {
  try {
    const body = { name, phoneNumber: phoneNumber.replace(/\D+/g, "") };
    await fetchServer("/api/v1/event-user/send-auth", {
      method: "post",
      body,
    });
    return "";
  } catch (e) {
    if (e instanceof HTTPError) {
      if (e.status === 400) throw new Error("잘못된 요청 형식입니다.");
      if (e.status === 409) throw new Error("등록된 참여자 정보가 있습니다.");
      throw new Error("서버와의 통신 중 오류가 발생했습니다.");
    }
    console.error(e);
    throw new Error("알 수 없는 오류입니다. 프론트엔드 개발자에게 제보하세요.");
  }
}

export default requestAuthCode;
