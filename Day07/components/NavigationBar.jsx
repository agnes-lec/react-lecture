/**
 * NavigationBar 컴포넌트
 * 
 * 상단 네비게이션 바를 표시하는 컴포넌트입니다.
 * 인증 상태에 따라 메뉴를 동적으로 표시합니다.
 */

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './NavigationBar.css';

function NavigationBar() {
  // 현재 경로 정보 가져오기
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  /**
   * 로그아웃 핸들러
   */
  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* 로고/브랜드 */}
        <Link to="/" className="navbar-brand">
          💰 AI 지출 관리 (v0.0)
        </Link>
        
        {/* 메뉴 링크들 */}
        <div className="navbar-menu">
          
          <Link 
            to="/" 
            className={`navbar-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Home
          </Link>
          <Link 
            to="/dashboard" 
            className={`navbar-link ${location.pathname === '/dashboard' ? 'active' : ''}`}
          >
            대시보드
          </Link>
          <Link 
            to="/tasks" 
            className={`navbar-link ${location.pathname === '/tasks' ? 'active' : ''}`}
          >
            Task 관리
          </Link>
          <Link 
            to="/upload" 
            className={`navbar-link ${location.pathname === '/upload' ? 'active' : ''}`}
          >
            영수증 업로드
          </Link>
          
          {/* 인증 상태에 따른 메뉴 */}
          {isAuthenticated ? (
            <>
              <Link 
                to="/users" 
                className={`navbar-link ${location.pathname.startsWith('/users') ? 'active' : ''}`}
              >
                사용자 관리
              </Link>
              <div className="navbar-user">
                <span className="navbar-username">{user?.name || '사용자'}</span>
                <button onClick={handleLogout} className="navbar-logout">
                  로그아웃
                </button>
              </div>
            </>
          ) : (
            <Link 
              to="/login" 
              className={`navbar-link ${location.pathname === '/login' ? 'active' : ''}`}
            >
              로그인
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavigationBar;

