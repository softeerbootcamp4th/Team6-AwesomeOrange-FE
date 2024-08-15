import Container from "@admin/components/Container.jsx";
import EventEditor from "../features/eventEdit/index.jsx";

function EventsCreatePage() {
  return (
    <Container>
      <EventEditor mode="create" />
    </Container>
  );
}

export default EventsCreatePage;
