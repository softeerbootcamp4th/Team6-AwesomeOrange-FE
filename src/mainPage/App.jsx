import { useEffect } from "react";

import IntroSection from "./features/introSection";
import Header from "./features/header";
import SimpleInformation from "./features/simpleInformation";
import InteractionPage from "./features/interactions";
import DetailInformation from "./features/detailInformation";
import CommentSection from "./features/comment";
import FcfsSection from "./features/fcfs";
import QnA from "./features/qna";
import Footer from "./features/footer";

import Modal from "@common/modal/modal.jsx";
import { logout } from "@main/auth/store.js";
import useLogoutMiddleware from "@common/dataFetch/initLogoutMiddleware";

function App() {
  useEffect(() => {
    window.scrollTo(0, 0);
    history.scrollRestoration = "manual";
    //initLoginState();
  }, []);
  useLogoutMiddleware(logout);

  return (
    <>
      <IntroSection />
      <Header />
      <SimpleInformation />
      <InteractionPage />
      <DetailInformation />
      <CommentSection />
      <FcfsSection />
      <QnA />
      <Footer />
      <Modal layer="interaction" />
      <Modal layer="alert" />
    </>
  );
}

export default App;
