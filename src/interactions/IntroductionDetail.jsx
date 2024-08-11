import EventDescriptionLayout from "@/eventDescription/EventDescriptionLayout.jsx";

export default function IntroductionDetail({ details, prizes }) {
  return (
    <EventDescriptionLayout>
      {prizes.map((contentSubList, index) => (
        <div key={index} className="mt-[9px]">
          <span className="bg-neutral-100 text-neutral-900 text-detail-l sm:text-body-s px-2 py-0.5 rounded-[4px] mr-4">
            {index + 1}
          </span>

          {contentSubList.map((content, index) => (
            <span
              key={index}
              className={`${index % 2 ? "text-neutral-400" : "text-white"} text-body-s sm:text-body-m`}
            >
              {content}
            </span>
          ))}
        </div>
      ))}
    </EventDescriptionLayout>
  );
}
