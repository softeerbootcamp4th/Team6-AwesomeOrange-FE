import Container from "@admin/components/Container.jsx";
import EventEditor from "../features/eventEdit/index.jsx";
import { EventEditModeContext } from "../features/eventEdit/businessLogic/context.js";

function EventsCreatePage() {
  return (
    <Container>
      <EventEditModeContext.Provider value="create">
        <EventEditor />
      </EventEditModeContext.Provider>
    </Container>
  );
}

export default EventsCreatePage;
