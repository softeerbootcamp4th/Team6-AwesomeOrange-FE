import { useContext } from "react";
import { EventEditContext } from "../businessLogic/context.js";
import BatchTimeUpdater from "./BatchTimeUpdater.jsx";

function FcfsInput({state, dispatch}) {
  const {fcfs} = useContext(EventEditContext);

  return <div className="w-full flex flex-col gap-8">
    <BatchTimeUpdater />
    <div>
      {
        [...fcfs].map( (value)=><div className="flex gap-4" key={value.key}>
          <div>{value.key}</div>
          <div>{value.start}</div>
          <div>{value.end}</div>
        </div> )
      }
    </div>
  </div>;
}

export default FcfsInput;
