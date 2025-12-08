import Task from './Task';

// ==========================================
// Task List Component
// ==========================================

export default function TaskList({ tasks, onChangeTask, onDeleteTask }) {
  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li key={task.id}>
          <Task 
            task={task}
            onChange={onChangeTask}
            onDelete={onDeleteTask}
          />
        </li>
      ))}
    </ul>
  );
}

