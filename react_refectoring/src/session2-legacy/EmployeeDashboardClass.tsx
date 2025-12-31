import React, { Component } from 'react';

// API Response Type 정의 (TypeScript 가정 시)
// interface Employee { id: number; name: string; dept: string; }

class EmployeeDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: [],
      isLoading: false,
      error: null,
      selectedDept: 'ALL', // 필터링 조건
    };

    // "this" 바인딩 (이런 코드가 예전엔 필수였음을 강조)
    this.handleDeptChange = this.handleDeptChange.bind(this);
  }

  // 1. 마운트 시 데이터 호출
  componentDidMount() {
    this.fetchEmployees(this.state.selectedDept);
  }

  // 2. 상태 변경 감지 (Props나 State가 바뀌면 호출됨 - 실수하기 쉬운 부분)
  componentDidUpdate(prevProps, prevState) {
    if (prevState.selectedDept !== this.state.selectedDept) {
      this.fetchEmployees(this.state.selectedDept);
    }
  }

  fetchEmployees(dept) {
    this.setState({ isLoading: true, error: null });
    
    // Spring Boot REST API 호출 시뮬레이션
    const query = dept === 'ALL' ? '' : `?dept=${dept}`;
    fetch(`/api/v1/employees${query}`)
      .then((response) => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then((data) => {
        this.setState({ employees: data, isLoading: false });
      })
      .catch((err) => {
        this.setState({ error: err.message, isLoading: false });
      });
  }

  handleDeptChange(e) {
    this.setState({ selectedDept: e.target.value });
  }

  render() {
    const { employees, isLoading, error, selectedDept } = this.state;

    if (error) return <div className="error">Error: {error}</div>;

    return (
      <div className="dashboard-container">
        <h2>Employee Management</h2>
        
        {/* 필터 영역 */}
        <select value={selectedDept} onChange={this.handleDeptChange}>
          <option value="ALL">All Departments</option>
          <option value="DEV">Development</option>
          <option value="HR">HR</option>
        </select>

        {/* 리스트 영역 */}
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {employees.map((emp) => (
              <li key={emp.id}>{emp.name} ({emp.dept})</li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default EmployeeDashboard;
