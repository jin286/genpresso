# 세그먼테이션 시스템 아키텍처

## 📐 시스템 개요

젠프레소 세그먼테이션 시스템은 **두 가지 방식**으로 작동합니다:

### 1. 별도 패널 방식 (SegmentationPanel)
**위치**: 좌측 하단 세그먼트 버튼 → 전체화면 패널

**장점**:
- 독립적인 작업 공간
- 세그먼트 목록, 뷰어, 속성 패널을 한눈에 확인
- 초보자에게 직관적

**단점**:
- 캔버스와 분리되어 작업 흐름이 끊김
- 결과를 캔버스로 가져오는 과정이 필요

### 2. 캔버스 노드 통합 방식 (Segmentation Workflow)
**위치**: 메인 페이지 이어하기 섹션 → "08. Segmentation Workflow"

**장점**:
- 캔버스 내부에서 모든 작업 완료
- 노드 연결로 워크플로우 시각화
- 히스토리 관리 및 버전 관리 용이

**단점**:
- 초기 학습 곡선
- 복잡한 세그먼테이션은 관리가 어려움

---

## 🏗️ 캔버스 노드 통합 방식 상세 설계

### 노드 타입 확장 필요

현재 노드 타입: `'text' | 'image' | 'video' | 'upload' | 'process'`

추가 필요:
- `'segment'`: 세그먼트 노드 (개별 영역)
- `'mix'`: Mix Node (합성 노드)

### 노드 메타데이터 구조

#### 1. 원본 이미지 노드 (Segmented Source)

```typescript
{
  id: 'node-source',
  type: 'image',
  imageUrl: 'https://...',
  metadata: {
    model: 'imagen3',
    isSegmented: true,              // ✅ 세그먼테이션 완료 플래그
    segmentationId: 'seg-001',      // 세그먼테이션 그룹 ID
  }
}
```

#### 2. 세그먼트 노드 (Segment)

```typescript
{
  id: 'node-segment-1',
  type: 'image', // 향후 'segment'로 변경
  imageUrl: 'https://...',
  metadata: {
    segmentId: 'segment-1',         // 세그먼트 고유 ID
    segmentName: '소파 영역',       // 사용자 정의 이름
    segmentationId: 'seg-001',      // 부모 세그먼테이션 ID
    bounds: {                        // 원본 이미지에서의 영역
      x: 50,
      y: 150,
      width: 300,
      height: 200
    },
    layer: 1,                        // 레이어 순서 (z-index)
    maskUrl: 'https://...',         // 마스크 이미지 (알파 채널)
  }
}
```

#### 3. Mix Node (합성 노드)

```typescript
{
  id: 'node-mix',
  type: 'text', // 향후 'mix'로 변경
  content: '세그먼트 합성: ...',
  metadata: {
    isMixNode: true,                 // ✅ Mix Node 플래그
    mixMode: 'mix' | 'replace',      // 합성 모드
    mixConfig: {
      segments: [
        {
          segmentId: 'segment-1',
          prompt: '파란색 소파',     // 세그먼트별 프롬프트
          opacity: 100,               // 투명도 (0-100)
          transform: {                // 변환 (선택)
            scale: 1,
            rotation: 0,
            position: { x: 0, y: 0 }
          }
        },
        // ...
      ]
    }
  }
}
```

#### 4. 결과 이미지 노드 (Composited Result)

```typescript
{
  id: 'node-result',
  type: 'image',
  imageUrl: 'https://...',
  metadata: {
    isComposited: true,              // ✅ 합성 결과 플래그
    compositedFrom: [                // 소스 세그먼트 ID 배열
      'node-segment-1',
      'node-segment-2',
      'node-segment-3'
    ],
    mixNodeId: 'node-mix',           // Mix Node 참조
    detailEditTabId: 'tab-001',      // 세부 편집 탭 ID
  }
}
```

---

## 🔗 노드 연결 구조 (Edges)

```typescript
// 원본 → 세그먼트들
{ sourceId: 'node-source', targetId: 'node-segment-1' }
{ sourceId: 'node-source', targetId: 'node-segment-2' }
{ sourceId: 'node-source', targetId: 'node-segment-3' }

// 세그먼트들 → Mix Node
{ sourceId: 'node-segment-1', targetId: 'node-mix' }
{ sourceId: 'node-segment-2', targetId: 'node-mix' }
{ sourceId: 'node-segment-3', targetId: 'node-mix' }

// Mix Node → 결과
{ sourceId: 'node-mix', targetId: 'node-result' }
```

