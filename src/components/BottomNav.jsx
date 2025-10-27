// src/components/BottomNav.jsx
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const goHome = () => {
    if (location.pathname !== "/") {
      navigate("/");
    }
  };

  const handleLogout = async () => {
    try {
      await logout();      // ✅ 파이어베이스 로그아웃
      navigate("/", { replace: true }); // ✅ 로그아웃 후 홈으로 이동
    } catch (err) {
      console.error("로그아웃 실패:", err);
    }
  };

  return (
    <div style={styles.container}>
      <button style={styles.btn} onClick={goHome}>홈</button>
      <button style={styles.btn} onClick={() => navigate("/calendar")}>캘린더</button>
      <button style={styles.btn} onClick={handleLogout}>로그아웃</button>
    </div>
  );
}

const styles = {
  container: {
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "60px",
    backgroundColor: "#ffffff",
    borderTop: "1px solid #ccc",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    zIndex: 1000,
  },
  btn: {
    border: "none",
    background: "none",
    fontSize: "16px",
    cursor: "pointer",
  },
};

