import React from 'react';

export interface BaseIconProps {
  size?: number;
  color?: string;
  className?: string;
}

// ========================================
// 📍 SVG 경로 데이터 통합 관리
// ========================================

const SVG_PATHS = {
  // 🔽 화살표 아이콘들
  arrowDown: "M0.274142 1.85719L6.82633 9.50344C6.93194 9.62662 7.06295 9.7255 7.21037 9.79329C7.35779 9.86108 7.51813 9.89618 7.68039 9.89618C7.84265 9.89618 8.00299 9.86108 8.15041 9.79329C8.29783 9.7255 8.42884 9.62662 8.53445 9.50344L15.0866 1.85719C15.712 1.12734 15.1935 0 14.2326 0H1.12633C0.165392 0 -0.353045 1.12734 0.274142 1.85719Z",
  arrowUp: "M15.7259 14.1428L9.17367 6.49656C9.06806 6.37338 8.93705 6.2745 8.78963 6.20671C8.64221 6.13892 8.48187 6.10382 8.31961 6.10382C8.15735 6.10382 7.99701 6.13892 7.84959 6.20671C7.70217 6.2745 7.57116 6.37338 7.46555 6.49656L0.913357 14.1428C0.287963 14.8727 0.806546 16 1.76743 16H14.8737C15.8346 16 16.353 14.8727 15.7259 14.1428Z",
  arrowForward: "M6 4L10 8L6 12",
  arrowRight: "M9.29289 2.29289C9.68342 1.90237 10.3166 1.90237 10.7071 2.29289L15.7071 7.29289C16.0976 7.68342 16.0976 8.31658 15.7071 8.70711L10.7071 13.7071C10.3166 14.0976 9.68342 14.0976 9.29289 13.7071C8.90237 13.3166 8.90237 12.6834 9.29289 12.2929L12.5858 9H1C0.447715 9 0 8.55229 0 8C0 7.44771 0.447715 7 1 7H12.5858L9.29289 3.70711C8.90237 3.31658 8.90237 2.68342 9.29289 2.29289Z",
  
  // 📋 프로젝트 및 폴더 아이콘들
  folder: "M18 6v8c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2h5l2 2h5c1.1 0 2 .9 2 2z",
  folderOpen: "M19 7h-3V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v1H2v11a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7z M7 6h7v1H7V6z M3 8h16v9H3V8z",
  
  // 💗 즐겨찾기 및 북마크 아이콘들
  bookmarkOutline: "M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z",
  bookmarkFilled: "M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z",
  bookmarksOutline: "M15 7v12.97l-4.21-3.97L6.58 19.94V7.03L15 7m1-2H6c-1.1 0-2 .9-2 2v16l6-5.5L16 23V7c0-1.1-.9-2-2-2z",
  bookmarksFilled: "M15 7v12.97l-4.21-3.97L6.58 19.94V7.03L15 7z M16 5H6c-1.1 0-2 .9-2 2v16l6-5.5L16 23V7c0-1.1-.9-2-2-2z",
  heartOutline: "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z",
  heartFilled: "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z",
  
  // 🔔 알림 및 메시지 아이콘들
  bell: "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9",
  bellFilled: "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 0 1-3.46 0",
  chat: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z",
  chatFilled: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z",
  
  // ⚙️ 설정 및 도구 아이콘들
  settings: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z",
  
  // 📊 차트 및 분석 아이콘들
  chart: "M12 20V10 M18 20V4 M6 20v-4",
  chartFilled: "M3 3v18h18 M9 17V9l4 4 6-6",
  
  // 👁️ 보기 및 공유 아이콘들
  eye: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z",
  share: "M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8 M16 6l-4-4-4 4 M12 2v13",
  
  // 🍀 스파클 및 특수 아이콘들
  sparkles: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .962 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.582a.5.5 0 0 1 0 .962L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.962 0L9.937 15.5Z M6.25 16.25a1 1 0 0 0-.718-.718l-1.25-.25a.25.25 0 0 1 0-.484l1.25-.25A1 1 0 0 0 6.25 13.75l.25-1.25a.25.25 0 0 1 .484 0l.25 1.25a1 1 0 0 0 .718.718l1.25.25a.25.25 0 0 1 0 .484l-1.25.25a1 1 0 0 0-.718.718l-.25 1.25a.25.25 0 0 1-.484 0l-.25-1.25Z",
  
  // 🍔 메뉴 및 네비게이션 아이콘들
  menu: "M3 12h18 M3 6h18 M3 18h18",
  menuClose: "M18 6L6 18 M6 6l12 12",
  
  // 💰 크레딧 및 코인 아이콘
  coins: "M12 3c-4.97 0-9 1.79-9 4s4.03 4 9 4 9-1.79 9-4-4.03-4-9-4zm0 10c-4.97 0-9-1.79-9-4v3c0 2.21 4.03 4 9 4s9-1.79 9-4V9c0 2.21-4.03 4-9 4zm0 5c-4.97 0-9-1.79-9-4v3c0 2.21 4.03 4 9 4s9-1.79 9-4v-3c0 2.21-4.03 4-9 4z",
};

// ========================================
// 🎨 통합 아이콘 컴포넌트들
// ========================================

// 🔽 화살표 아이콘들
export function IconUnifiedArrowDown({ size = 16, color = "currentColor", className = "" }: BaseIconProps) {
  return (
    <svg
      className={`transition-all duration-200 ${className}`}
      width={size}
      height={size}
      viewBox="0 0 16 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d={SVG_PATHS.arrowDown}
        fill={color}
      />
    </svg>
  );
}

export function IconUnifiedArrowUp({ size = 16, color = "currentColor", className = "" }: BaseIconProps) {
  return (
    <svg
      className={`transition-all duration-200 ${className}`}
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d={SVG_PATHS.arrowUp}
        fill={color}
      />
    </svg>
  );
}

export function IconUnifiedArrowRight({ size = 16, color = "#F5F5F5", className = "" }: BaseIconProps) {
  return (
    <div 
      className={`relative transition-all duration-200 ${className}`} 
      style={{ width: size, height: size }}
      data-name="unified-arrow-right"
    >
      {/* Note: IconFilledDown is not available in this context, using simple rotation of arrow down path */}
      <svg className="block size-full rotate-270" viewBox="0 0 16 10" fill={color}>
         <path d={SVG_PATHS.arrowDown} fill={color} />
      </svg>
    </div>
  );
}

