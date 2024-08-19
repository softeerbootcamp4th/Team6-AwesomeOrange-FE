import { useContext } from "react";
import { EventEditDispatchContext } from "../businessLogic/context.js";
import { Input } from "@admin/components/SmallInput.jsx";
import DateInput from "@admin/components/DateInput";
import DeleteButton from "@admin/components/DeleteButton";
import { formatDate, padNumber } from "@common/utils.js";
import fcfsInputGridStyle from "./tableStyle.js";

const MINUTE = 60;

function minuteIntToString(min) {
  const h = Math.floor(min / MINUTE) % 24;
  const m = min % MINUTE;
  return `${padNumber(h)}:${padNumber(m)}`;
}

function strToMinutes(str) {
  const [h, m] = str.split(":").map(Number);
  return h * MINUTE + m;
}

function FcfsItemInput({ uniqueKey, date, start, end, participantCount, prizeInfo }) {
  const dispatch = useContext(EventEditDispatchContext);
  const enableDateEdit = uniqueKey.startsWith("auto_made_");

  function modify(value) {
    dispatch({ type: "modify_fcfs_item", key: uniqueKey, value });
  }

  return (
    <div className={`${fcfsInputGridStyle} h-10 text-body-m`}>
      {enableDateEdit ? (
        <div className="text-center">{formatDate(date, "M/DD")}</div>
      ) : (
        <DateInput
          date={date}
          setDate={(date) =>
            dispatch({ type: "modify_fcfs_item", key: uniqueKey, value: { date } })
          }
          required
          size="4"
        />
      )}
      <Input
        type="time"
        required
        text={minuteIntToString(start)}
        setText={(value) => modify({ start: strToMinutes(value) })}
        step="300"
        size="12"
      />
      <Input
        type="time"
        required
        text={minuteIntToString(end)}
        setText={(value) => modify({ end: strToMinutes(value) })}
        step="300"
        size="12"
      />
      <Input
        type="text"
        required
        text={participantCount}
        setText={(value) => modify({ participantCount: Number.isNaN(+value) ? 0 : +value })}
        inputMode="numeric"
        pattern="[0-9]+"
        size="3"
        placeholder="인원"
      />
      <Input
        type="text"
        text={prizeInfo}
        setText={(value) => modify({ prizeInfo: value })}
        placeholder="경품 이름 입력"
      />
      <DeleteButton
        onClick={() => dispatch({ type: "delete_fcfs_item", key: uniqueKey })}
        disabled={uniqueKey.startsWith("determined_")}
      />
    </div>
  );
}

export default FcfsItemInput;
