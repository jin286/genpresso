/**
 * 노드 컴포넌트 통합 디자인 시스템
 * 
 * Guidelines.md 기반으로 모든 노드 컴포넌트의 일관된 스타일을 정의합니다.
 */

// ==================== 크기 시스템 ====================
/**
 * 노드 카드 너비
 */
export const NODE_WIDTH = {
  /** 기본 너비: w-47 (188px) */
  DEFAULT: 'w-[188px]',
} as const;

// ==================== 간격 시스템 ====================
/**
 * 모든 노드 컴포넌트는 p-1 (4px) 패딩 완전 통일
 */
export const NODE_PADDING = {
  /** 전체 패딩: p-1 (4px 상하좌우) */
  ALL: 'p-1',
  /** 좌우 패딩: px-1 (4px 좌우) */
  X: 'px-1',
  /** 상하 패딩: py-1 (4px 상하) */
  Y: 'py-1',
} as const;

/**
 * space-y 간격 (수직 자식 간격)
 */
export const NODE_SPACE_Y = {
  /** space-y-0.5 (2px) */
  XS: 'space-y-0.5',
  /** space-y-1 (4px) */
  SM: 'space-y-1',
  /** space-y-2 (8px) - 메타데이터 확장 영역 표준 */
  MD: 'space-y-2',
} as const;

/**
 * 컴포넌트 간 간격
 */
export const NODE_GAP = {
  /** 작은 간격: gap-1 (4px) */
  SM: 'gap-1',
  /** 중간 간격: gap-1.5 (6px) */
  MD: 'gap-1.5',
  /** 큰 간격: gap-2 (8px) */
  LG: 'gap-2',
} as const;

// ==================== 아이콘 및 버튼 크기 ====================
/**
 * 노드 내부 아이콘 크기 (14px)
 * 노드는 작은 공간에 많은 정보를 담아야 하므로 14px 사용
 */
export const NODE_ICON = {
  /** 아이콘 크기 클래스: w-3.5 h-3.5 (14px) */
  SIZE_CLASS: 'w-3.5 h-3.5',
  /** 큰 아이콘 크기: w-4 h-4 (16px) */
  SIZE_LG_CLASS: 'w-4 h-4',
  /** 더 큰 아이콘: w-7 h-7 (28px) - Play 버튼 등 */
  SIZE_XL_CLASS: 'w-7 h-7',
} as const;

/**
 * 노드 내부 버튼 크기 (28px)
 * 작은 공간에서 터치하기 적절한 크기
 */
export const NODE_BUTTON = {
  /** 버튼 크기 클래스: w-7 h-7 (28px) */
  SIZE_CLASS: 'w-7 h-7',
  /** 큰 버튼 크기: w-14 h-14 (56px) - 비디오 재생 버튼 */
  SIZE_LG_CLASS: 'w-14 h-14',
} as const;

// ==================== 곡률 시스템 ====================
/**
 * 노드 컴포넌트 곡률
 */
export const NODE_RADIUS = {
  /** 작은 곡률: rounded-lg (12px) - 버튼, 입력 필드 */
  SM: 'rounded-lg',
  /** 큰 곡률: rounded-2xl (16px) - 노드 카드 */
  LG: 'rounded-2xl',
  /** 완전한 원형: rounded-full */
  FULL: 'rounded-full',
} as const;

// ==================== 색상 및 효과 ====================

/**
 * 호버 및 활성 효과
 */
export const INTERACTIVE_STYLES = {
  /** 호버 배경: hover:bg-secondary/10 */
  HOVER_BG: 'hover:bg-secondary/10',
  /** 호버 테두리: hover:border-primary/50 */
  HOVER_BORDER: 'hover:border-primary/50',
  /** 호버 배경 (뮤트): hover:bg-muted/5 */
  HOVER_BG_MUTED: 'hover:bg-muted/5',
  /** 호버 스케일: hover:scale-110 */
  HOVER_SCALE: 'hover:scale-110',
  /** 활성 상태: border-primary bg-primary/10 */
  ACTIVE: 'border-primary bg-primary/10',
  /** 트랜지션: transition-colors */
  TRANSITION: 'transition-colors',
  /** 모든 트랜지션: transition-all */
  TRANSITION_ALL: 'transition-all',
} as const;

