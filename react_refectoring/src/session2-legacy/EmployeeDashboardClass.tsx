import React from 'react';
import useEmployees from './useEmployees';

// Converted to a functional component using a custom hook `useEmployees`
const EmployeeDashboard: React.FC = () => {
  const { employees, isLoading, error, selectedDept, setSelectedDept } = useEmployees();

  const handleDeptChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDept(e.target.value);
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc' }}>
      <h3>👥 Employee Dashboard (Hooks)</h3>
      <select value={selectedDept} onChange={handleDeptChange}>
        <option value="ALL">All Departments</option>
        <option value="DEV">Development</option>
        <option value="HR">HR</option>
      </select>
      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {employees.map(emp => (
          <li key={emp.id}>{emp.name} ({emp.dept})</li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeDashboard;