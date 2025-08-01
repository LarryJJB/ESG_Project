import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './LoginCorp.css'; // 기존 스타일 그대로 사용

const LoginUnified = () => {
  const [mode, setMode] = useState('business'); // 'business' or 'government'
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [saveId, setSaveId] = useState(false);  // 아이디 저장 여부
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // 로그인 타입별로 다른 키로 저장
  const savedIdKey = mode === 'business' ? 'savedId' : 'savedGovId';

  // 컴포넌트 마운트, mode 변경 시 localStorage에서 아이디 불러오기
  useEffect(() => {
    const saved = localStorage.getItem(savedIdKey);
    if (saved) {
      setId(saved);
      setSaveId(true);
    } else {
      setId('');
      setSaveId(false);
    }
  }, [mode]); // mode가 바뀔 때마다 실행

  // 각각 로그인 엔드포인트 지정
  const loginEndpoints = {
    business: 'http://localhost:3001/loginB/corp',
    government: 'http://localhost:3001/loginG/corp'
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    if (!id || !pw) {
      setError('아이디와 비밀번호를 입력하세요.');
      return;
    }

    try {
      const res = await fetch(loginEndpoints[mode], {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, pw }),
      });
      const data = await res.json();

      if (data.result === 'success') {
        // 로그인 성공 시: localStorage에 아이디 저장/삭제
        if (saveId) {
          localStorage.setItem(savedIdKey, id);
        } else {
          localStorage.removeItem(savedIdKey);
        }
        localStorage.setItem(mode === 'business' ? 'id' : 'gov_id', id);
        navigate('/');
      } else {
        setError(data.msg || '로그인 실패! 아이디/비밀번호를 확인하세요.');
      }
    } catch (err) {
      setError('서버 오류! 잠시 후 다시 시도해 주세요.');
    }
  };

  return (
    <div>
      
      <div className="login-corp-bg">
        <div className="login-corp-box">
          <div className="login-switch-btn-area">
            <button
              className={mode === 'business' ? 'login-switch-btn active' : 'login-switch-btn'}
              onClick={() => { setMode('business'); setId(''); setPw(''); setError(''); }}
              type="button"
            >
              기업 로그인
            </button>
            <button
              className={mode === 'government' ? 'login-switch-btn active' : 'login-switch-btn'}
              onClick={() => { setMode('government'); setId(''); setPw(''); setError(''); }}
              type="button"
            >
              관공업 로그인
            </button>
          </div>

          <h2 style={{ marginTop: '22px' }}>
            {mode === 'business' ? '기업·공공기관 로그인' : '관공업 로그인'}
          </h2>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder={mode === 'business' ? '기업/기관 아이디' : '관공업 아이디'}
              value={id}
              onChange={e => setId(e.target.value)}
              autoFocus
              required
            />
            <input
              type="password"
              placeholder="비밀번호"
              value={pw}
              onChange={e => setPw(e.target.value)}
              required
            />
            {/* 아이디 저장 체크박스 */}
            <div style={{ margin: '12px 0 0 0', textAlign: 'left' }}>
              <input
                type="checkbox"
                id="saveId"
                checked={saveId}
                onChange={() => setSaveId(!saveId)}
              />
              <label htmlFor="saveId" style={{ marginLeft: '6px', fontSize: '14px' }}>
                아이디 저장
              </label>
            </div>
            {error && <div className="login-error">{error}</div>}
            <button className="main-btn" type="submit">로그인</button>
          </form>
          <div className="login-link-area">
            <span>비밀번호를 잊으셨나요?</span>
            <span className="divider">|</span>
            <a href="/joinmain" className="join-link">회원가입</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginUnified;
