import { useState } from 'react';

export default function AddTask({ onAddTask }) {
  const [inputText, setInputText] = useState('');

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleAddClick = () => {
    if (inputText.trim() !== '') {
      if (onAddTask) {
        onAddTask(inputText.trim());
      }
      setInputText('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAddClick();
    }
  };

  return (
    <>
      <input
        className="task-input"
        placeholder="Add a new task..."
        value={inputText}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <button 
        className="btn btn-primary"
        onClick={handleAddClick}
      >
        Add Task
      </button>
    </>
  );
}