// 📋 프로젝트 및 폴더 아이콘들
export function IconUnifiedFolder({ size = 24, color = "#F5F5F5", className = "", filled = false }: BaseIconProps & { filled?: boolean }) {
  return (
    <div 
      className={`relative transition-all duration-200 ${className}`} 
      style={{ width: size, height: size }}
      data-name="unified-folder"
    >
      {filled ? (
        // 채워진 폴더 아이콘 (Figma FilledFolder 디자인)
        <svg className="block size-full" fill="none" viewBox="0 0 24 18" preserveAspectRatio="xMidYMid meet">
          {/* 폴더 상단 부분 */}
          <path 
            d="M16.875 1.50001H9.56766C9.3457 1.50072 9.12854 1.43545 8.94375 1.31251L7.64062 0.441099C7.20911 0.152543 6.70145 -0.00101089 6.18234 5.00835e-06H2.625C1.92904 0.000749489 1.26179 0.27755 0.769667 0.769672C0.277545 1.26179 0.000744481 1.92904 0 2.62501V3.75001H19.5C19.5 2.30251 18.3225 1.50001 16.875 1.50001Z" 
            fill={color}
            transform="scale(1.0) translate(2, 1)"
          />
          {/* 폴더 본체 부분 */}
          <path 
            d="M19.112 12.75H3.38546C2.69668 12.7492 2.0358 12.4778 1.54536 11.9941C1.05491 11.5105 0.774191 10.8535 0.763737 10.1648L0.00717421 2.44266V2.42953C-0.017601 2.12002 0.0219524 1.80874 0.123345 1.51526C0.224738 1.22179 0.385776 0.952473 0.596326 0.724267C0.806875 0.496062 1.06238 0.313904 1.34676 0.189258C1.63114 0.0646117 1.93824 0.00017436 2.24874 0H20.2534C20.5638 0.000303648 20.8708 0.0648363 21.1551 0.18954C21.4394 0.314243 21.6948 0.49642 21.9052 0.724611C22.1157 0.952802 22.2766 1.22207 22.378 1.51548C22.4793 1.8089 22.5188 2.1201 22.494 2.42953V2.44266L21.7337 10.1648C21.7233 10.8535 21.4426 11.5105 20.9521 11.9941C20.4617 12.4778 19.8008 12.7492 19.112 12.75V12.75Z" 
            fill={color}
            transform="scale(1.0) translate(2, 4.5)"
          />
        </svg>
      ) : (
        // 선형 폴더 아이콘 (Figma StrokeFolder 디자인)
        <svg className="block size-full" fill="none" viewBox="0 0 24 18" preserveAspectRatio="xMidYMid meet">
          {/* 폴더 상단 부분 */}
          <path 
            clipRule="evenodd" 
            d="M2.625 1.5C2.32663 1.5 2.04048 1.61853 1.8295 1.8295C1.61853 2.04048 1.5 2.32663 1.5 2.625V6C1.5 6.41421 1.16421 6.75 0.75 6.75C0.335786 6.75 0 6.41421 0 6V2.625C0 1.92881 0.276562 1.26113 0.768845 0.768845C1.26113 0.276562 1.92881 0 2.625 0H6.18234C6.70062 1.32769e-05 7.20731 0.153447 7.63853 0.440962C7.63854 0.440975 7.63856 0.440987 7.63858 0.441L8.94358 1.311C9.12839 1.43423 9.34553 1.49999 9.56766 1.5C9.56766 1.5 9.56765 1.5 9.56766 1.5H16.875C17.5712 1.5 18.2389 1.77656 18.7312 2.26884C19.2234 2.76113 19.5 3.42881 19.5 4.125V6C19.5 6.41421 19.1642 6.75 18.75 6.75C18.3358 6.75 18 6.41421 18 6V4.125C18 3.82663 17.8815 3.54048 17.6705 3.3295C17.4595 3.11853 17.1734 3 16.875 3H9.56766C9.04938 2.99999 8.54269 2.84655 8.11147 2.55904C8.11146 2.55903 8.11144 2.55901 8.11142 2.559L6.80642 1.689C6.62161 1.56577 6.40446 1.50001 6.18234 1.5C6.18234 1.5 6.18235 1.5 6.18234 1.5H2.625Z" 
            fill={color} 
            fillRule="evenodd"
            transform="scale(1.0) translate(2, 1)"
          />
          {/* 폴더 본체 부분 */}
          <path 
            clipRule="evenodd" 
            d="M2.25004 1.5C2.14651 1.49999 2.0441 1.52142 1.94926 1.56294C1.85441 1.60446 1.76919 1.66516 1.69896 1.74122C1.62873 1.81729 1.575 1.90707 1.54117 2.00492C1.50795 2.10101 1.49462 2.20284 1.50196 2.3042L2.2615 10.0518C2.26389 10.0761 2.26508 10.1006 2.26508 10.125C2.26508 10.423 2.38334 10.7089 2.59389 10.9198C2.80428 11.1306 3.08964 11.2493 3.38742 11.25H19.1127C19.4105 11.2493 19.6959 11.1306 19.9063 10.9198C20.1168 10.7089 20.2351 10.423 20.2351 10.125C20.2351 10.1006 20.2363 10.0761 20.2387 10.0518L20.9982 2.3042C21.0055 2.20303 20.9923 2.1014 20.9592 2.00547C20.9255 1.90778 20.872 1.81811 20.802 1.74208C20.732 1.66605 20.6471 1.6053 20.5525 1.56364C20.4582 1.52211 20.3564 1.50045 20.2534 1.5H2.25004ZM2.25008 1.50384e-09C1.9395 -1.13532e-05 1.63228 0.0642772 1.34777 0.188818C1.06324 0.313364 0.807574 0.49547 0.596876 0.723671C0.386178 0.951872 0.225009 1.22122 0.123516 1.51477C0.0220234 1.80831 -0.0175951 2.11969 0.00715543 2.4293C0.00751306 2.43377 0.00791083 2.43824 0.0083487 2.44271L0.765383 10.1647C0.775681 10.8458 1.05038 11.4968 1.5323 11.9795C2.02359 12.4717 2.69009 12.7488 3.38549 12.75L3.3868 12.75H19.1134L19.1147 12.75C19.8101 12.7488 20.4766 12.4717 20.9679 11.9795C21.4498 11.4968 21.7245 10.8458 21.7348 10.1647L22.4918 2.44271C22.4923 2.43824 22.4927 2.43377 22.493 2.4293C22.5177 2.12028 22.4783 1.8095 22.3772 1.51643C22.2762 1.22337 22.1156 0.954348 21.9057 0.726252C21.6957 0.498157 21.4409 0.315906 21.1572 0.190932C20.8735 0.0659571 20.5671 0.000955091 20.2571 3.53308e-06L20.2548 1.50384e-09H2.25008C2.2501 1.50384e-09 2.25007 1.50384e-09 2.25008 1.50384e-09Z" 
            fill={color} 
            fillRule="evenodd"
            transform="scale(1.0) translate(2, 4.5)"
          />
        </svg>
      )}
    </div>
  );
}

