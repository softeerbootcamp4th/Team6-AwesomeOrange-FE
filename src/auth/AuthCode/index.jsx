import { useState } from "react";
import InputWithTimer from "./InputWithTimer.jsx";
import useTimer from "./useTimer.js";
import requestAuthCode from "../requestAuthCode.js";
import Button from "@/common/Button.jsx";

const AUTH_MAX_DURATION = 1 * 60;

function AuthSecondSection({ name, phone }) {
  const [authNumber, setAuthNumber] = useState("");
  const [timer, resetTimer] = useTimer(AUTH_MAX_DURATION);
  const [ errorMessage, setErrorMessage ] = useState("");

  function retryAuthCode(e) {
    e.preventDefault();
    requestAuthCode(name, phone)
      .then( ()=>{
        setErrorMessage("");
        resetTimer();
      })
      .catch( (error)=>setErrorMessage(error.message) );
  }

  const josa = "013678".includes(phone[phone.length - 1]) ? "으" : "";
  return (
    <>
      <p className="text-body-l font-bold text-neutral-700">
        {phone}
        {josa}로<br />
        인증번호를 전송했어요.
      </p>
      <form className="flex flex-col flex-grow w-full relative pb-4 gap-4 group">
        <div className="flex flex-col flex-grow justify-center items-center gap-7 px-0.5 relative h-0">
          <InputWithTimer
            text={authNumber}
            setText={setAuthNumber}
            timer={timer}
            required
            placeholder="인증번호를 입력해주세요"
            isError={errorMessage !== "" || timer === 0}
          />
          <span className="absolute bottom-5 text-detail-l font-bold text-red-400">
            {errorMessage && (timer === 0 ? "입력시간이 종료되었습니다." : "")}
          </span>
        </div>
        <div className="w-full flex justify-center gap-5">
          <Button styleType="filled" type="submit" className="w-36 min-h-14" disabled={timer === 0}>
            인증 완료하기
          </Button>
          <Button styleType="ghost" type="button" className="min-h-14" onClick={retryAuthCode}>
            재전송
          </Button>
        </div>
      </form>
    </>
  );
}

export default AuthSecondSection;
