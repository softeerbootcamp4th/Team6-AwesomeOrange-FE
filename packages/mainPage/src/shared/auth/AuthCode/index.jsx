import { useState } from "react";
import InputWithTimer from "./InputWithTimer.jsx";
import useTimer from "./useTimer.js";
import submitAuthCode from "./submitAuthCode.js";
import requestAuthCode from "../requestAuthCode.js";
import Button from "@common/components/Button.jsx";

const AUTH_MAX_DURATION = 5 * 60;

function AuthSecondSection({ name, phone, onComplete }) {
  // 상태
  const [authCode, setAuthCode] = useState("");
  const [timer, resetTimer] = useTimer(AUTH_MAX_DURATION);
  const [errorMessage, setErrorMessage] = useState("");

  // 인증코드 재전송 동작
  function retryAuthCode() {
    requestAuthCode(name, phone)
      .then(() => {
        setErrorMessage("");
        setAuthCode("");
        resetTimer();
      })
      .catch((error) => setErrorMessage(error.message));
  }

  // 인증코드 전송 동작
  function onSubmit(e) {
    e.preventDefault();
    submitAuthCode(name, phone, authCode)
      .then((token) => {
        setErrorMessage("");
        onComplete(token, true);
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  }

  const josa = "013678".includes(phone[phone.length - 1]) ? "으" : "";
  return (
    <div className="w-full h-[calc(100svh-2rem)] max-h-[40.625rem] p-6 min-[520px]:px-20 py-10 relative flex flex-col gap-14">
      <p className="text-body-l font-bold text-neutral-700" aria-live="polite">
        {phone}
        {josa}로<br />
        인증번호를 전송했어요.
      </p>
      <form
        className="flex flex-col flex-grow w-full relative pb-4 gap-4 group"
        onSubmit={onSubmit}
      >
        <div className="flex flex-col flex-grow justify-center items-center gap-7 px-0.5 relative h-0">
          <InputWithTimer
            text={authCode}
            setText={setAuthCode}
            timer={timer}
            required
            minLength="6"
            maxLength="6"
            placeholder="인증번호를 입력해주세요"
            isError={errorMessage !== "" || timer === 0}
          />
          <span className="absolute bottom-5 text-detail-l font-bold text-red-400">
            {errorMessage || (timer === 0 ? "입력시간이 종료되었습니다." : "")}
          </span>
        </div>
        <div className="w-full flex flex-wrap justify-center gap-5">
          <Button styleType="filled" type="submit" className="w-36 min-h-14" disabled={timer === 0}>
            인증 완료하기
          </Button>
          <Button styleType="ghost" type="button" className="min-h-14" onClick={retryAuthCode}>
            재전송
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AuthSecondSection;
