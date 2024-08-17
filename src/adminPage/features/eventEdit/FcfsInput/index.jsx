import { useContext } from "react";
import { EventEditContext, } from "../businessLogic/context.js";
import BatchTimeUpdater from "./BatchTimeUpdater.jsx";
import FcfsItemInput from "./FcfsItemInput.jsx";
import Button from "@common/components/Button.jsx";
import fcfsInputGridStyle from "./tableStyle.js";

function FcfsInput({state, dispatch}) {
  const {fcfs} = useContext(EventEditContext);

  return <div className="w-full flex flex-col gap-8">
    <BatchTimeUpdater />
    <div className="flex flex-col gap-2">
      <div className={`${fcfsInputGridStyle} h-10 text-body-m font-bold`}>
        <div className="text-center">날짜</div>
        <div className="text-center">오픈시간</div>
        <div className="text-center">종료시간</div>
        <div className="text-center">당첨자 수</div>
        <div className="text-center">경품</div>
      </div>
      {
        [...fcfs].map( (value)=><FcfsItemInput key={value.uniqueKey} {...value} /> )
      }
      <Button>+ 추가</Button>
    </div>
  </div>;
}

export default FcfsInput;
