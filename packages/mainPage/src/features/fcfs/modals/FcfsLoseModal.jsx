import { useContext } from "react";
import { ModalCloseContext } from "@common/modal/modal.jsx";
import AlertModalContainer from "@main/components/AlertModalContainer.jsx";
import Button from "@common/components/Button.jsx";
import scrollTo from "@main/scroll/scrollTo.js";
import { INTERACTION_SECTION } from "@main/scroll/constants.js";
import useDrawEventStore from "@main/drawEvent/store.js";

function FcfsLoseModal() {
  const close = useContext(ModalCloseContext);
  const shouldInteraction = useDrawEventStore((store) => !store.currentJoined);

  async function toMoveInteraction() {
    await close();
    scrollTo(INTERACTION_SECTION);
  }

  return (
    <AlertModalContainer
      title="이번 이벤트에 당첨되지 않았어요!"
      description=" 다음 이벤트 일정을 확인하세요!"
      image={
        <img
          src="/icons/lose@1x.png"
          srcSet="/icons/lose@1x.png 1x, /icons/lose@2x.png 2x"
          alt="선착순 이벤트 당첨 실패"
          width="144"
          height="146"
        />
      }
    >
      <div className="w-full flex flex-wrap justify-center gap-5">
        <Button styleType="filled" hidden={!shouldInteraction} onClick={toMoveInteraction}>
          추첨 이벤트 참여하기
        </Button>
        <Button styleType="ghost" onClick={close}>
          닫기
        </Button>
      </div>
    </AlertModalContainer>
  );
}

export default FcfsLoseModal;
