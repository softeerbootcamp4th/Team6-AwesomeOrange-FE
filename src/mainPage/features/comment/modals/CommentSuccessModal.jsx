import { useContext } from "react";
import { ModalCloseContext } from "@common/modal/modal.jsx";
import AlertModalContainer from "@main/components/AlertModalContainer.jsx";
import Button from "@common/components/Button.jsx";

function CommentSuccessModal() {
  const close = useContext(ModalCloseContext);

  return (
    <AlertModalContainer
      title="기대평이 등록되었습니다!"
      image={<img
          src="/icons/register@1x.png"
          srcSet="/icons/register@1x.png 1x, /icons/register@2x.png 2x"
          alt="기대평 등록 완료"
          width="173"
          height="182"
        />}
    >
      <Button styleType="ghost" onClick={close}>
        확인
      </Button>
    </AlertModalContainer>
  );
}

export default CommentSuccessModal;
