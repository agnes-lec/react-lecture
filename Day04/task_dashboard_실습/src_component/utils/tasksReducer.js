// ==========================================
// Reducer Logic (Pure Functions)
// ==========================================

export const initialTasks = [
  { id: 0, text: 'React 기본 문법 익히기', done: true },
  { id: 1, text: 'React 컴포넌트 구조 잡기', done: false },
  { id: 2, text: 'DB 스키마 정의', done: false },
  { id: 3, text: 'AI 기반 영수증 OCR 구매 물품 관리 시스템 실습 프로젝트', done: false },
  { id: 4, text: 'API 명세서 작성', done: false },
];

export function tasksReducer(tasks, action) {
  return tasks;
}

export let nextId = 5;