// 💗 즐겨찾기 및 북마크 아이콘들
export function IconUnifiedBookmark({ size = 24, color = "#F5F5F5", className = "", filled = false }: BaseIconProps & { filled?: boolean }) {
  if (!filled) {
    // Custom Outline Path (Expanded Stroke) from Figma
    const outlinePath = "M2.49819 2.64496e-06L2.5 0H10.625V0.625103L10.6268 2.64496e-06C11.2888 0.00192497 11.9231 0.265743 12.3912 0.733827C12.8593 1.20191 13.1231 1.83622 13.125 2.49819L13.125 2.5V16.25C13.125 16.4931 12.984 16.7141 12.7636 16.8167C12.5432 16.9192 12.2834 16.8847 12.0974 16.7281L6.5625 12.0671L1.02758 16.7281C0.84164 16.8847 0.58177 16.9192 0.361362 16.8167C0.140954 16.7141 0 16.4931 0 16.25V2.5L2.64496e-06 2.49819C0.00192497 1.83622 0.265743 1.20191 0.733827 0.733827C1.20191 0.265743 1.83622 0.00192497 2.49819 2.64496e-06ZM10.624 1.25H2.501C2.16959 1.25118 1.85207 1.38335 1.61771 1.61771C1.38335 1.85207 1.25118 2.16959 1.25 2.501V14.9066L6.15992 10.7719C6.39256 10.576 6.73244 10.576 6.96508 10.7719L11.875 14.9066V2.50107C11.8738 2.16963 11.7417 1.85209 11.5073 1.61771C11.2729 1.38335 10.9554 1.25118 10.624 1.25Z";
    
    return (
      <div 
        className={`relative transition-all duration-200 ${className}`} 
        style={{ width: size, height: size }}
        data-name="unified-bookmark"
      >
        <svg className="block size-full" fill="none" viewBox="0 0 14 17" preserveAspectRatio="xMidYMid meet">
          <path d={outlinePath} fill={color} fillRule="evenodd" clipRule="evenodd" />
        </svg>
      </div>
    );
  }

  return (
    <div 
      className={`relative transition-all duration-200 ${className}`} 
      style={{ width: size, height: size }}
      data-name="unified-bookmark"
    >
      <svg className="block size-full" fill="none" stroke="none" viewBox="0 0 24 24">
        <path d={SVG_PATHS.bookmarkFilled} fill={color} />
      </svg>
    </div>
  );
}

