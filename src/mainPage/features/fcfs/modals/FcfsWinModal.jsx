import { useContext } from "react";
import { ModalCloseContext } from "@common/modal/modal.jsx";
import Button from "@common/components/Button.jsx";

function FcfsWinModal() {
  const close = useContext(ModalCloseContext);

  return (
    <div className="w-[calc(100%-1rem)] max-w-[31.25rem] h-[calc(100svh-2rem)] max-h-[31.25rem] p-10 shadow bg-white relative flex flex-col justify-between items-center">
      <div className="flex flex-col gap-2 items-center">
        <p className="text-body-l font-bold text-neutral-700">선착순 이벤트에 당첨되었어요!</p>
        <p className="w-full max-w-80 text-body-s font-medium text-neutral-400 text-center">
          경품 수령은 입력하신 연락처로 개별 안내됩니다
        </p>
      </div>
      <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center pointer-events-none">
        <img
          src="/icons/win@1x.png"
          srcSet="/icons/win@1x.png 1x, /icons/win@2x.png 2x"
          alt="선착순 이벤트 당첨"
          width="320"
          height="320"
        />
      </div>
      벤
      <Button styleType="filled" onClick={close}>
        확인
      </Button>
    </div>
  );
}

export default FcfsWinModal;
