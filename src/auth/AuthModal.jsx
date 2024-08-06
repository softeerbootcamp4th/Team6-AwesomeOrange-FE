import { useState, useContext } from "react";
import AuthFirstSection from "./AuthFirstSection.jsx";
import AuthSecondSection from "./AuthSecondSection.jsx";
import { ModalCloseContext } from "@/modal/modal.jsx";

const AUTH_INPUT_PAGE = Symbol("input");
const AUTH_CODE_PAGE = Symbol("code");

function AuthModal() {
  const close = useContext(ModalCloseContext);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [page, setPage] = useState(AUTH_CODE_PAGE);
  const firstSectionProps = {
    name,
    setName,
    phone,
    setPhone,
    goNext: () => setPage(AUTH_CODE_PAGE),
  };
  const secondSectionProps = { name, phone };

  return (
    <div className="w-[calc(100%-1rem)] max-w-[31.25rem] h-[calc(100svh-2rem)] max-h-[40.625rem] p-6 sm:p-10 py-10 shadow bg-white relative flex flex-col gap-14">
      {page === AUTH_CODE_PAGE ? (
        <AuthSecondSection {...secondSectionProps} />
      ) : (
        <AuthFirstSection {...firstSectionProps} />
      )}
      <button
        className="absolute top-10 right-8"
        onClick={close}
        aria-label="닫기"
      >
        <img src="/icons/close.svg" alt="닫기" width="24" height="24" />
      </button>
    </div>
  );
}

export default AuthModal;
