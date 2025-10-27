// src/pages/HomePage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function HomePage() {
  const { currentUser, login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    await login();
    // 여기서 자동 캘린더/입력 이동 안 함. 홈에서 버튼 눌러 이동하는 UX 유지 원하면 그대로 둠.
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20vh" }}>
      <h1>MindPalette</h1>

      {!currentUser ? (
        <button onClick={handleLogin}>Google 로그인</button>
      ) : (
        <>
          <button onClick={() => navigate("/emotion-select")}>기록 시작하기</button>
          <div style={{ marginTop: 10, fontSize: 12, color: "#666" }}>
            (로그인됨: 홈은 그대로 유지, 원하면 위 버튼으로 이동)
          </div>
        </>
      )}
    </div>
  );
}
