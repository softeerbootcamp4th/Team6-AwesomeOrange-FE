import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/events" element={<div>events</div>} />
        <Route path="/" element={<div>hello</div>} />
      </Routes>
    </>
  );
}

export default App;
