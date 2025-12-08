// ==========================================
// API Service Layer for Task CRUD Operations
// ==========================================

const API_BASE_URL = 'http://13.220.93.143:8080/api/tasks';

// 수강생별 ID 설정: .env 파일에서 읽어옴
const DEFAULT_USER_ID = import.meta.env.VITE_USER_ID || '1';

function toApiFormat(task) {
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
    const requestBodyData = {
      ...apiData,
      userId: userId,
    };
    const requestBody = JSON.stringify(requestBodyData);
    
    const response = await fetch(`${API_BASE_URL}?userId=${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: requestBody,
    });
    
    if (!response.ok) {
      let errorMessage = `Failed to create task: ${response.status} ${response.statusText}`;
      try {
        const errorText = await response.text();
        if (errorText && errorText.trim()) {
          try {
            const errorDetails = JSON.parse(errorText);
            errorMessage = errorDetails.message || errorDetails.error || errorMessage;
          } catch {
            errorMessage = errorText || errorMessage;
          }
        }
      } catch (e) {
        console.error('Error reading error response:', e);
      }
      throw new Error(errorMessage);
    }
    
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

export async function updateTask(taskId, taskData, userId = DEFAULT_USER_ID) {
  try {
    const { id, ...taskDataWithoutId } = taskData;
    const apiData = toApiFormat(taskDataWithoutId);
    const requestBodyData = {
      ...apiData,
      userId: userId,
    };
    const requestBody = JSON.stringify(requestBodyData);
    
    const response = await fetch(`${API_BASE_URL}/${taskId}?userId=${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: requestBody,
    });
    
    if (!response.ok) {
      throw new Error(`Failed to update task: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    return fromApiFormat(data);
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
}

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
