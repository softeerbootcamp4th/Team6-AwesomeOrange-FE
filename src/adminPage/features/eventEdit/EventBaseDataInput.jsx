import { useContext } from "react";
import { Input, TextBox } from "@admin/components/SmallInput.jsx";
import { EventEditContext, EventEditDispatchContext, EventEditModeContext } from "./businessLogic/context.js";
import DateTimeRangeInput from "./DateTimeRangeInput.jsx";

function EventBaseDataInput() {
  const {name, eventId, eventFrameId, startTime, endTime, description, url} = useContext(EventEditContext);
  const dispatch = useContext(EventEditDispatchContext);
  const mode = useContext(EventEditModeContext);

  const columnsStyle = "grid grid-cols-[6rem_1fr] items-center gap-2";
  const NAME_MAX_LENGTH = 40;
  const DESCRIPTION_MAX_LENGTH = 100;

  return (
    <>
      <label className={columnsStyle}>
        <span className="text-center">
          이벤트 명<sup className="text-red-500">*</sup>
        </span>
        <div className="w-[25rem] h-8 relative flex items-center">
          <Input
            className="w-full h-full"
            text={name}
            setText={(value) => dispatch({ type: "set_name", value })}
            required
            maxLength="40"
            pattern={
              "^[ㄱ-ㅎ가-힣A-Za-z0-9~!.,\\[\\]\\(\\):\\-_%*\\/+#$@'\"=\\s]*$"
            }
          />
          <span
            className={`absolute right-3 text-detail-l ${name.length >= NAME_MAX_LENGTH ? "text-red-500" : "text-neutral-600"}`}
          >
            {name.length}/{NAME_MAX_LENGTH}
          </span>
        </div>
      </label>
      <label className={columnsStyle}>
        <span className="text-center">이벤트 ID</span>
        <Input
          className="w-[25rem] h-8"
          defaultValue={eventId}
          disabled
        />
      </label>
      <label className={columnsStyle}>
        <span className="text-center">
          이벤트 프레임<sup className="text-red-500">*</sup>
        </span>
        <Input
          className="w-[25rem] h-8"
          text={eventFrameId}
          setText={(value) => dispatch({ type: "set_event_frame", value })}
          required
          disabled={mode === "edit"}
        />
      </label>
      <label className={columnsStyle}>
        <span className="text-center">
          이벤트 기간<sup className="text-red-500">*</sup>
        </span>
        <DateTimeRangeInput
          range={[startTime, endTime]}
          setRange={(range) => {
            dispatch({ type: "set_date_range", value: range });
          }}
          wrapperClass="flex gap-2 items-center flex-wrap"
          inputClass="w-48 h-8"
          required
        />
      </label>
      <label className="grid grid-cols-[6rem_1fr] items-start gap-2">
        <span className="text-center">이벤트 요약</span>
        <div className="relative">
          <TextBox
            className="w-full"
            text={description}
            setText={(value) => dispatch({ type: "set_description", value })}
            rows="4"
            maxLength="100"
          />
          <span
            className={`absolute right-3 bottom-3 text-detail-l ${description.length >= DESCRIPTION_MAX_LENGTH ? "text-red-500" : "text-neutral-600"}`}
          >
            {description.length}/{DESCRIPTION_MAX_LENGTH}
          </span>
        </div>
      </label>
      <label className={columnsStyle}>
        <span className="text-center">이벤트 URL</span>
        <Input
          className="w-[25rem] h-8"
          text={url}
          setText={(value) => dispatch({ type: "set_url", value })}
          type="url"
          pattern="https?://.*"
        />
      </label>
    </>
  );
}

export default EventBaseDataInput;
