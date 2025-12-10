/**
 * Register 페이지 컴포넌트 (UI 전용)
 * 
 * 사용자 회원가입을 처리하는 페이지입니다.
 * UI 전용 프로젝트이므로 실제 회원가입 기능은 없습니다.
 * 
 * 실습: 실제 회원가입 API를 연결하여 기능을 구현하세요.
 */

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  /**
   * 입력 필드 변경 핸들러
   */
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // 에러 메시지 초기화
    if (error) setError(null);
  }

  /**
   * 폼 제출 핸들러 (UI 전용 - 실제 동작 없음)
   * 실습: 실제 회원가입 API를 호출하도록 구현하세요
   */
  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    // 비밀번호 확인
    if (formData.password !== formData.confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    // 비밀번호 길이 확인
    if (formData.password.length < 6) {
      setError('비밀번호는 최소 6자 이상이어야 합니다.');
      return;
    }

    setLoading(true);

    // UI 전용: 실제 회원가입 기능 없음
    // 실습: API를 호출하여 실제 회원가입 기능을 구현하세요
    setTimeout(() => {
      setLoading(false);
      // TODO: 실제 회원가입 API 호출
      console.log('회원가입 시도:', formData);
      alert('실습: 회원가입 API를 연결하여 실제 회원가입 기능을 구현하세요!');
      // 회원가입 성공 시 대시보드로 이동
      // navigate('/');
    }, 1000);
  }

  return (
    <div className="register">
      <div className="register-container">
        <h1>회원가입</h1>
        
        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label htmlFor="username">아이디</label>
            <input
              id="username"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              autoComplete="username"
              placeholder="아이디를 입력하세요"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">이메일</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="email"
              placeholder="이메일을 입력하세요"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">비밀번호</label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="new-password"
              placeholder="비밀번호를 입력하세요 (최소 6자)"
              minLength={6}
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">비밀번호 확인</label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              autoComplete="new-password"
              placeholder="비밀번호를 다시 입력하세요"
              minLength={6}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button
            type="submit"
            className="btn-primary"
            disabled={loading}
          >
            {loading ? '가입 중...' : '회원가입'}
          </button>
        </form>

        <div className="register-footer">
          <p>
            이미 계정이 있으신가요?{' '}
            <Link to="/login" className="link">
              로그인
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;

