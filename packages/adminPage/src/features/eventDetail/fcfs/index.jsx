import EventFcfsDataItem from "./EventFcfsDataItem.jsx";

function EventFcfsDataRenderer({ data }) {
  const gridStyle =
    "grid grid-cols-[1fr_3rem_1fr_5rem_3fr] gap-4 justify-center items-center text-body-m";
  const headerStyle = `${gridStyle} min-h-12 py-2 bg-neutral-50 rounded-lg text-black font-bold text-center
	*:relative *:w-full *:after:h-full *:after:absolute *:after:-right-2 *:after:border-r *:after:border-neutral-200
	`;

  return (
    <section className="flex flex-col gap-2">
      <div className={headerStyle}>
        <div>ID</div>
        <div>날짜</div>
        <div>이벤트 시간</div>
        <div>당첨자 수</div>
        <div className="last:after:border-r-0">경품</div>
      </div>
      <div className={`${gridStyle} h-8 font-regular`}>
        {data.map((item) => (
          <EventFcfsDataItem key={item.id} {...item} />
        ))}
      </div>
    </section>
  );
}

export default EventFcfsDataRenderer;