---

## 🎨 UI/UX 플로우

### A. 이미지 세그먼테이션 시작

1. 사용자가 이미지 노드 우클릭
2. 컨텍스트 메뉴에서 "세그먼테이션" 선택
3. AI가 자동으로 영역 분할 (백엔드 API 호출)
4. 세그먼트 노드들이 자동 생성되어 캔버스에 배치

### B. 세그먼트 편집

1. 세그먼트 노드 클릭
2. 우측 FloatingToolbar에서 프롬프트 수정
3. 투명도, 위치, 크기 조정

### C. Mix Node 생성

1. 여러 세그먼트 노드 선택 (Shift + 클릭)
2. 우클릭 → "Mix Node 생성"
3. Mix Node가 자동 생성되고 연결됨
4. Mix Node에서 전체 합성 프롬프트 입력

### D. 결과 생성

1. Mix Node에서 "생성" 버튼 클릭
2. Process 노드로 전환 (로딩 애니메이션)
3. 생성 완료 시 결과 이미지 노드 자동 생성

### E. 세부 편집 탭

1. 결과 이미지 노드 클릭
2. 상단 TopToolbar에 "세부 편집" 버튼 표시
3. 클릭 시 새 탭 자동 생성 (브라우저 탭 아님, 캔버스 탭)
4. DetailEditTab 컴포넌트 렌더링
5. 수정 후 저장 → 기존 캔버스로 복귀

---

## 🔧 향후 구현 계획

### Phase 1: 노드 타입 확장
- [ ] `NodeType`에 `'segment'`, `'mix'` 추가
- [ ] SegmentNode 컴포넌트 생성
- [ ] MixNode 컴포넌트 생성

### Phase 2: 컨텍스트 메뉴 확장
- [ ] 이미지 노드 우클릭 시 "세그먼테이션" 옵션 추가
- [ ] 세그먼트 노드 다중 선택 시 "Mix Node 생성" 옵션 추가

### Phase 3: 백엔드 API 연동
- [ ] `/api/segmentation` 엔드포인트 (AI 모델)
- [ ] `/api/mix` 엔드포인트 (합성)
- [ ] 마스크 이미지 생성 및 저장

### Phase 4: 탭 시스템
- [ ] 캔버스 탭 관리 시스템 구현
- [ ] DetailEditTab 자동 생성 로직
- [ ] 탭 간 전환 및 히스토리 관리

### Phase 5: 세그먼트 DB 및 갤러리
- [ ] 세그먼트 라이브러리 (My Parts)
- [ ] 세그먼트 검색 및 필터
- [ ] 세그먼트 재사용 기능

---

## 📊 데이터 플로우

```
사용자 입력 (이미지 노드)
    ↓
AI 세그먼테이션 API
    ↓
세그먼트 데이터 생성
    ↓
캔버스에 노드 자동 배치
    ↓
사용자 편집 (프롬프트, 투명도)
    ↓
Mix Node 생성
    ↓
AI 합성 API
    ↓
결과 이미지 생성
    ↓
세부 편집 탭 (선택)
    ↓
최종 저장
```

---

## 🎯 현재 구현 상태

✅ **완료:**
- SegmentationPanel 컴포넌트 (별도 패널 방식)
- SegmentationViewer, SegmentList, SegmentProperties
- PreviewCanvas (완전 구현), DetailEditTab
- **Preview 모드 전환 시스템** (Viewer ↔ Preview)
- **"Preview 보내기" 버튼 연결**
- **PreviewItem 상태 관리 (추가/수정/삭제)**
- **segmentToPreviewItem 유틸리티 함수**

---

## 🎯 전체 워크플로우 (완성)

### 1단계: Viewer 모드 (세그먼트 선택)
1. SegmentationPanel 열기
2. 좌측 리스트 또는 캔버스에서 세그먼트 선택
   - 단일 클릭: 토글
   - Shift + 클릭: 범위 선택
   - Cmd/Ctrl + 클릭: 다중 선택
3. 우측 속성 패널에서 이름/프롬프트 편집
4. **"Preview 보내기 (N개)" 버튼 클릭**

