import { useReducer, useEffect, useState } from 'react';
import AddTask from './AddTask';
import TaskList from './TaskList';
import { tasksReducer, initialTasks, nextId } from '../utils/tasksReducer';

/**
 * BasicTaskApp.jsx
 * 
 * Modern JS 비교 실습을 위한 컴포넌트
 * - fetch API만 사용하여 직접 HTTP 요청 처리
 * - Promise 체이닝(.then(), .catch()) 패턴 사용
 * - 별도의 API 서비스 레이어 없이 컴포넌트 내부에서 모든 API 통신 처리
 * 
 * 비교 대상:
 * - TaskApp.jsx: taskApi.js 서비스 레이어 사용 (관심사 분리)
 * - BasicTaskApp.jsx: fetch 직접 사용 + Promise 체이닝 (모든 로직이 컴포넌트 내부)
 * 
 * Promise 체이닝 패턴:
 * fetch(url)
 *   .then(response => response.json())
 *   .then(data => { ... })
 *   .catch(error => { ... })
 */
export default function BasicTaskApp() {
  // ==========================================
  // 1. 상수 및 설정
  // ==========================================
  const API_BASE_URL = 'http://13.220.93.143:8080/api/tasks';
  const userId = 'USER_01';

  // ==========================================
  // 2. 상태 변수 선언
  // ==========================================
  
  // Task 목록 상태 관리 (useReducer 사용)
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
  
  // 다음 Task ID (임시 ID 생성용)
  const [nextTaskId, setNextTaskId] = useState(nextId);
  
  // 로딩 상태
  const [loading, setLoading] = useState(true);
  
  // 에러 상태
  const [error, setError] = useState(null);

  // ==========================================
  // 3. 데이터 변환 함수들 (컴포넌트 내부에 정의)
  // ==========================================
  
  /**
   * 프론트엔드 Task 객체를 API 서버 형식으로 변환
   * @param {Object} task - { id: 1, text: "작업", done: false }
   * @returns {Object} - { text: "작업", done: false } (id는 제외)
   */
  const toApiFormat = (task) => {
    return {
      text: task.text,
      done: task.done,
    };
  };

  /**
   * API 서버 응답을 프론트엔드 Task 객체 형식으로 변환
   * @param {Object} apiTask - { id: 1, text: "작업", done: false }
   * @returns {Object} - { id: 1, text: "작업", done: false }
   */
  const fromApiFormat = (apiTask) => {
    return {
      id: apiTask.id,
      text: apiTask.text || '',
      done: apiTask.done !== undefined ? apiTask.done : false,
    };
  };

  // ==========================================
  // 4. 컴포넌트가 처음 마운트될 때 실행
  // ==========================================
  useEffect(() => {
    loadTasks();
  }, []);

  // ==========================================
  // 5. Task 목록 가져오기 함수 (fetch + Promise 체이닝)
  // ==========================================
  const loadTasks = () => {
    setLoading(true);
    setError(null);
    
    // fetch API를 사용하여 GET 요청
    const url = `${API_BASE_URL}?userId=${userId}`;
    
    // Promise 체이닝 패턴 사용
    fetch(url)
      .then(response => {
        // 응답이 성공인지 확인
        if (!response.ok) {
          throw new Error(`Task 목록 불러오기 실패: ${response.status} ${response.statusText}`);
        }
        // JSON 데이터 파싱
        return response.json();
      })
      .then(data => {
        // 배열이 아닌 경우 처리
        const tasksArray = Array.isArray(data) 
          ? data 
          : (data && typeof data === 'object' ? [data] : []);
        
        // API 형식을 프론트엔드 형식으로 변환
        const convertedTasks = tasksArray.map(fromApiFormat);
        
        // 상태 업데이트
        dispatch({ 
          type: 'loaded', 
          tasks: convertedTasks 
        });
      })
      .catch(err => {
        setError(err.message || 'Task 목록을 불러오는데 실패했습니다.');
        console.error('Task 목록 로드 실패:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // ==========================================
  // 6. 진행률 계산
  // ==========================================
  const totalCount = tasks.length;
  const completedCount = tasks.filter(t => t.done).length;
  const progress = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  // ==========================================
  // 7. Task 추가하기 함수 (fetch + Promise 체이닝)
  // ==========================================
  const handleAddTask = (text) => {
    // 임시 ID 생성 (낙관적 업데이트를 위해)
    const tempId = nextTaskId;
    setNextTaskId(nextTaskId + 1);
    
    // 1단계: 화면에 즉시 추가 (낙관적 업데이트)
    dispatch({
      type: 'added',
      id: tempId,
      text: text,
    });

    setError(null);
    
    // 2단계: fetch API를 사용하여 POST 요청
    const taskData = { text, done: false };
    const apiData = toApiFormat(taskData);
    const requestData = {
      ...apiData,
      userId: userId,
    };
    
    const url = `${API_BASE_URL}?userId=${userId}`;
    
    // Promise 체이닝 패턴 사용
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then(response => {
        // 응답이 성공인지 확인
        if (!response.ok) {
          throw new Error(`Task 생성 실패: ${response.status} ${response.statusText}`);
        }
        // JSON 데이터 파싱
        return response.json();
      })
      .then(responseData => {
        const newTask = fromApiFormat(responseData);
        
        // 3단계: 성공 시 임시 Task를 실제 Task로 교체
        if (newTask && newTask.id) {
          dispatch({ type: 'deleted', id: tempId });
          dispatch({
            type: 'added',
            id: newTask.id,
            text: newTask.text,
          });
        } else {
          loadTasks();
        }
      })
      .catch(err => {
        // 4단계: 실패 시 임시 Task 제거 (롤백)
        dispatch({ type: 'deleted', id: tempId });
        setNextTaskId(prev => prev - 1);
        setError(err.message || 'Task 생성에 실패했습니다.');
        console.error('Task 생성 실패:', err);
      });
  };

  // ==========================================
  // 8. Task 수정하기 함수 (fetch + Promise 체이닝)
  // ==========================================
  const handleChangeTask = (task) => {
    // 원본 Task 저장 (롤백용)
    const originalTask = tasks.find(t => t.id === task.id);
    
    // 1단계: 화면에 즉시 수정 반영 (낙관적 업데이트)
    dispatch({
      type: 'changed',
      task: task,
    });

    setError(null);
    
    // 2단계: fetch API를 사용하여 PUT 요청
    // taskData에서 id 제거 (URL에 이미 포함되어 있음)
    const { id, ...taskDataWithoutId } = task;
    const apiData = toApiFormat(taskDataWithoutId);
    const requestData = {
      ...apiData,
      userId: userId,
    };
    
    const url = `${API_BASE_URL}/${task.id}?userId=${userId}`;
    
    // Promise 체이닝 패턴 사용
    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then(response => {
        // 응답이 성공인지 확인
        if (!response.ok) {
          throw new Error(`Task 수정 실패: ${response.status} ${response.statusText}`);
        }
        // JSON 데이터 파싱
        return response.json();
      })
      .then(responseData => {
        const updatedTask = fromApiFormat(responseData);
        
        // 3단계: 성공 시 서버 응답으로 UI 업데이트
        dispatch({
          type: 'changed',
          task: updatedTask,
        });
      })
      .catch(err => {
        // 4단계: 실패 시 원래 상태로 복구 (롤백)
        if (originalTask) {
          dispatch({
            type: 'changed',
            task: originalTask,
          });
        } else {
          loadTasks();
        }
        setError(err.message || 'Task 수정에 실패했습니다.');
        console.error('Task 수정 실패:', err);
      });
  };

  // ==========================================
  // 9. Task 삭제하기 함수 (fetch + Promise 체이닝)
  // ==========================================
  const handleDeleteTask = (id) => {
    // 삭제할 Task 저장 (롤백용)
    const taskToDelete = tasks.find(t => t.id === id);
    
    // 1단계: 화면에서 즉시 삭제 (낙관적 업데이트)
    dispatch({ type: 'deleted', id: id });

    setError(null);
    
    // 2단계: fetch API를 사용하여 DELETE 요청
    const url = `${API_BASE_URL}/${id}?userId=${userId}`;
    
    // Promise 체이닝 패턴 사용
    fetch(url, {
      method: 'DELETE',
    })
      .then(response => {
        // 응답이 성공인지 확인
        if (!response.ok) {
          throw new Error(`Task 삭제 실패: ${response.status} ${response.statusText}`);
        }
      })
      .catch(err => {
        // 3단계: 실패 시 삭제된 Task 복구 (롤백)
        if (taskToDelete) {
          dispatch({
            type: 'added',
            id: taskToDelete.id,
            text: taskToDelete.text,
          });
          dispatch({
            type: 'changed',
            task: taskToDelete,
          });
        } else {
          loadTasks();
        }
        setError(err.message || 'Task 삭제에 실패했습니다.');
        console.error('Task 삭제 실패:', err);
      });
  };

  // ==========================================
  // 10. 화면 렌더링
  // ==========================================
  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <header className="dashboard-header">
          <h1 className="dashboard-title">Task Dashboard (Basic - fetch 직접 사용)</h1>
          <p className="dashboard-subtitle">React with Reducer Pattern & fetch API</p>
          <p style={{ fontSize: '0.9em', color: '#666', marginTop: '5px' }}>
            User ID: <strong>{userId}</strong>
          </p>
        </header>

        {/* 에러 메시지 표시 */}
        {error && (
          <div className="error-message" style={{ 
            padding: '10px', 
            margin: '10px 0', 
            backgroundColor: '#fee', 
            color: '#c33', 
            borderRadius: '4px' 
          }}>
            <strong>오류:</strong> {error}
            <button 
              onClick={loadTasks}
              style={{ 
                marginLeft: '10px', 
                padding: '4px 8px', 
                cursor: 'pointer',
                backgroundColor: '#c33',
                color: 'white',
                border: 'none',
                borderRadius: '3px'
              }}
            >
              다시 시도
            </button>
          </div>
        )}

        {/* 진행률 표시 */}
        <div className="progress-section">
          <div className="progress-header">
            <span className="progress-label">Progress</span>
            <span className="progress-percentage">{progress}%</span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="progress-stats">
            <span>Total: <strong>{totalCount}</strong></span>
            <span>Done: <strong>{completedCount}</strong></span>
          </div>
        </div>

        {/* Task 추가 입력 */}
        <div className="input-section">
          <AddTask onAddTask={handleAddTask} />
        </div>

        {/* Task 목록 또는 로딩/빈 상태 */}
        {loading ? (
          <div className="loading-state" style={{ 
            padding: '20px', 
            textAlign: 'center' 
          }}>
            <p>Task 목록을 불러오는 중...</p>
          </div>
        ) : tasks.length > 0 ? (
          <TaskList 
            tasks={tasks}
            onChangeTask={handleChangeTask}
            onDeleteTask={handleDeleteTask}
          />
        ) : (
          <div className="empty-state">
            <p>아직 Task가 없습니다. 위에서 추가해보세요!</p>
          </div>
        )}
      </div>
    </div>
  );
}

