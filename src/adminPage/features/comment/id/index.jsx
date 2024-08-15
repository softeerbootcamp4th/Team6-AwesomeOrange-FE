import Suspense from "@common/components/Suspense";
import Loading from "./Loading.jsx";
import Comments from "./Comments.jsx";
import { useState } from "react";
import { fetchServer } from "@common/dataFetch/fetchServer.js";
import Pagination from "@admin/components/Pagination";

export default function AdminCommentID({ eventId }) {
  const [checkedComments, setCheckedComments] = useState(new Set());
  const [page, setPage] = useState(1);
  const [formString, setFormString] = useState("");

  function selectAll() {

  }

  function deleteComments() {
    const num = checkedComments.size;
    if (!num) return;

    if (
      confirm(
        `이 동작은 다시 돌이킬 수 없습니다.\n${num}개의 기대평을 삭제하시겠습니까?`,
      )
    ) {
      fetchServer("/api/v1/admin/comments", {
        method: "DELETE",
        body: {
          commentIds: [...checkedComments],
        },
      })
        .then(() => {
          alert("기대평이 삭제되었습니다.");
          setCheckedComments(new Set());
          // Comments 컴포넌트 리렌더링
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }

  function searchComment(e) {
    e.preventDefault();

    if(formString){
      console.log(formString + "검색");
    }
  }

  return (
    <div className="flex flex-col w-full items-center">
      <button
        onClick={deleteComments}
        className="self-end px-5 py-1 bg-red-300 text-white hover:bg-red-500 rounded-lg"
      >
        삭제
      </button>

      <form onSubmit={searchComment} className="mt-5 w-full relative">
        <input
          type="text"
          value={formString}
          onChange={(e) => setFormString(e.target.value)}
          placeholder="검색 단어 입력"
          className="bg-neutral-50 focus:bg-white w-full px-4 py-2 rounded-lg"
        />

        <img
          onClick={searchComment}
          src="/icons/search.png"
          alt="검색"
          className="cursor-pointer absolute top-1/2 -translate-y-1/2 right-4"
        />
      </form>

      <div className="mt-3 py-2 w-full grid grid-cols-[1fr_5fr_15fr] bg-blue-50 place-items-center">
        <span onClick={selectAll}>선택</span>
        <span>작성 시간</span>
        <span>기대평 내용</span>
      </div>

      <Suspense fallback={<Loading />}>
        <Comments
          eventId={eventId}
          checkedComments={checkedComments}
          setCheckedComments={setCheckedComments}
          page={page - 1}
        />
      </Suspense>

      <Pagination currentPage={page} setPage={setPage} maxPage={10} />
    </div>
  );
}
