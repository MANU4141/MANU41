import React, { useState } from "react";
import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      setMessage("❌ 비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // ✅ 이메일 인증 전송
      await sendEmailVerification(user);

      setMessage("✅ 회원가입 성공! 이메일 인증 링크가 전송되었습니다.");
      navigate("/home");
    } catch (err) {
      setMessage("❌ 오류: " + err.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>회원가입</h2>

        <form onSubmit={handleSignUp}>
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="비밀번호 확인"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />
          <button type="submit" className="login-button">회원가입</button>
        </form>

        {message && <p className="message">{message}</p>}
        <p className="link-row" style={{ justifyContent: "center", marginTop: "15px" }}>
          <button onClick={() => navigate("/")} className="link-button">이미 계정이 있으신가요?</button>
        </p>
      </div>
    </div>
  );
}
