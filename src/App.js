// src/App.js
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

// Pages
import HomePage from "./pages/HomePage";
import EmotionSelectPage from "./pages/EmotionSelectPage";
import EmotionInputPage from "./pages/EmotionInputPage";
import ChatPage from "./pages/ChatPage";
import CalendarPage from "./pages/CalendarPage";

// ✅ 보호 라우트 (로그인 필수 페이지용)
function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();
  if (!currentUser) {
    return <Navigate to="/" replace />;
  }
  return children;
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* ✅ 홈: 기록 시작 버튼이 있는 페이지 */}
        <Route path="/" element={<HomePage />} />

        {/* ✅ 감정 선택 */}
        <Route
          path="/emotion-select"
          element={
            <ProtectedRoute>
              <EmotionSelectPage />
            </ProtectedRoute>
          }
        />

        {/* ✅ 감정 입력 */}
        <Route
          path="/input"
          element={
            <ProtectedRoute>
              <EmotionInputPage />
            </ProtectedRoute>
          }
        />

        {/* ✅ 챗 페이지 */}
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <ChatPage />
            </ProtectedRoute>
          }
        />

        {/* ✅ 캘린더 */}
        <Route
          path="/calendar"
          element={
            <ProtectedRoute>
              <CalendarPage />
            </ProtectedRoute>
          }
        />

        {/* ✅ 알 수 없는 경로 → 홈으로 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
