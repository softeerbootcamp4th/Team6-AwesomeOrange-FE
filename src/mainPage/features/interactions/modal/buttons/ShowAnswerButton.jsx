import { useContext } from "react";
import IntearctionContext from "../context.js";

import joinEvent from "../joinEvent.js";
import Button from "@common/components/Button.jsx";

function ShowAnswerButton({ disabled, onClick }) {
  const index = useContext(IntearctionContext);

  function onClickConfirm() {
    if (disabled) return;
    onClick();
    joinEvent(index);
  }

  return (
    <Button
      onClick={onClickConfirm}
      styleType="filled"
      backdrop="dark"
      disabled={disabled}
      className="px-4 py-2 xl:px-10 xl:py-4 text-black text-body-s"
    >
      확인하기
    </Button>
  );
}

export default ShowAnswerButton;
