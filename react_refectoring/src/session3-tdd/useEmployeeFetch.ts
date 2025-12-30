import { useState, useEffect } from 'react';

// [실습 3-1] AI가 만들어준 로직을 여기에 붙여넣으세요.
export const useEmployeeFetch = (selectedDept: string) => {
  const [employees, setEmployees] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // TODO: Implement fetch logic here using useEffect
  
  return { employees, isLoading, error };
};