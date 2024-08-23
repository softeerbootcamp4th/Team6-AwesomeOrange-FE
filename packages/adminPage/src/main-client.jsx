import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

const $root = document.getElementById("root");

if (import.meta.env.DEV) {
  // 개발 시
  const enableMocking = async function () {
    // 실서버와 연동시 //return;의 주석 지워서 테스트해주세요
    // return;
    const worker = (await import("./mock.js")).default;
    await worker.start({ onUnhandledRequest: "bypass" });
  };
  enableMocking().then(() => {
    const root = createRoot($root);
    root.render(
      <StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </StrictMode>,
    );
  });
} else {
  // 배포 시
  hydrateRoot(
    $root,
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>,
  );
}
