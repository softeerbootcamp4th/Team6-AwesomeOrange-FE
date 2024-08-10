import EventDetail from "@/eventDescription/EventDetail.jsx";
import DateEventPrize from "./DateEventPrize.jsx";
import content from "./content.json";

function FcfsDescription() {
  return (
    <div className="w-full md:w-[640px] lg:w-full max-w-[1200px] flex flex-col justify-between lg:flex-row gap-16">
      <EventDetail {...content.detail} />
      <div className="flex flex-col gap-10 w-full lg:w-1/2 lg:max-w-[510px]">
        <h4 className="text-body-l font-bold text-white">경품 안내</h4>
        <div className="flex flex-col gap-5">
          {content.prizes.map( (eachData, i)=><DateEventPrize {...eachData} key={eachData.id} /> )}
        </div>
      </div>
    </div>
  );
}

export default FcfsDescription;
