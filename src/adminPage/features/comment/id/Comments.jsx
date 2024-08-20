import { useQuery } from "@common/dataFetch/getQuery.js";
import { fetchServer } from "@common/dataFetch/fetchServer.js";
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

  function getDate(createdAt) {
    const yy = createdAt.slice(2, 4);
    const mm = createdAt.slice(5, 7);
    const dd = createdAt.slice(8, 10);
    return `${yy}-${mm}-${dd}`;
  }

  function getTime(createdAt) {
    const hh = createdAt.slice(11, 13);
    const mm = createdAt.slice(14, 16);
    const ss = createdAt.slice(17, 19);
    return `${hh}:${mm}:${ss}`;
  }

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
            <span>{getDate(comment.createdAt)}</span>

            <span className="text-neutral-500">{getTime(comment.createdAt)}</span>
          </div>

          <span className="pr-4 overflow-hidden text-body-s text-ellipsis">{comment.content}</span>
        </div>
      ))}

      <Pagination currentPage={page} setPage={setPage} maxPage={data.totalPages} />
    </div>
  );
}
