import { useEffect, useState } from 'react';

export interface Employee {
  id: number;
  name: string;
  dept: string;
}

type Fetcher = (dept: string) => Promise<Employee[]>;

// Default fetcher keeps previous behavior (mock + 1s delay)
const defaultFetcher: Fetcher = (dept) =>
  new Promise<Employee[]>((resolve) => {
    const timer = setTimeout(() => {
      const mockData: Employee[] = [
        { id: 1, name: 'Alice', dept: 'DEV' },
        { id: 2, name: 'Bob', dept: 'HR' },
        { id: 3, name: 'Charlie', dept: 'DEV' },
      ];
      const filtered = dept === 'ALL' ? mockData : mockData.filter(e => e.dept === dept);
      resolve(filtered);
    }, 1000);
    // In case caller never awaits, keep timer reference for test cleanup if necessary
    // (No clear timeout here since we only resolve)
  });

export function useEmployees(initialDept = 'ALL', fetcher: Fetcher = defaultFetcher) {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedDept, setSelectedDept] = useState<string>(initialDept);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setError(null);

    (async () => {
      try {
        const data = await fetcher(selectedDept);
        if (cancelled) return;
        setEmployees(data);
      } catch (err) {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : String(err));
        setEmployees([]);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [selectedDept, fetcher]);

  return { employees, isLoading, error, selectedDept, setSelectedDept } as const;
}

export default useEmployees;
