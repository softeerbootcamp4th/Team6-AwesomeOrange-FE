import { useContext } from "react";
import { ModalCloseContext } from "@common/modal/modal.jsx";
import AlertModalContainer from "@main/components/AlertModalContainer.jsx";
import Button from "@common/components/Button.jsx";
import scrollTo from "@main/scroll/scrollTo.js";
import { INTERACTION_SECTION } from "@main/scroll/constants.js";

function CommentNoUserModal() {
  const close = useContext(ModalCloseContext);

  async function toMoveInteraction() {
    await close();
    scrollTo(INTERACTION_SECTION);
  }

  return (
    <AlertModalContainer
      title="아직 기대평을 작성할 수 없습니다."
      description="오늘의 추첨 이벤트에 참여하고 기대평을 작성하세요"
      image={
        <img
          src="/icons/waiting@1x.png"
          srcSet="/icons/waiting@1x.png 1x, /icons/waiting@2x.png 2x"
          alt="추첨 이벤트 참여 바랍니다"
          width="208"
          height="40"
        />
      }
    >
      <div className="w-full flex flex-wrap justify-center gap-5">
        <Button styleType="filled" onClick={toMoveInteraction}>
          추첨 이벤트 참여하기
        </Button>
        <Button styleType="ghost" onClick={close}>
          닫기
        </Button>
      </div>
    </AlertModalContainer>
  );
}

export default CommentNoUserModal;
