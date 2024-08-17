import { useContext } from "react";
import { EventEditDispatchContext } from "../businessLogic/context.js";
import { Input } from "@admin/components/SmallInput.jsx";
import DeleteButton from "@admin/components/DeleteButton";

const POLICY_ENUM = [
  ["WriteComment", "기대평 작성"],
  ["ParticipateEvent", "이벤트 참여"],
];

function DrawPolicyItemInput({ action, score, uniqueKey }) {
  const dispatch = useContext(EventEditDispatchContext);
  const modify = (value) => dispatch({ type: "modify_draw_policy", key: uniqueKey, value });

  return (
    <>
      <select
        className="invalid:text-neutral-400"
        value={action}
        required
        onChange={(e) => modify({ action: e.target.value })}
      >
        <option value="">-정책을 설정하세요-</option>
        {POLICY_ENUM.map(([key, text]) => (
          <option value={key} key={key}>
            {text}
          </option>
        ))}
      </select>
      <Input
        text={score}
        required
        setText={(value) => modify({ score: Number.isNaN(+value) ? 0 : +value })}
        inputMode="numeric"
        pattern="[0-9]+"
        size="6"
        placeholder="점수 배율"
      />
      <DeleteButton onClick={() => dispatch({ type: "delete_draw_policy", key: uniqueKey })} />
    </>
  );
}

export default DrawPolicyItemInput;
