import { useParams } from "react-router-dom";
import Container from "@admin/components/Container.jsx";
import Suspense from "@common/components/Suspense.jsx";
import ErrorBoundary from "@common/components/ErrorBoundary.jsx";
import EventDetailFetcher from "../features/eventDetail/EventDetailFetcher.jsx";

function EventsDetailPage() {
  const { eventId } = useParams();

  return (
    <Container>
      <ErrorBoundary fallback={<div>error</div>}>
        <Suspense fallback={<div>loading</div>}>
          <EventDetailFetcher eventId={eventId} />
        </Suspense>
      </ErrorBoundary>
    </Container>
  );
}

export default EventsDetailPage;
