import Spinner from "@common/components/Spinner.jsx";
import DelaySkeleton from "@common/components/DelaySkeleton.jsx";

function CommentCarouselSkeleton() {
  return (
    <div className="w-full h-[29rem] flex justify-center items-center gap-7 overflow-hidden">
      <DelaySkeleton>
        <div className="flex justify-center items-center gap-7">
          <div className="w-72 h-96 bg-neutral-50 flex justify-center items-center ">
            <Spinner />
          </div>
          <div className="w-72 h-96 bg-neutral-50 flex justify-center items-center">
            <Spinner />
          </div>
          <div className="w-72 h-96 bg-neutral-50 flex justify-center items-center">
            <Spinner />
          </div>
          <div className="w-72 h-96 bg-neutral-50 flex justify-center items-center">
            <Spinner />
          </div>
          <div className="w-72 h-96 bg-neutral-50 flex justify-center items-center">
            <Spinner />
          </div>
          <div className="w-72 h-96 bg-neutral-50 flex justify-center items-center">
            <Spinner />
          </div>
          <div className="w-72 h-96 bg-neutral-50 flex justify-center items-center">
            <Spinner />
          </div>
        </div>
      </DelaySkeleton>
    </div>
  );
}

export default CommentCarouselSkeleton;
