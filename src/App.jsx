import { useEffect } from "react";
import IntroSection from "./introSection";

function App() {
  useEffect(() => {
    window.scrollTo(0, 0);
    history.scrollRestoration = "manual";
  }, []);

  return (
    <>
      <IntroSection />
    </>
  );
}

export default App;
