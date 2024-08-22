import { useQuery } from "@common/dataFetch/getQuery.js";
import { fetchServer } from "@common/dataFetch/fetchServer.js";
import { formatDate } from "@common/utils.js";
import Pagination from "@admin/components/Pagination";
import { useState } from "react";

export default function Comments({
  eventId,
  checkedComments,
  setCheckedComments,
  setAllId,
  searchString,
}) {
  const [page, setPage] = useState(1);
  const data = useQuery(
    eventId,
    () =>
      fetchServer(
        `/api/v1/admin/comments?eventId=${eventId}&page=${page - 1}&size=15${searchString && "&search=" + searchString}`,
      )
        .then((res) => {
          setAllId(res.comments.map((comment) => comment.id));
          return res;
        })
        .catch((e) => {
          console.log(e);
        }),
    [page, searchString],
  );

  function checkComment(id) {
    if (checkedComments.has(id)) {
      setCheckedComments((oldSet) => {
        const newSet = new Set(oldSet);
        newSet.delete(id);
        return newSet;
      });
    } else {
      setCheckedComments((oldSet) => new Set([...oldSet, id]));
    }
  }

  return (
    <div className="mt-1 mb-5 flex flex-col items-center gap-1 w-full">
      {data.comments.map((comment) => (
        <div
          key={comment.id}
          onClick={() => checkComment(comment.id)}
          className="w-full py-1 grid grid-cols-[1fr_5fr_15fr] bg-neutral-50 items-center hover:bg-blue-100"
        >
          <input
            type="checkbox"
            onChange={() => checkComment(comment.id)}
            checked={checkedComments.has(comment.id)}
            className="w-4 h-4 place-self-center"
          />

          <div className="place-self-center flex items-center gap-1 text-body-s">
            <span>{formatDate(comment.createdAt, "YY-MM-DD")}</span>

            <span className="text-neutral-500">{formatDate(comment.createdAt, "hh:mm:ss")}</span>
          </div>

          <span className="pr-4 overflow-hidden text-body-s text-ellipsis">{comment.content}</span>
        </div>
      ))}

      <Pagination currentPage={page} setPage={setPage} maxPage={data.totalPages} />
    </div>
  );
}
