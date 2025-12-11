import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Register.css';

function Register() {
  // 폼 데이터 상태 관리
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
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

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);


    setLoading(true);


    // 임시: 실습용 더미 처리
    setTimeout(() => {
      setLoading(false);
      alert('실습: 회원가입 로직을 구현하세요!');
    }, 1000);
  }

  return (
    <div className="register">
      <div className="register-container">
        <h1>회원가입</h1>
        
        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label htmlFor="name">이름</label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              autoComplete="name"
              placeholder="이름을 입력하세요 (2-50자)"
              minLength={2}
              maxLength={50}
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

