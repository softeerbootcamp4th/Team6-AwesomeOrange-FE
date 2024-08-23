import { useContext } from "react";
import { ModalCloseContext } from "@common/modal/modal.jsx";
import AlertModalContainer from "@main/components/AlertModalContainer.jsx";
import Button from "@common/components/Button.jsx";

function CommentNegativeModal() {
  const close = useContext(ModalCloseContext);

  return (
    <AlertModalContainer
      title="해당 기대평을 등록할 수 없습니다"
      description="비속어, 혐오표현 등 타인에게 불쾌감을 줄 수 있는 표현이 포함된 기대평은 작성이 불가합니다"
    >
      <Button styleType="filled" onClick={close}>
        확인
      </Button>
    </AlertModalContainer>
  );
}

export default CommentNegativeModal;
