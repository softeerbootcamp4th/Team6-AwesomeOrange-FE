import Suspense from "@common/components/Suspense";
import Loading from "./Loading.jsx";
import Comments from "./Comments.jsx";
import { useState } from "react";
import Pagination from "@admin/components/Pagination";
import DeleteButton from "./DeleteButton.jsx";

export default function AdminCommentID({ eventId }) {
  const [checkedComments, setCheckedComments] = useState(new Set());
  const [page, setPage] = useState(1);
  const [formString, setFormString] = useState("");
  const [allId, setAllId] = useState([]);

  function selectAll() {
    if (allId.every((id) => checkedComments.has(id))) {
      setCheckedComments((oldSet) => {
        const newSet = new Set(oldSet);
        allId.forEach((id) => {
          newSet.delete(id);
        });
        return newSet;
      });
    } else {
      setCheckedComments((oldSet) => new Set([...oldSet, ...allId]));
    }
  }

  function searchComment(e) {
    e.preventDefault();

    if (formString) {
      console.log(formString + "검색");
    }
  }

  return (
    <div className="flex flex-col w-full items-center">
      <DeleteButton
        eventId={eventId}
        checkedComments={checkedComments}
        setCheckedComments={setCheckedComments}
      />

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
        <span onClick={selectAll} className="cursor-pointer">
          선택
        </span>
        <span>작성 시간</span>
        <span>기대평 내용</span>
      </div>

      <Suspense fallback={<Loading />}>
        <Comments
          eventId={eventId}
          checkedComments={checkedComments}
          setCheckedComments={setCheckedComments}
          page={page - 1}
          setAllId={setAllId}
        />
      </Suspense>

      <Pagination currentPage={page} setPage={setPage} maxPage={10} />
    </div>
  );
}
