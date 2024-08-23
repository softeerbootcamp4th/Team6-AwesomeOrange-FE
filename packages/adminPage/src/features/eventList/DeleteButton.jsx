import { fetchServer, HTTPError } from "@common/dataFetch/fetchServer.js";
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
        openModal(<AlertModal title="삭제" description="이벤트가 삭제되었습니다." />);
        reset();
      },
      onError: async (e) => {
        if (e instanceof HTTPError && e.status === 400) {
          return openModal(
            <AlertModal
              title="오류"
              description="진행 중이거나 삭제된 이벤트는 삭제가 불가능합니다."
            />,
          );
        }
        if (e instanceof HTTPError && e.status === 404) {
          return openModal(<AlertModal title="오류" description="존재하지 않는 이벤트입니다." />);
        }
        return openModal(<AlertModal title="오류" description="이벤트를 삭제할 수 없습니다." />);
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
