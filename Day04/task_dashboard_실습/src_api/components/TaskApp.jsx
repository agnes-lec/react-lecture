import { useState, useEffect } from 'react';
import AddTask from './AddTask';
import TaskList from './TaskList';
import { fetchTasks, createTask, updateTask, deleteTask } from '../services/taskApi';

export default function TaskApp() {
  // 수강생별 ID 설정: .env 파일에서 읽어옴
  // .env 파일에 VITE_USER_ID=1 형식으로 설정
  const userId = import.meta.env.VITE_USER_ID || '1';
  
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [operationStatus, setOperationStatus] = useState(null); // 현재 진행 중인 작업 상태
  const [lastUpdateTime, setLastUpdateTime] = useState(null); // 마지막 업데이트 시간

  // 컴포넌트 마운트 시 Task 목록 로드
  useEffect(() => {
    loadTasks();
  }, []); 

  /**
   * Task 목록 조회 (GET)
   * API 통신 상세 로깅 및 에러 처리
   */
  const loadTasks = async () => {
    const startTime = performance.now();
    const operationId = `fetch-${Date.now()}`;
    
    try {
      setLoading(true);
      setError(null);
      setOperationStatus({ type: 'loading', message: 'Loading tasks...', operation: 'fetch' });
      
      console.group(`📥 [${operationId}] Fetch Tasks Request`);
      console.log('User ID:', userId);
      console.log('Timestamp:', new Date().toISOString());
      console.groupEnd();
      
      const data = await fetchTasks(userId);
      
      const endTime = performance.now();
      const duration = Math.round(endTime - startTime);
      
      console.group(`✅ [${operationId}] Fetch Tasks Success`);
      console.log('Response Data:', data);
      console.log('Task Count:', data.length);
      console.log(`Duration: ${duration}ms`);
      console.groupEnd();
      
      setTasks(data);
      setLastUpdateTime(new Date().toLocaleTimeString());
      setOperationStatus({ type: 'success', message: `Loaded ${data.length} tasks`, operation: 'fetch' });
      
      // 성공 메시지는 2초 후 자동 제거
      setTimeout(() => setOperationStatus(null), 2000);
      
    } catch (err) {
      const endTime = performance.now();
      const duration = Math.round(endTime - startTime);
      
      console.group(`❌ [${operationId}] Fetch Tasks Error`);
      console.error('Error:', err);
      console.error('Error Message:', err.message);
      console.error(`Duration: ${duration}ms`);
      console.groupEnd();
      
      setError(err.message || 'Failed to load tasks');
      setOperationStatus({ type: 'error', message: err.message || 'Failed to load tasks', operation: 'fetch' });
    } finally {
      setLoading(false);
    }
  };

  const totalCount = tasks.length;
  const completedCount = tasks.filter(t => t.done).length;
  const progress = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  /**
   * Task 생성 (POST)
   * API 통신 상세 로깅 및 낙관적 업데이트
   */
  const handleAddTask = async (text) => {
    const startTime = performance.now();
    const operationId = `create-${Date.now()}`;
    const tempId = `temp-${Date.now()}`;
    
    // 낙관적 업데이트: 즉시 UI에 추가 (나중에 서버 응답으로 교체)
    const optimisticTask = { id: tempId, text, done: false };
    setTasks(prevTasks => [...prevTasks, optimisticTask]);
    
    try {
      setError(null);
      setOperationStatus({ type: 'loading', message: 'Creating task...', operation: 'create' });
      
      console.group(`📤 [${operationId}] Create Task Request`);
      console.log('User ID:', userId);
      console.log('Task Text:', text);
      console.log('Timestamp:', new Date().toISOString());
      console.groupEnd();
      
      const newTask = await createTask({ text, done: false }, userId);
      
      const endTime = performance.now();
      const duration = Math.round(endTime - startTime);
      
      console.group(`✅ [${operationId}] Create Task Success`);
      console.log('Created Task:', newTask);
      console.log(`Duration: ${duration}ms`);
      console.groupEnd();
      
      // API가 생성된 Task를 반환한 경우
      if (newTask && newTask.id) {
        // 낙관적 업데이트를 실제 데이터로 교체
        setTasks(prevTasks => 
          prevTasks.map(t => t.id === tempId ? newTask : t)
        );
        setOperationStatus({ type: 'success', message: 'Task created successfully', operation: 'create' });
      } else {
        // API가 응답을 반환하지 않은 경우 목록 새로고침
        await loadTasks();
        setOperationStatus({ type: 'success', message: 'Task created (refreshed)', operation: 'create' });
      }
      
      setLastUpdateTime(new Date().toLocaleTimeString());
      setTimeout(() => setOperationStatus(null), 2000);
      
    } catch (err) {
      const endTime = performance.now();
      const duration = Math.round(endTime - startTime);
      
      console.group(`❌ [${operationId}] Create Task Error`);
      console.error('Error:', err);
      console.error('Error Message:', err.message);
      console.error(`Duration: ${duration}ms`);
      console.groupEnd();
      
      // 낙관적 업데이트 롤백
      setTasks(prevTasks => prevTasks.filter(t => t.id !== tempId));
      
      setError(err.message || 'Failed to create task');
      setOperationStatus({ type: 'error', message: err.message || 'Failed to create task', operation: 'create' });
    }
  };

  /**
   * Task 수정 (PUT)
   * API 통신 상세 로깅 및 낙관적 업데이트
   */
  const handleChangeTask = async (task) => {
    const startTime = performance.now();
    const operationId = `update-${Date.now()}`;
    const originalTask = tasks.find(t => t.id === task.id);
    
    // 낙관적 업데이트: 즉시 UI 업데이트
    setTasks(prevTasks => 
      prevTasks.map(t => t.id === task.id ? task : t)
    );
    
    try {
      setError(null);
      setOperationStatus({ type: 'loading', message: 'Updating task...', operation: 'update' });
      
      console.group(`🔄 [${operationId}] Update Task Request`);
      console.log('User ID:', userId);
      console.log('Task ID:', task.id);
      console.log('Original Task:', originalTask);
      console.log('Updated Task:', task);
      console.log('Timestamp:', new Date().toISOString());
      console.groupEnd();
      
      const updatedTask = await updateTask(task.id, task, userId);
      
      const endTime = performance.now();
      const duration = Math.round(endTime - startTime);
      
      console.group(`✅ [${operationId}] Update Task Success`);
      console.log('Updated Task:', updatedTask);
      console.log(`Duration: ${duration}ms`);
      console.groupEnd();
      
      // 서버 응답으로 UI 업데이트
      setTasks(prevTasks => 
        prevTasks.map(t => t.id === task.id ? updatedTask : t)
      );
      
      setLastUpdateTime(new Date().toLocaleTimeString());
      setOperationStatus({ type: 'success', message: 'Task updated successfully', operation: 'update' });
      setTimeout(() => setOperationStatus(null), 2000);
      
    } catch (err) {
      const endTime = performance.now();
      const duration = Math.round(endTime - startTime);
      
      console.group(`❌ [${operationId}] Update Task Error`);
      console.error('Error:', err);
      console.error('Error Message:', err.message);
      console.error(`Duration: ${duration}ms`);
      console.groupEnd();
      
      // 낙관적 업데이트 롤백: 원래 상태로 복구
      if (originalTask) {
        setTasks(prevTasks => 
          prevTasks.map(t => t.id === task.id ? originalTask : t)
        );
      } else {
        // 원래 상태를 찾을 수 없으면 서버에서 다시 로드
        await loadTasks();
      }
      
      setError(err.message || 'Failed to update task');
      setOperationStatus({ type: 'error', message: err.message || 'Failed to update task', operation: 'update' });
    }
  };

  /**
   * Task 삭제 (DELETE)
   * API 통신 상세 로깅 및 낙관적 업데이트
   */
  const handleDeleteTask = async (id) => {
    const startTime = performance.now();
    const operationId = `delete-${Date.now()}`;
    const taskToDelete = tasks.find(t => t.id === id);
    
    // 낙관적 업데이트: 즉시 UI에서 제거
    setTasks(prevTasks => prevTasks.filter(t => t.id !== id));
    
    try {
      setError(null);
      setOperationStatus({ type: 'loading', message: 'Deleting task...', operation: 'delete' });
      
      console.group(`🗑️ [${operationId}] Delete Task Request`);
      console.log('User ID:', userId);
      console.log('Task ID:', id);
      console.log('Task to Delete:', taskToDelete);
      console.log('Timestamp:', new Date().toISOString());
      console.groupEnd();
      
      await deleteTask(id, userId);
      
      const endTime = performance.now();
      const duration = Math.round(endTime - startTime);
      
      console.group(`✅ [${operationId}] Delete Task Success`);
      console.log(`Task ID ${id} deleted successfully`);
      console.log(`Duration: ${duration}ms`);
      console.groupEnd();
      
      setLastUpdateTime(new Date().toLocaleTimeString());
      setOperationStatus({ type: 'success', message: 'Task deleted successfully', operation: 'delete' });
      setTimeout(() => setOperationStatus(null), 2000);
      
    } catch (err) {
      const endTime = performance.now();
      const duration = Math.round(endTime - startTime);
      
      console.group(`❌ [${operationId}] Delete Task Error`);
      console.error('Error:', err);
      console.error('Error Message:', err.message);
      console.error(`Duration: ${duration}ms`);
      console.groupEnd();
      
      // 낙관적 업데이트 롤백: 삭제된 Task 복구
      if (taskToDelete) {
        setTasks(prevTasks => [...prevTasks, taskToDelete].sort((a, b) => a.id - b.id));
      } else {
        // 원래 상태를 찾을 수 없으면 서버에서 다시 로드
        await loadTasks();
      }
      
      setError(err.message || 'Failed to delete task');
      setOperationStatus({ type: 'error', message: err.message || 'Failed to delete task', operation: 'delete' });
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <header className="dashboard-header">
          <h1 className="dashboard-title">Task Dashboard</h1>
          <p className="dashboard-subtitle">React with Database API Integration</p>
          <div style={{ fontSize: '0.85em', color: '#666', marginTop: '8px', display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
            <span>User ID: <strong>{userId}</strong></span>
            {lastUpdateTime && (
              <span>Last Update: <strong>{lastUpdateTime}</strong></span>
            )}
          </div>
        </header>

        {/* 작업 상태 표시 */}
        {operationStatus && (
          <div style={{ 
            padding: '8px 12px', 
            margin: '10px 0', 
            backgroundColor: operationStatus.type === 'success' ? '#efe' : 
                           operationStatus.type === 'error' ? '#fee' : '#eef',
            color: operationStatus.type === 'success' ? '#3c3' : 
                   operationStatus.type === 'error' ? '#c33' : '#33c',
            borderRadius: '4px',
            fontSize: '0.9em',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            {operationStatus.type === 'loading' && '⏳'}
            {operationStatus.type === 'success' && '✅'}
            {operationStatus.type === 'error' && '❌'}
            <span>{operationStatus.message}</span>
          </div>
        )}

        {/* 에러 메시지 */}
        {error && (
          <div className="error-message" style={{ 
            padding: '10px', 
            margin: '10px 0', 
            backgroundColor: '#fee', 
            color: '#c33', 
            borderRadius: '4px' 
          }}>
            <strong>Error:</strong> {error}
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
              Retry
            </button>
          </div>
        )}

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

        <div className="input-section">
          <AddTask onAddTask={handleAddTask} />
        </div>

        {loading ? (
          <div className="loading-state" style={{ 
            padding: '20px', 
            textAlign: 'center' 
          }}>
            <p>Loading tasks...</p>
          </div>
        ) : tasks.length > 0 ? (
          <TaskList 
            tasks={tasks}
            onChangeTask={handleChangeTask}
            onDeleteTask={handleDeleteTask}
          />
        ) : (
          <div className="empty-state">
            <p>No tasks yet. Add one above!</p>
          </div>
        )}
      </div>
    </div>
  );
}