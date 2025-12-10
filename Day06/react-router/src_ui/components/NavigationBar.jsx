/**
 * NavigationBar 컴포넌트 (UI 전용)
 * 
 * 상단 네비게이션 바를 표시하는 컴포넌트입니다.
 * UI 전용 프로젝트이므로 실제 인증 기능은 없고, 더미 데이터로 표시합니다.
 */

import { Link, useLocation } from 'react-router-dom';
import './NavigationBar.css';

// UI 전용: 더미 인증 상태 (실습 시 실제 인증으로 교체)
const IS_LOGGED_IN = true; // 실습 시 이 값을 동적으로 관리하도록 변경
const DUMMY_USER = { username: '홍길동' }; // 실습 시 실제 사용자 데이터로 교체

function NavigationBar() {
  // 현재 경로 정보 가져오기
  const location = useLocation();

  /**
   * 로그아웃 핸들러 (UI 전용 - 실제 동작 없음)
   * 실습: 실제 로그아웃 기능을 구현하세요
   */
  function handleLogout() {
    // TODO: 실제 로그아웃 기능 구현
    console.log('로그아웃 버튼 클릭됨 (UI 전용 - 기능 미구현)');
    alert('실습: 로그아웃 기능을 구현하세요!');
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* 로고/브랜드 */}
        <Link to="/" className="navbar-brand">
          💰 AI 지출 관리 (UI 전용)
        </Link>
        
        {/* 메뉴 링크들 */}
        <div className="navbar-menu">
          <Link 
            to="/" 
            className={`navbar-link ${location.pathname === '/' ? 'active' : ''}`}
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
          
          {/* 인증 상태에 따른 메뉴 (더미 데이터 사용) */}
          {IS_LOGGED_IN ? (
            <>
              <Link 
                to="/users" 
                className={`navbar-link ${location.pathname.startsWith('/users') ? 'active' : ''}`}
              >
                사용자 관리
              </Link>
              <div className="navbar-user">
                <span className="navbar-username">{DUMMY_USER.username}</span>
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

