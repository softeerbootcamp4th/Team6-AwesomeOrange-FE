import { useState, useEffect } from "react";
import CommentSuccessModal from "../modals/CommentSuccessModal.jsx";
import CommentNegativeModal from "../modals/CommentNegativeModal.jsx";
import CommentNoUserModal from "../modals/CommentNoUserModal.jsx";
import NoServerModal from "@main/components/NoServerModal.jsx";
import SubmitButton from "./SubmitButton";
import useAuthState from "@main/auth/store.js";

import { fetchServer, handleError } from "@common/dataFetch/fetchServer.js";
import { EVENT_ID } from "@common/constants.js";
import openModal from "@common/modal/openModal.js";

const submitCommentErrorHandle = {
  400: "negative",
  401: "unauthorized",
  404: "no_participated",
  409: "하루에 1번만 기대평을 등록할 수 있습니다.",
  offline: "offline",
};

function CommentForm() {
  const [errorMessage, setErrorMessage] = useState("");
  const [buttonFetchState, setButtonFetchState] = useState("pending");
  const isLogin = useAuthState((state) => state.isLogin);

  useEffect(() => {
    const timeout = setTimeout(() => setErrorMessage("pending"), 300);
    fetchServer("/api/v1/comment/info", {
      credentials: isLogin ? "include" : "same-origin",
    })
      .then((submitAble) => {
        clearTimeout();
        setButtonFetchState(submitAble ? "enabled" : "disabled");
      })
      .catch((e) => {
        if (e.status === 401) {
          setButtonFetchState("enabled");
          return;
        }
        console.error(e);
        setButtonFetchState("error");
      })
      .finally(() => {
        setErrorMessage("");
        clearTimeout(timeout);
      });

    return () => {
      clearTimeout(timeout);
    };
  }, [isLogin]);

  const successModal = <CommentSuccessModal />;
  const negativeModal = <CommentNegativeModal />;
  const noUserModal = <CommentNoUserModal />;
  const noServerModal = <NoServerModal />;

  async function onSubmit(e) {
    e.preventDefault();
    const commentDom = e.target.elements.comment;
    const content = commentDom.value;
    if (content.length < 10 || content.length > 50) return;

    commentDom.value = "";
    setErrorMessage("");
    try {
      await fetchServer(`/api/v1/comment/${EVENT_ID}`, {
        method: "post",
        body: { content },
      }).catch(handleError(submitCommentErrorHandle));
      openModal(successModal);
      setButtonFetchState("disabled");
    } catch (e) {
      switch (e.message) {
        case submitCommentErrorHandle[400]:
          return openModal(negativeModal);
        case submitCommentErrorHandle[401]:
        case submitCommentErrorHandle[404]:
          return openModal(noUserModal);
        case submitCommentErrorHandle["offline"]:
          return openModal(noServerModal);
        case submitCommentErrorHandle[409]:
          return setButtonFetchState("disabled");
        default:
          setErrorMessage(e.message);
      }
    }
  }

  return (
    <form
      className="w-full flex flex-col items-center px-6 gap-15 relative group"
      onSubmit={onSubmit}
    >
      <input
        name="comment"
        minLength="10"
        maxLength="50"
        required
        className="w-full max-w-[1200px] h-20 px-3 py-6 placeholder:text-neutral-200 placeholder-shown:text-neutral-200 focus:outline-0 focus:bg-neutral-50 text-black text-body-l font-medium border-b-[3px] border-current"
        placeholder="최소 10, 최대 50자까지 입력해주세요."
      />
      <SubmitButton state={buttonFetchState} />
      <p className="absolute -bottom-6 text-detail-l font-bold text-red-400">{errorMessage}</p>
    </form>
  );
}

export default CommentForm;
