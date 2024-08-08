import useFcfsStore from "../store.js";
import * as Status from "../constants.js";
import { convertSecondsToString } from "@/common/utils.js";

function CardGameCountdown() {
  const countdown = useFcfsStore((store) => store.countdown);
  return (
    <h3 className="text-6xl min-[420px]:text-8xl font-bold text-center text-yellow-400 font-ds-digital">
      {convertSecondsToString(countdown)}
    </h3>
  );
}

function CardGameTitle({ status }) {
  const commonStyle = "text-head-l md:text-7xl font-bold text-center";

  if (status === Status.PROGRESS)
    return (
      <h3
        className={`${commonStyle} graphic-gradient text-transparent bg-clip-text`}
      >
        카드를 뒤집어 주세요!
      </h3>
    );
  if (status === Status.COUNTDOWN) return <CardGameCountdown />;
  if (status === Status.WAITING)
    return (
      <h3 className={`${commonStyle} text-white`}>
        오후
        <span className="text-6xl min-[420px]:text-8xl font-bold text-green-400 font-ds-digital align-sub md:align-text-bottom">
          {" "}
          05 : 00
        </span>
        에 다시 만나요!
      </h3>
    );
  if (status === Status.ALREADY)
    return (
      <h3 className={`${commonStyle} text-neutral-200`}>이미 참여하셨습니다</h3>
    );
  return (
    <div className="relative flex justify-center">
      <h3
        className={`${commonStyle} graphic-gradient text-transparent bg-clip-text`}
      >
        카드를 뒤집어 주세요!
      </h3>
      <p className="text-neutral-300 text-center absolute -bottom-8">
        * 본 이벤트는 마감된 이벤트입니다. 이벤트의 열기를 느껴보세요!
      </p>
    </div>
  );
}

export default CardGameTitle;
