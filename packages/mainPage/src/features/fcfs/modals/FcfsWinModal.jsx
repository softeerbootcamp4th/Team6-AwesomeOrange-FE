import { useContext } from "react";
import { ModalCloseContext } from "@common/modal/modal.jsx";
import AlertModalContainer from "@main/components/AlertModalContainer.jsx";
import Button from "@common/components/Button.jsx";

function FcfsWinModal() {
  const close = useContext(ModalCloseContext);

  return (
    <AlertModalContainer
      title="선착순 이벤트에 당첨되었어요!"
      description="경품 수령은 입력하신 연락처로 개별 안내됩니다"
      image={
        <img
          src="/icons/win@1x.png"
          srcSet="/icons/win@1x.png 1x, /icons/win@2x.png 2x"
          alt="선착순 이벤트 당첨"
          width="320"
          height="320"
        />
      }
    >
      <Button styleType="filled" onClick={close}>
        확인
      </Button>
    </AlertModalContainer>
  );
}

export default FcfsWinModal;
