import { useContext } from "react";
import { ModalCloseContext } from "@common/modal/modal.jsx";
import AlertModalContainer from "@main/components/AlertModalContainer.jsx";
import Button from "@common/components/Button.jsx";

function NoServerModal() {
  const close = useContext(ModalCloseContext);

  return (
    <AlertModalContainer
      title="서버가 닫혔어요!"
      description="괜찮아요. 저희는 서버가 닫혀도 일부 동작은 가능하니까요!"
      image={<img src="/icons/error.svg" alt="서버 닫힘" width="160" height="160" />}
    >
      <Button styleType="ghost" onClick={close}>
        닫기
      </Button>
    </AlertModalContainer>
  );
}

export default NoServerModal;
