/**
 * 디바운스 Hook
 * 빠른 입력이나 이벤트를 지연시켜 성능을 최적화합니다
 */

import { useState, useEffect, useRef, useCallback } from "react";

/**
 * 값을 디바운스하는 Hook
 * @param value - 디바운스할 값
 * @param delay - 지연 시간 (밀리초)
 * @returns 디바운스된 값
 */
export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * 함수를 디바운스하는 Hook
 * @param callback - 디바운스할 함수
 * @param delay - 지연 시간 (밀리초)
 * @returns 디바운스된 함수
 */
export function useDebouncedCallback<T extends (...args: any[]) => any>(
  callback: T,
  delay: number = 300
): (...args: Parameters<T>) => void {
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );
}

/**
 * 검색 입력용 디바운스 Hook
 * 검색 쿼리와 디바운스된 값, 로딩 상태를 함께 관리합니다
 */
export function useDebouncedSearch(initialValue: string = "", delay: number = 300) {
  const [query, setQuery] = useState(initialValue);
  const [debouncedQuery, setDebouncedQuery] = useState(initialValue);
  const [isDebouncing, setIsDebouncing] = useState(false);

  useEffect(() => {
    setIsDebouncing(true);
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
      setIsDebouncing(false);
    }, delay);

    return () => {
      clearTimeout(timer);
      setIsDebouncing(false);
    };
  }, [query, delay]);

  const clearQuery = useCallback(() => {
    setQuery("");
    setDebouncedQuery("");
  }, []);

  return {
    query,
    setQuery,
    debouncedQuery,
    isDebouncing,
    clearQuery,
  };
}
