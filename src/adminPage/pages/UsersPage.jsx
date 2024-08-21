import Container from "@admin/components/Container.jsx";
import Users from "../features/users";

function UsersPage() {
  return (
    <Container>
      <div className="flex flex-col w-full p-20">
        <span className="text-title-l pb-10">유저 조회</span>

        <Users />
      </div>
    </Container>
  );
}

export default UsersPage;
