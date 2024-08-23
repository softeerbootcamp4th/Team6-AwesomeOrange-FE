import { useContext } from "react";
import InteractionContext from "../context.js";

import AuthModal from "@main/auth/AuthModal.jsx";
import openModal from "@common/modal/openModal.js";
import joinEvent from "../joinEvent.js";
import Button from "@common/components/Button.jsx";

function ParticipateButton({ disabled }) {
  const index = useContext(InteractionContext);
  const authModal = <AuthModal onComplete={() => joinEvent(index)} />;

  return (
    <Button
      disabled={disabled}
      onClick={() => openModal(authModal)}
      styleType="filled"
      backdrop="dark"
      className="text-body-m px-10 py-4"
    >
      응모하기
    </Button>
  );
}

export default ParticipateButton;
