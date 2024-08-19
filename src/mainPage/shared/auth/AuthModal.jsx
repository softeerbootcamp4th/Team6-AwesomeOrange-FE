import { useState, useContext } from "react";
import InfoInputStage from "./InfoInput";
import AuthCodeStage from "./AuthCode";
import UserFindStage from "./UserFind";
import { ModalCloseContext } from "@common/modal/modal.jsx";
import { login } from "./store.js";

const AUTH_INPUT_PAGE = Symbol("input");
const AUTH_CODE_PAGE = Symbol("code");
const AUTH_FIND_PAGE = Symbol("find");

function AuthModal({ onComplete: onCompleteCallback }) {
  const close = useContext(ModalCloseContext);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [page, setPage] = useState(AUTH_INPUT_PAGE);

  function onComplete(token, isFreshMember) {
    login(token);
    onCompleteCallback(isFreshMember);
    close();
  }

  const firstSectionProps = {
    name,
    setName,
    phone,
    setPhone,
    goNext: () => setPage(AUTH_CODE_PAGE),
    goFindUser: () => setPage(AUTH_FIND_PAGE),
  };
  const secondSectionProps = { name, phone, onComplete };
  const findSectionProps = {
    onComplete,
    goPrev: () => setPage(AUTH_INPUT_PAGE),
  };

  const containerClass = `w-[calc(100%-1rem)] max-w-[31.25rem] shadow bg-white relative flex flex-col gap-14`;

  return (
    <div className={containerClass}>
      {page === AUTH_INPUT_PAGE && <InfoInputStage {...firstSectionProps} />}
      {page === AUTH_CODE_PAGE && <AuthCodeStage {...secondSectionProps} />}
      {page === AUTH_FIND_PAGE && <UserFindStage {...findSectionProps} />}
      <button
        className="absolute top-10 right-8 select-none"
        onClick={close}
        aria-label="닫기"
        draggable="false"
      >
        <img src="/icons/close.svg" alt="닫기" width="24" height="24" />
      </button>
    </div>
  );
}

export default AuthModal;
