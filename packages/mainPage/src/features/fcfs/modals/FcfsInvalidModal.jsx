import { useContext } from "react";
import { ModalCloseContext } from "@common/modal/modal.jsx";
import AlertModalContainer from "@main/components/AlertModalContainer.jsx";
import Button from "@common/components/Button.jsx";

function FcfsInvalidModal() {
  const close = useContext(ModalCloseContext);

  return (
    <AlertModalContainer
      title="선착순 이벤트에 참여할 수 없습니다"
      description="아직 선착순 이벤트 진행 중이 아닙니다. 부적절한 방법으로 이벤트를 참여할 경우 향후 불이익이 가해질 수 있습니다."
    >
      <Button styleType="filled" onClick={close}>
        확인
      </Button>
    </AlertModalContainer>
  );
}

export default FcfsInvalidModal;
