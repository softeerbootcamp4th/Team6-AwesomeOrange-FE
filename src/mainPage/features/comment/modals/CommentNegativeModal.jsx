import { useContext } from "react";
import { ModalCloseContext } from "@common/modal/modal.jsx";
import Button from "@common/components/Button.jsx";

function CommentNegativeModal() {
  const close = useContext(ModalCloseContext);

  return (
    <div className="w-[calc(100%-1rem)] max-w-[31.25rem] h-[calc(100svh-2rem)] max-h-[15.625rem] p-10 shadow bg-white relative flex flex-col justify-between items-center">
      <div className="flex flex-col gap-2 items-center">
        <p className="text-body-l font-bold text-neutral-700">
          해당 기대평을 등록할 수 없습니다
        </p>
        <p className="w-full max-w-80 text-body-s font-medium text-neutral-400 text-center">
          비속어, 혐오표현 등 타인에게 불쾌감을 줄 수 있는 표현이 포함된
          기대평은 작성이 불가합니다
        </p>
      </div>
      <Button styleType="filled" onClick={close}>
        확인
      </Button>
    </div>
  );
}

export default CommentNegativeModal;
