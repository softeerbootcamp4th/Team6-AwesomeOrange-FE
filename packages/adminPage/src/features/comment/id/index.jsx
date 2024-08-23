import Suspense from "@common/components/Suspense";
import Loading from "./Loading.jsx";
import Comments from "./Comments.jsx";
import { useState } from "react";
import DeleteButton from "./DeleteButton.jsx";

export default function AdminCommentID({ eventId }) {
  const [checkedComments, setCheckedComments] = useState(new Set());
  const [formString, setFormString] = useState("");
  const [searchString, setSearchString] = useState("");
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
    setSearchString(formString);
  }

  return (
    <div className="flex flex-col w-full items-center">
      <div className="w-full flex justify-between items-end">
        <div className="flex gap-1 text-body-s">
          <span>검색 이벤트:</span>
          <span className="italic">{eventId}</span>
          <span className={`pl-1 text-red-500 ${!searchString && "hidden"}`}>검색 문자열:</span>
          <span className={`text-red-500 italic ${!searchString && "hidden"}`}>{searchString}</span>
        </div>

        <DeleteButton
          eventId={eventId}
          checkedComments={checkedComments}
          setCheckedComments={setCheckedComments}
        />
      </div>

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
          setAllId={setAllId}
          searchString={searchString}
        />
      </Suspense>
    </div>
  );
}
