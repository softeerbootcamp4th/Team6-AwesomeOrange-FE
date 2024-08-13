import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";

import Container from "@admin/components/Container.jsx";
import useUserStore from "@admin/auth/store.js";

function ProtectedRoute() {
  const isLogin = useUserStore((store) => store.isLogin);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) navigate("/login", { replace: true });
  }, [isLogin, navigate]);

  if (!isLogin) return <Container />;
  return <Outlet />;
}

export default ProtectedRoute;
