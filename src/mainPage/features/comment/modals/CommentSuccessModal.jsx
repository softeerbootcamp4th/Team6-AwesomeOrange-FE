import { useContext } from "react";
import { ModalCloseContext } from "@common/modal/modal.jsx";
import Button from "@common/components/Button.jsx";

function CommentSuccessModal() {
  const close = useContext(ModalCloseContext);

  return (
    <div className="w-[calc(100%-1rem)] max-w-[31.25rem] h-[calc(100svh-2rem)] max-h-[31.25rem] p-10 shadow bg-white relative flex flex-col justify-between items-center">
      <p className="text-body-l font-bold text-neutral-700">
        기대평이 등록되었습니다!
      </p>
      <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center pointer-events-none">
        <img
          src="/icons/register@1x.png"
          srcSet="/icons/register@1x.png 1x, /icons/register@2x.png 2x"
          alt="기대평 등록 완료"
          width="173"
          height="182"
        />
      </div>
      <Button styleType="ghost" onClick={close}>
        확인
      </Button>
    </div>
  );
}

export default CommentSuccessModal;
