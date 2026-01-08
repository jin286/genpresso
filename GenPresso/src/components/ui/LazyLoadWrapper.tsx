/**
 * Lazy Loading 래퍼 컴포넌트
 * React.lazy와 Suspense를 활용하여 컴포넌트를 지연 로딩합니다
 */

import React, { Suspense, ComponentType, lazy } from "react";

export interface LazyLoadWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  delay?: number;
}

/**
 * 기본 Lazy Load 래퍼
 * Suspense를 자동으로 적용하여 컴포넌트를 지연 로딩합니다
 */
export function LazyLoadWrapper({ 
  children, 
  fallback = <LoadingFallback /> 
}: LazyLoadWrapperProps) {
  return (
    <Suspense fallback={fallback}>
      {children}
    </Suspense>
  );
}

/**
 * 기본 로딩 폴백 컴포넌트
 */
function LoadingFallback() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-muted-foreground">로딩 중...</p>
      </div>
    </div>
  );
}

/**
 * 스켈레톤 로딩 폴백 컴포넌트
 */
export function SkeletonFallback({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-3 p-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="space-y-2">
          <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
          <div className="h-4 bg-muted rounded animate-pulse w-1/2" />
        </div>
      ))}
    </div>
  );
}

/**
 * 카드 스켈레톤 폴백 컴포넌트
 */
export function CardSkeletonFallback({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
      {Array.from({ length: count }).map((_, i) => (
        <div 
          key={i} 
          className="rounded-xl border overflow-hidden"
          style={{
            backgroundColor: 'var(--color-glass-bg)',
            borderColor: 'var(--color-glass-border)',
          }}
        >
          <div className="aspect-square bg-muted animate-pulse" />
          <div className="p-3 space-y-2">
            <div className="h-3 bg-muted rounded animate-pulse w-3/4" />
            <div className="h-3 bg-muted rounded animate-pulse w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * 지연 로딩 유틸리티 함수
 * import()를 래핑하여 최소 지연 시간을 보장합니다 (너무 빠른 깜빡임 방지)
 */
export function lazyLoadWithDelay<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  minDelay: number = 200
): React.LazyExoticComponent<T> {
  return lazy(() => {
    return Promise.all([
      importFn(),
      new Promise(resolve => setTimeout(resolve, minDelay))
    ]).then(([module]) => module);
  });
}

/**
 * 조건부 Lazy Loading Hook
 * 특정 조건이 만족될 때만 컴포넌트를 로드합니다
 */
export function useConditionalLazyLoad<T extends ComponentType<any>>(
  condition: boolean,
  importFn: () => Promise<{ default: T }>
): T | null {
  const [Component, setComponent] = React.useState<T | null>(null);

  React.useEffect(() => {
    if (condition && !Component) {
      importFn().then(module => {
        setComponent(() => module.default);
      });
    }
  }, [condition, importFn, Component]);

  return Component;
}
