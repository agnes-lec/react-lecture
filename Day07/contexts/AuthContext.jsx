/**
 * AuthContext - 인증 상태 관리
 * 
 * 전역 인증 상태를 관리하는 Context입니다.
 * 로그인, 로그아웃, 사용자 정보를 관리합니다.
 * 
 * 사용된 Hook:
 * - createContext: Context 생성
 * - useContext: Context 값 읽기 (useAuth Hook에서 사용)
 * - useState: 상태 관리
 * - useEffect: 사이드 이펙트 처리
 * - useCallback: 함수 메모이제이션
 * - useMemo: 값 메모이제이션
 */

import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { login as loginAPI, signup as signupAPI } from '../utils/api';

// ============================================
// createContext - Context 생성
// 전역 인증 상태를 공유하기 위한 Context
// ============================================
const AuthContext = createContext(null);

/**
 * AuthProvider 컴포넌트
 * 인증 상태를 제공하는 Provider
 * 
 * Hook 실행 순서 (프로세스 흐름):
 * 1. useState - 상태 초기화
 * 2. useCallback - 함수 메모이제이션 (login, signup, logout)
 * 3. useMemo - value 객체 메모이제이션
 * 4. 렌더링 - Provider 반환
 * 5. useEffect - 마운트 후 localStorage 확인 (비동기)
 */
export function AuthProvider({ children }) {
  // ============================================
  // 1단계: useState - 상태 초기화
  // ============================================
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // ============================================
  // 5단계: useEffect - 사이드 이펙트 (마운트 후 실행)
  // 컴포넌트 마운트 시 localStorage에서 인증 정보 확인
  // ============================================
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('사용자 데이터 파싱 오류:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  // ============================================
  // 2단계: useCallback - 함수 메모이제이션
  // 의존성 배열이 비어있으므로 컴포넌트 생명주기 동안 동일한 함수 참조 유지
  // ============================================
  
  /**
   * 로그인 함수
   * useCallback으로 메모이제이션하여 불필요한 함수 재생성 방지
   * @param {string} email - 이메일
   * @param {string} password - 비밀번호
   * @returns {Promise} 로그인 결과
   */
  const login = useCallback(async (email, password) => {
    try {
      const response = await loginAPI({ email, password });
      
      // 토큰과 사용자 정보 저장
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify({
        userId: response.userId,
        email: response.email,
        name: response.name,
      }));

      setUser({
        userId: response.userId,
        email: response.email,
        name: response.name,
      });
      setIsAuthenticated(true);

      return { success: true, data: response };
    } catch (error) {
      return { 
        success: false, 
        error: error.message || '로그인에 실패했습니다.' 
      };
    }
  }, []); // 의존성 없음 (함수 내부에서 외부 변수 사용 안 함)

  /**
   * 회원가입 함수
   * useCallback으로 메모이제이션하여 불필요한 함수 재생성 방지
   * @param {string} email - 이메일
   * @param {string} name - 이름
   * @param {string} password - 비밀번호
   * @returns {Promise} 회원가입 결과
   */
  const signup = useCallback(async (email, name, password) => {
    try {
      const response = await signupAPI({ email, name, password });
      
      // 회원가입 성공 시 자동 로그인
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify({
        userId: response.userId,
        email: response.email,
        name: response.name,
      }));

      setUser({
        userId: response.userId,
        email: response.email,
        name: response.name,
      });
      setIsAuthenticated(true);

      return { success: true, data: response };
    } catch (error) {
      return { 
        success: false, 
        error: error.message || '회원가입에 실패했습니다.' 
      };
    }
  }, []); // 의존성 없음

  /**
   * 로그아웃 함수
   * useCallback으로 메모이제이션하여 불필요한 함수 재생성 방지
   */
  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
  }, []); // 의존성 없음

  // ============================================
  // 3단계: useMemo - value 객체 메모이제이션
  // 의존성(user, isAuthenticated, loading, login, signup, logout)이 변경될 때만 새로 생성
  // 이를 통해 불필요한 리렌더링을 방지합니다.
  // ============================================
  const value = useMemo(() => ({
    user,
    isAuthenticated,
    loading,
    login,
    signup,
    logout,
  }), [user, isAuthenticated, loading, login, signup, logout]);

  // ============================================
  // 4단계: 렌더링 - Provider 반환
  // 메모이제이션된 value 객체를 Context에 제공
  // ============================================
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * useAuth Hook
 * AuthContext를 사용하기 위한 커스텀 Hook
 * 
 * useContext Hook을 사용하여 AuthContext의 값을 가져옵니다.
 * 
 * 사용 방법:
 * const { user, isAuthenticated, login, logout } = useAuth();
 */
export function useAuth() {
  // ============================================
  // useContext - Context 값 읽기
  // AuthContext.Provider에서 제공하는 value를 가져옵니다
  // ============================================
  const context = useContext(AuthContext);
  
  // Provider 밖에서 사용된 경우 에러 발생
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}

