import { useContext } from "react";
import { ModalCloseContext } from "@common/modal/modal.jsx";
import Button from "@common/components/Button.jsx";

function NoServerModal() {
  const close = useContext(ModalCloseContext);

  return (
    <div className="w-[calc(100%-1rem)] max-w-[31.25rem] h-[calc(100svh-2rem)] max-h-[31.25rem] p-10 shadow bg-white relative flex flex-col justify-between items-center">
      <div className="flex flex-col gap-2 items-center">
        <p className="text-body-l font-bold text-neutral-700">서버가 닫혔어요!</p>
        <p className="w-full max-w-80 text-body-s font-medium text-neutral-400 text-center">
          괜찮아요. 저희는 서버가 닫혀도 일부 동작은 가능하니까요!
        </p>
      </div>
      <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center pointer-events-none">
        <img src="/icons/error.svg" alt="서버 닫힘" width="160" height="160" />
      </div>
      <Button styleType="ghost" onClick={close}>
        닫기
      </Button>
    </div>
  );
}

export default NoServerModal;
