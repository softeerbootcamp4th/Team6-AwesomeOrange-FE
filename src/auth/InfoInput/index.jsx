import { useState } from "react";
import requestAuthCode from "../requestAuthCode.js";
import Input from "@/common/Input.jsx";
import PhoneInput from "@/common/PhoneInput.jsx";
import Button from "@/common/Button.jsx";

function AuthFirstSection({ name, setName, phone, setPhone, goNext }) {
  const [errorMessage, setErrorMessage] = useState("");

  const checkboxStyle = `size-4 appearance-none 
	border border-neutral-300 checked:bg-blue-400 checked:border-0 
	checked:bg-checked bg-center`;

  function onSubmit(e) {
    e.preventDefault();
    requestAuthCode(name, phone)
      .then(() => goNext())
      .catch((error) => setErrorMessage(error.message));
  }

  return (
    <>
      <p className="text-body-l font-bold text-neutral-700">
        이벤트 응모를 위해
        <br />
        간단한 정보를 입력해주세요!
      </p>
      <form
        className="flex flex-col flex-grow w-[calc(100%+0.25rem)] -left-0.5 relative gap-4 pb-4 group"
        onSubmit={onSubmit}
      >
        <div className="flex flex-col flex-grow gap-7 px-0.5 relative h-0 overflow-y-auto">
          <div className="flex flex-col gap-6">
            <label className="flex flex-col gap-3">
              <span className="text-body-m font-bold">이름</span>
              <Input
                text={name}
                setText={setName}
                placeholder="ex) 홍길동"
                required
                minLength="2"
              />
            </label>
            <label className="flex flex-col gap-3">
              <span className="text-body-m font-bold">전화번호</span>
              <PhoneInput
                text={phone}
                setText={setPhone}
                required
                isError={errorMessage !== ""}
              />
              <p className="w-full h-4 text-detail-l text-red-500">
                {errorMessage}
              </p>
            </label>
          </div>
          <div className="flex flex-col gap-4 text-detail-l">
            <label className="flex gap-2 items-center">
              <input type="checkbox" className={checkboxStyle} required />
              <span className="font-bold text-neutral-600">
                개인정보 수집 동의(필수)
              </span>
              <span className="font-medium text-neutral-300">자세히 보기</span>
            </label>
            <label className="flex gap-2 items-center">
              <input type="checkbox" className={checkboxStyle} />
              <span className="font-bold text-neutral-600">
                마케팅 수신 동의(선택)
              </span>
              <span className="font-medium text-neutral-300">자세히 보기</span>
            </label>
          </div>
        </div>
        <div className="w-full flex justify-center relative">
          <Button styleType="filled" type="submit" className="w-36 min-h-14">
            인증 요청하기
          </Button>
          <button
            type="button"
            className="absolute top-[calc(100%+1.25rem)] text-detail-l font-medium text-neutral-300"
          >
            이미 정보를 입력하신 적이 있으신가요?
          </button>
        </div>
      </form>
    </>
  );
}

export default AuthFirstSection;