// ==================== 텍스트 크기 ====================
/**
 * 노드 내부 텍스트 크기
 */
export const NODE_TEXT = {
  /** 매우 작은 텍스트: 10px - 노드 내부 보조 정보 전용 (nodeName, 퍼센트 등) */
  XXS: 'text-[10px]',
  /** 작은 텍스트: text-xs (12px) */
  XS: 'text-xs',
  /** 중간 텍스트: text-sm (14px) */
  SM: 'text-sm',
  /** 기본 텍스트: text-base (16px) */
  BASE: 'text-base',
} as const;

// ==================== 레이아웃 ====================
/**
 * Flexbox 유틸리티
 */
export const FLEX = {
  /** 중앙 정렬: flex items-center justify-center */
  CENTER: 'flex items-center justify-center',
  /** 세로 중앙: flex items-center */
  CENTER_Y: 'flex items-center',
  /** 좌우 배치: flex items-center justify-between */
  BETWEEN: 'flex items-center justify-between',
  /** 세로 방향: flex flex-col */
  COL: 'flex flex-col',
} as const;

// ==================== 노드 헤더 ====================
/**
 * 노드 헤더 높이 고정
 */
export const NODE_HEADER = {
  /** 헤더 높이: h-9 (36px) */
  HEIGHT: 'h-9',
  /** 헤더 축소 방지: shrink-0 */
  SHRINK: 'shrink-0',
} as const;

// ==================== 테두리 ====================
/**
 * 노드 테두리
 */
export const NODE_BORDER = {
  /** 기본 테두리: border */
  DEFAULT: 'border',
  /** 두꺼운 테두리: border-2 */
  THICK: 'border-2',
  /** 점선 테두리: border-2 border-dashed border-muted-foreground/30 */
  DASHED: 'border-2 border-dashed border-muted-foreground/30',
  /** 상단 테두리: border-t */
  TOP: 'border-t',
} as const;

// ==================== 유틸리티 함수 ====================
/**
 * 여러 클래스를 조합하는 헬퍼 함수
 */
export const cn = (...classes: (string | undefined | false)[]) => {
  return classes.filter(Boolean).join(' ');
};

/**
 * 노드 타입별 라벨 반환
 */
export const getNodeTypeLabel = (type: string): string => {
  const labels: Record<string, string> = {
    text: '텍스트',
    image: '이미지',
    video: '비디오',
    upload: '업로드',
    process: '프로세스',
  };
  return labels[type] || type;
};

/**
 * 노드 배지 스타일 가져오기 (CSS 변수 사용)
 */
export const getNodeBadgeStyles = (type: string) => {
  return {
    backgroundColor: `var(--node-badge-${type}-bg)`,
    color: `var(--node-badge-${type}-text)`,
  };
};

/**
 * 글래스모피즘 스타일 가져오기 (선택 상태에 따라)
 */
export const getGlassStyles = (isSelected: boolean) => {
  return {
    backgroundColor: "var(--color-glass-bg)",
    backdropFilter: "blur(var(--blur-glass))",
    WebkitBackdropFilter: "blur(var(--blur-glass))",
    borderColor: isSelected ? "var(--primary)" : "var(--color-glass-border)",
    boxShadow: "var(--glass-shadow)",
  };
};

/**
 * ID 입력 필드 너비 계산
 */
export const calculateIdInputWidth = (id: string = '', minWidth: number = 80, charWidth: number = 8): number => {
  if (!id) return minWidth;
  return Math.max(id.length * charWidth, minWidth);
};
