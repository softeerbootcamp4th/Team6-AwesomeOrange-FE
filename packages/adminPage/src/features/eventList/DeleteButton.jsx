import { fetchServer } from "@common/dataFetch/fetchServer.js";
import { useMutation } from "@common/dataFetch/getQuery.js";
import ConfirmModal from "@admin/modals/ConfirmModal.jsx";
import AlertModal from "@admin/modals/AlertModal.jsx";
import Button from "@common/components/Button.jsx";
import openModal from "@common/modal/openModal.js";

function DeleteButton({ selected, reset }) {
  const mutate = useMutation(
    "admin-event-list",
    () =>
      fetchServer("/api/v1/admin/events", {
        method: "delete",
        body: {
          eventIds: [...selected],
        },
      }),
    {
      onSuccess: () => {
        openModal(<AlertModal title="삭제" description="기대평이 삭제되었습니다." />);
        reset();
      },
    },
  );
  const deleteConfirmModal = (
    <ConfirmModal
      title="삭제"
      description={
        <>
          <span>이 동작은 다시 돌이킬 수 없습니다.</span>
          <br />
          <span>
            {selected.keys().next().value}
            {selected.size > 1 && ` 외 ${selected.size - 1} 개의`} 이벤트를 삭제하시겠습니까?
          </span>
        </>
      }
      onConfirm={mutate}
    />
  );

  function onClick() {
    openModal(deleteConfirmModal);
  }
  return (
    <Button onClick={onClick} disabled={selected.size === 0}>
      삭제
    </Button>
  );
}

export default DeleteButton;
