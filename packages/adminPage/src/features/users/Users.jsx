import { useQuery } from "@common/dataFetch/getQuery.js";
import { fetchServer } from "@common/dataFetch/fetchServer.js";
import Pagination from "@admin/components/Pagination";

export default function Comments({ searchParams, page, setPage }) {

  const data = useQuery(
    "admin-users",
    () =>
      fetchServer(
        `/api/v1/admin/event-users?page=${page - 1}&search=${searchParams.get("search") ?? ""}&field=${searchParams.get("field") ?? "userName"}&size=15`,
      )
        .then((res) => {
          return res;
        })
        .catch((e) => {
          alert("통신 오류로 유저 목록 로드 실패.");
          console.log(e);
          return { users: [] };
        }),
    [page, searchParams],
  );

  return (
    <div className="mt-1 mb-5 flex flex-col items-center gap-1 w-full">
      {data.users.map((user) => (
        <div
          key={user.id}
          className="w-full py-1 grid grid-cols-[1fr_1fr_2fr] bg-neutral-50 items-center hover:bg-blue-100 text-body-s place-items-center"
        >
          <span>{user.userName}</span>
          <span>{user.phoneNumber}</span>
          <span>{user.frameId}</span>
        </div>
      ))}

      <Pagination currentPage={page} setPage={setPage} maxPage={data.totalPage} />
    </div>
  );
}
