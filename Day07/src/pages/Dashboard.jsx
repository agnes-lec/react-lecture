/**
 * Dashboard 페이지 컴포넌트 (UI 전용)
 * 
 * 지출 내역 목록을 보여주는 메인 페이지입니다.
 * UI 전용 프로젝트이므로 더미 데이터를 사용합니다.
 * 
 * 실습: API를 연결하여 실제 데이터를 가져오도록 구현하세요.
 */

import { Link } from 'react-router-dom';
import './Dashboard.css';

// UI 전용: 더미 지출 내역 데이터
// 실습: API에서 실제 데이터를 가져오도록 변경하세요
const DUMMY_EXPENSES = [
  {
    id: 1,
    merchant: '스타벅스 강남점',
    totalAmount: 12500,
    date: '2024-01-15',
    category: '카페',
  },
  {
    id: 2,
    merchant: '올리브영',
    totalAmount: 45000,
    date: '2024-01-14',
    category: '쇼핑',
  },
  {
    id: 3,
    merchant: '이마트',
    totalAmount: 89000,
    date: '2024-01-13',
    category: '마트',
  },
  {
    id: 4,
    merchant: '맥도날드',
    totalAmount: 18000,
    date: '2024-01-12',
    category: '식당',
  },
  {
    id: 5,
    merchant: 'GS25',
    totalAmount: 3500,
    date: '2024-01-11',
    category: '편의점',
  },
];

function Dashboard() {
  // UI 전용: 더미 데이터 사용
  // 실습: useState와 useEffect를 사용하여 API에서 데이터를 가져오도록 변경하세요
  const expenses = DUMMY_EXPENSES;

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>지출 내역</h1>
        <Link to="/upload" className="btn-primary">
          + 새 영수증 등록
        </Link>
      </div>

      {/* 지출 내역이 없을 때 */}
      {expenses.length === 0 ? (
        <div className="empty-state">
          <p>등록된 지출 내역이 없습니다.</p>
          <Link to="/upload" className="btn-primary">
            첫 영수증 업로드하기
          </Link>
        </div>
      ) : (
        /* 지출 내역 목록 */
        <div className="expenses-list">
          {expenses.map((expense) => (
            <Link
              key={expense.id}
              to={`/expenses/${expense.id}`}
              className="expense-card"
            >
              <div className="expense-card-header">
                <h3>{expense.merchant || '상호명 없음'}</h3>
                <span className="expense-amount">
                  ₩{expense.totalAmount?.toLocaleString() || 0}
                </span>
              </div>
              <div className="expense-card-body">
                <div className="expense-info">
                  <span className="expense-date">
                    {expense.date 
                      ? new Date(expense.date).toLocaleDateString('ko-KR') 
                      : '-'}
                  </span>
                  {expense.category && (
                    <span className="expense-category">{expense.category}</span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;

