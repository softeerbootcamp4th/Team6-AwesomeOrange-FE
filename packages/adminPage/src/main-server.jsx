import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "./App.jsx";

export default function render(url) {
  const path = url === "index" ? "/" : `/${url}`;
  const nye = renderToString(
    <StrictMode>
      <StaticRouter location={path}>
        <App />
      </StaticRouter>
    </StrictMode>,
  );
  return nye;
}

/**
 * 우리의 메인 컴포넌트를 문자열로 렌더링하는 함수를 반환합니다.
 *
 * 향후 페이지가 추가된다면,
 *
 * import SecondPage from "./SecondPage.jsx";
 *
 * export default function render(url) {
 *  // 여기에서 url에 따라 분기처리를 하면 됩니다.
 * }
 *
 * 현재로서는 단일 페이지이므로 render 함수 내에 분기처리를 하지 않습니다.
 */
