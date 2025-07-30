// React 라이브러리에서 핵심 기능을 가져옵니다.
import React from "react";
// react-dom/client는 React 컴포넌트를 DOM에 렌더링하는 데 사용됩니다.
import ReactDOM from "react-dom/client";
// react-router-dom에서 BrowserRouter를 가져옵니다. 웹 브라우저의 주소(URL)를 사용하여
// 페이지 간의 이동을 구현(라우팅)할 수 있게 해주는 컴포넌트입니다.
import { BrowserRouter } from "react-router-dom";
// 메인 애플리케이션 컴포넌트인 App을 가져옵니다.
import App from "./App.jsx";
// 전역 CSS 스타일을 가져옵니다. (이 파일은 제공되지 않았지만 일반적으로 사용됩니다.)
import "./index.css";

// public/index.html 파일에 있는 id가 'root'인 DOM 요소를 선택하여
// React 애플리케이션의 최상위 컨테이너로 만듭니다.
ReactDOM.createRoot(document.getElementById("root")).render(
  // React.StrictMode는 잠재적인 문제를 감지하고 경고를 표시하여
  // 개발 과정에서 실수를 줄일 수 있도록 돕는 개발용 도구입니다.
  // 프로덕션 빌드에서는 자동으로 비활성화됩니다.
  <React.StrictMode>
    {/* BrowserRouter 컴포넌트로 App 컴포넌트를 감싸줍니다. */}
    {/* 이렇게 하면 App 컴포넌트 및 그 모든 자식 컴포넌트에서 라우팅 기능을 사용할 수 있게 됩니다. */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
