// react-router-dom에서 `useNavigate` 훅을 가져옵니다.
// 이 훅은 코드를 통해 다른 페이지로 이동(네비게이션)하는 함수를 제공합니다.
import { useNavigate } from "react-router-dom";

// Home 컴포넌트를 정의합니다. export default로 내보내 다른 파일에서 이 컴포넌트를 사용할 수 있게 합니다.
export default function Home() {
  // useNavigate 훅을 호출하여 navigate 함수를 생성합니다.
  // 이 함수를 호출하면 지정된 경로로 페이지가 이동됩니다.
  const navigate = useNavigate();

  // 이 컴포넌트가 렌더링할 JSX를 반환합니다.
  return (
    // 최상위 div 컨테이너입니다. 인라인 스타일을 사용하여 전체 화면을 채우고 내용을 중앙 정렬합니다.
    <div
      style={{
        height: "100vh", // 높이를 화면 전체 높이로 설정
        width: "100vw", // 너비를 화면 전체 너비로 설정
        margin: 0,
        padding: 0,
        backgroundColor: "#ffffff", // 흰색 배경
        display: "flex", // Flexbox 레이아웃 사용
        flexDirection: "column", // 자식 요소들을 세로로 정렬
        justifyContent: "center", // 세로 방향 중앙 정렬
        alignItems: "center", // 가로 방향 중앙 정렬
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", // 기본 글꼴
        color: "#1e3c72", // 기본 글자색 (진한 파랑)
        textAlign: "center", // 텍스트 중앙 정렬
      }}
    >
      {/* 서비스의 메인 타이틀(h1)입니다. */}
      <h1
        style={{
          fontSize: "5rem", // 큰 글자 크기
          fontWeight: "900", // 가장 굵은 글씨체
          marginBottom: "20px", // 아래쪽 여백
          letterSpacing: "3px", // 글자 사이 간격
        }}
      >
        AI 라벨 불량 판정 서비스
      </h1>

      {/* 서비스에 대한 설명 문단(p)입니다. */}
      <p
        style={{
          fontSize: "1.8rem", // 제목보다 작은 글자 크기
          maxWidth: "700px", // 문단이 너무 길어지지 않도록 최대 너비 제한
          lineHeight: "1.6", // 줄 간격
          fontWeight: "500", // 약간 굵은 글씨체
          marginBottom: "60px", // 버튼과의 간격을 위한 아래쪽 여백
          color: "#333333", // 기본 글자색보다 약간 연한 검정
        }}
      >
        {/* <br /> 태그를 사용하여 줄바꿈을 합니다. */}
        공장에서 생산된 라벨 사진을 업로드하면, 딥러닝 AI가 신속하고 정확하게 불량 여부를 판정해드립니다.<br />
        누구나 쉽게 사용할 수 있는 직관적인 인터페이스와 신뢰할 수 있는 결과를 제공합니다.
      </p>

      {/* 불량 판정 페이지로 이동하는 버튼입니다. */}
      <button
        // 버튼 클릭 시 navigate 함수를 호출하여 '/defect-check' 경로로 이동합니다.
        onClick={() => navigate("/defect-check")}
        style={{
          padding: "22px 60px", // 안쪽 여백 (버튼 크기 조절)
          fontSize: "1.6rem", // 글자 크기
          borderRadius: "14px", // 모서리 둥글게
          border: "none", // 테두리 없음
          backgroundColor: "#1e3c72", // 진한 파랑 배경
          color: "#ffffff", // 흰색 글자
          fontWeight: "700", // 굵은 글씨체
          cursor: "pointer", // 마우스 커서를 손가락 모양으로 변경
          boxShadow: "0 10px 20px rgba(30, 60, 114, 0.5)", // 입체감을 주는 그림자
          transition: "background-color 0.3s ease", // 배경색 변경 시 부드러운 전환 효과
        }}
        // 마우스가 버튼 위로 올라왔을 때 실행되는 이벤트 핸들러
        onMouseEnter={(e) => (e.target.style.backgroundColor = "#3a5998")}
        // 마우스가 버튼에서 벗어났을 때 실행되는 이벤트 핸들러
        onMouseLeave={(e) => (e.target.style.backgroundColor = "#1e3c72")}
      >
        불량 판정 시작하기
      </button>
    </div>
  );
}
