import EventDescriptionLayout from "@/eventDescription/EventDescriptionLayout.jsx";
import DateEventPrize from "./DateEventPrize.jsx";
import content from "./content.json";

function FcfsDescription() {
  return (
    <EventDescriptionLayout detail={content.detail}>
      <div className="flex flex-col gap-5">
          {content.prizes.map( (eachData)=><DateEventPrize {...eachData} key={eachData.id} /> )}
        </div>
    </EventDescriptionLayout>
  );
}

export default FcfsDescription;
