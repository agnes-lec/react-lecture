/**
 * API 유틸리티 함수
 * 
 * 모든 API 요청을 처리하는 공통 함수입니다.
 */

const API_BASE_URL = 'http://13.220.93.143:8080';

/**
 * 기본 API 요청 함수
 * @param {string} endpoint - API 엔드포인트
 * @param {object} options - fetch 옵션
 * @returns {Promise} API 응답
 */
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  // 토큰이 있으면 헤더에 추가
  const token = localStorage.getItem('token');
  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('API 요청 오류:', error);
    throw error;
  }
}

/**
 * 회원가입 API
 * @param {object} userData - { email, name, password }
 * @returns {Promise} AuthResponse
 */
export async function signup(userData) {
  return apiRequest('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
}

/**
 * 로그인 API
 * @param {object} credentials - { email, password }
 * @returns {Promise} AuthResponse
 */
export async function login(credentials) {
  return apiRequest('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
}


