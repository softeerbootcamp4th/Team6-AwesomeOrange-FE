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
    <div className="flex flex-col w-full items-center">
      <form onSubmit={searchComment} className="mt-3 w-full relative">
        <input
          type="text"
          value={formString}
          onChange={(e) => setFormString(e.target.value)}
          placeholder="검색 단어 입력"
          className="bg-neutral-50 focus:bg-white w-full px-4 py-2 rounded-lg text-body-s"
        />

        <img
          onClick={searchComment}
          src="/icons/search.png"
          alt="검색"
          className="cursor-pointer absolute top-1/2 -translate-y-1/2 right-4"
        />
      </form>

      <div className="mt-3 py-1 w-full grid grid-cols-[1fr_5fr_15fr] bg-blue-50 place-items-center text-body-s select-none">
        <span className="cursor-pointer">
          선택
        </span>
        <span>작성 시간</span>
        <span>기대평 내용</span>
      </div>

      <Suspense fallback={<Loading />}>
        <Users
          searchString={searchString}
        />
      </Suspense>
    </div>
  );
}
