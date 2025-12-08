// ==========================================
// API 서버 통신 함수들
// ==========================================
// 이 파일은 React 컴포넌트와 API 서버 사이의 통신을 담당합니다.
// fetch API를 사용하여 HTTP 요청을 보내고 응답을 받습니다.

// API 서버 주소
const API_BASE_URL = 'http://13.220.93.143:8080/api/tasks';
const DEFAULT_USER_ID = 'USER_01';

function toApiFormat(task) {
  return {
    text: task.text,
    done: task.done,
  };
}

function fromApiFormat(apiTask) {
  return {
    id: apiTask.id,
    text: apiTask.text || '',
    done: apiTask.done !== undefined ? apiTask.done : false,
  };
}

export async function fetchTasks(userId = DEFAULT_USER_ID) {
  try {
    // 1단계: API 서버에 GET 요청 보내기
    const url = `${API_BASE_URL}?userId=${userId}`;
    const response = await fetch(url);
    
    // 2단계: 응답이 성공인지 확인
    if (!response.ok) {
      throw new Error(`서버 오류: ${response.status} ${response.statusText}`);
    }
    
    // 3단계: 응답 데이터를 JSON으로 변환
    const data = await response.json();
    
    // 4단계: 배열인지 확인하고 변환
    if (Array.isArray(data)) {
      // 각 Task를 프론트엔드 형식으로 변환
      return data.map(fromApiFormat);
    }
    
    // 배열이 아닌 경우 빈 배열 반환
    return [];
  } catch (error) {
    console.error('Task 목록 가져오기 실패:', error);
    throw error;
  }
}

export async function createTask(taskData, userId = DEFAULT_USER_ID) {
  try {
    // 1단계: 프론트엔드 형식을 API 형식으로 변환
    const apiData = toApiFormat(taskData);
    
    // 2단계: userId 추가
    const requestData = {
      ...apiData,
      userId: userId,
    };
    
    // 3단계: JavaScript 객체를 JSON 문자열로 변환
    const requestBody = JSON.stringify(requestData);
    
    // 4단계: API 서버에 POST 요청 보내기
    const url = `${API_BASE_URL}?userId=${userId}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: requestBody,
    });
    
    // 5단계: 응답이 성공인지 확인
    if (!response.ok) {
      throw new Error(`Task 생성 실패: ${response.status} ${response.statusText}`);
    }
    
    // 6단계: 응답 데이터를 JSON으로 변환
    const responseData = await response.json();
    
    // 7단계: API 형식을 프론트엔드 형식으로 변환하여 반환
    return fromApiFormat(responseData);
  } catch (error) {
    console.error('Task 생성 실패:', error);
    throw error;
  }
}

export async function updateTask(taskId, taskData, userId = DEFAULT_USER_ID) {
  try {
    // 1단계: taskData에서 id 제거 (URL에 이미 포함되어 있음)
    /* 1. id만 따로 변수에 저장
      const id = taskData.id;

      // 2. 객체를 얕은 복사 (Shallow Copy)
      // (주의: 그냥 대입하면 원본이 같이 수정되므로 반드시 복사해야 함)
      const taskDataWithoutId = Object.assign({}, taskData); 
      // 또는 최신 문법으로는: const taskDataWithoutId = { ...taskData };

      // 3. 복사된 객체에서 id 속성 삭제
      delete taskDataWithoutId.id;
    */
    // 2단계: 프론트엔드 형식을 API 형식으로 변환
    const { id, ...taskDataWithoutId } = taskData;
    const apiData = toApiFormat(taskDataWithoutId);
    
    // 3단계: userId 추가
    const requestData = {
      ...apiData,
      userId: userId,
    };
    
    // 4단계: JavaScript 객체를 JSON 문자열로 변환
    const requestBody = JSON.stringify(requestData);
    
    // 5단계: API 서버에 PUT 요청 보내기
    const url = `${API_BASE_URL}/${taskId}?userId=${userId}`;
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: requestBody,
    });
    
    // 6단계: 응답이 성공인지 확인
    if (!response.ok) {
      throw new Error(`Task 수정 실패: ${response.status} ${response.statusText}`);
    }
    
    // 7단계: 응답 데이터를 JSON으로 변환
    const responseData = await response.json();
    
    // 디버깅: API 응답 확인
    console.log('[updateTask] API 응답 데이터:', responseData);
    console.log('[updateTask] API 응답의 done 값:', responseData.done);
    console.log('[updateTask] API 응답의 completed 값:', responseData.completed);
    
    // 8단계: API 형식을 프론트엔드 형식으로 변환하여 반환
    const convertedTask = fromApiFormat(responseData);
    console.log('[updateTask] 변환된 Task:', convertedTask);
    console.log('[updateTask] 변환된 done 값:', convertedTask.done);
    
    return convertedTask;
  } catch (error) {
    console.error('Task 수정 실패:', error);
    throw error;
  }
}

/**
 * Task 삭제하기 (DELETE)
 * 
 * @param {number|string} taskId - 삭제할 Task의 ID
 * @param {string} userId - 사용자 ID
 * @returns {Promise<void>}
 * 
 * 사용 예시:
 * await deleteTask(5, '1');
 */
export async function deleteTask(taskId, userId = DEFAULT_USER_ID) {
  try {
    // 1단계: API 서버에 DELETE 요청 보내기
    const url = `${API_BASE_URL}/${taskId}?userId=${userId}`;
    const response = await fetch(url, {
      method: 'DELETE',
    });
    
    // 2단계: 응답이 성공인지 확인
    if (!response.ok) {
      throw new Error(`Task 삭제 실패: ${response.status} ${response.statusText}`);
    }
    
    // DELETE는 보통 응답 본문이 없으므로 아무것도 반환하지 않음
  } catch (error) {
    console.error('Task 삭제 실패:', error);
    throw error;
  }
}
