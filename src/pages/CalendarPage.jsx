// src/pages/CalendarPage.jsx
import React, { useEffect, useState, useMemo } from "react";
import Calendar from "react-calendar";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { emotionData } from "../data/emotions";
import BottomNav from "../components/BottomNav";
import "./CalendarPage.css";

export default function CalendarPage() {
  const { currentUser } = useAuth();
  const [records, setRecords] = useState({}); // { 'YYYY-MM-DD': { emotion, emotionText, ... } }
  const [selectedDate, setSelectedDate] = useState(null); // Date object
  const [selectedRecord, setSelectedRecord] = useState(null);

  // ✅ Firestore: users/{uid}/emotions/{YYYY-MM-DD} 서브컬렉션에서 전부 로드
  useEffect(() => {
    const load = async () => {
      if (!currentUser) return;
      const snap = await getDocs(collection(db, "users", currentUser.uid, "emotions"));
      const map = {};
      snap.forEach((doc) => {
        map[doc.id] = doc.data(); // doc.id === 'YYYY-MM-DD'
      });
      setRecords(map);
    };
    load();
  }, [currentUser]);

  const dateKey = (d) => d.toISOString().split("T")[0];

  const onSelectDate = (date) => {
    setSelectedDate(date);
    const key = dateKey(date);
    setSelectedRecord(records[key] || null);
  };

  // 선택된 날짜의 감정 데이터 (상단 배경 연출에 사용)
  const currentEmotion = useMemo(() => {
    if (!selectedDate) return null;
    const rec = records[dateKey(selectedDate)];
    return rec?.emotion ? emotionData[rec.emotion] : null;
  }, [records, selectedDate]);

  return (
    <div
      className="calendar-container"
      style={{
        // 선택된 감정색을 약하게 배경에 반영 (파스텔 그라디언트 느낌)
        background:
          currentEmotion?.color
            ? `linear-gradient(180deg, ${currentEmotion.color}33, #ffffff 40%)`
            : undefined,
      }}
    >
      <h2 className="calendar-title">나의 감정 기록 🗓</h2>

      <Calendar
        onClickDay={onSelectDate}
        tileContent={({ date }) => {
          const key = dateKey(date);
          const rec = records[key];
          if (!rec) return null;
          const data = emotionData[rec.emotion] || {};
          return (
            <div className="date-cell">
              <span className="date-emoji">{data.emoji}</span>
            </div>
          );
        }}
        // ✅ 선택 타일에 클래스 부여하여 애니메이션 주기
        tileClassName={({ date }) => {
          if (!selectedDate) return "";
          const isSelected = dateKey(date) === dateKey(selectedDate);
          return isSelected ? "tile-selected" : "";
        }}
      />

      {/* ✅ 상세 카드: 감정 변화 애니메이션 */}
      <AnimatePresence mode="wait">
        {selectedRecord && (
          <motion.div
            key={dateKey(selectedDate)}
            className="detail-card"
            style={{
              borderLeft: `6px solid ${
                emotionData[selectedRecord.emotion]?.color || "#eee"
              }`,
            }}
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.25 }}
          >
            <div className="detail-emoji pop">
              {emotionData[selectedRecord.emotion]?.emoji}
            </div>

            <div className="detail-title">오늘의 감정 돌아보기</div>

            <div className="detail-text">감정: {selectedRecord.emotion}</div>

            {selectedRecord.emotionText && (
              <div className="detail-text">메모: {selectedRecord.emotionText}</div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <BottomNav />
    </div>
  );
}
