/**
 * 가상화(Virtualization) Hook
 * 많은 수의 아이템을 효율적으로 렌더링하기 위해 뷰포트에 보이는 항목만 렌더링합니다
 */

import { useState, useEffect, useRef, useMemo, useCallback } from "react";

export interface VirtualizationOptions {
  itemHeight: number;
  containerHeight: number;
  overscan?: number; // 추가로 렌더링할 항목 수 (기본값: 3)
}

export interface VirtualItem {
  index: number;
  start: number;
  size: number;
}

export function useVirtualization<T>(
  items: T[],
  options: VirtualizationOptions
) {
  const { itemHeight, containerHeight, overscan = 3 } = options;
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // 스크롤 이벤트 핸들러
  const handleScroll = useCallback((e: Event) => {
    const target = e.target as HTMLDivElement;
    setScrollTop(target.scrollTop);
  }, []);

  // 스크롤 이벤트 리스너 등록
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  // 가상 아이템 계산
  const virtualItems = useMemo(() => {
    const totalHeight = items.length * itemHeight;
    const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
    const endIndex = Math.min(
      items.length - 1,
      Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan
    );

    const visibleItems: VirtualItem[] = [];
    for (let i = startIndex; i <= endIndex; i++) {
      visibleItems.push({
        index: i,
        start: i * itemHeight,
        size: itemHeight,
      });
    }

    return {
      virtualItems: visibleItems,
      totalHeight,
      startIndex,
      endIndex,
    };
  }, [items.length, itemHeight, containerHeight, scrollTop, overscan]);

  // 특정 인덱스로 스크롤
  const scrollToIndex = useCallback((index: number) => {
    if (!containerRef.current) return;
    const offset = index * itemHeight;
    containerRef.current.scrollTop = offset;
  }, [itemHeight]);

  return {
    containerRef,
    virtualItems: virtualItems.virtualItems,
    totalHeight: virtualItems.totalHeight,
    scrollToIndex,
  };
}

/**
 * 그리드 가상화 Hook
 * 2D 그리드 레이아웃을 위한 가상화
 */
export interface GridVirtualizationOptions {
  rowHeight: number;
  columnCount: number;
  containerHeight: number;
  containerWidth: number;
  gap?: number;
  overscan?: number;
}

export function useGridVirtualization<T>(
  items: T[],
  options: GridVirtualizationOptions
) {
  const { rowHeight, columnCount, containerHeight, gap = 0, overscan = 1 } = options;
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback((e: Event) => {
    const target = e.target as HTMLDivElement;
    setScrollTop(target.scrollTop);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const virtualGrid = useMemo(() => {
    const rowCount = Math.ceil(items.length / columnCount);
    const totalHeight = rowCount * (rowHeight + gap);
    
    const startRow = Math.max(0, Math.floor(scrollTop / (rowHeight + gap)) - overscan);
    const endRow = Math.min(
      rowCount - 1,
      Math.ceil((scrollTop + containerHeight) / (rowHeight + gap)) + overscan
    );

    const visibleItems: Array<VirtualItem & { item: T }> = [];
    
    for (let row = startRow; row <= endRow; row++) {
      const startIdx = row * columnCount;
      const endIdx = Math.min(startIdx + columnCount, items.length);
      
      for (let i = startIdx; i < endIdx; i++) {
        visibleItems.push({
          index: i,
          start: row * (rowHeight + gap),
          size: rowHeight,
          item: items[i],
        });
      }
    }

    return {
      visibleItems,
      totalHeight,
      rowCount,
    };
  }, [items, columnCount, rowHeight, gap, scrollTop, containerHeight, overscan]);

  return {
    containerRef,
    visibleItems: virtualGrid.visibleItems,
    totalHeight: virtualGrid.totalHeight,
    rowCount: virtualGrid.rowCount,
  };
}
