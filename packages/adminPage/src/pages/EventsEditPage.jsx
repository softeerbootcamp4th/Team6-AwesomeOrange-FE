import { useParams } from "react-router-dom";
import Container from "@admin/components/Container.jsx";
import Suspense from "@common/components/Suspense.jsx";
import ErrorBoundary from "@common/components/ErrorBoundary.jsx";
import { EventEditModeContext } from "../features/eventEdit/businessLogic/context.js";
import EventEditFetcher from "../features/eventEdit/EventEditFetcher.jsx";

function EventsEditPage() {
  const { eventId } = useParams();

  return (
    <Container>
      <ErrorBoundary fallback={<div>error</div>}>
        <Suspense fallback={<div>loading</div>}>
          <EventEditModeContext.Provider value="edit">
            <EventEditFetcher eventId={eventId} />
          </EventEditModeContext.Provider>
        </Suspense>
      </ErrorBoundary>
    </Container>
  );
}

export default EventsEditPage;
