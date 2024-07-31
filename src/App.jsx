import { useEffect } from "react";
import IntroSection from "./introSection";
import Header from "./header";
import SimpleInformation from "./simpleInformation";

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
    </>
  );
}

export default App;
