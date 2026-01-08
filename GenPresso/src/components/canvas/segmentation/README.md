# 세그먼테이션 시스템

이미지를 여러 영역으로 분할하고 편집·합성하는 시스템입니다.

## 📦 컴포넌트 구조

```
segmentation/
├── SegmentationPanel.tsx      # 메인 패널 (Viewer ↔ Preview 모드 관리)
├── SegmentViewer.tsx           # 세그먼트 뷰어 (원본 이미지 + SVG 오버레이)
├── SegmentListItem.tsx         # 세그먼트 리스트 아이템 (드래그 앤 드롭)
├── SegmentProperties.tsx       # 세그먼트 속성 패널 (이름/프롬프트 편집)
├── PreviewCanvas.tsx           # 임시작업대 (드래그/스냅/변형)
├── DetailEditTab.tsx           # 세부편집 탭 (향후)
├── SegmentGallery.tsx          # 세그먼트 갤러리 (향후)
├── types.ts                    # 타입 정의
├── utils.ts                    # 유틸리티 함수
├── ARCHITECTURE.md             # 상세 설계 문서
└── README.md                   # 이 파일
```

## 🚀 빠른 시작

### 1. 패널 열기

```tsx
import { SegmentationPanel } from './components/canvas/segmentation';

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        세그먼테이션 열기
      </button>

      <SegmentationPanel
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        sourceImageUrl="https://..."
      />
    </>
  );
}
```

### 2. 워크플로우

1. **Viewer 모드**: 세그먼트 선택 및 편집
   - 좌측: 세그먼트 리스트
   - 중앙: 원본 이미지 + 선택 영역 표시
   - 우측: 속성 편집 (이름/프롬프트)

2. **Preview 모드**: 임시작업대에서 배치 및 변형
   - 드래그 앤 드롭으로 자유롭게 배치
   - 그리드 스냅 (10px 단위)
   - Opacity/Scale/Rotation 조정
   - Attach/Replace 모드 전환

3. **Mix Node 생성**: 캔버스로 복귀
   - 모든 레이어를 하나의 Mix Node로 합성
   - 캔버스에 자동 추가 (TODO)

## 🎨 주요 기능

### Viewer 모드
- ✅ 세그먼트 클릭 선택 (Shift/Cmd로 다중 선택)
- ✅ 호버 시 하이라이트 (점선 테두리)
- ✅ 선택 시 파란색 영역 표시 (30% 투명도)
- ✅ 이름 inline 편집
- ✅ 즐겨찾기 토글
- ✅ 드래그 앤 드롭으로 레이어 순서 변경

### Preview Canvas
- ✅ 10px 그리드 배경 (5% 투명도)
- ✅ 스냅 기능 (ON/OFF 토글)
- ✅ 드래그 중 십자선 가이드 (60% 투명도)
- ✅ Opacity 슬라이더 (0-100%)
- ✅ Scale 슬라이더 (10-200%)
- ✅ Rotation 슬라이더 (0-360°, 15° 단위)
- ✅ Floating 버튼 (복제/삭제)
- ✅ Attach/Replace 모드 배지
- ✅ 레이어 리스트 (썸네일 + Z-index + Opacity)
- ✅ "뷰어로 돌아가기" 버튼
- ✅ "Mix Node 생성 (N개)" 버튼

## 📋 타입 정의

```typescript
interface Segment {
  id: string;
  name: string;
  thumbnailUrl: string;
  maskUrl: string;
  bounds: { x, y, width, height };
  layer: number;
  prompt?: string;
  isFavorite?: boolean;
}

interface PreviewItem {
  id: string;
  segmentId: string;
  position: { x, y };
  scale: number;
  rotation: number;
  opacity: number;
  zIndex: number;
  mode: 'attach' | 'replace';
}

interface SegmentationData {
  id: string;
  sourceImageUrl: string;
  segments: Segment[];
  createdAt: string;
}

type SegmentationMode = 'viewer' | 'preview' | 'detail';
```

## 🛠️ 유틸리티 함수

```typescript
// 모의 세그먼테이션 생성 (AI 연동 전)
mockSegmentation(sourceImageUrl?: string): SegmentationData

// 세그먼트 → 프리뷰 아이템 변환
segmentToPreviewItem(segment: Segment, mode: 'attach' | 'replace'): PreviewItem

// 좌표 그리드 스냅 (기본 10px)
snapToGrid(x: number, y: number, gridSize: number = 10): { x, y }
```

## 🎯 디자인 가이드

### 크기 및 간격
- 패딩: `px-12 py-4` (모든 패널 통일)
- 폰트: `text-xs` (12px) 최소 크기
- 버튼: `w-7 h-7` (28px)
- 아이콘: `w-4 h-4` (16px)
- 썸네일: `w-11 h-11` (44px)
- 간격: `gap-2` (8px)
- 곡률: `rounded-2xl` (16px)

### 색상 및 스타일
- 테두리: `border-[0.5px]` + `var(--color-glass-border)`
- 배경: `var(--color-glass-bg)` (글래스모피즘)
- 블러: `blur(var(--blur-glass))` (12px)
- 그림자: `var(--glass-shadow)` (라이트/다크모드 자동 대응)

## 📚 참고 문서

- **상세 설계**: [ARCHITECTURE.md](./ARCHITECTURE.md)
- **타입 정의**: [types.ts](./types.ts)
- **유틸리티**: [utils.ts](./utils.ts)
- **시나리오 템플릿**: [scenario-templates.ts](../scenario-templates.ts)

## 🚧 TODO

- [ ] Mix Node 생성 시 캔버스에 노드 추가
- [ ] DetailEditTab 통합
- [ ] 실제 AI 세그먼테이션 API 연동
- [ ] SegmentNode 컴포넌트 생성
- [ ] MixNode 컴포넌트 생성
- [ ] 컨텍스트 메뉴 확장
- [ ] 세그먼트 DB 및 갤러리
- [ ] 탭 시스템

## 📅 업데이트 로그

- **2025-11-03**: Preview Canvas 완전 구현, Viewer ↔ Preview 모드 전환 완성
- **2025-11-02**: SegmentationPanel, Viewer, Properties 완성
- **2025-11-01**: 프로젝트 시작, 타입 정의, 기본 구조 설계