### 2단계: Preview 모드 (임시작업대)
1. 자동으로 PreviewCanvas로 전환
2. 세그먼트를 드래그하여 자유롭게 배치
3. 그리드/스냅 토글로 정밀 배치 (10px 단위)
4. 우측 패널에서 Opacity/Scale/Rotation 조정
5. Attach/Replace 모드 전환
6. Floating 버튼으로 복제/삭제
7. **"Mix Node 생성 (N개)" 버튼 클릭**

### 3단계: Mix Node 생성 (캔버스 복귀)
1. 모든 레이어를 하나의 Mix Node로 합성
2. 캔버스에 자동 추가 (TODO: 구현 필요)
3. SegmentationPanel 닫기
4. 토스트 알림: "Mix Node 생성: N개 레이어 합성"

### 구현 완료 체크리스트
- [x] SegmentationPanel 메인 구조
- [x] SegmentViewer (뷰어)
- [x] SegmentList (리스트)
- [x] SegmentProperties (속성)
- [x] PreviewCanvas (임시작업대) - 완전 구현
- [x] **Preview 모드 전환 (mode state 관리)**
- [x] **"Preview 보내기" 버튼 연결 (handleSendToPreview)**
- [x] **PreviewItem 상태 관리 (previewItems state)**
- [x] **드래그 앤 드롭 배치**
- [x] **그리드/스냅 시스템 (10px 단위)**
- [x] **Opacity/Scale/Rotation 조정**
- [x] **Floating 버튼 (복제/삭제)**
- [x] **Attach/Replace 모드 전환**
- [x] **"뷰어로 돌아가기" 버튼**
- [ ] **Mix Node 생성 시 캔버스에 노드 추가 (TODO: handleCreateMixNode 구현)**
- [ ] DetailEditTab 통합 (향후)
- [ ] 실제 AI 세그먼테이션 API 연동 (향후)

---

## 🎨 Preview Canvas 상세 설명

### 개요
Preview Canvas는 세그먼트를 자유롭게 배치·편집하여 합성 프리뷰를 만드는 **임시작업대**입니다.

### 핵심 기능

#### 1. 드래그 앤 드롭
- 세그먼트를 마우스로 자유롭게 이동
- 드래그 중 실시간 위치 업데이트
- 드래그 시작 시 자동 선택

#### 2. 그리드 시스템
- **10px 그리드 패턴**: 배경에 은은한 그리드 표시 (5% 투명도)
- **그리드 토글**: 우하단 버튼으로 ON/OFF
- **스냅 기능**: 10px 단위로 좌표 자동 정렬
- **스냅 가이드**: 드래그 중 십자선으로 스냅 위치 표시 (60% 투명도)
- **스냅 토글**: 우하단 버튼으로 ON/OFF, 완료 시 토스트 알림

#### 3. Attach / Replace 모드
- **Attach (붙이기)**: 기존 이미지 위에 얹어 합성, Opacity/Blend 지원
- **Replace (교체)**: 같은 카테고리면 교체, 이전 버전은 히스토리 보관
- 우측 패널에서 버튼으로 전환
- 선택된 아이템 위에 모드 배지 표시 (파란색/주황색)

#### 4. 변형 컨트롤
- **Opacity**: 0-100% (슬라이더)
- **Scale**: 10-200% (슬라이더)
- **Rotation**: 0-360° (15° 단위 슬라이더)
  - 초기화 버튼으로 0°로 리셋

#### 5. Floating 버튼
- 각 PreviewItem 위에 호버 또는 선택 시 표시
- **복제 버튼**: 20px 오프셋으로 복제
- **삭제 버튼**: 즉시 삭제
- 드래그 중에는 숨김

#### 6. 레이어 관리
- 우측 패널에 레이어 리스트 표시
- 썸네일 + 이름 + Z-index + Opacity 정보
- 클릭으로 레이어 선택
- 선택된 레이어는 primary 테두리 표시

#### 7. 캔버스 모드
- **일반 모드**: 일반 이미지 작업
- **세그먼트 모드**: 세그먼트 작업 (SegmentButton)
- **믹스 모드**: 합성 작업
- 좌하단 버튼으로 전환

