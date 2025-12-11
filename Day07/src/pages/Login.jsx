/**
 * Login 페이지 컴포넌트 (UI 전용)
 * 
 * 사용자 로그인을 처리하는 페이지입니다.
 * UI 전용 프로젝트이므로 실제 로그인 기능은 없습니다.
 * 
 * 실습: 실제 로그인 API를 연결하여 기능을 구현하세요.
 */

import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'
import './Login.css';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const from = location.state?.from?.pathname || '/';

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
   * 실습: 실제 로그인 API를 호출하도록 구현하세요
   */
  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try{
      const result = await login(formData.email, formData.password);
      if(result.success){
        navigate(from, {replace:true})
      }else{
        setError(result.err || '로그인 실패')
      }
    }catch(err){
      setError('로그인 중 오류 발생했습니다. ')
      console.error('LOGIN ERROR ', err)
    }finally{
      setLoading(false)
    }
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

