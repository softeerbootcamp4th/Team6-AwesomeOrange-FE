import { Navigate, Outlet } from "react-router-dom";
import useUserStore from "@admin/auth/store.js";

function RootRoute() {
  const isLogin = useUserStore( store=>store.isLogin );

  if (isLogin) return <Navigate to="/events" replace />;
  return <Navigate to="/login" replace />;
}

export default RootRoute;