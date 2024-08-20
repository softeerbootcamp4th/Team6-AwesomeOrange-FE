import { useContext } from "react";
import { ModalCloseContext } from "@common/modal/modal.jsx";
import scrollTo from "@main/scroll/scrollTo.js";
import { COMMENT_SECTION } from "@main/scroll/constants.js";
import Button from "@common/components/Button.jsx";

function MoveCommentButton({ disabled, hidden }) {
  const close = useContext(ModalCloseContext);

  async function onClickWrite() {
    await close();
    scrollTo(COMMENT_SECTION);
  }

  return (
    <div className={`${hidden ? "hidden" : "flex"} flex-col gap-2`}>
      <div className="flex relative flex-col items-center animate-bounce">
        <span className="bg-green-400 text-nowrap text-body-s xl:text-body-m text-neutral-800 rounded-full px-4 xl:px-8 py-1 xl:py-2 font-bold">
          당첨확률 UP!
        </span>
        <img src="icons/polygon-tri.svg" alt="" role="presentation" draggable="false" />
      </div>
      <Button
        disabled={disabled}
        onClick={onClickWrite}
        styleType="filled"
        backdrop="dark"
        className="text-body-m px-4 sm:px-10 py-4"
      >
        기대평 작성하기
      </Button>
    </div>
  );
}

export default MoveCommentButton;
