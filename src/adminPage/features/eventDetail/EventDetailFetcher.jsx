import EventDetail from "./index.jsx";
import { useQuery } from "@common/dataFetch/getQuery.js";
import { fetchServer } from "@common/dataFetch/fetchServer.js";

function EventDetailFetcher({ eventId }) {
  const data = useQuery(`event-detail-${eventId}`, () =>
    fetchServer(`/api/v1/admin/events/${eventId}`),
  );
  return <EventDetail data={data} />;
}

export default EventDetailFetcher;
