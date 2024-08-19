import { useContext } from "react";
import { ModalCloseContext } from "@common/modal/modal.jsx";
import Button from "@common/components/Button.jsx";

function ConfirmModal({ title, description, onConfirm }) {
  const close = useContext(ModalCloseContext);

  return (
    <div className="w-96 h-auto min-h-56 p-4 flex flex-col justify-between bg-white rounded-md shadow">
      <div className="flex-grow flex flex-col gap-2">
        <div className="border-b border-neutral-200 flex justify-between">
          <p className="text-body-l text-black font-bold ">{title}</p>
          <button onClick={close} aria-label="닫기">
            <img src="/icons/close.svg" alt="닫기" width="24" height="24" draggable="false" />
          </button>
        </div>
        <div className="text-body-s font-medium">{description}</div>
      </div>
      <div className="flex gap-4 justify-end">
        <Button styleType="ghost" className="px-6 py-2" onClick={close}>
          취소
        </Button>
        <Button
          styleType="filled"
          className="px-6 py-2"
          onClick={() => {
            close();
            onConfirm();
          }}
        >
          확인
        </Button>
      </div>
    </div>
  );
}

export default ConfirmModal;
