import { useReducer, useEffect, useState } from 'react';
import AddTask from './AddTask';
import TaskList from './TaskList';
import { tasksReducer, initialTasks, nextId } from '../utils/tasksReducer';
import { fetchTasks, createTask, updateTask, deleteTask } from '../services/taskApi';

export default function TaskApp() {
  // ==========================================
  // 1. 상태 변수 선언
  // ==========================================
  
  // 사용자 ID (.env 파일에서 읽어옴)
  const userId = import.meta.env.VITE_USER_ID || '1';
  
  // Task 목록 상태 관리 (useReducer 사용)
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
  
  // 다음 Task ID (임시 ID 생성용)
  const [nextTaskId, setNextTaskId] = useState(nextId);
  
  // 로딩 상태
  const [loading, setLoading] = useState(true);
  
  // 에러 상태
  const [error, setError] = useState(null);

  // ==========================================
  // 2. 컴포넌트가 처음 마운트될 때 실행
  // ==========================================
  useEffect(() => {
    loadTasks();
  }, []);

  // ==========================================
  // 3. Task 목록 가져오기 함수
  // ==========================================
  const loadTasks = async () => {
    try {
      // 로딩 시작
      setLoading(true);
      setError(null);
      
      // API 서버에서 Task 목록 가져오기
      const tasksData = await fetchTasks(userId);
      
      // 가져온 데이터로 상태 업데이트 (dispatch 사용)
      dispatch({ 
        type: 'loaded', 
        tasks: tasksData 
      });
    } catch (err) {
      // 에러 발생 시 에러 메시지 저장
      setError(err.message || 'Task 목록을 불러오는데 실패했습니다.');
      console.error('Task 목록 로드 실패:', err);
    } finally {
      // 로딩 종료
      setLoading(false);
    }
  };

  // ==========================================
  // 4. 진행률 계산
  // ==========================================
  const totalCount = tasks.length;
  const completedCount = tasks.filter(t => t.done).length;
  const progress = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  // ==========================================
  // 5. Task 추가하기 함수
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
      
      // 2단계: API 서버에 Task 생성 요청
      const newTask = await createTask({ text, done: false }, userId);
      
      // 3단계: 성공 시 임시 Task를 실제 Task로 교체
      if (newTask && newTask.id) {
        // 임시 Task 제거
        dispatch({ type: 'deleted', id: tempId });
        // 실제 Task 추가
        dispatch({
          type: 'added',
          id: newTask.id,
          text: newTask.text,
        });
      } else {
        // API가 응답을 반환하지 않은 경우 목록 새로고침
        await loadTasks();
      }
    } catch (err) {
      // 4단계: 실패 시 임시 Task 제거 (롤백)
      dispatch({ type: 'deleted', id: tempId });
      setNextTaskId(prev => prev - 1);
      setError(err.message || 'Task 생성에 실패했습니다.');
      console.error('Task 생성 실패:', err);
    }
  };

  // ==========================================
  // 6. Task 수정하기 함수
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
      
      // 2단계: API 서버에 Task 수정 요청
      console.log('[handleChangeTask] 업데이트할 Task:', task);
      const updatedTask = await updateTask(task.id, task, userId);
      console.log('[handleChangeTask] API 응답 받은 Task:', updatedTask);
      
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
        // 원본을 찾을 수 없으면 목록 새로고침
        await loadTasks();
      }
      setError(err.message || 'Task 수정에 실패했습니다.');
      console.error('Task 수정 실패:', err);
    }
  };

  // ==========================================
  // 7. Task 삭제하기 함수
  // ==========================================
  const handleDeleteTask = async (id) => {
    // 삭제할 Task 저장 (롤백용)
    const taskToDelete = tasks.find(t => t.id === id);
    
    // 1단계: 화면에서 즉시 삭제 (낙관적 업데이트)
    dispatch({ type: 'deleted', id: id });

    try {
      setError(null);
      
      // 2단계: API 서버에 Task 삭제 요청
      await deleteTask(id, userId);
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
        // 원본을 찾을 수 없으면 목록 새로고침
        await loadTasks();
      }
      setError(err.message || 'Task 삭제에 실패했습니다.');
      console.error('Task 삭제 실패:', err);
    }
  };

  // ==========================================
  // 8. 화면 렌더링
  // ==========================================
  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <header className="dashboard-header">
          <h1 className="dashboard-title">Task Dashboard</h1>
          <p className="dashboard-subtitle">React with Reducer Pattern & API Integration</p>
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
