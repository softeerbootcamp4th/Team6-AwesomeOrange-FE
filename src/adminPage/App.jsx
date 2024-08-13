import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import EventsPage from "./pages/EventsPage.jsx";
import ProtectedRoute from "./pages/ProtectedRoute.jsx";
import RootRoute from "./pages/RootRoute.jsx";

import { initLoginState, logout } from "@admin/auth/store.js";
import useLogoutMiddleware from "@common/dataFetch/initLogoutMiddleware";

function App() {
  useEffect(() => {
    window.scrollTo(0, 0);
    history.scrollRestoration = "manual";
    initLoginState();
  }, []);
  useLogoutMiddleware(logout);

  return (
    <>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route
            exact
            path="/events/create"
            element={<div>event 생성 화면</div>}
          />
          <Route path="/events/:id" element={<div>event 보는 화면</div>} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/comments/:id" element={<div>기대평 화면</div>} />
          <Route path="/comments" element={<div>기대평 검색 화면</div>} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<RootRoute />} />
      </Routes>
    </>
  );
}

export default App;
