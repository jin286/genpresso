/**
 * 아이콘 시스템
 * 모든 아이콘은 일관된 API와 스타일을 제공합니다.
 */

// 갤러리 및 콘텐츠 아이콘
export { IconHeart } from './IconHeart';
export { IconBookmark } from './IconBookmark';
export { IconShare } from './IconShare';
export { IconEye } from './IconEye';
export { IconSparkles } from './IconSparkles';

// 사이드바 및 네비게이션 아이콘
export { IconNotification } from './IconNotification';
export { IconChat } from './IconChat';
export { IconSettings } from './IconSettings';
export { IconBookmarks } from './IconBookmarks';
export { IconFolder } from './IconFolder';
export { IconChart } from './IconChart';
export { IconMenu } from './IconMenu';
export { IconUnifiedCoins as IconCoins } from './UnifiedIconSystem';

// 화살표 및 방향 아이콘
export { IconArrowUp } from './IconArrowUp';
export { IconArrowDown } from './IconArrowDown';

// 새로운 스트로크/필드 아이콘 (사이드바용)
export { IconStrokeFolder } from './IconStrokeFolder';
export { IconFilledFolder } from './IconFilledFolder';
export { IconStrokeBookmark } from './IconStrokeBookmark';
export { IconFilledBookmark } from './IconFilledBookmark';
export { IconStrokeChart } from './IconStrokeChart';
export { IconFilledChart } from './IconFilledChart';
export { IconStrokeNote } from './IconStrokeNote';
export { IconFilledNote } from './IconFilledNote';

export { IconStrokeArchive } from './IconStrokeArchive';
export { IconFilledArchive } from './IconFilledArchive';
export { IconStrokeService } from './IconStrokeService';
export { IconFilledService } from './IconFilledService';
export { IconStrokePolicy } from './IconStrokePolicy';
export { IconFilledPolicy } from './IconFilledPolicy';

// 통합 아이콘 시스템
export { 
  IconUnifiedArrowDown,
  IconUnifiedArrowUp,
  IconUnifiedArrowRight,
  IconUnifiedFolder,
  IconUnifiedBookmark,
  IconUnifiedBookmarks,
  IconUnifiedHeart,
  IconUnifiedBell,
  IconUnifiedChat,
  IconUnifiedSettings,
  IconUnifiedChart,
  IconUnifiedEye,
  IconUnifiedShare,
  IconUnifiedSparkles,
  IconUnifiedMenu,
  IconUnifiedCoins,
  IconToggleFolder,
  IconToggleBookmarks
} from './UnifiedIconSystem';

// 기본 설정
export const ICON_DEFAULTS = {
  size: 16,
  color: '#F5F5F5',
  className: 'cursor-pointer hover:scale-110 transition-transform duration-200'
} as const;

// 타입 정의
export type IconVariant = 'outline' | 'filled';

export interface BaseIconProps {
  size?: number;
  color?: string;
  className?: string;
}

export interface ToggleIconProps extends BaseIconProps {
  variant?: IconVariant;
}