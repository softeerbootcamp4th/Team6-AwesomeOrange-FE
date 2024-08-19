import { useContext } from "react";
import { ModalCloseContext } from "@common/modal/modal.jsx";
import Button from "@common/components/Button.jsx";

function FcfsInvalidModal() {
  const close = useContext(ModalCloseContext);

  return (
    <div className="w-[calc(100%-1rem)] max-w-[31.25rem] h-[calc(100svh-2rem)] max-h-[15.625rem] p-10 shadow bg-white relative flex flex-col justify-between items-center">
      <div className="flex flex-col gap-2 items-center">
        <p className="text-body-l font-bold text-neutral-700">선착순 이벤트에 참여할 수 없습니다</p>
        <p className="w-full max-w-80 text-body-s font-medium text-neutral-400 text-center">
          아직 선착순 이벤트 진행 중이 아닙니다. 부적절한 방법으로 이벤트를 참여할 경우 향후
          불이익이 가해질 수 있습니다.
        </p>
      </div>
      <Button styleType="filled" onClick={close}>
        확인
      </Button>
    </div>
  );
}

export default FcfsInvalidModal;
