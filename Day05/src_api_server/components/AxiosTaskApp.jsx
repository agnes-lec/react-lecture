import { useReducer, useEffect, useState } from 'react';
import AddTask from './AddTask';
import TaskList from './TaskList';
import { tasksReducer, initialTasks, nextId } from '../utils/tasksReducer';
import api from '../api/axios';
import request from '../api/request';

/**
 * AxiosTaskApp.jsx
 * 
 * Axios를 사용한 Task Dashboard 컴포넌트
 * - axios 라이브러리를 사용하여 HTTP 요청 처리
 * - axios.js의 인스턴스 활용
 * - async/await 패턴 사용
 * 
 * 비교 대상:
 * - TaskApp.jsx: taskApi.js 서비스 레이어 사용 (fetch 기반)
 * - BasicTaskApp.jsx: fetch 직접 사용 + Promise 체이닝
 * - AxiosTaskApp.jsx: axios 사용 (더 간결한 API)
 */
export default function AxiosTaskApp() {
  // ==========================================
  // 1. 상태 변수 선언
  // ==========================================
  
  // 사용자 ID
  const userId = import.meta.env.VITE_USER_ID || 'USER_01';
  
  // Task 목록 상태 관리 (useReducer 사용)
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
  
  // 다음 Task ID (임시 ID 생성용)
  const [nextTaskId, setNextTaskId] = useState(nextId);
  
  // 로딩 상태
  const [loading, setLoading] = useState(true);
  
  // 에러 상태
  const [error, setError] = useState(null);

  // ==========================================
  // 2. 데이터 변환 함수들
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
  // 3. 컴포넌트가 처음 마운트될 때 실행
  // ==========================================
  useEffect(() => {
    loadTasks();
  }, []);

  // ==========================================
  // 4. Task 목록 가져오기 함수 (axios + request 사용)
  // ==========================================
  const loadTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // request 유틸리티 함수를 사용하여 GET 요청
      // request 함수는 자동으로 response.data를 반환함
      const data = await request('/api/tasks', 'GET', null, { userId: userId });
      
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
    } catch (err) {
      // axios 에러 처리
      const errorMessage = err.response?.data?.message 
        || err.message 
        || 'Task 목록을 불러오는데 실패했습니다.';
      setError(errorMessage);
      console.error('Task 목록 로드 실패:', err);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // 5. 진행률 계산
  // ==========================================
  const totalCount = tasks.length;
  const completedCount = tasks.filter(t => t.done).length;
  const progress = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  // ==========================================
  // 6. Task 추가하기 함수 (axios + request 사용)
  // ==========================================
  const handleAddTask = async (text) => {
    // 임시 ID 생성 (낙관적 업데이트를 위해)
    const tempId = nextTaskId;
    setNextTaskId(nextTaskId + 1);
    
    // 1단계: 화면에 즉시 추가 (낙관적 업데이트)
    dispatch({
      type: 'added',
      id: tempId,
      text: text,
    });

    try {
      setError(null);
      
      // 2단계: request 유틸리티 함수를 사용하여 POST 요청
      const taskData = { text, done: false };
      const apiData = toApiFormat(taskData);
      const requestData = {
        ...apiData,
        userId: userId,
      };
      
      // request 함수는 자동으로 response.data를 반환함
      const responseData = await request('/api/tasks', 'POST', requestData, { userId: userId });
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
        await loadTasks();
      }
    } catch (err) {
      // 4단계: 실패 시 임시 Task 제거 (롤백)
      dispatch({ type: 'deleted', id: tempId });
      setNextTaskId(prev => prev - 1);
      
      // axios 에러 처리
      const errorMessage = err.response?.data?.message 
        || err.message 
        || 'Task 생성에 실패했습니다.';
      setError(errorMessage);
      console.error('Task 생성 실패:', err);
    }
  };

  // ==========================================
  // 7. Task 수정하기 함수 (axios + request 사용)
  // ==========================================
  const handleChangeTask = async (task) => {
    // 원본 Task 저장 (롤백용)
    const originalTask = tasks.find(t => t.id === task.id);
    
    // 1단계: 화면에 즉시 수정 반영 (낙관적 업데이트)
    dispatch({
      type: 'changed',
      task: task,
    });

    try {
      setError(null);
      
      // 2단계: request 유틸리티 함수를 사용하여 PUT 요청
      // taskData에서 id 제거 (URL에 이미 포함되어 있음)
      const { id, ...taskDataWithoutId } = task;
      const apiData = toApiFormat(taskDataWithoutId);
      const requestData = {
        ...apiData,
        userId: userId,
      };
      
      // request 함수는 자동으로 response.data를 반환함
      const responseData = await request(`/api/tasks/${task.id}`, 'PUT', requestData, { userId: userId });
      const updatedTask = fromApiFormat(responseData);
      
      // 3단계: 성공 시 서버 응답으로 UI 업데이트
      dispatch({
        type: 'changed',
        task: updatedTask,
      });
    } catch (err) {
      // 4단계: 실패 시 원래 상태로 복구 (롤백)
      if (originalTask) {
        dispatch({
          type: 'changed',
          task: originalTask,
        });
      } else {
        await loadTasks();
      }
      
      // axios 에러 처리
      const errorMessage = err.response?.data?.message 
        || err.message 
        || 'Task 수정에 실패했습니다.';
      setError(errorMessage);
      console.error('Task 수정 실패:', err);
    }
  };

  // ==========================================
  // 8. Task 삭제하기 함수 (axios + request 사용)
  // ==========================================
  const handleDeleteTask = async (id) => {
    // 삭제할 Task 저장 (롤백용)
    const taskToDelete = tasks.find(t => t.id === id);
    
    // 1단계: 화면에서 즉시 삭제 (낙관적 업데이트)
    dispatch({ type: 'deleted', id: id });

    try {
      setError(null);
      
      // 2단계: request 유틸리티 함수를 사용하여 DELETE 요청
      await request(`/api/tasks/${id}`, 'DELETE', null, { userId: userId });
    } catch (err) {
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
        await loadTasks();
      }
      
      // axios 에러 처리
      const errorMessage = err.response?.data?.message 
        || err.message 
        || 'Task 삭제에 실패했습니다.';
      setError(errorMessage);
      console.error('Task 삭제 실패:', err);
    }
  };

  // ==========================================
  // 9. 화면 렌더링
  // ==========================================
  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <header className="dashboard-header">
          <h1 className="dashboard-title">Task Dashboard (Axios)</h1>
          <p className="dashboard-subtitle">React with Reducer Pattern & Axios</p>
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

