import { useQuery } from "@common/dataFetch/getQuery.js";
import { fetchServer } from "@common/dataFetch/fetchServer.js";
import AutoScrollCarousel from "../autoScrollCarousel";
import { formatDate } from "@common/utils.js";
import { EVENT_ID } from "@common/constants.js";

function mask(string) {
  const len = string.length;
  if (len <= 1) return "*";
  if (len === 2) return string[0] + "*";
  return string[0] + "*".repeat(len - 2) + string[len - 1];
}

function CommentCarousel() {
  const { comments } = useQuery("comment-data", () => fetchServer(`/api/v1/comment/${EVENT_ID}`));

  return (
    <div className="w-full h-[29rem]">
      <AutoScrollCarousel speed={0.1} gap={28}>
        {comments.map(({ id, content, userName, createdAt }) => (
          <div
            className="w-72 h-96 mt-10 bg-neutral-50 p-8 flex flex-col justify-between gap-10 hover:scale-110 transition-transform duration-200 ease-in-out-cubic"
            key={id}
          >
            <p className="text-neutral-800 text-body-l font-bold">{content}</p>
            <div className="text-blue-400 flex flex-col gap-1">
              <p className="text-body-m font-bold">{mask(userName)} 님</p>
              <p className="text-body-s font-regular">{formatDate(createdAt, "YYYY. MM. DD")}</p>
            </div>
          </div>
        ))}
      </AutoScrollCarousel>
    </div>
  );
}

export default CommentCarousel;
