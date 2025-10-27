import React from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav";
import "./EmotionSelectPage.css";

const emotionOptions = [
  { key: "happy", label: "행복", color: "#5A6FF0" },
  { key: "excited", label: "설렘", color: "#FFB74D" },
  { key: "calm", label: "평온", color: "#7FD6C2" },
  { key: "focused", label: "집중", color: "#64B5F6" },
  { key: "confused", label: "혼란", color: "#CE93D8" },
  { key: "sad", label: "슬픔", color: "#6A80FF" },
  { key: "depressed", label: "무기력", color: "#475270" },
  { key: "anxious", label: "불안", color: "#FFCC5C" },
  { key: "angry", label: "분노", color: "#FF6B6B" },
  { key: "tired", label: "피곤", color: "#9B9B9B" },
  { key: "lonely", label: "외로움", color: "#B39DDB" },
  { key: "stressed", label: "스트레스", color: "#E57373" },
];

export default function EmotionSelectPage() {
  const navigate = useNavigate();

  const handleSelect = (emotion) => {
    localStorage.setItem("emotion", emotion.key);
    localStorage.setItem("emotionLabel", emotion.label);
    localStorage.setItem("emotionColor", emotion.color);

    navigate("/input");
  };

  return (
    <div className="select-container">
      <h2 className="select-title">지금 당신의 감정은 어떤 색인가요? 🎨</h2>

      <div className="emotion-grid">
        {emotionOptions.map((emotion) => (
          <button
            key={emotion.key}
            className="emotion-btn"
            style={{ backgroundColor: emotion.color }}
            onClick={() => handleSelect(emotion)}
          >
            {emotion.label}
          </button>
        ))}
      </div>

      <BottomNav />
    </div>
  );
}
