import { useEffect } from "react";
import IntroSection from "./introSection";
import Header from "./header";
import SimpleInformation from "./simpleInformation";
import QnA from "./qna";
import Footer from "./footer";

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
      <QnA />
      <Footer />
    </>
  );
}

export default App;
