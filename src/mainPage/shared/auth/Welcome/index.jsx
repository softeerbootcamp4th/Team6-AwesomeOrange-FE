import { useContext, useId } from "react";
import { ModalCloseContext } from "@common/modal/modal.jsx";
import Button from "@common/components/Button.jsx";

function WelcomeModal() {
  const close = useContext(ModalCloseContext);
  const id = useId();

  return (
    <div 
      className="w-[calc(100%-1rem)] max-w-[31.25rem] h-[calc(100svh-2rem)] max-h-[40.625rem] p-6 min-[520px]:px-20 pt-10 pb-[4.75rem] shadow bg-white relative flex flex-col justify-between"
      aria-modal="true"
      role="dialog"
      aria-labelledby={id}
    >
      <p className="text-body-l font-bold text-neutral-700" id={id}>
        정보가
        <br />
        등록되었습니다!
      </p>
      <img
        className="absolute top-[calc(50%-91px)] left-[calc(50%-86.5px)]"
        src="/icons/register@1x.png"
        srcSet="/icons/register@1x.png 1x, /icons/register@2x.png 2x"
        alt="정보 등록 완료"
        width="173"
        height="182"
      />
      <div className="w-full flex justify-center relative">
        <Button styleType="filled" onClick={close}>
          확인
        </Button>
      </div>
      <button className="absolute top-10 right-8" onClick={close} aria-label="닫기">
        <img src="/icons/close.svg" alt="닫기" width="24" height="24" draggable="false" />
      </button>
    </div>
  );
}

export default WelcomeModal;
