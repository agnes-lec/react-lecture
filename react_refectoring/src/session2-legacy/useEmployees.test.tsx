import { render, screen, fireEvent, cleanup, act } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import useEmployees, { type Employee } from './useEmployees';

// Test harness component that exposes hook state in the DOM
function TestComponent({ initialDept = 'ALL', fetcher }: { initialDept?: string; fetcher?: (dept: string) => Promise<Employee[]> }) {
  const { employees, isLoading, error, selectedDept, setSelectedDept } = useEmployees(initialDept, fetcher as any);

  return (
    <div>
      <select data-testid="dept-select" value={selectedDept} onChange={(e) => setSelectedDept(e.target.value)}>
        <option value="ALL">All</option>
        <option value="DEV">DEV</option>
        <option value="HR">HR</option>
      </select>
      {isLoading && <p data-testid="loading">Loading...</p>}
      {error && <p data-testid="error">{error}</p>}
      <ul data-testid="list">
        {employees.map((e) => (
          <li key={e.id}>{e.name} ({e.dept})</li>
        ))}
      </ul>
    </div>
  );
}

describe('useEmployees hook', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    cleanup();
    // run any pending timers to avoid leaks
    try { vi.runOnlyPendingTimers(); } catch {}
    vi.useRealTimers();
    vi.resetAllMocks();
  });

  it('初期 상태 확인: 초기 로딩 상태와 최종 데이터가 반환되는지 확인합니다', async () => {
    // Render the component and ensure it shows loading initially,
    // then after 1s the default mock data is displayed.
    render(<TestComponent />);

    // initially loading should be visible
    expect(screen.getByTestId('loading')).toBeTruthy();

    // advance timers to allow default fetcher to resolve
    await act(async () => {
      vi.advanceTimersByTime(1000);
      // allow microtasks to flush
      await Promise.resolve();
    });

    // Loading should be gone and list should contain 3 items (ALL)
    const list = screen.getByTestId('list');
    expect(list.children.length).toBe(3);
  });

  it('부서 변경 시 데이터 재조회: select 변경으로 리스트가 필터링 되는지 확인합니다', async () => {
    // This test verifies that changing the department triggers a reload
    render(<TestComponent />);

    // wait initial load
    await act(async () => { vi.advanceTimersByTime(1000); await Promise.resolve(); });

    // change to DEV
    const select = screen.getByTestId('dept-select') as HTMLSelectElement;
    await act(async () => {
      fireEvent.change(select, { target: { value: 'DEV' } });
    });

    // after change, loading should appear
    expect(screen.getByTestId('loading')).toBeTruthy();

    // advance timers for new fetch
    await act(async () => { vi.advanceTimersByTime(1000); await Promise.resolve(); });

    // DEV has 2 employees in mock data
    const list = screen.getByTestId('list');
    expect(list.children.length).toBe(2);
    expect(list).toHaveTextContent('Alice');
    expect(list).toHaveTextContent('Charlie');
  });

  it('로딩 상태 변화: 부서 변경 시 로딩이 true에서 false로 바뀌는지 확인합니다', async () => {
    // Ensure loading appears immediately after changing dept and disappears after fetch completes
    render(<TestComponent />);

    // wait initial load
    await act(async () => { vi.advanceTimersByTime(1000); await Promise.resolve(); });

    const select = screen.getByTestId('dept-select') as HTMLSelectElement;

    // change dept
    await act(async () => { fireEvent.change(select, { target: { value: 'HR' } }); });

    // loading should be present
    expect(screen.getByTestId('loading')).toBeTruthy();

    // complete fetch
    await act(async () => { vi.advanceTimersByTime(1000); await Promise.resolve(); });

    // loading should be gone
    expect(screen.queryByTestId('loading')).toBeNull();
  });

  it('에러 처리: fetcher가 실패할 때 에러가 상태에 반영되는지 확인합니다', async () => {
    // Provide a fetcher that rejects to simulate network error
    const failingFetcher = () => new Promise<Employee[]>((_res, rej) => setTimeout(() => rej(new Error('Network error')), 1000));

    render(<TestComponent fetcher={failingFetcher} />);

    // initially loading
    expect(screen.getByTestId('loading')).toBeTruthy();

    // advance timers to trigger rejection
    await act(async () => { vi.advanceTimersByTime(1000); await Promise.resolve(); });

    // error message should be displayed and list should be empty
    expect(screen.getByTestId('error')).toHaveTextContent('Network error');
    expect(screen.getByTestId('list').children.length).toBe(0);
  });
});
