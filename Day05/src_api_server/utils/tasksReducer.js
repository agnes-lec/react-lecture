// ==========================================
// Reducer Logic (Pure Functions)
// ==========================================

export const initialTasks = [];
export let nextId = 1; // 다음 Task ID (API 서버가 ID를 생성하지만, 낙관적 업데이트를 위해 유지)

export function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'added': {
      return [
        ...tasks,
        {
          id: action.id,
          text: action.text,
          done: false,
        },
      ];
    }
    case 'changed': {
      return tasks.map((t) => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return tasks.filter((t) => t.id !== action.id);
    }
    case 'loaded': {
      // API에서 로드한 전체 Task 목록으로 교체
      return action.tasks;
    }
    default: {
      throw new Error('Unknown action: ' + action.type);
    }
  }
}

