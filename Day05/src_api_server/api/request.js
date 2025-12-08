import api from './axios';

/**
 * request 유틸리티 함수
 * axios 인스턴스를 사용하여 HTTP 요청을 보내는 헬퍼 함수
 * 
 * @param {string} url - 요청 URL (예: '/api/tasks')
 * @param {string} method - HTTP 메서드 ('GET', 'POST', 'PUT', 'DELETE')
 * @param {Object} data - 요청 body 데이터 (POST, PUT에 사용)
 * @param {Object} params - URL 쿼리 파라미터
 * @returns {Promise} - response.data를 반환
 */
const request = async (url, method, data = null, params = null) => {
  const config = {
    method,
    url,
  };
  
  if (data) {
    config.data = data;
  }
  
  if (params) {
    config.params = params;
  }
  
  const response = await api(config);
  return response.data;
};

export default request;