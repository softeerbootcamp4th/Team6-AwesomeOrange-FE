import { useMutation } from "@common/dataFetch/getQuery.js";
import openModal from "@common/modal/openModal.js";
import { fetchServer } from "@common/dataFetch/fetchServer.js";
import ConfirmModal from "@admin/modals/ConfirmModal.jsx";
import AlertModal from "@admin/modals/AlertModal.jsx";

export default function DeleteButton({
  eventId,
  checkedComments,
  setCheckedComments,
}) {
  const num = checkedComments.size;
  const mutation = useMutation(eventId, () =>
    fetchServer("/api/v1/admin/comments", {
      method: "DELETE",
      body: {
        commentIds: [...checkedComments],
      },
    })
      .then(() => {
        openModal(
          <AlertModal title="삭제" description="기대평이 삭제되었습니다." />,
        );
        setCheckedComments(new Set());
      })
      .catch((e) => {
        alert("삭제 실패");
        console.log(e);
      }),
  );

  const deleteConfirmModal = (
    <ConfirmModal
      title="삭제"
      description={
        <>
          <span>이 동작은 다시 돌이킬 수 없습니다.</span>
          <br />
          <span>{num}개의 기대평을 삭제하시겠습니까?</span>
        </>
      }
      onConfirm={mutation}
    />
  );

  function deleteComments() {
    if (!num) return;
    openModal(deleteConfirmModal);
  }

  return (
    <button
      onClick={deleteComments}
      className="self-end px-5 py-1 bg-red-300 text-white hover:bg-red-500 rounded-lg"
    >
      삭제
    </button>
  );
}
