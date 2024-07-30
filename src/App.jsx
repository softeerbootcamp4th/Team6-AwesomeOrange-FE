import { useEffect } from "react";
import IntroSection from "./introSection";
import Header from "./header";

function App() {
  useEffect(() => {
    window.scrollTo(0, 0);
    history.scrollRestoration = "manual";
  }, []);

  return (
    <>
      <IntroSection />
      <Header />
    </>
  );
}

export default App;
