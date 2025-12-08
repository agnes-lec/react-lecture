import React, { useState } from 'react';

// ==========================================
// Task Component
// ==========================================

export default function Task() {

  return (
    <div className="task-item">
      <div className="checkbox-wrapper">
        <input
          type="checkbox"
          className="checkbox-input"
        />
      </div>
      <span className="task-text">Task 1</span>
      <div className="task-actions">
        <button className="btn btn-ghost">
          <span>Edit</span>
        </button>
        <button className="btn btn-danger">
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
}

