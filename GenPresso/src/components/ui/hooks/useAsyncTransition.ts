/**
 * 비동기 전환 Hook
 * React 18의 useTransition을 활용하여 긴 작업을 논블로킹으로 처리합니다
 */

import { useTransition, useCallback, useState } from "react";

export interface UseAsyncTransitionReturn<T extends (...args: any[]) => any> {
  isPending: boolean;
  isError: boolean;
  error: Error | null;
  execute: (...args: Parameters<T>) => Promise<ReturnType<T>>;
  reset: () => void;
}

/**
 * 비동기 작업을 전환 모드로 실행하는 Hook
 * UI를 차단하지 않고 긴 작업을 백그라운드에서 실행합니다
 */
export function useAsyncTransition<T extends (...args: any[]) => Promise<any>>(
  asyncFn: T
): UseAsyncTransitionReturn<T> {
  const [isPending, startTransition] = useTransition();
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(
    async (...args: Parameters<T>): Promise<ReturnType<T>> => {
      setIsError(false);
      setError(null);

      return new Promise((resolve, reject) => {
        startTransition(async () => {
          try {
            const result = await asyncFn(...args);
            resolve(result);
          } catch (err) {
            const error = err instanceof Error ? err : new Error(String(err));
            setIsError(true);
            setError(error);
            reject(error);
          }
        });
      });
    },
    [asyncFn]
  );

  const reset = useCallback(() => {
    setIsError(false);
    setError(null);
  }, []);

  return {
    isPending,
    isError,
    error,
    execute,
    reset,
  };
}

/**
 * 여러 비동기 작업을 전환 모드로 실행하는 Hook
 */
export function useAsyncTransitions<T extends Record<string, (...args: any[]) => Promise<any>>>(
  asyncFns: T
): Record<keyof T, UseAsyncTransitionReturn<T[keyof T]>> & { isAnyPending: boolean } {
  const transitions = Object.entries(asyncFns).reduce((acc, [key, fn]) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    acc[key as keyof T] = useAsyncTransition(fn);
    return acc;
  }, {} as Record<keyof T, UseAsyncTransitionReturn<T[keyof T]>>);

  const isAnyPending = Object.values(transitions).some((t: any) => t.isPending);

  return {
    ...transitions,
    isAnyPending,
  };
}

/**
 * 상태 업데이트를 전환 모드로 처리하는 Hook
 * 무거운 상태 업데이트를 논블로킹으로 처리합니다
 */
export function useTransitionState<T>(
  initialState: T
): [T, (update: T | ((prev: T) => T)) => void, boolean] {
  const [state, setState] = useState<T>(initialState);
  const [isPending, startTransition] = useTransition();

  const setTransitionState = useCallback((update: T | ((prev: T) => T)) => {
    startTransition(() => {
      setState(update);
    });
  }, []);

  return [state, setTransitionState, isPending];
}
