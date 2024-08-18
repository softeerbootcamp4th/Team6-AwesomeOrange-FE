import { Fragment, useMemo } from "react";
import useScrollControl from "./useScrollControl.js";
import { fetchServer } from "@common/dataFetch/fetchServer.js";
import { useQuery } from "@common/dataFetch/getQuery.js";
import { GroupMap } from "@common/utils.js";

function mapResultSubsetGroup({ ranking, name, phoneNumber }) {
  return (
    <Fragment key={`${ranking}-${name}-${phoneNumber}`}>
      <p className="font-medium">{ranking}등</p>
      <p>{name}</p>
      <p>{phoneNumber}</p>
    </Fragment>
  );
}

function DrawResultModal({ eventId }) {
  const drawResultData = useQuery(`event-detail-draw-result-${eventId}`, () => {
    return fetchServer(`/api/v1/admin/draw/${eventId}/winners`);
  });
  const { hullRef, mountMap, scrollTo, intersectState } = useScrollControl();

  // render logic
  const maxGrade = drawResultData.at(-1).ranking;
  const tableStyle =
    "w-full grid grid-cols-[4rem_1fr_2fr] auto-rows-[minmax(2rem,auto)] gap-4 items-center justify-items-center";

  const drawResultGroup = useMemo(() => {
    const groupMap = new GroupMap();
    for (let item of drawResultData) groupMap.set(item.ranking, item);
    return groupMap;
  }, [drawResultData]);

  function mapResultGroup([key, subset]) {
    return (
      <div
        className={`${tableStyle} gap-y-2 font-regular`}
        key={key}
        ref={(ref) => mountMap(ref, key)}
      >
        {subset.map(mapResultSubsetGroup)}
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-4">
      <h2 className="text-title-m font-bold">당첨자</h2>
      <div className="flex flex-wrap gap-4">
        {Array.from({ length: maxGrade }, (_, i) => (
          <button
            className={`${i + 1 === intersectState ? "text-blue-400 font-bold" : "text-neutral-400"}`}
            key={`grade-${i + 1}`}
            onClick={() => scrollTo(i + 1)}
          >
            {i + 1}등
          </button>
        ))}
      </div>
      <div className={`${tableStyle} font-bold bg-white`}>
        <p>등수</p>
        <p>이름</p>
        <p>전화번호</p>
      </div>
      <div className="w-full flex-grow overflow-y-scroll" ref={hullRef}>
        <div className="flex flex-col gap-2">{[...drawResultGroup].map(mapResultGroup)}</div>
      </div>
    </div>
  );
}

export default DrawResultModal;
