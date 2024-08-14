import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import EventsPage from "./pages/EventsPage.jsx";
import EventsDetailPage from "./pages/EventsDetailPage.jsx";
import EventsCreatePage from "./pages/EventsCreatePage.jsx";
import ProtectedRoute from "./pages/ProtectedRoute.jsx";
import RootRoute from "./pages/RootRoute.jsx";
import CommentsPage from "./pages/CommentsPage.jsx";
import ServerTimeInitializer from "./shared/serverTime/ServerTimeInitializer.jsx";

import Modal from "@common/modal/modal.jsx";
import { initLoginState, logout } from "@admin/auth/store.js";
import useLogoutMiddleware from "@common/dataFetch/initLogoutMiddleware";

function App() {
  useEffect(() => {
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
            element={<EventsCreatePage />}
          />
          <Route path="/events/:id" element={<EventsDetailPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/comments/:id" element={<div>기대평 화면</div>} />
          <Route path="/comments" element={<CommentsPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<RootRoute />} />
      </Routes>
      <Modal layer="alert" />
      <ServerTimeInitializer />
    </>
  );
}

export default App;
