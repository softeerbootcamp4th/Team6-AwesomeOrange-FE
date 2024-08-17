import { useContext } from "react";
import { EventEditContext } from "../businessLogic/context.js";
import BatchTimeUpdater from "./BatchTimeUpdater.jsx";
import FcfsItemInput from "./FcfsItemInput.jsx";

function FcfsInput({state, dispatch}) {
  const {fcfs} = useContext(EventEditContext);

  return <div className="w-full flex flex-col gap-8">
    <BatchTimeUpdater />
    <div>
      {
        [...fcfs].map( (value)=><FcfsItemInput key={value.uniqueKey} {...value} /> )
      }
    </div>
  </div>;
}

export default FcfsInput;
