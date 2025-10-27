// src/context/AuthContext.js
import React, { createContext, useEffect, useState, useContext } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, signInWithPopup, signOut, GoogleAuthProvider } from "firebase/auth";

export const AuthContext = createContext();
const provider = new GoogleAuthProvider();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ 로그인
  const login = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("로그인 실패:", error);
    }
  };

  // ✅ 로그아웃
  const logout = async () => {
    try {
      await signOut(auth);
      console.log("✔ 로그아웃 완료");
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  // ✅ 로그인 상태 감지
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      console.log("로그인 상태 변경:", user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const value = { currentUser, login, logout };

  if (loading) return null;

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
