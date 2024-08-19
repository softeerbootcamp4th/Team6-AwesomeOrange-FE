import { useContext } from "react";
import { ModalCloseContext } from "@common/modal/modal.jsx";
import Button from "@common/components/Button.jsx";
import scrollTo from "@main/scroll/scrollTo.js";
import { INTERACTION_SECTION } from "@main/scroll/constants.js";
import useDrawEventStore from "@main/drawEvent/store.js";

function FcfsLoseModal() {
  const close = useContext(ModalCloseContext);
  const shouldInteraction = useDrawEventStore(store=>!store.currentJoined);

  async function toMoveInteraction() {
    await close();
    scrollTo(INTERACTION_SECTION);
  }

  return (
    <div className="w-[calc(100%-1rem)] max-w-[31.25rem] h-[calc(100svh-2rem)] max-h-[31.25rem] p-10 shadow bg-white relative flex flex-col justify-between items-center">
      <div className="flex flex-col gap-2 items-center">
        <p className="text-body-l font-bold text-neutral-700">이번 이벤트에 당첨되지 않았어요!</p>
        <p className="w-full max-w-80 text-body-s font-medium text-neutral-400 text-center">
          다음 이벤트 일정을 확인하세요!
        </p>
      </div>
      <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center pointer-events-none">
        <img
          src="/icons/lose@1x.png"
          srcSet="/icons/lose@1x.png 1x, /icons/lose@2x.png 2x"
          alt="선착순 이벤트 당첨 실패"
          width="144"
          height="146"
        />
      </div>
      <div className="w-full flex flex-wrap justify-center gap-5">
        <Button styleType="filled" hidden={!shouldInteraction} onClick={toMoveInteraction}>
          추첨 이벤트 참여하기
        </Button>
        <Button styleType="ghost" onClick={close}>
          닫기
        </Button>
      </div>
    </div>
  );
}

export default FcfsLoseModal;
