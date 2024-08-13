import Container from "@admin/components/Container.jsx";
import AdminComment from "../features/comment";

export default function CommentsPage() {
  return (
    <Container>
      <div className="flex flex-col w-full h-dvh p-20">
        <span className="text-title-l">기대평</span>

        <AdminComment />
      </div>
    </Container>
  );
}
