import Container from "@admin/components/Container.jsx";
import AdminCommentID from "../features/comment/id";
import { useParams } from "react-router-dom";

export default function CommentsPage() {
  const { eventId } = useParams();

  return (
    <Container>
      <div className="flex flex-col w-full p-20">
        <span className="text-title-l pb-10">기대평</span>

        <AdminCommentID eventId={eventId} />
      </div>
    </Container>
  );
}
