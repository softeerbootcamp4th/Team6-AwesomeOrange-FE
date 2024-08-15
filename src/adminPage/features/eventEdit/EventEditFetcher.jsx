import EventEditor from "../features/eventEdit/index.jsx";
import { useQuery } from "@common/dataFetch/getQuery.js";
import { fetchData } from "@common/dataFetch/fetchData.js";

function EventEditFetcher({eventId})
{
  const data = useQuery(`event-detail-${eventId}`, ()=>fetchData(`/api/v1/admin/events/${eventId}`) );
  return <EventEditor mode="edit" initialData={data} />
}

export default EventEditFetcher;