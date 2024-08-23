import Card from "./Card.jsx";
import DelaySkeleton from "@common/components/DelaySkeleton.jsx";

function CardGameSkeleton() {
  return (
    <>
      <div className="h-32 flex justify-center items-center">
        <DelaySkeleton>
          <h3 className="text-head-l md:text-7xl font-bold text-center text-neutral-200">
            로딩중...
          </h3>
        </DelaySkeleton>
      </div>
      <div className="relative grid grid-cols-2 min-[1140px]:grid-cols-4 gap-10">
        {[1, 2, 3, 4].map((index) => (
          <Card index={index} locked key={`card ${index}`} />
        ))}
      </div>
    </>
  );
}

export default CardGameSkeleton;
