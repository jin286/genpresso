/**
 * 공통 스타일 유틸리티 함수
 * 중복된 스타일 코드를 통합하여 일관성 유지
 */

/**
 * 글래스모피즘 스타일 객체 반환
 * @returns CSSProperties 객체
 */
export const getGlassmorphismStyle = () => ({
  backgroundColor: 'var(--color-glass-bg)',
  backdropFilter: 'blur(var(--blur-glass))',
  WebkitBackdropFilter: 'blur(var(--blur-glass))',
  borderColor: 'var(--color-glass-border)',
  boxShadow: 'var(--glass-shadow)',
});

/**
 * Agent 메시지 배경 스타일 반환
 */
export const getAgentMessageStyle = () => ({
  backgroundColor: 'var(--agent-message-bg)',
});

/**
 * 사용자 메시지 배경 스타일 반환
 */
export const getUserMessageStyle = () => ({
  backgroundColor: 'var(--agent-user-message-bg)',
});

/**
 * 히스토리 아이템 배경 스타일 반환
 */
export const getHistoryItemStyle = () => ({
  backgroundColor: 'var(--history-item-bg)',
});

/**
 * 코멘트 아이템 배경 스타일 반환
 */
export const getCommentItemStyle = () => ({
  backgroundColor: 'var(--comment-item-bg)',
});

/**
 * Popover 배경 스타일 반환
 */
export const getPopoverStyle = () => ({
  backgroundColor: 'var(--popover-bg)',
  borderColor: 'var(--popover-border)',
  boxShadow: 'var(--popover-shadow)',
});

/**
 * 입력창 글래스모피즘 스타일 반환
 */
export const getInputGlassStyle = () => ({
  backgroundColor: 'var(--color-glass-bg)',
  backdropFilter: 'blur(var(--blur-glass))',
  WebkitBackdropFilter: 'blur(var(--blur-glass))',
});

/**
 * 호버 배경 스타일 반환
 */
export const getHoverBgStyle = () => ({
  backgroundColor: 'var(--color-glass-hover-bg)',
});

/**
 * Member 배지 스타일 반환
 */
export const getMemberBadgeStyle = () => ({
  backgroundColor: 'var(--member-badge-bg)',
  borderColor: 'var(--member-badge-border)',
  color: 'var(--member-badge-text)',
});

/**
 * radial gradient 구분선 SVG 생성
 */
export const getRadialGradientDividerSvg = () => {
  const svg = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='1'%3E%3Cdefs%3E%3CradialGradient id='grad' cx='50%25' cy='50%25' r='50%25'%3E%3Cstop offset='0%25' style='stop-color:rgba(255,255,255,0.2);stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:rgba(255,255,255,0);stop-opacity:1' /%3E%3C/radialGradient%3E%3C/defs%3E%3Crect width='100%25' height='1' fill='url(%23grad)' /%3E%3C/svg%3E`;
  return `url("${svg}")`;
};
