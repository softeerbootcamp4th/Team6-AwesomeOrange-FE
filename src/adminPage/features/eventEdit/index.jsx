import { useState } from "react";

import { Input, TextBox } from "@admin/components/SmallInput.jsx";

function EventEditor() {
  const columnsStyle = "grid grid-cols-[5rem_1fr] items-center gap-2";

  return (
    <div className="w-full flex flex-col gap-3">
      <label className={columnsStyle}>
        <span className="text-center">
          이벤트 명<sup className="text-red-500">*</sup>
        </span>
        <Input className="w-[25rem] h-8" name="eventName" required/>
      </label>
      <label className={columnsStyle}>
        <span className="text-center">이벤트 ID</span>
        <Input className="w-[25rem] h-8" name="eventId" defaultValue="123" disabled/>
      </label>
      <div className={columnsStyle}>
        <span className="text-center">
          이벤트 기간<sup className="text-red-500">*</sup>
        </span>
        <div className="flex gap-2 items-center flex-wrap">
          <div className="flex gap-4">
            <Input className="w-48 h-8" type="date" name="startDate" />
            <Input className="w-48 h-8" type="time" name="startTime" step="300"/>
          </div>
          ~
          <div className="flex gap-4">
            <Input className="w-48 h-8" type="date" name="endDate" />
            <Input className="w-48 h-8" type="time" name="endTime" step="300"/>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-[5rem_1fr] items-start gap-2">
        <span className="text-center">
          이벤트 설명
        </span>
        <TextBox rows="4" />
      </div>
    </div>
  );
}

export default EventEditor;
