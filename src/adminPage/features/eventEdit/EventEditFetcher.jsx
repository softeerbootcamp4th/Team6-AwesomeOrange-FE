import EventEditor from "./index.jsx";
import { useQuery } from "@common/dataFetch/getQuery.js";
import { fetchServer } from "@common/dataFetch/fetchServer.js";

function EventEditFetcher({eventId})
{
  const data = useQuery(`event-detail-${eventId}`, ()=>fetchServer(`/api/v1/admin/events/${eventId}`) );
  return <EventEditor mode="edit" initialData={data} />
}

export default EventEditFetcher;