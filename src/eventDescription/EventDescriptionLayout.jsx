import EventDetail from "./EventDetail.jsx";

function EventDescriptionLayout({detail, children}) {
  return (
    <div className="w-full md:w-[640px] lg:w-full max-w-[1200px] flex flex-col justify-between lg:flex-row gap-16 lg:gap-10 xl:gap-16">
      <EventDetail {...detail} />
      <div className="flex flex-col gap-10 w-full lg:w-1/2 lg:max-w-[510px]">
        <h4 className="text-body-l font-bold text-white">경품 안내</h4>
        {children}
      </div>
    </div>
  );
}

export default EventDescriptionLayout;