export function IconUnifiedBookmarks({ size = 24, color = "#F5F5F5", className = "", filled = false }: BaseIconProps & { filled?: boolean }) {
  return (
    <div 
      className={`relative transition-all duration-200 ${className}`} 
      style={{ width: size, height: size }}
      data-name="unified-bookmarks"
    >
      <svg className="block size-full" fill="none" stroke={filled ? 'none' : color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d={SVG_PATHS.bookmarksOutline} fill={filled ? color : 'none'} />
      </svg>
    </div>
  );
}

export function IconUnifiedHeart({ size = 24, color = "#F5F5F5", className = "", filled = false }: BaseIconProps & { filled?: boolean }) {
  return (
    <div 
      className={`relative transition-all duration-200 ${className}`} 
      style={{ width: size, height: size }}
      data-name="unified-heart"
    >
      <svg className="block size-full" fill="none" stroke={filled ? 'none' : color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d={SVG_PATHS.heartOutline} fill={filled ? color : 'none'} />
      </svg>
    </div>
  );
}

// 🔔 알림 및 메시지 아이콘들
export function IconUnifiedBell({ size = 24, color = "#F5F5F5", className = "", filled = false }: BaseIconProps & { filled?: boolean }) {
  return (
    <div 
      className={`relative transition-all duration-200 ${className}`} 
      style={{ width: size, height: size }}
      data-name="unified-bell"
    >
      <svg className="block size-full" fill="none" stroke={filled ? 'none' : color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d={SVG_PATHS.bell} fill={filled ? color : 'none'} />
        {filled && (
          <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        )}
      </svg>
    </div>
  );
}

export function IconUnifiedChat({ size = 24, color = "#F5F5F5", className = "", filled = false }: BaseIconProps & { filled?: boolean }) {
  return (
    <div 
      className={`relative transition-all duration-200 ${className}`} 
      style={{ width: size, height: size }}
      data-name="unified-chat"
    >
      <svg className="block size-full" fill="none" stroke={filled ? 'none' : color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d={SVG_PATHS.chat} fill={filled ? color : 'none'} />
      </svg>
    </div>
  );
}

// ⚙️ 설정 및 도구 아이콘들
export function IconUnifiedSettings({ size = 24, color = "#F5F5F5", className = "", filled = false }: BaseIconProps & { filled?: boolean }) {
  return (
    <div 
      className={`relative transition-all duration-200 ${className}`} 
      style={{ width: size, height: size }}
      data-name="unified-settings"
    >
      <svg className="block size-full" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d={SVG_PATHS.settings} fill={filled ? color : 'none'} />
      </svg>
    </div>
  );
}

// 📊 차트 및 분석 아이콘들
export function IconUnifiedChart({ size = 24, color = "#F5F5F5", className = "", filled = false }: BaseIconProps & { filled?: boolean }) {
  return (
    <div 
      className={`relative transition-all duration-200 ${className}`} 
      style={{ width: size, height: size }}
      data-name="unified-chart"
    >
      <svg className="block size-full" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        {filled ? (
          <path d={SVG_PATHS.chartFilled} fill={color} />
        ) : (
          <path d={SVG_PATHS.chart} />
        )}
      </svg>
    </div>
  );
}

// 👁️ 보기 및 공유 아이콘들
export function IconUnifiedEye({ size = 24, color = "#F5F5F5", className = "" }: BaseIconProps) {
  return (
    <div 
      className={`relative transition-all duration-200 ${className}`} 
      style={{ width: size, height: size }}
      data-name="unified-eye"
    >
      <svg className="block size-full" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d={SVG_PATHS.eye} />
      </svg>
    </div>
  );
}

export function IconUnifiedShare({ size = 24, color = "#F5F5F5", className = "" }: BaseIconProps) {
  return (
    <div 
      className={`relative transition-all duration-200 ${className}`} 
      style={{ width: size, height: size }}
      data-name="unified-share"
    >
      <svg className="block size-full" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d={SVG_PATHS.share} />
      </svg>
    </div>
  );
}

// 🍀 스파클 및 특수 아이콘들
export function IconUnifiedSparkles({ size = 24, color = "#F5F5F5", className = "" }: BaseIconProps) {
  return (
    <div 
      className={`relative transition-all duration-200 ${className}`} 
      style={{ width: size, height: size }}
      data-name="unified-sparkles"
    >
      <svg className="block size-full" fill="none" viewBox="0 0 24 24">
        <path d={SVG_PATHS.sparkles} fill={color} />
      </svg>
    </div>
  );
}

// 🍔 메뉴 및 네비게이션 아이콘들
export function IconUnifiedMenu({ size = 24, color = "#F5F5F5", className = "", isClose = false }: BaseIconProps & { isClose?: boolean }) {
  return (
    <div 
      className={`relative transition-all duration-200 ${className}`} 
      style={{ width: size, height: size }}
      data-name="unified-menu"
    >
      <svg className="block size-full" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d={isClose ? SVG_PATHS.menuClose : SVG_PATHS.menu} />
      </svg>
    </div>
  );
}

// 💰 크레딧 및 코인 아이콘
export function IconUnifiedCoins({ size = 24, color = "currentColor", className = "" }: BaseIconProps) {
  return (
    <div 
      className={`relative transition-all duration-200 ${className}`} 
      style={{ width: size, height: size }}
      data-name="unified-coins"
    >
      <svg className="block size-full" viewBox="0 0 24 24" fill={color} stroke="none">
        <path d={SVG_PATHS.coins} />
      </svg>
    </div>
  );
}

// ========================================
// 🎯 호버 상태를 지원하는 토글 아이콘들
// ========================================

interface ToggleIconProps extends BaseIconProps {
  isHovered?: boolean;
  isActive?: boolean;
}

export function IconToggleFolder({ 
  size = 16, 
  color = "#F5F5F5", 
  className = "", 
  isHovered = false,
  isActive = false 
}: ToggleIconProps) {
  return (
    <IconUnifiedFolder 
      size={size} 
      color={color} 
      className={`${className} ${isHovered ? 'scale-110' : ''}`}
      filled={isHovered || isActive}
    />
  );
}

export function IconToggleBookmarks({ 
  size = 16, 
  color = "#F5F5F5", 
  className = "", 
  isHovered = false,
  isActive = false 
}: ToggleIconProps) {
  return (
    <IconUnifiedBookmarks 
      size={size} 
      color={color} 
      className={`${className} ${isHovered ? 'scale-110' : ''}`}
      filled={isHovered || isActive}
    />
  );
}
