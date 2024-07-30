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
      <img src="https://image.utoimage.com/preview/cp872655/2018/03/201803016775_500.jpg" className="h-[2000px]"/>
    </>
  );
}

export default App;
