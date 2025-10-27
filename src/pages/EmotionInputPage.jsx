import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav";
import "./EmotionInputPage.css";

export default function EmotionInputPage() {
  const navigate = useNavigate();
  const [text, setText] = useState("");

  const handleNext = () => {
    localStorage.setItem("emotionText", text);
    navigate("/chat");
  };

  return (
    <div className="input-container">
      <h2 className="input-title">오늘 하루는 어떠셨나요?</h2>

      <textarea
        className="input-textbox"
        placeholder="마음에 남은 하루의 순간을 적어도 좋아요 😊"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button className="input-btn" onClick={handleNext}>
        다음으로 ➜
      </button>

      <button className="skip-btn" onClick={() => navigate("/chat")}>
        건너뛰기
      </button>

      <BottomNav />
    </div>
  );
}