#### 8. Mix Node 생성
- 우측 패널 하단 "Mix Node 생성" 버튼
- 레이어가 0개일 때 비활성화
- 클릭 시 모든 레이어를 하나의 Mix Node로 합성
- 레이어 개수 표시 (예: "Mix Node 생성 (3개)")

### 타입 정의

```typescript
interface PreviewItem {
  id: string;
  segmentId: string;
  position: { x: number; y: number };
  scale: number;
  rotation: number;    // ✅ 회전 각도 (0-360°)
  opacity: number;
  zIndex: number;
  mode: 'attach' | 'replace';  // ✅ 작업 모드
}
```

### Props

```typescript
interface PreviewCanvasProps {
  segmentationData: SegmentationData;
  previewItems: PreviewItem[];
  canvasMode: 'normal' | 'segment' | 'mix';
  attachMode: 'attach' | 'replace';
  onCanvasModeChange: (mode) => void;
  onAttachModeChange: (mode) => void;
  onPreviewItemUpdate: (itemId, updates) => void;
  onPreviewItemAdd: (item) => void;          // ✅ 복제 전용
  onPreviewItemDelete: (itemId) => void;
  onBackToViewer: () => void;
  onCreateMixNode: () => void;
  onClose: () => void;
}
```

### 유틸리티 함수

```typescript
// 그리드 스냅
snapToGrid(x: number, y: number, gridSize: number = 10): { x, y }

// 세그먼트 → 프리뷰 아이템 변환
segmentToPreviewItem(segment: Segment, mode: 'attach' | 'replace'): PreviewItem
```

### 사용 예시

```tsx
import { PreviewCanvas } from './segmentation';
import { segmentToPreviewItem } from './segmentation/utils';

const [previewItems, setPreviewItems] = useState<PreviewItem[]>([]);
const [attachMode, setAttachMode] = useState<'attach' | 'replace'>('attach');

// 세그먼트 → 프리뷰 추가
const handleSendToPreview = (segment: Segment) => {
  const item = segmentToPreviewItem(segment, attachMode);
  setPreviewItems(prev => [...prev, item]);
};

// PreviewItem 업데이트
const handleItemUpdate = (itemId: string, updates: Partial<PreviewItem>) => {
  setPreviewItems(prev =>
    prev.map(item => item.id === itemId ? { ...item, ...updates } : item)
  );
};

// PreviewItem 추가 (복제용)
const handleItemAdd = (item: PreviewItem) => {
  setPreviewItems(prev => [...prev, item]);
};

// PreviewItem 삭제
const handleItemDelete = (itemId: string) => {
  setPreviewItems(prev => prev.filter(item => item.id !== itemId));
};

<PreviewCanvas
  segmentationData={segmentationData}
  previewItems={previewItems}
  canvasMode="segment"
  attachMode={attachMode}
  onCanvasModeChange={setCanvasMode}
  onAttachModeChange={setAttachMode}
  onPreviewItemUpdate={handleItemUpdate}
  onPreviewItemAdd={handleItemAdd}
  onPreviewItemDelete={handleItemDelete}
  onBackToViewer={() => setMode('viewer')}
  onCreateMixNode={() => {
    // Mix Node 생성 로직
    console.log('Creating Mix Node with', previewItems.length, 'layers');
  }}
  onClose={onClose}
/>
```

### UI 레이아웃

```
┌─────────────────────────────────────────────────────────┐
│ [← 뷰어로]  Preview Canvas · 3개 레이어       [X]      │
├─────────────────────────────────────────┬───────────────┤
│                                         │ 작업 모드     │
│        🖼️ Canvas (10px 그리드)         │ [Attach] [Replace] │
│                                         ├───────────────┤
│  ┌─────────┐  ┌─────────┐              │ Opacity: 80%  │
│  │[복][삭]│  │[복][삭]│              │ ▬▬▬▬▬○▬▬▬   │
│  │ Seg 1  │  │ Seg 2  │              │               │
│  │ Attach │  │ Replace│              │ Scale: 120%   │
│  └─────────┘  └─────────┘              │ ▬▬▬▬▬▬○▬▬   │
│                                         │               │
│  + 스냅 가이드 (십자선)                 │ Rotation: 45° │
│                                         │ ▬▬▬○▬▬▬▬▬   │
│                                         │ [🔄 초기화]   │
│                                         ├───────────────┤
│ [일반] [세그먼트] [믹스]    [그리드] [스냅] │ [복제] [삭제] │
│                                         ├───────────────┤
│                                         │ 레이어 (3)    │
│                                         │ ┌───────────┐ │
│                                         │ │▪ Seg 1    │ │
│                                         │ │Z:1 · 80%  │ │
│                                         │ └───────────┘ │
│                                         │ ┌───────────┐ │
│                                         │ │▪ Seg 2    │ │
│                                         │ │Z:2 · 100% │ │
│                                         │ └───────────┘ │
│                                         ├───────────────┤
│                                         │ [Mix Node 생성]│
│                                         │ (3개)         │
└─────────────────────────────────────────┴───────────────┘
```

