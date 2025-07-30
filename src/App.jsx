// react-router-dom 라이브러리에서 Routes와 Route 컴포넌트를 가져옵니다.
// 이 컴포넌트들은 URL 경로에 따라 렌더링할 컴포넌트를 정의하는 데 사용됩니다.
import { Routes, Route } from "react-router-dom";

// 각 페이지를 구성하는 컴포넌트들을 가져옵니다.
import Home from "./component/Home.jsx"; // 메인 페이지 (랜딩 페이지)
import DefectCheck from "./component/DefectCheck.jsx"; // 불량 판정 페이지

// App 컴포넌트는 애플리케이션의 최상위 레벨에서 라우팅 구조를 정의합니다.
function App() {
  return (
    // Routes 컴포넌트는 여러 Route들을 감싸는 역할을 합니다.
    // 현재 URL과 일치하는 첫 번째 Route 하나만 렌더링합니다.
    <Routes>
      {/* Route 컴포넌트는 특정 경로(path)와 해당 경로에서 보여줄 컴포넌트(element)를 연결합니다. */}
      
      {/* path="/"는 웹사이트의 루트 주소(예: http://localhost:3000/)를 의미합니다. */}
      {/* 이 경로로 접속하면 <Home /> 컴포넌트가 화면에 표시됩니다. */}
      <Route path="/" element={<Home />} />
      
      {/* path="/defect-check"는 (예: http://localhost:3000/defect-check) 경로를 의미합니다. */}
      {/* 이 경로로 접속하면 <DefectCheck /> 컴포넌트가 화면에 표시됩니다. */}
      <Route path="/defect-check" element={<DefectCheck />} />
    </Routes>
  );
}

// 이 파일을 다른 파일에서 import하여 사용할 수 있도록 App 컴포넌트를 내보냅니다.
export default App;
