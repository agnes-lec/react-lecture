import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useEmployeeFetch } from './useEmployeeFetch';

// [실습 3-2] AI에게 "useEmployeeFetch에 대한 테스트 코드를 작성해줘"라고 요청하고 여기에 붙여넣으세요.
// Prompt 조건: "global.fetch를 Mocking하고, 로딩 상태와 성공 케이스를 검증해줘"

// Fetch Mocking Setup
global.fetch = vi.fn();

describe('useEmployeeFetch Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should be implemented by AI', () => {
    // 여기에 AI가 짜준 코드가 들어갑니다.
    expect(true).toBe(true); 
  });
});