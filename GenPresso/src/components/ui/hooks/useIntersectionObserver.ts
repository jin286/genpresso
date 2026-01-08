/**
 * Intersection Observer Hook
 * 요소가 뷰포트에 보이는지 감지하여 지연 로딩이나 애니메이션을 구현합니다
 */

import { useState, useEffect, useRef, RefObject } from "react";

export interface UseIntersectionObserverOptions extends IntersectionObserverInit {
  freezeOnceVisible?: boolean;
}

export function useIntersectionObserver(
  options?: UseIntersectionObserverOptions
): [RefObject<HTMLDivElement>, boolean] {
  const { freezeOnceVisible = false, ...observerOptions } = options || {};
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // 이미 보였고 freeze 옵션이 활성화되어 있으면 observer 생성 안 함
    if (freezeOnceVisible && hasBeenVisible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry.isIntersecting;
        setIsIntersecting(isVisible);

        if (isVisible && !hasBeenVisible) {
          setHasBeenVisible(true);
        }

        // freeze 옵션이 활성화되어 있고 한 번 보였으면 관찰 중지
        if (freezeOnceVisible && isVisible) {
          observer.disconnect();
        }
      },
      observerOptions
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [freezeOnceVisible, hasBeenVisible, observerOptions]);

  return [elementRef, freezeOnceVisible ? hasBeenVisible : isIntersecting];
}

/**
 * 이미지 지연 로딩을 위한 Hook
 */
export function useLazyImage(src: string): [RefObject<HTMLImageElement>, string | undefined, boolean] {
  const [imageSrc, setImageSrc] = useState<string>();
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const [observerRef, isVisible] = useIntersectionObserver({
    rootMargin: "50px",
    freezeOnceVisible: true,
  });

  useEffect(() => {
    if (isVisible && !imageSrc) {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setImageSrc(src);
        setIsLoaded(true);
      };
    }
  }, [isVisible, src, imageSrc]);

  // observerRef를 imgRef에 연결
  useEffect(() => {
    if (imgRef.current && observerRef.current) {
      observerRef.current = imgRef.current as any;
    }
  }, [observerRef]);

  return [imgRef, imageSrc, isLoaded];
}

/**
 * 무한 스크롤을 위한 Hook
 */
export function useInfiniteScroll(
  loadMore: () => void,
  options?: {
    threshold?: number;
    rootMargin?: string;
  }
): RefObject<HTMLDivElement> {
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const [observerRef, isVisible] = useIntersectionObserver({
    threshold: options?.threshold || 0.1,
    rootMargin: options?.rootMargin || "100px",
  });

  useEffect(() => {
    if (isVisible) {
      loadMore();
    }
  }, [isVisible, loadMore]);

  // observerRef를 loadMoreRef에 연결
  useEffect(() => {
    if (loadMoreRef.current && observerRef.current) {
      observerRef.current = loadMoreRef.current as any;
    }
  }, [observerRef]);

  return loadMoreRef;
}
