import Button from "@/common/Button.jsx";

function getMessageFromButtonFetchState(state) {
  if (state === "pending") return "...";
  if (state === "error") return "error";
  if (state === "enabled") return "기대평 등록";
  return "오늘의 기대평 등록이 완료되었어요";
}

function CommentSubmitButton({ state }) {
  return (
    <Button styleType="filled" type="submit" disabled={state !== "enabled"}>
      {getMessageFromButtonFetchState(state)}
    </Button>
  );
}

export default CommentSubmitButton;
