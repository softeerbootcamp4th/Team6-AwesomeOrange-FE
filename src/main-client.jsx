import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { register } from "swiper/element/bundle";
import App from "./App.jsx";
import tokenSaver from "./auth/tokenSaver.js";
import "./index.css";

register();
tokenSaver.init();
const $root = document.getElementById("root");
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

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
    root.render(app);
  });
} else {
  // 배포 시
  hydrateRoot($root, app);
}
