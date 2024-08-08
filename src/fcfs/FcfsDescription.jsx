import EventDetail from "@/eventDescription/EventDetail.jsx";
import content from "./content.json";

function FcfsDescription() {
  return (
    <div>
      <EventDetail {...content} />
    </div>
  );
}

export default FcfsDescription;
