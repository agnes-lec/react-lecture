import React, { useState } from 'react';

export default function Task({ task, onChange, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task?.text || 'Task 1');

  const handleCheckboxChange = (e) => {
    if (onChange) {
      onChange({
        ...task,
        done: e.target.checked,
      });
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setEditText(task?.text || 'Task 1');
  };

  const handleSaveClick = () => {
    if (onChange) {
      onChange({
        ...task,
        text: editText,
      });
    }
    setIsEditing(false);
  };

  const handleDeleteClick = () => {
    if (onDelete && task?.id) {
      onDelete(task.id);
    }
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSaveClick();
    }
  };

  let taskContent;

  if (isEditing) {
    taskContent = (
      <>
        <input
          className="edit-input"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={handleInputKeyDown}
          autoFocus
        />
        <button 
          className="btn btn-primary"
          onClick={handleSaveClick}
        >
          Save
        </button>
      </>
    );
  } else {
    taskContent = (
      <>
        <span 
          className={`task-text ${task?.done ? 'completed' : ''}`}
          onClick={handleEditClick}
        >
          {task?.text || 'Task 1'}
        </span>
        <div className="task-actions">
          <button 
            className="btn btn-ghost"
            onClick={handleEditClick}
          >
            Edit
          </button>
          <button 
            className="btn btn-danger"
            onClick={handleDeleteClick}
          >
            Delete
          </button>
        </div>
      </>
    );
  }

  return (
    <div className="task-item">
      <div className="checkbox-wrapper">
        <input
          type="checkbox"
          className="checkbox-input"
          checked={task?.done || false}
          onChange={handleCheckboxChange}
        />
      </div>
      {taskContent}
    </div>
  );
}

