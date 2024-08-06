import { useState } from "react";
import Input from "@/common/Input.jsx";
import PhoneInput from "@/common/PhoneInput.jsx";
import Button from "@/common/Button.jsx";

function AuthFindSection({ goPrev, onComplete }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function onSubmit(e) {
    e.preventDefault();
  }

  return (
    <div className="w-full h-[calc(100svh-2rem)] max-h-[34.375rem] px-6 min-[520px]:px-[5rem] py-10 relative flex flex-col gap-10">
      <p className="text-body-l font-bold text-neutral-700">
        등록했던 정보를
        <br />
        다시 한 번 입력해주세요!
      </p>
      <form
        className="flex flex-col flex-grow w-[calc(100%+0.25rem)] -left-0.5 relative gap-4 group"
        onSubmit={onSubmit}
      >
        <div className="flex flex-col flex-grow gap-6 px-0.5 relative h-0 overflow-y-auto">
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
          </label>
        </div>
        <p className="w-full h-4 mt-1 text-center text-detail-l text-red-500">
          에러
        </p>
        <div className="w-full flex flex-col items-center gap-5">
          <Button styleType="filled" type="submit" className="w-36 min-h-14">
            정보 확인하기
          </Button>
          <button
            type="button"
            className="text-detail-l font-medium text-neutral-300"
            onClick={goPrev}
          >
            등록된 정보가 없나요?
          </button>
        </div>
      </form>
    </div>
  );
}

export default AuthFindSection;
