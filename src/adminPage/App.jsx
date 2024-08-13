import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route
          exact
          path="/events/create"
          element={<div>event 생성 화면</div>}
        />
        <Route path="/events/:id" element={<div>event 보는 화면</div>} />
        <Route path="/events" element={<div>이벤트 목록 화면</div>} />
        <Route path="/comments/:id" element={<div>기대평 화면</div>} />
        <Route path="/comments" element={<div>기대평 검색 화면</div>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<div>hello</div>} />
      </Routes>
    </>
  );
}

export default App;
