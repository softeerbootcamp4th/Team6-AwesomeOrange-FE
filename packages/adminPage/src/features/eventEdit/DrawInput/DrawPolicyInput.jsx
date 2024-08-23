import { useContext } from "react";
import { EventEditContext, EventEditDispatchContext } from "../businessLogic/context.js";
import DrawPolicyItemInput from "./DrawPolicyItemInput.jsx";
import Button from "@common/components/Button.jsx";

function DrawPolicyInput() {
  const {
    draw: { policies },
  } = useContext(EventEditContext);
  const dispatch = useContext(EventEditDispatchContext);

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-[3fr_1fr_3rem] gap-4 items-center justify-items-center font-bold">
        <div className="text-center">액션</div>
        <div className="text-center">배율</div>
        <div className="text-center">삭제</div>
      </div>
      <div className="grid grid-cols-[3fr_1fr_3rem] gap-4 gap-y-2 items-center font-medium">
        {[...policies].map(({ key, ...data }) => (
          <DrawPolicyItemInput key={key} uniqueKey={key} {...data} />
        ))}
      </div>
      <Button onClick={() => dispatch({ type: "add_draw_policy" })}>+ 추가하기</Button>
    </div>
  );
}

export default DrawPolicyInput;
