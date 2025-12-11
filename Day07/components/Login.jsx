import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

function Login() {
  // 폼 데이터 상태 관리
 
  async function handleSubmit(e) {
    
  }

  return (
    <div className="login">
      <div className="login-container">
        <h1>로그인</h1>
        
        <form onSubmit={handleSubmit} className="login-form">
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
              autoComplete="current-password"
              placeholder="비밀번호를 입력하세요"
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button
            type="submit"
            className="btn-primary"
            disabled={loading}
          >
            {loading ? '로그인 중...' : '로그인'}
          </button>
        </form>

        <div className="login-footer">
          <p>
            계정이 없으신가요?{' '}
            <Link to="/register" className="link">
              회원가입
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;

