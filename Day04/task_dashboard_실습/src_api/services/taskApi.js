// ==========================================
// API Service Layer for Task CRUD Operations
// ==========================================
// 
// Swagger 문서 참조: http://13.220.93.143:8080/swagger-ui/index.html#/Task%20API
// API 필드명이 다를 경우 아래 매핑 함수를 수정하세요.
// ==========================================

const API_BASE_URL = 'http://13.220.93.143:8080/api/tasks';

// 수강생별 ID 설정: .env 파일에서 읽어옴
// .env 파일에 VITE_USER_ID=1 형식으로 설정
const DEFAULT_USER_ID = import.meta.env.VITE_USER_ID || '1';

/**
 * 프론트엔드 Task 객체를 API 요청 형식으로 변환
 * API 필드명이 다를 경우 이 함수를 수정하세요.
 * @param {Object} task - { id, text, done }
 * @returns {Object} API 요청 형식의 Task 객체
 */
function toApiFormat(task) {
  // API가 다른 필드명을 사용하는 경우 여기를 수정하세요
  // Swagger 문서를 참고하여 실제 필드명에 맞게 수정하세요
  // Swagger 문서 확인: http://13.220.93.143:8080/swagger-ui/index.html#/Task%20API
  
  return {
    text: task.text,
    done: task.done,
  };
}

function fromApiFormat(apiTask) {
  return {
    id: apiTask.id,
    text: apiTask.title || apiTask.text || apiTask.content || apiTask.description || '',
    done: apiTask.completed !== undefined ? apiTask.completed : false,
  };
}

export async function fetchTasks(userId = DEFAULT_USER_ID) {
  try {
    const response = await fetch(`${API_BASE_URL}?userId=${userId}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch tasks: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    // 배열인 경우 각 항목을 변환, 단일 객체인 경우 직접 변환
    if (Array.isArray(data)) {
      return data.map(fromApiFormat);
    }
    return fromApiFormat(data);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
}

export async function createTask(taskData, userId = DEFAULT_USER_ID) {
  try {
    const apiData = toApiFormat(taskData);
    // Request Body에 userId 추가 (API가 요구하는 경우)
    const requestBodyData = {
      ...apiData,
      userId: userId,  // Request Body에 userId 포함
    };
    const requestBody = JSON.stringify(requestBodyData);
    
    const response = await fetch(`${API_BASE_URL}?userId=${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: requestBody,
    });
    
    console.log('Response status:', response.status, response.statusText);
    
    if (!response.ok) {
      // 에러 응답 본문 읽기 (response는 한 번만 읽을 수 있음)
      let errorMessage = `Failed to create task: ${response.status} ${response.statusText}`;
      let errorDetails = null;
      
      try {
        const errorText = await response.text();
        console.error('API Error Response (raw):', errorText);
        
        if (errorText && errorText.trim()) {
          try {
            errorDetails = JSON.parse(errorText);
            console.error('API Error Response (parsed):', errorDetails);
            
            // 다양한 에러 메시지 형식 지원
            errorMessage = errorDetails.message 
              || errorDetails.error 
              || errorDetails.detail
              || errorDetails.msg
              || errorMessage;
              
            // 필드별 에러 정보가 있는 경우
            if (errorDetails.errors || errorDetails.validationErrors) {
              const fieldErrors = errorDetails.errors || errorDetails.validationErrors;
              const fieldErrorMessages = Object.entries(fieldErrors)
                .map(([field, msg]) => `${field}: ${msg}`)
                .join(', ');
              errorMessage += ` - ${fieldErrorMessages}`;
            }
          } catch (parseError) {
            // JSON 파싱 실패 시 텍스트 그대로 사용
            errorMessage = errorText || errorMessage;
            console.error('API Error Response (text):', errorText);
          }
        } else {
          console.error('API Error Response: Empty body');
        }
      } catch (e) {
        console.error('Error reading error response:', e);
      }
      
      throw new Error(errorMessage);
    }
    
    // 응답 본문이 있는 경우에만 파싱
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const text = await response.text();
      if (text) {
        const data = JSON.parse(text);
        return fromApiFormat(data);
      }
    }

    return { ...taskData, id: Date.now() };
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
}

/**
 * Task 수정
 * @param {number|string} taskId - Task ID
 * @param {Object} taskData - 수정할 Task 데이터 { text, done }
 * @param {string} userId - 사용자 ID (기본값: '1')
 * @returns {Promise<Object>} 수정된 Task 객체
 */
export async function updateTask(taskId, taskData, userId = DEFAULT_USER_ID) {
  try {
    // id 필드는 URL 경로에 있으므로 Request Body에서 제외
    const { id, ...taskDataWithoutId } = taskData;
    const apiData = toApiFormat(taskDataWithoutId);
    
    // Request Body에 userId 추가 (createTask와 동일하게)
    const requestBodyData = {
      ...apiData,
      userId: userId,  // Request Body에 userId 포함
    };
    const requestBody = JSON.stringify(requestBodyData);
    
    console.group('🟡 Task Update Request');
    console.log('URL:', `${API_BASE_URL}/${taskId}?userId=${userId}`);
    console.log('Method: PUT');
    console.log('Task ID:', taskId);
    console.log('Original data:', taskData);
    console.log('API format:', apiData);
    console.log('Request Body (with userId):', requestBody);
    console.groupEnd();
    
    const response = await fetch(`${API_BASE_URL}/${taskId}?userId=${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: requestBody,
    });
    
    console.log('Response status:', response.status, response.statusText);
    
    if (!response.ok) {
      // 에러 응답 본문 읽기
      let errorMessage = `Failed to update task: ${response.status} ${response.statusText}`;
      try {
        const errorText = await response.text();
        console.error('API Error Response (raw):', errorText);
        
        if (errorText && errorText.trim()) {
          try {
            const errorDetails = JSON.parse(errorText);
            console.error('API Error Response (parsed):', errorDetails);
            
            errorMessage = errorDetails.message 
              || errorDetails.error 
              || errorDetails.detail
              || errorDetails.msg
              || errorMessage;
          } catch {
            errorMessage = errorText || errorMessage;
            console.error('API Error Response (text):', errorText);
          }
        }
      } catch (e) {
        console.error('Error reading error response:', e);
      }
      
      console.group('🔴 Task Update Error');
      console.error('Request URL:', `${API_BASE_URL}/${taskId}?userId=${userId}`);
      console.error('Request Method: PUT');
      console.error('Request Data:', apiData);
      console.error('Request Body:', requestBody);
      console.error('Error Message:', errorMessage);
      console.groupEnd();
      
      throw new Error(errorMessage);
    }
    
    const data = await response.json();
    return fromApiFormat(data);
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
}

/**
 * Task 삭제
 * @param {number|string} taskId - Task ID
 * @param {string} userId - 사용자 ID (기본값: '1')
 * @returns {Promise<void>}
 */
export async function deleteTask(taskId, userId = DEFAULT_USER_ID) {
  try {
    const response = await fetch(`${API_BASE_URL}/${taskId}?userId=${userId}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error(`Failed to delete task: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
}