### 최적화 사항
- ✅ 그리드 투명도: 10% → 5% (더 은은하게)
- ✅ 스냅 토스트: 드래그 중 계속 발생 → 드래그 완료 시 1회만
- ✅ 복제 함수: `onPreviewItemUpdate` → `onPreviewItemAdd` (전용 함수)
- ✅ Floating 버튼: 호버/선택 시 표시, 드래그 중 숨김
- ✅ 회전 슬라이더: 15° 단위, 초기화 버튼 추가
- ✅ Mix Node 버튼: 레이어 0개 시 비활성화, 개수 표시
- ✅ 스냅 가이드: 드래그 중에만 십자선 표시 (60% 투명도)
- 타입 시스템 (types.ts, utils.ts)
- Segmentation Workflow 시나리오 템플릿

⚠️ **진행 중:**
- 노드 메타데이터 구조 설계 (문서화 완료)
- UX 플로우 정의 (문서화 완료)

❌ **미완료:**
- 캔버스 노드 통합 (SegmentNode, MixNode)
- 컨텍스트 메뉴 확장
- AI 백엔드 연동
- 탭 시스템
- 세그먼트 DB

---

## 🤝 통합 전략

두 가지 방식을 모두 유지하되, 최종적으로는 **캔버스 노드 통합 방식**으로 수렴:

1. **초보자**: SegmentationPanel 사용 (간단하고 직관적)
2. **고급 사용자**: 캔버스 노드 방식 (복잡한 워크플로우)
3. **통합**: SegmentationPanel에서 작업 완료 시 → "캔버스에 추가" 버튼 클릭 → 노드로 자동 변환

---

## 📝 참고 이미지 (제공된 UX 프레임)

1. **Mix Node + 프롬프트 수정**
   - Mix Node에서 세그먼트별 프롬프트 수정 가능
   - Segmented part의 투명도 50% 조정

2. **전체 워크플로우**
   - 디자인 1 → 세그먼트 추출 → 합성 문법 UX → 디자인 2
   - Segment DB 구조 필요
   - 전용 갤러리 시스템

3. **세부 편집 탭 자동 생성**
   - 합성 개체 선택 → 세션바 클릭
   - 세부편집용 new tab 자동 생성
   - 선택 개체 및 mix node 자동 생성
   - 생성 후 기존 캔버스로 복귀
   - 생성된 이미지 선택 시 해당 tab으로 이동

---

## 🚀 다음 단계

**우선순위 1 (높음):**
- [ ] MixNode 컴포넌트 생성 (TextNode 기반)
- [ ] 노드 메타데이터 표시 (isMixNode, mixConfig)
- [ ] 컨텍스트 메뉴에 세그먼테이션 옵션 추가

**우선순위 2 (중간):**
- [ ] 세그먼트 자동 배치 알고리즘
- [ ] Mix Node 프롬프트 편집 UI
- [ ] 투명도 슬라이더 추가

**우선순위 3 (낮음):**
- [ ] 탭 시스템 프로토타입
- [ ] 세그먼트 갤러리 UI
- [ ] AI 백엔드 목업

---

## 📅 타임라인

- **2025-11-03 (오늘)**: 시스템 설계 완료 ✅
- **2025-11-05**: MixNode 컴포넌트 구현
- **2025-11-07**: 컨텍스트 메뉴 확장
- **2025-11-10**: 세그먼트 자동 배치
- **2025-11-15**: 탭 시스템 프로토타입
- **2025-11-20**: 백엔드 목업 및 테스트
- **2025-11-25**: 전체 통합 및 QA

**최종 마감일: 2025년 10월 29일** (이미 지남 → 조정 필요)
