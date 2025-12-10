/**
 * UserProfile 페이지 컴포넌트 (UI 전용)
 * 
 * 로그인한 사용자의 정보를 확인하는 페이지입니다.
 * UI 전용 프로젝트이므로 더미 데이터를 사용합니다.
 * 
 * 실습: API를 연결하여 실제 사용자 정보를 가져오고 수정하도록 구현하세요.
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserProfile.css';

// UI 전용: 더미 사용자 데이터
// 실습: API에서 실제 사용자 데이터를 가져오도록 변경하세요
const DUMMY_USER = {
  id: 1,
  username: '홍길동',
  email: 'hong@example.com',
  createdAt: '2024-01-01',
};

function UserProfile() {
  const [user] = useState(DUMMY_USER);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: user.username,
    email: user.email,
  });
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  function toggleEdit() {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setFormData({ username: user.username, email: user.email });
    }
    setUpdateSuccess(false);
  }

  async function handleUpdate(e) {
    e.preventDefault();
    setUpdateLoading(true);

    // UI 전용: 실제 업데이트 기능 없음
    // 실습: API를 호출하여 실제 사용자 정보를 업데이트하도록 변경하세요
    setTimeout(() => {
      setUpdateLoading(false);
      setIsEditing(false);
      setUpdateSuccess(true);
      alert('실습: API를 연결하여 실제 사용자 정보 업데이트 기능을 구현하세요!');
      setTimeout(() => setUpdateSuccess(false), 3000);
    }, 1000);
  }

  function handleLogout() {
    // UI 전용: 실제 로그아웃 기능 없음
    // 실습: 실제 로그아웃 기능을 구현하세요
    alert('실습: 로그아웃 기능을 구현하세요!');
    // navigate('/login');
  }

  return (
    <div className="user-profile">
      <div className="user-profile-container">
        <div className="user-profile-header">
          <h1>사용자 정보</h1>
          {!isEditing && (
            <button onClick={toggleEdit} className="btn-secondary">
              정보 수정
            </button>
          )}
        </div>

        {isEditing ? (
          <form onSubmit={handleUpdate} className="user-profile-form">
            <div className="form-group">
              <label htmlFor="username">아이디</label>
              <input
                id="username"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                disabled={updateLoading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">이메일</label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={updateLoading}
              />
            </div>

            {updateSuccess && (
              <div className="success-message">
                사용자 정보가 성공적으로 업데이트되었습니다.
              </div>
            )}

            <div className="form-actions">
              <button
                type="submit"
                className="btn-primary"
                disabled={updateLoading}
              >
                {updateLoading ? '저장 중...' : '저장'}
              </button>
              <button
                type="button"
                onClick={toggleEdit}
                className="btn-secondary"
                disabled={updateLoading}
              >
                취소
              </button>
            </div>
          </form>
        ) : (
          <div className="user-info">
            <div className="info-item">
              <label>아이디</label>
              <div className="info-value">{user.username}</div>
            </div>
            <div className="info-item">
              <label>이메일</label>
              <div className="info-value">{user.email}</div>
            </div>
            <div className="info-item">
              <label>사용자 ID</label>
              <div className="info-value">{user.id}</div>
            </div>
            <div className="info-item">
              <label>가입일</label>
              <div className="info-value">
                {new Date(user.createdAt).toLocaleDateString('ko-KR')}
              </div>
            </div>
          </div>
        )}

        <div className="user-profile-actions">
          <button onClick={handleLogout} className="btn-danger">
            로그아웃
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;

