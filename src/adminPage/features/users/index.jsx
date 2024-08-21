import Suspense from "@common/components/Suspense";
import Loading from "./Loading.jsx";
import Users from "./Users.jsx";
import { useState } from "react";

export default function AdminCommentID() {
  const [formString, setFormString] = useState("");
  const [searchString, setSearchString] = useState("");

  function searchComment(e) {
    e.preventDefault();
    setSearchString(formString);
  }

  return (
    <div className="relative flex flex-col w-full items-center">
      <div className="absolute -top-6 flex gap-1 text-body-s self-start">
        <span className={`pl-1 text-red-500 ${!searchString && "hidden"}`}>성명 검색 문자열:</span>
        <span className={`text-red-500 italic ${!searchString && "hidden"}`}>{searchString}</span>
      </div>

      <form onSubmit={searchComment} className="w-full relative">
        <input
          type="text"
          value={formString}
          onChange={(e) => setFormString(e.target.value)}
          placeholder="유저 성명 검색"
          className="bg-neutral-50 focus:bg-white w-full px-4 py-2 rounded-lg text-body-s"
        />

        <img
          onClick={searchComment}
          src="/icons/search.png"
          alt="검색"
          className="cursor-pointer absolute top-1/2 -translate-y-1/2 right-4"
        />
      </form>

      <div className="mt-3 py-1 w-full grid grid-cols-[1fr_1fr_2fr] bg-blue-50 place-items-center text-body-s select-none">
        <span>성명</span>
        <span>전화번호</span>
        <span>이벤트 frameId</span>
      </div>

      <Suspense fallback={<Loading />}>
        <Users searchString={searchString} />
      </Suspense>
    </div>
  );
}
