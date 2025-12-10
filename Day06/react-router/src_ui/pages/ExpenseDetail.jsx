/**
 * ExpenseDetail 페이지 컴포넌트 (UI 전용)
 * 
 * 특정 지출 내역의 상세 정보를 보여주는 페이지입니다.
 * UI 전용 프로젝트이므로 더미 데이터를 사용합니다.
 * 
 * 실습: API를 연결하여 실제 데이터를 가져오도록 구현하세요.
 */

import { useParams, useNavigate } from 'react-router-dom';
import './ExpenseDetail.css';

// UI 전용: 더미 지출 내역 데이터
// 실습: API에서 실제 데이터를 가져오도록 변경하세요
const DUMMY_EXPENSE = {
  id: 1,
  merchant: '스타벅스 강남점',
  totalAmount: 12500,
  date: '2024-01-15',
  category: '카페',
  description: '아메리카노 2잔, 크로와상 1개',
  items: [
    { name: '아메리카노', amount: 5000 },
    { name: '아메리카노', amount: 5000 },
    { name: '크로와상', amount: 2500 },
  ],
};

function ExpenseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // UI 전용: 더미 데이터 사용
  // 실습: useState와 useEffect를 사용하여 API에서 데이터를 가져오도록 변경하세요
  const expense = DUMMY_EXPENSE;

  return (
    <div className="expense-detail">
      <button onClick={() => navigate('/')} className="back-button">
        ← 뒤로 가기
      </button>

      <div className="detail-card">
        <div className="detail-header">
          <h1>{expense.merchant || '상호명 없음'}</h1>
          <div className="detail-amount">
            ₩{expense.totalAmount?.toLocaleString() || 0}
          </div>
        </div>

        <div className="detail-body">
          <div className="detail-item">
            <label>날짜</label>
            <span>
              {expense.date
                ? new Date(expense.date).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })
                : '-'}
            </span>
          </div>

          {expense.category && (
            <div className="detail-item">
              <label>분류</label>
              <span className="category-badge">{expense.category}</span>
            </div>
          )}

          {expense.description && (
            <div className="detail-item">
              <label>설명</label>
              <span>{expense.description}</span>
            </div>
          )}

          {expense.items && expense.items.length > 0 && (
            <div className="detail-item">
              <label>상세 항목</label>
              <div className="items-list">
                {expense.items.map((item, index) => (
                  <div key={index} className="item-row">
                    <span>{item.name || '항목'}</span>
                    <span>₩{item.amount?.toLocaleString() || 0}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ExpenseDetail;

