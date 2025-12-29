// API 응답 타입 정의

// 지출 항목 응답
export interface ExpenseItemResponse {
  id: number;
  name: string;
  amount: number;
}

// 지출 내역 응답
export interface ExpenseResponse {
  id: number;
  merchant: string;
  date: string;
  totalAmount: number;
  category: string | null;
  description: string | null;
  items: ExpenseItemResponse[];
  createdAt: string;
}

// 페이지네이션 응답
export interface PagedExpenseResponse {
  content: ExpenseResponse[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  empty: boolean;
}

// Task 응답
export interface TaskResponse {
  id: number;
  text: string;
  done: boolean;
  userId: string;
  createdAt: string;
}

// 사용자 응답
export interface UserResponse {
  id: number;
  email: string;
  name: string;
  role: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

// 인증 응답
export interface AuthResponse {
  token: string;
  userId: number;
  email: string;
  name: string;
  message?: string;
}

// 에러 응답
export interface ErrorResponse {
  error: string;
  message?: string;
}

