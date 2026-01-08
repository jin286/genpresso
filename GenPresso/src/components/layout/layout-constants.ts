/**
 * 레이아웃 상수 정의
 * 하드코딩 방지 및 유지보수성 향상
 */

// 사이드바 너비
export const SIDEBAR_WIDTH = {
  ICON_ONLY: 48,      // 0단계: 아이콘만
  EXPANDED: 180,       // 1-2단계: 확장
} as const;

// 간격 및 패딩
export const SPACING = {
  SIDEBAR_LEFT: 24,    // left-6 (사이드바 좌측 여백)
  SIDEBAR_GAP: 8,      // 사이드바와 메인 콘텐츠 사이 간격
  BUTTON_RIGHT: 24,    // right-6 (버튼 우측 여백)
  BUTTON_SIZE: 44,     // Agent/Help 버튼 크기
  BUTTON_GAP: 8,       // 버튼과 콘텐츠 사이 간격
} as const;

// 헤더 높이
export const HEADER = {
  HEIGHT: 64,          // top-16 (4rem = 64px)
  PADDING_X: 10,
  PADDING_Y: 10,
} as const;

// Agent 패널 크기
export const AGENT_PANEL = {
  WIDTH: 320,
  HEIGHT_OFFSET: 96,   // calc(100vh - 96px)
} as const;

// Help 패널 크기
export const HELP_PANEL = {
  WIDTH: 220,
  HEIGHT: 230,
  BOTTOM_OFFSET: 96,   // bottom-24 (6rem = 96px)
} as const;

// 애니메이션 타이밍
export const ANIMATION = {
  PAGE_TRANSITION: 300,  // 페이지 전환 애니메이션 시간 (ms)
  PANEL_EXPAND: 300,     // 패널 확장 애니메이션 시간 (ms)
  HOVER_SCALE: 1.05,     // 호버 시 크기
  TAP_SCALE: 0.95,       // 클릭 시 크기
} as const;

// 캔버스 플로팅 UI 위치
export const CANVAS_UI = {
  // 헤더 높이 (GenPressoLayout 헤더: 64px - 여백 포함)
  HEADER_TOP: 18,          // 헤더 내부 위치 (py-[10px] + 여백)
  
  // 좌측 프로젝트명 위치
  PROJECT_LEFT: 68,        // SystemButton(44px) + 여백(24px) = 68px
  
  // 우측 멤버+내보내기 위치
  MEMBERS_RIGHT: 68,       // AgentButton(44px) + 여백(24px) = 68px
  
  // 중앙 도구 메뉴바 위치 (헤더 바로 아래)
  TOOLS_TOP: 58,           // 헤더(64px) - 6px = 헤더와 더 밀착
} as const;

// Z-index 레이어
export const Z_INDEX = {
  CANVAS: 0,
  CANVAS_FLOATING: 30,      // 캔버스 플로팅 UI (툴바, 채팅창 등)
  SIDEBAR: 40,
  HEADER: 50,
  OVERLAY: 40,
  PANEL: 60,
} as const;



// 캔버스 멤버 섹션 설정
export const CANVAS_MEMBER = {
  /** 편집 시간 */
  LAST_EDITED: '23시간 전 편집',
  
  /** 표시할 아바타 수 (실제 표시: 4개) */
  AVATAR_COUNT: 4,
  
  /** 추가 멤버 수 */
  ADDITIONAL_MEMBERS: 9,
  
  /** 아바타 크기 - 32px (최소 터치 타겟에 근접) */
  AVATAR_SIZE: 'w-8 h-8',
  
  /** 멤버 이름 목록 */
  MEMBER_NAMES: ['김', '이', '박', '최', '정'],
  
  /** 아바타 스타일 상수 - CSS 변수 사용으로 라이트/다크 자동 대응 */
  AVATAR_STYLES: {
    LIGHT_BG: '#ffffff',              // 라이트모드 배경 (순백색, 불투명)
    DARK_BG: '#3f3f46',               // 다크모드 배경 (zinc-700, 불투명)
    LIGHT_BORDER: 'rgba(0,0,0,0.2)',  // 라이트모드 테두리 (20% 검은색)
    DARK_BORDER: 'rgba(255,255,255,0.25)',  // 다크모드 테두리 (25% 흰색)
    LIGHT_TEXT: '#1a1a1a',            // 라이트모드 텍스트 (검은색)
    DARK_TEXT: '#f5f5f5',             // 다크모드 텍스트 (흰색)
  },
} as const;

// 계산 함수
export const calculateMarginLeft = (sidebarLevel: 0 | 1 | 2): number => {
  const sidebarWidth = sidebarLevel === 0 ? SIDEBAR_WIDTH.ICON_ONLY : SIDEBAR_WIDTH.EXPANDED;
  return SPACING.SIDEBAR_LEFT + sidebarWidth + SPACING.SIDEBAR_GAP;
};

export const calculateMarginRight = (): number => {
  return SPACING.BUTTON_RIGHT + SPACING.BUTTON_SIZE + SPACING.BUTTON_GAP;
};

/**
 * 글래스모피즘 스타일 객체 생성
 * Guidelines.md의 글래스모피즘 시스템을 따름
 */
export const getGlassmorphismStyle = () => ({
  backgroundColor: 'var(--color-glass-bg)',
  backdropFilter: 'blur(var(--blur-glass))',
  WebkitBackdropFilter: 'blur(var(--blur-glass))',
  borderColor: 'var(--color-glass-border)',
  boxShadow: 'var(--glass-shadow)',
});
