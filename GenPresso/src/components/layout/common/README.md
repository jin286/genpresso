# SideNav 공통 컴포넌트

## 📦 개요
이 폴더는 SideNav의 확장형과 축소형에서 공유하는 공통 컴포넌트를 포함합니다.

## 🎯 목적
- **중복 코드 제거**: 두 SideNav 파일에서 동일한 컴포넌트 중복 방지
- **유지보수성 향상**: 한 곳에서 수정하면 모든 곳에 반영
- **일관성 보장**: 동일한 컴포넌트 사용으로 스타일 통일

## 📁 파일 구조

```
/components/layout/common/
└── SideNavProfileComponents.tsx   # 프로필 관련 공통 컴포넌트
```

## 🔧 포함된 컴포넌트

### 1. UserProfileImage
- 사용자 프로필 이미지 (원형)
- User 아이콘 사용
- 크기: 33x33px
- 배경: `bg-primary/20`

### 2. Authority
- 권한 표시 컴포넌트 (현재 빈 컴포넌트)
- 향후 권한 배지 추가 가능

### 3. Name
- 사용자 이름 표시
- 번역 키: `profile.defaultName`
- 폰트: text-xs, font-semibold

### 4. UserProfileInfo
- 사용자 이름 + 직책
- 번역 키: `profile.defaultName`, `profile.defaultTitle`
- 레이아웃: 세로 방향 flex

### 5. ProfileField
- 전체 프로필 필드 (이미지 + 정보)
- UserProfileImage + UserProfileInfo 조합
- 패딩: p-1 (4px)

## 💡 사용 예시

```tsx
import { ProfileField } from "../components/layout/common/SideNavProfileComponents";

function MySideNav() {
  return (
    <div>
      <ProfileField />
      {/* 나머지 네비게이션 항목들 */}
    </div>
  );
}
```

## 🔗 사용 위치

1. `/imports/SideNavContainerExpandedSmallWithClose.tsx` (확장형 사이드바)
2. `/imports/SideNavContainerReducedSmallWithClose.tsx` (축소형 사이드바)

## ⚠️ 중요 사항

- **피그마 import 파일 연동**: 이 컴포넌트들은 원래 피그마에서 import된 컴포넌트를 분리한 것입니다
- **스타일 변경 시 주의**: 스타일을 변경하면 확장형과 축소형 사이드바 모두에 영향을 줍니다
- **번역 시스템**: 모든 텍스트는 `useLanguage()` 훅을 통해 다국어 지원

## 📊 개선 효과

| 항목 | Before | After |
|------|--------|-------|
| 중복 코드 | ~120줄 | 0줄 |
| 파일 수 | 2개 (중복) | 1개 (공유) |
| 유지보수 | 2곳 수정 필요 | 1곳만 수정 |

---

**최종 업데이트**: 2025-11-15  
**작성자**: AI Assistant
