import { Navigate, Outlet } from "react-router-dom";

import Container from "@admin/components/Container.jsx";
import useUserStore from "@admin/auth/store.js";

function ProtectedRoute() {
  const isLogin = useUserStore((store) => store.isLogin);
  const initialized = useUserStore((store) => store.initialized);

  if (!initialized) return <Container />
  if (!isLogin) return <>
    <Container />
    <Navigate to="/login" replace={true} />
  </>;
  return <Outlet />;
}

export default ProtectedRoute;
