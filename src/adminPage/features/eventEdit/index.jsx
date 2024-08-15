import Input from "@admin/components/SmallInput.jsx";

function EventEditor() {
  const columnsStyle = "grid grid-cols-[5rem_1fr] items-center gap-2";

  return (
    <div className="w-full flex flex-col gap-3">
      <label className={columnsStyle}>
        <span className="text-center">
          이벤트 명<sup className="text-red-500">*</sup>
        </span>
        <Input className="w-[25rem] h-8" required/>
      </label>
      <label className={columnsStyle}>
        <span className="text-center">이벤트 ID</span>
        <Input className="w-[25rem] h-8" defaultValue="123" disabled/>
      </label>
      <div className={columnsStyle}>
        <span className="text-center">
          이벤트 기간<sup className="text-red-500">*</sup>
        </span>
        <div>
          <Input className="w-[25rem] h-8" type="date" />
        </div>
      </div>
    </div>
  );
}

export default EventEditor;
