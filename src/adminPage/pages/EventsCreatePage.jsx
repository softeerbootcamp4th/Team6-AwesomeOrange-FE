import Container from "@admin/components/Container.jsx";
import EventEditContainer from "../features/eventEdit/Container.jsx";
import EventEditor from "../features/eventEdit/index.jsx";

function EventsCreatePage() {
  return (
    <Container>
      <EventEditContainer title="이벤트 등록">
        <EventEditor />
      </EventEditContainer>
    </Container>
  );
}

export default EventsCreatePage;
