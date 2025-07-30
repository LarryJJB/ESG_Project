// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./DefectCheck.css"; // 분리된 CSS 파일 가져오기

// export default function DefectCheck() {
//   const navigate = useNavigate();

//   const [imageFile, setImageFile] = useState(null);
//   const [imagePreview, setImagePreview] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [result, setResult] = useState(null);
//   const [ocrText, setOcrText] = useState("");

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImageFile(file);
//       setImagePreview(URL.createObjectURL(file));
//       setResult(null);
//       setOcrText("");
//     }
//   };

//   const handleAnalysis = async () => {
//     if (!imageFile) {
//       alert("먼저 라벨 이미지를 업로드해주세요.");
//       return;
//     }
//     setIsLoading(true);
//     setResult(null);
//     setOcrText("");

//     setTimeout(() => {
//       const isDefective = Math.random() > 0.5;
//       setResult(isDefective ? "불량" : "정상");
//       setOcrText(
//         isDefective
//           ? "유형: 인쇄 번짐\n코드: A48B-22\n일자: 2025-07-28"
//           : "유형: 인쇄 양호\n코드: A48B-22\n일자: 2025-07-28"
//       );
//       setIsLoading(false);
//     }, 2000);
//   };

//   // 조건부 클래스명을 생성하는 헬퍼 함수
//   const getResultBoxClassName = () => {
//     if (!result) return 'result-box';
//     return `result-box ${result === '불량' ? 'defective' : 'normal'}`;
//   };

//   return (
//     <div className="defect-check-page">
//       <h1 className="page-title">라벨 불량 판정</h1>

//       <div className="main-content">
//         {/* 좌측 패널: 입력 */}
//         <div className="panel">
//           <div>
//             <h2>1. 라벨 이미지 업로드</h2>
//             <input
//               type="file"
//               id="imageUpload"
//               accept="image/*"
//               onChange={handleImageChange}
//               className="file-input"
//             />
//             <label htmlFor="imageUpload" className="btn btn-secondary">
//               이미지 선택
//             </label>
//           </div>

//           <div>
//             <h2>2. AI 분석 시작</h2>
//             <button
//               onClick={handleAnalysis}
//               disabled={!imageFile || isLoading}
//               className="btn btn-primary"
//             >
//               {isLoading ? "분석 중..." : "불량 판정 시작하기"}
//             </button>
//           </div>
//         </div>

//         {/* 우측 패널: 출력 */}
//         <div className="panel output-panel">
//           {isLoading ? (
//             <p className="loading-text">AI가 이미지를 분석하고 있습니다. 잠시만 기다려주세요...</p>
//           ) : result ? (
//             <div className={getResultBoxClassName()}>
//               <p className="result-title">
//                 판정 결과: <span>{result}</span>
//               </p>
//               <hr />
//               <p className="ocr-text">
//                 <strong>OCR 추출 데이터:</strong>
//                 <br />
//                 <span>{ocrText}</span>
//               </p>
//             </div>
//           ) : imagePreview ? (
//             <img src={imagePreview} alt="업로드된 라벨" className="image-preview" />
//           ) : (
//             <p className="output-placeholder">
//               이미지를 업로드하면
//               <br />
//               이곳에 결과가 표시됩니다.
//             </p>
//           )}
//         </div>
//       </div>

//       <button onClick={() => navigate("/")} className="btn btn-secondary home-button">
//         홈으로 돌아가기
//       </button>
//     </div>
//   );
// }

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DefectCheck.css";

export default function DefectCheck() {
  const navigate = useNavigate();

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [ocrText, setOcrText] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setResult(null);
      setOcrText("");
    }
  };

  const handleAnalysis = async () => {
    if (!imageFile) {
      alert("먼저 라벨 이미지를 업로드해주세요.");
      return;
    }

    setIsLoading(true);
    setResult(null);
    setOcrText("");

    try {
      const formData = new FormData();
      formData.append("image", imageFile); // ✅ 백엔드에서 사용하는 key 이름과 일치

      const response = await fetch("http://localhost:5000/analyze", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("서버 응답 오류");
      }

      const data = await response.json();
      setResult(data.result);
      setOcrText(data.ocrText);
    } catch (error) {
      console.error("분석 중 오류:", error);
      setResult("판정 오류");
      setOcrText("OCR 실패");
    } finally {
      setIsLoading(false);
    }
  };

  const getResultBoxClassName = () => {
    if (!result) return "result-box";
    return `result-box ${result === "불량" ? "defective" : "normal"}`;
  };

  return (
    <div className="defect-check-page">
      <h1 className="page-title">라벨 불량 판정</h1>

      <div className="main-content">
        {/* 좌측 패널: 입력 */}
        <div className="panel">
          <div>
            <h2>1. 라벨 이미지 업로드</h2>
            <input
              type="file"
              id="imageUpload"
              accept="image/*"
              onChange={handleImageChange}
              className="file-input"
            />
            <label htmlFor="imageUpload" className="btn btn-secondary">
              이미지 선택
            </label>
          </div>

          <div>
            <h2>2. AI 분석 시작</h2>
            <button
              onClick={handleAnalysis}
              disabled={!imageFile || isLoading}
              className="btn btn-primary"
            >
              {isLoading ? "분석 중..." : "불량 판정 시작하기"}
            </button>
          </div>
        </div>

        {/* 우측 패널: 출력 */}
        <div className="panel output-panel">
          {isLoading ? (
            <p className="loading-text">AI가 이미지를 분석하고 있습니다. 잠시만 기다려주세요...</p>
          ) : result ? (
            <div className={getResultBoxClassName()}>
              <p className="result-title">
                판정 결과: <span>{result}</span>
              </p>
              <hr />
              <p className="ocr-text">
                <strong>OCR 추출 데이터:</strong>
                <br />
                <span>{ocrText}</span>
              </p>
            </div>
          ) : imagePreview ? (
            <img src={imagePreview} alt="업로드된 라벨" className="image-preview" />
          ) : (
            <p className="output-placeholder">
              이미지를 업로드하면
              <br />
              이곳에 결과가 표시됩니다.
            </p>
          )}
        </div>
      </div>

      <button onClick={() => navigate("/")} className="btn btn-secondary home-button">
        홈으로 돌아가기
      </button>
    </div>
  );
}