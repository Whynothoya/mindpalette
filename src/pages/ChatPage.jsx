// src/pages/ChatPage.jsx
import React, { useEffect, useState, useRef } from "react";
import "./ChatPage.css";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { formatDate } from "../data/data";
import { useNavigate } from "react-router-dom";
import { dialogues } from "../data/dialogue"; // ✅ 12 감정 대화 불러오기

export default function ChatPage() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [turnCount, setTurnCount] = useState(0);

  const emotion = localStorage.getItem("emotion");
  const emotionLabel = localStorage.getItem("emotionLabel");
  const emotionColor = localStorage.getItem("emotionColor");
  const today = formatDate();
  const bottomRef = useRef(null);

  // ✅ 첫 챗봇 멘트
  useEffect(() => {
    if (!emotion) navigate("/");
    setMessages([
      { sender: "bot", text: `지금 "${emotionLabel}" 감정을 느끼고 있구나 😊` },
      { sender: "bot", text: "여기서 편하게 얘기해도 괜찮아 😌" },
    ]);
  }, []);

  // ✅ Firestore 저장
  const saveToDB = async (newMessages) => {
    if (!currentUser) return;
    try {
      await setDoc(
        doc(db, "users", currentUser.uid, "emotions", today),
        {
          emotion,
          emotionLabel,
          emotionColor,
          messages: newMessages,
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );
    } catch (error) {
      console.error("저장 오류:", error);
    }
  };

  // ✅ 챗봇 자동 스크롤
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ✅ 메시지 전송
  const sendMessage = () => {
    if (!input.trim()) return;

    const newUserMsg = { sender: "user", text: input };
    const updated = [...messages, newUserMsg];
    setMessages(updated);
    setInput("");

    const reply = getBotReply(turnCount);
    const finalChat = [...updated, reply];

    setMessages(finalChat);
    saveToDB(finalChat);

    setTurnCount((prev) => prev + 1);
  };

  // ✅ 감정 및 단계 기반 답변
  const getBotReply = (count) => {
    const script = dialogues[emotion] || dialogues["calm"]; // fallback
    const index = Math.min(count, script.length - 1);
    return { sender: "bot", text: script[index].join("\n") };
  };

  return (
    <div className="chat-wrapper" style={{ backgroundColor: emotionColor }}>
      <div className="chat-box">
        
        <div className="chat-title">마음 팔레트 🎨</div>

        <div className="chat-messages">
          {messages.map((msg, idx) => (
            <div key={idx} className={`message ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* ✅ 일정 단계 이상 진행하면 기록 마무리 버튼 등장 */}
        {turnCount >= 4 && (
          <button className="end-btn" onClick={() => navigate("/calendar")}>
            오늘 기록 마무리하기 ✅
          </button>
        )}

        {/* ✅ 메시지 입력 영역 */}
        <div className="input-section">
          <input
            className="chat-input"
            placeholder="하고 싶은 얘기를 편하게 적어줘 😌"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button className="chat-btn" onClick={sendMessage}>
            전송
          </button>
        </div>

      </div>
    </div>
  );
}
