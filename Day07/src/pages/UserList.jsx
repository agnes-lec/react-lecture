/**
 * UserList 페이지 컴포넌트 (UI 전용)
 * 
 * 사용자 목록을 보여주는 페이지입니다.
 * UI 전용 프로젝트이므로 더미 데이터를 사용합니다.
 * 
 * 실습: API를 연결하여 실제 사용자 목록을 가져오도록 구현하세요.
 */

import { Link } from 'react-router-dom';
import './UserList.css';

// UI 전용: 더미 사용자 목록 데이터
// 실습: API에서 실제 사용자 목록을 가져오도록 변경하세요
const DUMMY_USERS = [
  {
    id: 1,
    username: '홍길동',
    email: 'hong@example.com',
    role: '사용자',
    createdAt: '2024-01-01',
    status: '활성',
  },
  {
    id: 2,
    username: '김철수',
    email: 'kim@example.com',
    role: '관리자',
    createdAt: '2024-01-05',
    status: '활성',
  },
  {
    id: 3,
    username: '이영희',
    email: 'lee@example.com',
    role: '사용자',
    createdAt: '2024-01-10',
    status: '활성',
  },
  {
    id: 4,
    username: '박민수',
    email: 'park@example.com',
    role: '사용자',
    createdAt: '2024-01-15',
    status: '비활성',
  },
  {
    id: 5,
    username: '최지은',
    email: 'choi@example.com',
    role: '사용자',
    createdAt: '2024-01-20',
    status: '활성',
  },
];

function UserList() {
  // UI 전용: 더미 데이터 사용
  // 실습: useState와 useEffect를 사용하여 API에서 데이터를 가져오도록 변경하세요
  const users = DUMMY_USERS;

  return (
    <div className="user-list">
      <div className="user-list-header">
        <h1>사용자 관리</h1>
        <Link to="/users/new" className="btn-primary">
          + 새 사용자 추가
        </Link>
      </div>

      {/* 사용자 목록이 없을 때 */}
      {users.length === 0 ? (
        <div className="empty-state">
          <p>등록된 사용자가 없습니다.</p>
          <Link to="/users/new" className="btn-primary">
            첫 사용자 추가하기
          </Link>
        </div>
      ) : (
        /* 사용자 목록 테이블 */
        <div className="user-list-container">
          <table className="user-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>사용자명</th>
                <th>이메일</th>
                <th>역할</th>
                <th>상태</th>
                <th>가입일</th>
                <th>작업</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>
                    <Link to={`/users/${user.id}`} className="user-link">
                      {user.username}
                    </Link>
                  </td>
                  <td>{user.email}</td>
                  <td>
                    <span className={`role-badge role-${user.role}`}>
                      {user.role}
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge status-${user.status}`}>
                      {user.status}
                    </span>
                  </td>
                  <td>
                    {new Date(user.createdAt).toLocaleDateString('ko-KR')}
                  </td>
                  <td>
                    <div className="action-buttons">
                      <Link
                        to={`/users/${user.id}`}
                        className="btn-link"
                      >
                        조회
                      </Link>
                      <Link
                        to={`/users/${user.id}?mode=edit`}
                        className="btn-link btn-edit"
                      >
                        수정
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default UserList;

