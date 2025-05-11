import React, { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

export default function FindAccountPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("✅ 비밀번호 재설정 메일이 발송되었습니다.");
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        setMessage("❌ 존재하지 않는 사용자입니다.");
      } else if (error.code === "auth/invalid-email") {
        setMessage("❌ 이메일 형식이 잘못되었습니다.");
      } else {
        setMessage("❌ 오류: " + error.message);
      }
    }
  };

  return (
    <div style={{
      maxWidth: "400px",
      margin: "80px auto",
      padding: "30px",
      border: "1px solid #ddd",
      borderRadius: "10px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
    }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>비밀번호 재설정</h2>
      <form onSubmit={handleReset}>
        <label htmlFor="email">가입한 이메일</label>
        <input
          id="email"
          type="email"
          placeholder="이메일 입력"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: "100%", padding: "10px", marginTop: "8px", marginBottom: "20px" }}
        />
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          비밀번호 재설정 이메일 전송
        </button>
      </form>
      {message && <p style={{ marginTop: "20px", textAlign: "center" }}>{message}</p>}
    </div>
  );
}
