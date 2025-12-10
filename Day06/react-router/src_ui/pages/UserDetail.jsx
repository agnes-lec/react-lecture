/**
 * UserDetail 페이지 컴포넌트 (UI 전용)
 * 
 * 사용자 상세 정보를 보여주는 페이지입니다.
 * 조회 모드와 수정 모드를 지원합니다.
 * UI 전용 프로젝트이므로 더미 데이터를 사용합니다.
 * 
 * 실습: API를 연결하여 실제 사용자 정보를 가져오고 수정하도록 구현하세요.
 */

import { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams, Link } from 'react-router-dom';
import './UserDetail.css';

// UI 전용: 더미 사용자 데이터
// 실습: API에서 실제 사용자 데이터를 가져오도록 변경하세요
const DUMMY_USERS = {
  '1': {
    id: 1,
    username: '홍길동',
    email: 'hong@example.com',
    role: '사용자',
    createdAt: '2024-01-01',
    status: '활성',
  },
  '2': {
    id: 2,
    username: '김철수',
    email: 'kim@example.com',
    role: '관리자',
    createdAt: '2024-01-05',
    status: '활성',
  },
  '3': {
    id: 3,
    username: '이영희',
    email: 'lee@example.com',
    role: '사용자',
    createdAt: '2024-01-10',
    status: '활성',
  },
  '4': {
    id: 4,
    username: '박민수',
    email: 'park@example.com',
    role: '사용자',
    createdAt: '2024-01-15',
    status: '비활성',
  },
  '5': {
    id: 5,
    username: '최지은',
    email: 'choi@example.com',
    role: '사용자',
    createdAt: '2024-01-20',
    status: '활성',
  },
};

function UserDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // URL 쿼리 파라미터에서 mode 확인 (기본값: 'view')
  const mode = searchParams.get('mode') || 'view';
  const isEditMode = mode === 'edit';
  
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    role: '',
    status: '',
  });
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  // 사용자 데이터 로드
  useEffect(() => {
    // UI 전용: 더미 데이터 사용
    // 실습: API 호출로 변경하세요
    setLoading(true);
    setTimeout(() => {
      const foundUser = DUMMY_USERS[id];
      if (foundUser) {
        setUser(foundUser);
        setFormData({
          username: foundUser.username,
          email: foundUser.email,
          role: foundUser.role,
          status: foundUser.status,
        });
      }
      setLoading(false);
    }, 500);
  }, [id]);

  // 수정 모드로 전환
  function handleEdit() {
    setSearchParams({ mode: 'edit' });
  }

  // 조회 모드로 전환
  function handleCancel() {
    // 폼 데이터를 원래 값으로 복원
    if (user) {
      setFormData({
        username: user.username,
        email: user.email,
        role: user.role,
        status: user.status,
      });
    }
    setSearchParams({});
    setUpdateSuccess(false);
  }

  // 폼 입력 변경
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  // 사용자 정보 업데이트
  async function handleUpdate(e) {
    e.preventDefault();
    setUpdateLoading(true);

    // UI 전용: 실제 업데이트 기능 없음
    // 실습: API를 호출하여 실제 사용자 정보를 업데이트하도록 변경하세요
    setTimeout(() => {
      // 더미 데이터 업데이트
      if (user) {
        setUser({
          ...user,
          ...formData,
        });
      }
      setUpdateLoading(false);
      setUpdateSuccess(true);
      setSearchParams({}); // 조회 모드로 전환
      
      setTimeout(() => {
        setUpdateSuccess(false);
      }, 3000);
    }, 1000);
  }

  // 사용자 삭제
  function handleDelete() {
    if (window.confirm('정말 이 사용자를 삭제하시겠습니까?')) {
      // UI 전용: 실제 삭제 기능 없음
      // 실습: API를 호출하여 실제 사용자를 삭제하도록 변경하세요
      alert('실습: API를 연결하여 실제 사용자 삭제 기능을 구현하세요!');
      // navigate('/users');
    }
  }

  if (loading) {
    return (
      <div className="user-detail">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>로딩 중...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="user-detail">
        <div className="error-container">
          <h2>사용자를 찾을 수 없습니다</h2>
          <p>요청하신 사용자 ID: {id}</p>
          <Link to="/users" className="btn-primary">
            사용자 목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="user-detail">
      <div className="user-detail-container">
        <div className="user-detail-header">
          <div className="header-left">
            <button 
              onClick={() => navigate('/users')}
              className="btn-back"
            >
              ← 목록으로
            </button>
            <h1>사용자 상세 정보</h1>
          </div>
          {!isEditMode && (
            <div className="header-actions">
              <button onClick={handleEdit} className="btn-secondary">
                수정
              </button>
              <button onClick={handleDelete} className="btn-danger">
                삭제
              </button>
            </div>
          )}
        </div>

        {updateSuccess && (
          <div className="success-message">
            사용자 정보가 성공적으로 업데이트되었습니다.
          </div>
        )}

        {isEditMode ? (
          /* 수정 모드 */
          <form onSubmit={handleUpdate} className="user-detail-form">
            <div className="form-group">
              <label htmlFor="username">사용자명</label>
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

            <div className="form-group">
              <label htmlFor="role">역할</label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                disabled={updateLoading}
              >
                <option value="사용자">사용자</option>
                <option value="관리자">관리자</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="status">상태</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
                disabled={updateLoading}
              >
                <option value="활성">활성</option>
                <option value="비활성">비활성</option>
              </select>
            </div>

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
                onClick={handleCancel}
                className="btn-secondary"
                disabled={updateLoading}
              >
                취소
              </button>
            </div>
          </form>
        ) : (
          /* 조회 모드 */
          <div className="user-info">
            <div className="info-item">
              <label>사용자 ID</label>
              <div className="info-value">{user.id}</div>
            </div>
            <div className="info-item">
              <label>사용자명</label>
              <div className="info-value">{user.username}</div>
            </div>
            <div className="info-item">
              <label>이메일</label>
              <div className="info-value">{user.email}</div>
            </div>
            <div className="info-item">
              <label>역할</label>
              <div className="info-value">
                <span className={`role-badge role-${user.role}`}>
                  {user.role}
                </span>
              </div>
            </div>
            <div className="info-item">
              <label>상태</label>
              <div className="info-value">
                <span className={`status-badge status-${user.status}`}>
                  {user.status}
                </span>
              </div>
            </div>
            <div className="info-item">
              <label>가입일</label>
              <div className="info-value">
                {new Date(user.createdAt).toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserDetail;

