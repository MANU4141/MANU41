import React, { useState, useEffect } from "react";
import { auth, googleProvider } from "./firebase";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepLogin, setKeepLogin] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  // ✅ Naver 로그인 후 토큰 처리
  useEffect(() => {
    const hash = window.location.hash;
    if (hash.includes("access_token")) {
      const params = new URLSearchParams(hash.replace("#", "?"));
      const token = params.get("access_token");

      fetch("https://openapi.naver.com/v1/nid/me", {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => {
          const email = data.response?.email || "이메일 없음";
          console.log("✅ 네이버 로그인 성공:", email);
          navigate("/home");
        })
        .catch(() => setMessage("❌ 네이버 로그인 실패"));
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMessage("✅ 로그인 성공");
      navigate("/home");
    } catch (err) {
      setMessage("❌ 로그인 실패: " + err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("Google 로그인:", result.user.email);
      navigate("/home");
    } catch {
      setMessage("❌ 구글 로그인 실패");
    }
  };

  const handleNaverLogin = () => {
    const clientId = "3youUsblKcz2eoZppI31";
    const redirectURI = encodeURIComponent("http://localhost:3000");
    const state = "NAVER_LOGIN_STATE";
    const url = `https://nid.naver.com/oauth2.0/authorize?response_type=token&client_id=${clientId}&redirect_uri=${redirectURI}&state=${state}`;
    window.location.href = url;
  };

  const handleGuestAccess = () => {
    navigate("/home");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="checkbox">
            <input
              type="checkbox"
              checked={keepLogin}
              onChange={() => setKeepLogin(!keepLogin)}
              id="keepLogin"
            />
            <label htmlFor="keepLogin">로그인 상태 유지</label>
          </div>
          <button type="submit" className="login-button">로그인</button>
        </form>

        {/* ✅ 회원가입 & 찾기 버튼 */}
        <div className="link-row" style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
          <button onClick={() => navigate("/signup")} className="small-button">회원가입</button>
          <button onClick={() => navigate("/find-account")} className="small-link">아이디 · 비밀번호 찾기</button>
        </div>

        <div className="divider">또는</div>

        <button onClick={handleGoogleLogin} className="google-button">🟠 Google로 시작하기</button>
        <button onClick={handleNaverLogin} className="naver-button">🟢 Naver로 시작하기</button>

        <div className="divider">또는</div>

        <button onClick={handleGuestAccess} className="guest-button">비회원으로 시작하기</button>

        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
}
