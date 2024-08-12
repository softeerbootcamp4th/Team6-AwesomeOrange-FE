import { useContext } from "react";
import { ModalCloseContext } from "@common/modal/modal.jsx";
import Button from "@common/components/Button.jsx";
import scrollTo from "@main/shared/scroll/scrollTo.js";
import { INTERACTION_SECTION } from "@common/constants.js";

function CommentNoUserModal() {
  const close = useContext(ModalCloseContext);

  function toMoveInteraction() {
    close();
    scrollTo(INTERACTION_SECTION);
  }

  return (
    <div className="w-[calc(100%-1rem)] max-w-[31.25rem] h-[calc(100svh-2rem)] max-h-[31.25rem] p-10 shadow bg-white relative flex flex-col justify-between items-center">
      <div className="flex flex-col gap-2 items-center">
        <p className="text-body-l font-bold text-neutral-700">
          아직 기대평을 작성할 수 없습니다.
        </p>
        <p className="w-full max-w-80 text-body-s font-medium text-neutral-400 text-center">
          오늘의 추첨 이벤트에 참여하고 기대평을 작성하세요
        </p>
      </div>
      <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center pointer-events-none">
        <img
          src="/icons/waiting@1x.png"
          srcSet="/icons/waiting@1x.png 1x, /icons/waiting@2x.png 2x"
          alt="추첨 이벤트 참여 바랍니다"
          width="208"
          height="40"
        />
      </div>
      <div className="w-full flex flex-wrap justify-center gap-5">
        <Button styleType="filled" onClick={toMoveInteraction}>
          추첨 이벤트 참여하기
        </Button>
        <Button styleType="ghost" onClick={close}>
          닫기
        </Button>
      </div>
    </div>
  );
}

export default CommentNoUserModal;
