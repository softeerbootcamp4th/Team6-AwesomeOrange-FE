import { useQuery } from "@common/dataFetch/getQuery.js";
import { fetchServer } from "@common/dataFetch/fetchServer.js";
import Pagination from "@admin/components/Pagination";
import { useState } from "react";

export default function Comments({ searchString }) {
  searchString;
  const [page, setPage] = useState(1);
  const data = useQuery(
    "admin-users",
    () =>
      fetchServer(`/api/v1/admin/users?page=${page - 1}&search=${searchString}`)
        .then((res) => {
          console.log(res);
          return res;
        })
        .catch((e) => {
          console.log(e);
        }),
    [page, searchString],
  );

  return (
    <div className="mt-1 mb-5 flex flex-col items-center gap-1 w-full">
      {/* {data.comments.map((comment) => (
        <div
          key={comment.id}
          className="w-full py-1 grid grid-cols-[1fr_5fr_15fr] bg-neutral-50 items-center hover:bg-blue-100"
        >
          <input
            type="checkbox"
            className="w-4 h-4 place-self-center"
          />

          <div className="place-self-center flex items-center gap-1 text-body-s">
          </div>

          <span className="pr-4 overflow-hidden text-body-s text-ellipsis">{comment.content}</span>
        </div>
      ))} */}

      <Pagination currentPage={page} setPage={setPage} maxPage={data.totalPages} />
    </div>
  );
}
