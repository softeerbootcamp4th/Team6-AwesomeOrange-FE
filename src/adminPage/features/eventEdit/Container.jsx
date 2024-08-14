import Button from "@common/components/Button.jsx";

function EventEditContainer({ title, children }) {
  return (
    <section className="flex flex-col gap-8">
      <div className="flex w-full justify-between">
        <div>
          <h2 className="text-title-m font-bold">{title}</h2>
          <p className="text-detail-l">*는 필수 입력</p>
        </div>
        <div>
          <Button>임시저장 불러오기</Button>
          <Button>임시저장</Button>
          <Button>등록</Button>
        </div>
      </div>
      {children}
    </section>
  );
}

export default EventEditContainer;
