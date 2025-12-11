/**
 * NavigationBar 컴포넌트 (UI 전용)
 * 
 * 상단 네비게이션 바를 표시하는 컴포넌트입니다.
 * UI 전용 프로젝트이므로 실제 인증 기능은 없고, 더미 데이터로 표시합니다.
 */

import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'
import './NavigationBar.css';


function NavigationBar() {
  // 현재 경로 정보 가져오기
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();


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
          <NavLink className='navbar-link' to="/">Home </NavLink>
          <NavLink className='navbar-link' to="/Dashboard">구매관리</NavLink>
          <NavLink className='navbar-link' to="/upload">영수증 업로드</NavLink>
          
          {/* 인증 상태에 따른 메뉴 (더미 데이터 사용) */}
          {isAuthenticated ? (
            <>
              <NavLink className='navbar-link' to="/users" >사용자 관리</NavLink>
              <div className="navbar-user">
                <span className="navbar-username">{user?.name || '사용자'}</span>
                <button onClick={handleLogout} className="navbar-logout">
                  로그아웃
                </button>
              </div>
            </>
          ) : (
            <NavLink className='navbar-link' to="/login"> 로그인 </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavigationBar;

