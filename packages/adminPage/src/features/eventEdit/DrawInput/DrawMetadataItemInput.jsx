import { useContext } from "react";
import { EventEditDispatchContext } from "../businessLogic/context.js";
import { Input } from "@admin/components/SmallInput.jsx";

function DrawMetadataItemInput({ grade, count, prizeInfo }) {
  const dispatch = useContext(EventEditDispatchContext);
  const modify = (value) =>
    dispatch({ type: "modify_draw_grade_item", value: { grade, ...value } });

  return (
    <>
      <div className="text-center font-medium">{grade}등</div>
      <div className="text-center">
        <Input
          text={count}
          required
          setText={(value) => modify({ count: Number.isNaN(+value) ? 0 : +value })}
          inputMode="numeric"
          pattern="[0-9]+"
          size="3"
          placeholder="인원"
        />
        명
      </div>
      <Input
        text={prizeInfo}
        setText={(value) => modify({ prizeInfo: value })}
        placeholder="경품 이름 입력"
      />
    </>
  );
}

export default DrawMetadataItemInput;
