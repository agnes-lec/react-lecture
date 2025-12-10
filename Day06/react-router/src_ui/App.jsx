/**
 * App 컴포넌트 (UI 전용)
 * 
 * 메인 애플리케이션 컴포넌트입니다.
 * React Router를 사용하여 페이지 라우팅을 처리합니다.
 * 
 * 이 프로젝트는 UI 전용 프로젝트로, 실제 기능은 구현되어 있지 않습니다.
 * 실습을 통해 단계적으로 기능을 추가할 수 있습니다.
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Dashboard from './pages/Dashboard';
import TaskList from './pages/TaskList';
import Upload from './pages/Upload';
import ExpenseDetail from './pages/ExpenseDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import UserList from './pages/UserList';
import UserDetail from './pages/UserDetail';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavigationBar />
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tasks" element={<TaskList />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/expenses/:id" element={<ExpenseDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/users/:id" element={<UserDetail />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;

