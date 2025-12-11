import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Dashboard from './pages/Dashboard';
import Upload from './pages/Upload';
import ExpenseDetail from './pages/ExpenseDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import UserList from './pages/UserList';
import UserDetail from './pages/UserDetail';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Layout from './components/Layout';
import { AutoProvider } from './contexts/AuthContext'

import './App.css';

function App() {
  return (
    <AutoProvider>
    <div className="App">
      <BrowserRouter>
          <Routes>
              <Route element={<Layout />} >
                <Route path="/" element={<Home />} />
                <Route path="/Dashboard" element={<Dashboard />} />
                <Route path="/upload" element={<Upload />} />
                <Route path="/expenses/:id" element={<ExpenseDetail />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/users" element={<UserList />} />
                <Route path="/users/:id" element={<UserDetail />} />
                <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
      </BrowserRouter>
    </div>
    </AutoProvider>
  );
}

export default App;