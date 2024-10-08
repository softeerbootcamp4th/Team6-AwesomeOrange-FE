import Suspense from "@common/components/Suspense";
import Loading from "./Loading.jsx";
import Users from "./Users.jsx";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function AdminCommentID() {
  const [formString, setFormString] = useState("");
  const [searchString, setSearchString] = useState("");
  const [category, setCategory] = useState("userName");
  const [page, setPage] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams();

  function searchComment(e) {
    e.preventDefault();
    setPage(1);
    setSearchString(formString);
    setSearchParams({ search: formString, field: category });
  }

  return (
    <div className="relative flex flex-col w-full items-center">
      <div
        className={`absolute -top-6 flex gap-1 text-body-s self-start ${!searchString && "hidden"}`}
      >
        <span className={`pl-1 text-red-500`}>검색 문자열:</span>
        <span className={`text-red-500 italic`}>{searchString}</span>
      </div>

      <form onSubmit={searchComment} className="w-full relative">
        <input
          type="text"
          value={formString}
          onChange={(e) => setFormString(e.target.value)}
          placeholder="검색"
          className="bg-neutral-50 focus:bg-white w-full px-4 py-2 rounded-lg text-body-s"
        />

        <div className="absolute top-1/2 -translate-y-1/2 right-4 flex gap-3">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-transparent text-neutral-600"
          >
            <option value="userName">성명</option>
            <option value="phoneNumber">전화번호</option>
            <option value="frameId">FrameId</option>
          </select>

          <img
            onClick={searchComment}
            src="/icons/search.png"
            alt="검색"
            className="cursor-pointer "
          />
        </div>
      </form>

      <div className="mt-3 py-1 w-full grid grid-cols-[1fr_1fr_2fr] bg-blue-50 place-items-center text-body-s select-none">
        <span>성명</span>
        <span>전화번호</span>
        <span>이벤트 frameId</span>
      </div>

      <Suspense fallback={<Loading />}>
        <Users
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          page={page}
          setPage={setPage}
        />
      </Suspense>
    </div>
  );
}
