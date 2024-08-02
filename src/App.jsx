import { useEffect } from "react";
import IntroSection from "./introSection";
import Header from "./header";
import SimpleInformation from "./simpleInformation";
import DetailInformation from "./detailInformation";
import QnA from "./qna";
import Footer from "./footer";
import Modal from "./modal/modal.jsx";
import InteractionPage from "./interactions";

function App() {
  useEffect(() => {
    window.scrollTo(0, 0);
    history.scrollRestoration = "manual";
  }, []);

  return (
    <>
      <IntroSection />
      <Header />
      <SimpleInformation />
      <InteractionPage />
      <DetailInformation />
      <QnA />
      <Footer />
      <Modal layer="interaction" />
      <Modal layer="alert" />
    </>
  );
}

export default App;
