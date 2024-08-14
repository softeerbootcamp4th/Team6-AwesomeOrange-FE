import { useQuery } from "@common/dataFetch/getQuery.js";
import { fetchServer } from "@common/dataFetch/fetchServer.js";

export default function Comments({
  eventId,
  checkedComments,
  setCheckedComments,
}) {
  const data = useQuery(eventId, () =>
    fetchServer(
      `/api/v1/admin/comments?eventId=${eventId}&page=${0}&size=15`,
    ).then((res) => res.comments),
  );

  function onChangeCheckbox(e, id) {
    if (e.target.checked) {
      setCheckedComments((oldSet) => new Set([...oldSet, id]));
    } else {
      setCheckedComments((oldSet) => {
        const newSet = new Set(oldSet);
        newSet.delete(id);
        return newSet;
      });
    }
  }

  return (
    <div className="mt-3 flex flex-col gap-1">
      {data.map((comment) => (
        <div
          key={comment.id}
          className="py-1 grid grid-cols-[1fr_5fr_15fr] bg-neutral-50"
        >
          <input
            type="checkbox"
            checked={checkedComments.has(comment.id)}
            onChange={(e) => onChangeCheckbox(e, comment.id)}
            className="w-4 h-4 place-self-center"
          />

          <span className="text-body-s place-self-center">
            {comment.createdAt}
          </span>

          <span className="text-body-s">{comment.content}</span>
        </div>
      ))}
    </div>
  );
}
