import Suspense from "@common/components/Suspense";
import Loading from "./Loading.jsx";
import Comments from "./Comments.jsx";
import { useState } from "react";
import { fetchServer } from "@common/dataFetch/fetchServer.js";

export default function AdminCommentID({ eventId }) {
  const [checkedComments, setCheckedComments] = useState(new Set());

  function deleteComments() {
    const num = checkedComments.size;
    if (!num) return;

    fetchServer("/api/v1/admin/comments", {
      method: "DELETE",
      body: {
        commentIds: [...checkedComments],
      },
    })
      .then(() => {
        alert(num + "개의 기대평 삭제 완료.");
        setCheckedComments(new Set());
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function searchComment(e) {
    e.preventDefault();
    console.log(e.target.searchText.value + "검색");
  }

  return (
    <div className="flex flex-col w-full">
      <button
        onClick={deleteComments}
        className="self-end px-5 py-1 bg-red-300 text-white hover:bg-red-500 rounded-lg"
      >
        삭제
      </button>

      <form onSubmit={searchComment} className="mt-5 w-full relative">
        <input
          type="text"
          name="searchText"
          placeholder="검색 단어 입력"
          className="bg-neutral-50 focus:bg-white w-full px-4 py-2 rounded-lg"
        />

        <img
          src="/icons/search.png"
          alt="검색"
          className="absolute top-1/2 -translate-y-1/2 right-4"
        />
      </form>

      <div className="mt-3 py-2 grid grid-cols-[1fr_5fr_15fr] bg-blue-50 place-items-center">
        <span>선택</span>
        <span>작성 시간</span>
        <span>기대평 내용</span>
      </div>

      <Suspense fallback={<Loading />}>
        <Comments
          eventId={eventId}
          checkedComments={checkedComments}
          setCheckedComments={setCheckedComments}
        />
      </Suspense>
    </div>
  );
}
