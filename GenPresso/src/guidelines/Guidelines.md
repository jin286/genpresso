# UI 시스템 가이드라인

## 다국어 시스템 (Internationalization)

### 개요
* **지원 언어**: 한국어(ko), 영어(en), 일본어(ja)
* **구현 방식**: React Context + TypeScript 번역 파일
* **자동 번역**: 언어 변경 시 전체 앱 실시간 번역

### 파일 구조
```
/locales/
  ├── ko.ts    # 한국어 번역 (export default {...})
  ├── en.ts    # 영어 번역 (export default {...})
  └── ja.ts    # 일본어 번역 (export default {...})

/contexts/
  └── LanguageContext.tsx  # 언어 Context
```

### 번역 파일 형식 (중요!)
* **파일 확장자**: `.ts` (TypeScript)
* **Export 방식**: 단순한 `export default` 객체 직접 export
* **✅ 유일하게 작동하는 패턴**:
  ```typescript
  export default {
    common: {
      cancel: "취소",
      save: "저장"
    },
    credit: {
      management: "크레딧 관리",
      managementDescription: "크레딧을 충전하고 충전 내역을 확인할 수 있습니다."
    }
  };
  ```
* **❌ 금지 패턴**:
  - `const translations = {...}; export default translations;` (빈 객체로 변환됨)
  - `export default {...} as const;` (readonly 문제)
  - JSON 파일 (빌드 시스템이 지원하지 않음)
* **Import 방식**:
  ```typescript
  import koTranslations from '../locales/ko';
  import enTranslations from '../locales/en';
  import jaTranslations from '../locales/ja';
  ```
* **중요**: 반드시 `export default { ... };` 패턴만 사용

### 사용 방법

#### 1. Context Hook 사용
```tsx
import { useLanguage } from '../../contexts/LanguageContext';

function MyComponent() {
  const { language, setLanguage, t } = useLanguage();
  
  return (
    <div>
      <h1>{t('common.title')}</h1>
      <p>{t('common.description')}</p>
      <button onClick={() => setLanguage('en')}>
        {t('settings.language')}
      </button>
    </div>
  );
}
```

#### 2. 매개변수가 있는 번역
```tsx
// JSON: "greeting": "안녕하세요, {{name}}님!"
{t('common.greeting', { name: '홍길동' })}
// 결과: "안녕하세요, 홍길동님!"

// JSON: "nodeCount": "{{count}}개 노드"
{t('group.membersCount', { count: 5 })}
// 결과: "5개 노드"
```

#### 3. 중첩된 키 사용
```tsx
// JSON 구조:
// {
//   "group": {
//     "create": "새 그룹 만들기",
//     "edit": "그룹 편집"
//   }
// }

{t('group.create')}  // "새 그룹 만들기"
{t('group.edit')}    // "그룹 편집"
```

### 번역 키 네이밍 규칙

#### 카테고리별 분류
```typescript
common.*        // 공통 용어 (save, cancel, delete 등)
nav.*           // 네비게이션
settings.*      // 설정
group.*         // 그룹 관련
node.*          // 노드 관련
canvas.*        // 캔버스
agent.*         // AI 에이전트
help.*          // 도움말
project.*       // 프로젝트
gallery.*       // 갤러리
member.*        // 멤버
subscription.*  // 구독
credit.*        // 크레딧
workspace.*     // 워크스페이스
upload.*        // 업로드
model.*         // 모델
notification.*  // 알림
share.*         // 공유
error.*         // 에러
```

#### 네이밍 컨벤션
```tsx
// ✅ 권장 (명확하고 계층적)
t('group.create')           // "새 그룹 만들기"
t('group.deleteConfirm')    // "그룹을 삭제하시겠습니까?"
t('node.types.image')       // "이미지"
t('settings.language')      // "언어"

// ❌ 금지 (모호하고 평면적)
t('create')                 // 무엇을 생성?
t('confirm')                // 무엇을 확인?
t('image')                  // 어디서 사용?
```

### 언어 변경 플로우

1. **설정 패널에서 언어 선택**
   ```tsx
   <Select value={language} onValueChange={(value) => setLanguage(value)}>
     <SelectItem value="ko">한국어</SelectItem>
     <SelectItem value="en">English</SelectItem>
     <SelectItem value="ja">日本語</SelectItem>
   </Select>
   ```

2. **LocalStorage에 자동 저장**
   - 키: `'language'`
   - 값: `'ko'` | `'en'` | `'ja'`

3. **전체 앱 자동 번역**
   - Context가 변경을 감지
   - 모든 `t()` 함수 호출이 새 언어로 업데이트
   - React 리렌더링으로 UI 즉시 반영

### 새 컴포넌트 다국어 처리

#### 필수 단계
1. **useLanguage Hook import**
   ```tsx
   import { useLanguage } from '../../contexts/LanguageContext';
   ```

2. **Hook 사용**
   ```tsx
   const { t } = useLanguage();
   ```

3. **하드코딩된 텍스트 → 번역 키로 변경**
   ```tsx
   // ❌ Before
   <h1>설정</h1>
   <p>프로필을 편집하세요</p>
   
   // ✅ After
   <h1>{t('settings.title')}</h1>
   <p>{t('settings.editProfile')}</p>
   ```

4. **번역 JSON 파일에 키 추가**
   ```json
   // ko.json
   {
     "settings": {
       "title": "설정",
       "editProfile": "프로필을 편집하세요"
     }
   }
   
   // en.json
   {
     "settings": {
       "title": "Settings",
       "editProfile": "Edit your profile"
     }
   }
   
   // ja.json
   {
     "settings": {
       "title": "設定",
       "editProfile": "プロフィールを編集"
     }
   }
   ```

### Toast 메시지 다국어 처리

```tsx
// ❌ Before
toast.success('그룹이 생성되었습니다');
toast.error('그룹 이름을 입력해주세요');

// ✅ After
toast.success(t('group.createSuccess'));
toast.error(t('group.nameRequired'));
```

### 중요 원칙

* ✅ **모든 사용자 표시 텍스트는 번역 키 사용**
* ✅ **하드코딩된 한국어/영어 텍스트 절대 금지**
* ✅ **새 기능 추가 시 3개 언어 번역 동시 추가**
* ✅ **번역 키는 명확하고 계층적으로**
* ✅ **Toast 메시지도 다국어 처리 필수**
* ⚠️ **콘솔 로그, 개발자 메시지는 예외**
* ⚠️ **API 요청 페이로드는 서버 정책 따름**

### 번역 추가 체크리스트

새 컴포넌트/기능 추가 시:
- [ ] useLanguage Hook import
- [ ] 모든 UI 텍스트를 t() 함수로 감싸기
- [ ] ko.json에 한국어 번역 추가
- [ ] en.json에 영어 번역 추가
- [ ] ja.json에 일본어 번역 추가
- [ ] Toast 메시지 다국어 처리
- [ ] 플레이스홀더 텍스트 다국어 처리
- [ ] 에러 메시지 다국어 처리

---

## 폰트 시스템

### Pretendard 폰트 패밀리
* **기본 폰트**: Pretendard (한국어 최적화)
* **폴백 폰트**: system-ui → -apple-system → BlinkMacSystemFont → Roboto → 'Helvetica Neue' → 'Segoe UI' → 'Noto Sans KR' → sans-serif
* **CDN**: `https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css`
* **적용 범위**: 모든 텍스트 요소 (body, h1-h6, p, span, button, input 등)
* **렌더링 최적화**: 
  - `-webkit-font-smoothing: antialiased`
  - `-moz-osx-font-smoothing: grayscale`

### 타이포그래피 스케일
* **기본 크기**: 16px (1rem)
* **최소 크기**: 12px (0.75rem) - `text-xs` (일반 UI용)
* **예외 크기**: 10px - 노드 내부 보조 정보 전용 (`NODE_TEXT.XXS`)
* **제목**: 600 font-weight (semibold)
* **본문**: 400 font-weight (regular)

### CSS 변수
```css
--font-family: 'Pretendard', ...
--font-size-base: 16px
--text-xxs: 10px  /* 노드 내부 보조 정보 전용 */
```

### 사용 방법
```tsx
// ✅ 권장 (Tailwind 클래스)
<span className="text-xs">   // 12px (일반 UI)
<span className="text-sm">   // 14px
<span className="text-base"> // 16px
<span className="text-lg">   // 18px

// ✅ 노드 내부 보조 정보 (node-styles.ts)
import { NODE_TEXT } from './node-styles';
<span className={NODE_TEXT.XXS}>  // 10px
<span className={NODE_TEXT.XS}>   // 12px

// ❌ 금지 (하드코딩)
<span className="text-[9px]">
<span className="text-[10px]">  // 대신 NODE_TEXT.XXS 사용
<span style={{ fontSize: '10px' }}>  // 대신 NODE_TEXT.XXS 사용
```

### 중요 원칙
* ⚠️ **9px, 11px 같은 비표준 폰트 크기 절대 사용 금지**
* ✅ **10px는 노드 내부 보조 정보 전용** (nodeName, 퍼센트, 레이블 등)
* ✅ **일반 UI는 최소 12px** (text-xs) 사용
* ✅ **노드 컴포넌트는 NODE_TEXT.XXS 상수 사용** (하드코딩 금지)
* ✅ **Pretendard 폰트 자동 적용** (별도 지정 불필요)

---

## 아이콘 및 버튼 표준 크기

### 아이콘 크기
* **표준 크기**: 20px × 20px (`w-5 h-5`)
* **모든 아이콘 통일**: 좌측 도구, 상단 도구, 네비게이션 모두 20px
* **사용 방법**:
  ```tsx
  // ✅ 권장 (Tailwind 클래스)
  <Icon className="w-5 h-5" />
  
  // ❌ 금지 (하드코딩)
  <Icon className="w-4 h-4" />
  <Icon className="w-[16px] h-[16px]" />
  ```

### 버튼 크기
* **표준 크기**: 44px × 44px (`w-11 h-11`)
* **최소 터치 타겟**: 44px (모바일 접근성)
* **사용 방법**:
  ```tsx
  // ✅ 권장 (Tailwind 클래스)
  <button className="w-11 h-11">
  
  // ❌ 금지 (하드코딩)
  <button className="w-[50px] h-[50px]">
  <button className="w-[44px] h-[44px]">
  ```

### 간격 시스템
* **버튼 간격**: `gap-1.5` (6px) - Tailwind 클래스
* **패딩**: `py-2 px-1` (상하 8px, 좌우 4px) - Tailwind 클래스
* **곡률**: `rounded-lg` (12px) - Tailwind 클래스
* ⚠️ **하드코딩 금지**: `gap-[7px]`, `py-[7px]`, `rounded-[10px]` 등

### CSS 유틸리티 클래스
```css
.icon-standard {
  width: 20px;
  height: 20px;
}

.button-standard {
  min-width: 44px;
  min-height: 44px;
}
```

---

## 배경 디자인 시스템

### 그림자 시스템
* **CSS 변수 사용**: `var(--glass-shadow)` - 라이트/다크모드 자동 대응
* **라이트모드**: `0px 2px 12px 0px rgba(0, 0, 0, 0.1)` 
  - 부드럽고 은은한 그림자
  - 과하지 않은 적당한 depth
  - 메인 캔버스와 동일한 세련된 그림자
* **다크모드**: `0px 4px 4px 0px rgba(0, 0, 0, 0.25)`
  - 더 짙고 명확한 그림자
  - 어두운 배경에서 레이어 구분
* **중요**: 
  - ⚠️ 하드코딩된 그림자 값 사용 절대 금지! (`shadow-[0px_4px_4px...]` 등)
  - ✅ 항상 CSS 변수 `var(--glass-shadow)` 사용
  - 모든 컴포넌트가 동일한 그림자 사용으로 UI 통일성 확보
* **적용 방법**: 
  ```tsx
  // Tailwind 클래스 사용 불가 - style 속성 사용
  <div 
    className="border"
    style={{ 
      borderColor: 'var(--color-glass-border)',
      boxShadow: 'var(--glass-shadow)' 
    }}
  />
  ```
* **사용 위치**: Side Nav, RoundButton, 메인 페이지 카드, 모바일 헤더, Dialog, 모든 글래스모피즘 컴포넌트
* **자동 적용 컴포넌트**: 
  - RoundButton (SystemButton, AgentButton, HelpButton)
  - CloseButton
  - Side Nav (Reduced/Expanded)
  - 모바일 헤더

### 그라디언트 메시 배경 (`.gradient-mesh`)
* **라이트모드**: 은은한 파란색 계열 그라디언트 (브랜드 컬러 #4fa8d8 기반)
  - 왼쪽 상단: 밝은 파란색 그라디언트 (`rgba(79,168,216,0.15)` → 투명)
  - 우측 하단: 부드러운 스카이블루 그라디언트 (`rgba(150,200,230,0.12)` → 투명)
  - 중앙: 은은한 밝은 그라디언트 (`rgba(200,220,240,0.08)` → 투명)
  - 기본 배경: `#e8e8e8` (밝은 회색)
* **다크모드**: 깊이감 있는 파란색 계열 그라디언트 (피그마 디자인 기반)
  - 왼쪽 상단: 청록색 그라디언트 (`rgba(53,169,221,0.15)` → `rgba(27,85,111,0.075)` → 투명)
  - 우측 하단: 어두운 파란색 그라디언트 (`rgba(37,71,88,0.15)` → 투명)
  - 중앙: 회색 그라디언트 (`rgba(63,63,70,0.1)` → 투명)
  - 기본 배경: `#141415` (다크 회색)
* **구현 방식**: `::before` 의사 요소로 SVG radial gradient 3개 레이어 적용
* **사용 위치**: GenPressoLayout 메인 배경
* **효과**: 단순한 단색 배경이 아닌 입체감 있고 세련된 배경

## 반응형 디자인 원칙

### 모바일 우선 접근법
* 모바일 화면 (320px)부터 시작하여 점진적으로 확장
* 데스크톱보다 모바일 UX를 우선 고려
* 터치 인터페이스를 염두에 둔 최소 44px 터치 타겟 크기

### 브레이크포인트 체계
* Mobile: 320px ~ 767px
* Tablet: 768px ~ 1023px  
* Desktop: 1024px ~ 1439px
* Large Desktop: 1440px+

### 간격 및 여백 시스템
* 기본 간격 단위: 4px (1 unit)
* 컴포넌트 내부 패딩: 4-6 units (16-24px)
* 섹션 간 여백: 8-12 units (32-48px)
* 페이지 최대 너비: 1200px

### 패널 콘텐츠 영역 패딩 (통일 규칙)
* **모든 패널의 콘텐츠 영역**: `px-12 py-4` (좌우 48px, 상하 16px)
* **적용 대상**: 
  - ProjectMenuPanel (프로젝트/즐겨찾기/대시보드)
  - SettingsPanel (프로필설정/일반설정/구독관리/크레딧충전/워크스페이스설정)
  - 기타 모든 Side Panel
* **중요**: 
  - ✅ 반드시 `px-12 py-4` Tailwind 클래스 사용
  - ❌ `px-[48px]`, `px-10`, `px-14` 등 다른 패딩 사용 금지
  - ✅ 모든 패널에서 동일한 패딩으로 일관성 확보
* **레이아웃 규칙**: 
  - ✅ **좌우 가득 차게 표시**: `max-w-4xl mx-auto` 등 최대 너비 제한 사용 금지
  - ✅ **전체 너비 활용**: 콘텐츠가 패딩(`px-12`) 내에서 좌우로 가득 차도록 레이아웃
  - ✅ **통일된 느낌**: 설정 탭과 메뉴 탭 모두 동일하게 좌우 공간 최대 활용
  - ❌ **중앙정렬 금지**: `max-w-*` + `mx-auto` 조합으로 중앙정렬하지 않음
* **필터/액션 바 레이아웃**:
  - ✅ Select 컴포넌트: `flex-1 min-w-[100px]` (유동적 확장)
  - ✅ 검색 필드: `flex-[2]` (더 넓게)
  - ✅ 버튼: `shrink-0` (고정 너비)
  - ❌ 고정 너비 금지: `w-32`, `w-40` 등
* **그리드 레이아웃**:
  - 프로젝트 카드: `grid-cols-2 md:grid-cols-4 lg:grid-cols-6` (더 많이 보이게)
  - 간격: `gap-3` (12px, 더 촘촘하게)
* **사용 예시**:
  ```tsx
  // ✅ 표준 패턴 (모든 패널 공통)
  <div className="flex-1 overflow-y-auto px-12 py-4">
    {/* 콘텐츠 - max-w 없이 전체 너비 사용 */}
    <div>
      {/* 필터/액션 바 - 좌우 가득 채우기 */}
      <div className="flex items-center gap-2">
        <Select>
          <SelectTrigger className="flex-1 min-w-[100px]">
            ...
          </SelectTrigger>
        </Select>
        <div className="relative flex-[2]">
          <Input placeholder="검색..." />
        </div>
        <Button className="shrink-0">버튼</Button>
      </div>
    </div>
  </div>
  
  // ❌ 금지 (패딩 불일치)
  <div className="flex-1 overflow-y-auto px-10 py-4">
  
  // ❌ 금지 (중앙정렬)
  <div className="flex-1 overflow-y-auto px-12 py-4">
    <div className="max-w-4xl mx-auto">
      {/* 좌우 공간 낭비 */}
    </div>
  </div>
  
  // ❌ 금지 (고정 너비)
  <div className="flex items-center gap-2">
    <Select>
      <SelectTrigger className="w-32">
        {/* 빈 공간 발생 */}
      </SelectTrigger>
    </Select>
  </div>
  ```

## 레이아웃 컴포넌트

### Container
* 중앙 정렬된 최대 너비 컨테이너
* 좌우 패딩 적용으로 화면 가장자리와 여백 확보
* 반응형 너비 조정

### Grid System  
* CSS Grid 기반의 12 컬럼 시스템
* 모바일에서는 1-2 컬럼, 태블릿 2-3 컬럼, 데스크톱 3-4 컬럼 권장
* gap 속성을 활용한 일관된 간격

### Navigation
* 모바일: 햄버거 메뉴 또는 하단 탭바
* 데스크톱: 수평 네비게이션 바
* 최대 5개 주요 메뉴 항목 권장

## 공유 컴포넌트 시스템

### 중요: 홈화면과 캔버스 공통 컴포넌트
* **핵심 원칙**: 홈화면(`GenPressoLayout`)과 캔버스(`CanvasWorkspace`)는 **동일한 컴포넌트**를 공유합니다
* **공유 컴포넌트 목록**:
  1. **SystemButton** (햄버거 메뉴)
     - 경로: `/components/ui/system-button.tsx`
     - 홈/캔버스 모두 사용
     - RoundButton 기반, 통일된 디자인
  
  2. **AgentButton** (AI 에이전트 버튼)
     - 경로: `/components/ui/agent-button.tsx`
     - 홈/캔버스 모두 사용
     - RoundButton 기반, 통일된 디자인
  
  3. **HelpButton** (도움말 버튼)
     - 경로: `/components/ui/help-button.tsx`
     - 홈/캔버스 모두 사용
     - RoundButton 기반, 통일된 디자인
  
  4. **AgentChatPanel** (AI 에이전트 패널)
     - 경로: `/components/agent/AgentChatPanel.tsx`
     - 홈/캔버스 모두 사용
  
  5. **HelpPanel** (도움말 패널)
     - 경로: `/components/help/HelpPanel.tsx`
     - 홈/캔버스 모두 사용
  
  6. **ExpandableSidebar** (네비게이션 사이드바)
     - 경로: `/components/layout/ExpandableSidebar.tsx`
     - 홈/캔버스 모두 사용
  
  7. **FileAttachPopover** (파일 첨부 Popover)
     - 경로: `/components/ui/file-attach-popover.tsx`
     - Agent 패널, 메인 화면, 캔버스 모두 사용
     - 이미지/동영상 업로드 옵션 제공
     - align, side, sideOffset, buttonClassName props 지원

* **중요**: 
  - ✅ 위 컴포넌트를 수정하면 홈화면과 캔버스에서 **자동으로 함께 반영**됩니다
  - ⚠️ 절대로 중복 생성 금지! (예: `HelpButton2.tsx`, `AgentButtonCanvas.tsx` 등)
  - ✅ 모든 버튼은 `RoundButton` 컴포넌트를 기반으로 통일된 디자인 적용
  - ✅ 한 곳에서 수정하면 전체 애플리케이션에 일관되게 적용됨
  - ❌ **어두운 오버레이 금지**: Agent/Help 패널 열렸을 때 뒤 화면 어두워지는 효과 사용 안 함
  - ✅ **투명한 오버레이 사용**: 패널 외부 클릭으로 닫기 기능 (`bg-transparent`)
  - 📌 **닫기 방법**: 
    1. X 버튼 클릭
    2. 패널 외부 영역 클릭 (투명 오버레이)
    3. Agent/Help 버튼 재클릭
  - 🎯 **z-index 계층**:
    - Agent 패널: `z-[60]`
    - AgentButton: `z-[70]`
    - HelpButton: `z-[80]` (Agent 패널 위에 표시, 항상 클릭 가능)
    - Help 패널: `z-[60]`

## 컴포넌트 가이드라인

### 버튼
* 모바일에서 최소 44px 높이 보장
* Primary, Secondary, Ghost 변형 제공
* 로딩 상태와 비활성화 상태 지원

### RoundButton (원형 버튼)
* **통일된 디자인 시스템**: 모든 원형 버튼은 `RoundButton` 컴포넌트 사용
* **크기**: 44x44px (최소 터치 타겟)
* **배경**: 글래스모피즘 효과 (`backdrop-blur-[10px]`)
* **테두리**: 0.5px solid border (`var(--color-glass-border)`)
* **그림자**: CSS 변수 `var(--glass-shadow)` 사용 (라이트/다크모드 자동 대응)
* **호버**: 아이콘 파란색 (`var(--primary)`)으로 변경
* **활성 상태**: 아이콘 파란색 + X 아이콘으로 변경
* **사용 예시**: SystemButton (햄버거), AgentButton, HelpButton
* **컴포넌트 경로**: `/components/ui/round-button.tsx`

### CloseButton (X 닫기 버튼)
* **통일된 디자인 시스템**: 모든 X 버튼은 `CloseButton` 컴포넌트 사용 (피그마 디자인 기반)
* **크기 옵션**: sm (16px, 기본값), md (22px), lg (26px)

#### ⚠️ X 버튼 위치 규칙 (절대 준수!)
* **모든 X 버튼은 정확히 10px 간격으로 통일**
* **Tailwind 클래스**: `left-2.5 top-2.5` (왼쪽 상단) 또는 `right-2.5 top-2.5` (우측 상단)
* **절대 사용 금지**: `left-2`, `right-2`, `top-2` (8px) 또는 기타 하드코딩

**위치별 규칙:**
| 위치 | Tailwind 클래스 | 사용처 |
|------|---------------|--------|
| 왼쪽 상단 | `left-2.5 top-2.5` | Side Nav, 설정 패널 |
| 우측 상단 | `right-2.5 top-2.5` | Agent 패널, Help 패널, Dialog |

**필수 사용 패턴:**
```tsx
// ✅ 왼쪽 상단 X 버튼 (표준 패턴)
<div className="absolute left-2.5 top-2.5 z-50">
  <CloseButton onClick={onClose} size="sm" />
</div>

// ✅ 우측 상단 X 버튼 (표준 패턴)
<div className="absolute right-2.5 top-2.5 z-50">
  <CloseButton onClick={onClose} size="sm" />
</div>

// ❌ 절대 금지! (8px 간격)
<div className="absolute left-2 top-2 z-50">
<div className="absolute right-2 top-2 z-50">

// ❌ 절대 금지! (하드코딩)
<div className="absolute left-[10px] top-[10px]">
```

**중요 체크리스트:**
- [ ] X 버튼 추가 시 반드시 `CloseButton` 컴포넌트 사용
- [ ] wrapper div는 `absolute` + `z-50` 사용
- [ ] 왼쪽 상단: `left-2.5 top-2.5` (10px)
- [ ] 우측 상단: `right-2.5 top-2.5` (10px)
- [ ] 절대로 `left-2`, `right-2`, `top-2` (8px) 사용 금지
- [ ] 모든 패널/Dialog에서 동일한 간격 유지

#### 스타일 디자인
* **라이트모드**: 
  - 배경 그라데이션: `rgba(0,0,0,0.08)` → `rgba(0,0,0,0.06)` (밝은 회색 - 부드러운 대비)
  - 테두리: `0.584px solid rgba(0,0,0,0.2)` (명확한 어두운 테두리)
  - 아이콘: `#333333` (진한 회색 - 명확하게 보임)
  - 그림자: `0px 2px 6px rgba(0,0,0,0.1)` (부드러운 그림자)
* **다크모드**: 
  - 배경 그라데이션: `rgba(255,255,255,0.1)` → `rgba(255,255,255,0.05)` (밝은 반투명)
  - 테두리: `0.584px solid rgba(255,255,255,0.2)`
  - 아이콘: `#f5f5f5` (흰색)
  - 그림자: `0px 4px 4px rgba(0,0,0,0.25)`
* **공통**: 
  - 백드롭 블러: `8px`
  - 호버: X 아이콘 파란색 (`#4fa8d8`) + scale 1.1배
  - 클릭: scale 0.95배 애니메이션
* **사용 위치**: 메인 페이지, Side Nav, Agent 패널, Help 패널, Dialog, 크레딧 충전 등 **모든 닫기 버튼**
* **중요**: Dialog 컴포넌트는 자동으로 CloseButton을 사용하도록 설정됨 (`/components/ui/dialog.tsx`)
* **컴포넌트 경로**: `/components/ui/close-button.tsx`
* **CSS 변수**: 
  - `--close-btn-bg-start`, `--close-btn-bg-end` (배경 그라데이션)
  - `--close-btn-border` (테두리 색상)
  - `--close-btn-icon` (기본 아이콘 색상)
  - `--close-btn-icon-hover` (호버 아이콘 색상)

### HoverableListItem (호버 리스트 아이템)
* **통일된 디자인 시스템**: 모든 네비게이션 리스트 아이템은 `HoverableListItem` 컴포넌트 사용
* **곡률**: 16px border-radius (`rounded-2xl`)
* **높이**: 40px (`h-10`)
* **패딩**: `px-3 py-2` (좌우 12px, 상하 8px)
* **호버 효과**:
  - 배경색: 투명 → `var(--color-glass-hover-bg)` (inline style로 제어)
  - 텍스트: `text-foreground` → `text-primary` (파란색 #4fa8d8)
  - 아이콘: stroke (`--color-glass-icon`) → filled (`--color-primary`)
  - 애니메이션: 200ms ease-out, scale + opacity 전환
* **아이콘 시스템**:
  - 기본 상태: stroke 버전 아이콘 (예: `IconStrokeFolder`, `IconStrokeChart`)
  - 호버 상태: filled 버전 아이콘 (예: `IconFilledFolder`, `IconFilledChart`)
  - 호버 시 파란색 (`var(--color-primary)`, `#4fa8d8`)으로 자동 변경
  - stroke/filled 버전이 모두 있어야 호버 효과 정상 작동
* **최적화**:
  - ✅ 반드시 stroke와 filled 버전을 별도로 제공해야 함
  - ✅ Tailwind 클래스 사용 (`rounded-2xl`, `h-10`, `px-3`, `py-2`)
  - ✅ inline style 제거하고 Tailwind 클래스 사용 (`text-foreground`, `group-hover:text-primary`)
  - ✅ `hover:bg-[var(...)]` 하드코딩 대신 inline style로 호버 배경 제어
  - ❌ 하드코딩 금지 (`rounded-[16px]`, `gap-[3px]`, `px-[10px]` 등)
* **사용 위치**: Side Nav 확장형, Help 패널, 기타 네비게이션 메뉴
* **컴포넌트 경로**: `/components/ui/hoverable-list-item.tsx`
* **사용 예시**:
  ```tsx
  <HoverableListItem
    icon={<IconStrokeFolder />}
    iconHover={<IconFilledFolder />}
    label="프로젝트"
  />
  ```

### HelpListItem (Help 패널 리스트 아이템)
* **통일된 디자인 시스템**: Help 패널 전용 리스트 아이템 컴포넌트
* **디자인**: HoverableListItem과 동일한 스타일
* **차이점**: CSS 변수 `--fill-0`를 사용하는 피그마 import 아이콘과 호환
* **호버 효과**:
  - 배경색: 투명 → `var(--color-glass-hover-bg)`
  - 텍스트: `text-foreground` → `text-primary` (파란색 #4fa8d8)
  - 아이콘: `var(--foreground)` → `#4fa8d8` (직접 색상 값 사용)
  - 아이콘 전환: stroke → filled (scale + opacity 애니메이션)
* **아이콘 색상 시스템** (완전 해결):
  - **근본 원인**: `globals.css`의 전역 글래스 아이콘 규칙이 `!important`로 덮어씀
  - **해결 방법**: 
    1. HelpPanel에 `.help-panel` 클래스 추가
    2. `globals.css`에 `.help-panel svg path { fill: var(--fill-0) !important; }` 예외 규칙 추가
  - **기본 상태**: `--fill-0: var(--foreground)` (회색)
  - **호버 상태**: `--fill-0: #4fa8d8` (파란색, 직접 값 사용)
  - **수정된 파일**:
    - `/components/help/HelpPanel.tsx` - `.help-panel` 클래스 추가
    - `/styles/globals.css` - Help 패널 예외 규칙 추가
    - `/imports/IconFilled*.tsx` - fallback `currentColor` 수정
* **최적화**: 
  - ✅ 불필요한 wrapper div 제거
  - ✅ `size-4` (16px) 대신 `w-4 h-4` 사용
  - ✅ 폰트 패밀리 자동 적용 (Pretendard)
  - ✅ inline style로 호버 배경 제어 (CSS 변수 사용)
  - ✅ SVG fallback 하드코딩 제거 (`#F5F5F5` → `currentColor`)
  - ✅ globals.css 전역 규칙 예외 처리 (`.help-panel`)
  - ✅ Side Nav 메뉴와 완전히 동일한 호버 효과
* **컴포넌트 경로**: `/components/ui/help-list-item.tsx`

### HelpPanel (Help 패널)
* **헤더 디자인**: Side Nav "메뉴" 헤더와 동일한 스타일
  - 폰트: `text-xs` (12px, 가독성 최적화)
  - 폰트 굵기: `font-semibold` (세미볼드)
  - 색상: `text-foreground` (라이트/다크모드 자동 대응)
  - 라인 높이: `leading-none`
* **그라디언트 구분선**: Side Nav와 동일한 radial gradient
  - 높이: `h-px` (1px)
  - 곡률: `rounded-2xl` (16px)
  - 그라디언트: `rgba(255,255,255,0.2)` → `rgba(255,255,255,0)` (중앙에서 양쪽으로)
  - SVG radial gradient 배경 이미지 사용
* **크기 최적화**: 
  - 너비: **186px** (Side Nav와 동일)
  - 높이: 콘텐츠에 맞게 자동 조정 (`height: auto`)
  - 내부 패딩: `p-2.5` (10px) 유지
* **코드 최적화**:
  - ✅ 배열 방식으로 리스트 아이템 렌더링 (중복 제거)
  - ✅ inline style 대신 Tailwind 클래스 사용 (`text-foreground`)
  - ✅ 유지보수성 향상 (아이템 추가/제거 용이)
  - ✅ `.help-panel` 클래스 추가 (globals.css 전역 규칙 예외 처리용)
* **중요**: 
  - ⚠️ 최상위 div에 `.help-panel` 클래스 필수!
  - ⚠️ globals.css의 글래스 아이콘 규칙을 우회하기 위함
* **컴포넌트 경로**: `/components/help/HelpPanel.tsx`

### NavButton (섹션 헤더 버튼)
* **통일된 디자인 시스템**: 이어하기/둘러보기 섹션 헤더 버튼은 `NavButton` 컴포넌트 사용
* **디자인 특징**:
  - 글래스모피즘 배경 (`bg-glass-bg + backdrop-blur-sm`)
  - 곡률: 완전한 원형 (`rounded-full`)
  - 크기: 40x40px (모바일), 자동 너비 (데스크톱)
  - 반응형: 모바일(아이콘만) / 데스크톱(아이콘 + 텍스트)
* **색상 시스템**:
  - 기본 상태: `text-foreground` (라이트모드: 검정, 다크모드: 흰색)
    - 아이콘 CSS 변수: `--fill-0: 'currentColor'`
  - 호버 상태: `text-primary` (파란색 #4fa8d8)
    - 배경: `bg-primary/20` (20% 파란색 투명도)
    - 테두리: `border-primary/30`
    - 아이콘 CSS 변수: `--fill-0: 'var(--primary)'`
* **아이콘 전환 효과**:
  - stroke 아이콘 → filled 아이콘 크로스페이드
  - scale + opacity 애니메이션 (200ms ease-out)
* **중요**: 
  - ✅ `currentColor` 사용으로 라이트/다크모드 자동 대응
  - ✅ stroke와 filled 버전 모두 필요
  - ❌ 하드코딩된 색상 값 사용 금지 (`#ffffff`, `#4fa8d8` 등)
* **사용 위치**: 이어하기, 둘러보기 섹션 헤더
* **컴포넌트 경로**: `/components/ui/nav-button.tsx`
* **사용 예시**:
  ```tsx
  <NavButton 
    label="이어하기"
    icon={<IconStrokeContinue1 />}
    iconHover={<IconFilledContinue1 />}
    onClick={() => toast.success("이어하기 클릭")}
  />
  ```

### 카드
* **글래스모피즘 스타일 적용**: `bg-card` 대신 CSS 변수 직접 사용
* **투명도**: 라이트모드 50% (`rgba(255, 255, 255, 0.5)`)로 뒤 배경이 비침
* **백드롭 블러**: 12px
* **구현 방법**:
  ```tsx
  <div 
    style={{
      backgroundColor: 'var(--glass-bg)',
      backdropFilter: 'blur(var(--glass-backdrop))',
      WebkitBackdropFilter: 'blur(var(--glass-backdrop))',
      borderColor: 'var(--glass-border)',
      boxShadow: 'var(--glass-shadow)',
    }}
  >
  ```
* **중요**: `bg-card` (불투명한 #ffffff) 사용 금지!

### NodeCard (캔버스 노드 카드)
* **통일된 디자인 시스템**: 모든 노드 컴포넌트는 `/components/canvas/nodes/node-styles.ts` 통합 스타일 사용
* **컴포넌트 경로**: 
  - 메인: `/components/canvas/NodeCard.tsx`
  - 공통 스타일: `/components/canvas/nodes/node-styles.ts`
  - 서브 컴포넌트: `/components/canvas/nodes/*.tsx`

#### 노드 통합 디자인 시스템
* **패딩 시스템 (완전 통일)**:
  - 기본 패딩: `NODE_PADDING.ALL` → `p-1` (4px 상하좌우)
  - 좌우 패딩: `NODE_PADDING.X` → `px-1` (4px 좌우)
  - 상하 패딩: `NODE_PADDING.Y` → `py-1` (4px 상하)
  - ⚠️ **절대 금지**: `py-2`, `py-3`, `px-3`, `p-[4px]` 등 다른 패딩 사용

* **간격 시스템**:
  - 작은 간격: `NODE_GAP.SM` → `gap-1` (4px)
  - 중간 간격: `NODE_GAP.MD` → `gap-1.5` (6px)
  - 큰 간격: `NODE_GAP.LG` → `gap-2` (8px)

* **아이콘 및 버튼 크기**:
  - 노드 아이콘: `NODE_ICON.SIZE_CLASS` → `w-3.5 h-3.5` (14px)
  - 큰 아이콘: `NODE_ICON.SIZE_LG_CLASS` → `w-4 h-4` (16px)
  - 더 큰 아이콘: `NODE_ICON.SIZE_XL_CLASS` → `w-7 h-7` (28px)
  - 노드 버튼: `NODE_BUTTON.SIZE_CLASS` → `w-7 h-7` (28px)
  - 큰 버튼: `NODE_BUTTON.SIZE_LG_CLASS` → `w-14 h-14` (56px)

* **곡률 시스템**:
  - 작은 곡률: `NODE_RADIUS.SM` → `rounded-lg` (12px)
  - 큰 곡률: `NODE_RADIUS.LG` → `rounded-2xl` (16px)
  - 완전한 원형: `NODE_RADIUS.FULL` → `rounded-full`

* **텍스트 크기**:
  - 매우 작은 텍스트: `NODE_TEXT.XXS` → `text-[10px]` (10px) - 노드 내부 보조 정보 전용
  - 작은 텍스트: `NODE_TEXT.XS` → `text-xs` (12px)
  - 중간 텍스트: `NODE_TEXT.SM` → `text-sm` (14px)
  - 기본 텍스트: `NODE_TEXT.BASE` → `text-base` (16px)

* **테두리**:
  - 기본 테두리: `NODE_BORDER.DEFAULT` → `border`
  - 두꺼운 테두리: `NODE_BORDER.THICK` → `border-2`
  - 점선 테두리: `NODE_BORDER.DASHED`
  - 상단 테두리: `NODE_BORDER.TOP` → `border-t`

* **Flexbox 유틸리티**:
  - 중앙 정렬: `FLEX.CENTER` → `flex items-center justify-center`
  - 세로 중앙: `FLEX.CENTER_Y` → `flex items-center`
  - 좌우 배치: `FLEX.BETWEEN` → `flex items-center justify-between`
  - 세로 방향: `FLEX.COL` → `flex flex-col`

* **호버 및 인터랙션**:
  - 호버 배경: `INTERACTIVE_STYLES.HOVER_BG` → `hover:bg-secondary/10`
  - 호버 테두리: `INTERACTIVE_STYLES.HOVER_BORDER` → `hover:border-primary/50`
  - 호버 스케일: `INTERACTIVE_STYLES.HOVER_SCALE` → `hover:scale-110`
  - 트랜지션: `INTERACTIVE_STYLES.TRANSITION` → `transition-colors`
  - 활성 상태: `INTERACTIVE_STYLES.ACTIVE` → `border-primary bg-primary/10`

* **레이아웃 구조**:
  ```
  ┌────────────────────────────────────┐
  │ 상단 (NODE_PADDING.X)              │
  │  [🔓]  [타입]  [✕]                │ 4px 좌우
  ├────────────────────────────────────┤
  │ 메인 (NODE_PADDING.ALL)            │
  │  [콘텐츠]                          │ 4px 상하좌우
  ├────────────────────────────────────┤
  │ 하단 (NODE_PADDING.ALL)            │
  │  [🔖]        [🔍]                  │ 4px 상하좌우
  ├────────────────────────────────────┤
  │ 토글 (NODE_PADDING.Y)              │ 4px 상하
  ├────────────────────────────────────┤
  │ 확장 (NODE_PADDING.ALL)            │
  │  [프롬프트/메타데이터]             │ 4px 상하좌우
  └────────────────────────────────────┘
  ```

* **사용 예시**:
  ```tsx
  import {
    NODE_PADDING,
    NODE_GAP,
    NODE_ICON,
    NODE_BUTTON,
    NODE_RADIUS,
    NODE_BORDER,
    NODE_TEXT,
    FLEX,
    INTERACTIVE_STYLES,
    cn,
  } from "./node-styles";

  // ✅ 권장 (통합 스타일 시스템)
  <div className={cn(NODE_PADDING.ALL, FLEX.COL, NODE_GAP.LG)}>
    <button className={cn(
      NODE_BUTTON.SIZE_CLASS,
      FLEX.CENTER,
      NODE_RADIUS.SM,
      INTERACTIVE_STYLES.HOVER_BG
    )}>
      <Lock className={NODE_ICON.SIZE_CLASS} />
    </button>
  </div>

  // ❌ 금지 (하드코딩)
  <div className="p-1.5 flex flex-col gap-2">
    <button className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-secondary/10">
      <Lock className="w-3.5 h-3.5" />
    </button>
  </div>
  ```

* **헬퍼 함수** (node-styles.ts):
  - `cn(...classes)`: 조건부 클래스 조합
  - `getNodeTypeLabel(type)`: 노드 타입 한글 라벨 반환
  - `getNodeBadgeStyles(type)`: 노드 배지 CSS 변수 반환 (backgroundColor, color)
  - `getGlassStyles(isSelected)`: 글래스모피즘 스타일 객체 반환 (선택 상태 대응)
  - `calculateIdInputWidth(id, minWidth, charWidth)`: ID 입력 필드 동적 너비 계산

* **중요 원칙**:
  - ✅ 모든 노드 컴포넌트는 `node-styles.ts` 임포트 필수
  - ✅ 상수 사용으로 일관성 확보 (하드코딩 금지)
  - ✅ CSS 변수 사용으로 라이트/다크모드 자동 대응
  - ✅ `cn()` 함수로 조건부 클래스 처리
  - ❌ 직접 Tailwind 클래스 하드코딩 금지
  - ✅ 새 노드 컴포넌트 생성 시 이 시스템 적용 필수

* **서브 컴포넌트 목록**:
  1. **NodeHeader**: 노드 상단 (잠금, 타입 배지, 삭제)
  2. **NodeFooter**: 노드 하단 (북마크, 전체보기)
  3. **TextNode**: 텍스트 입력 노드
  4. **ImageNode**: 이미지 생성 노드 (텍스트 + 이미지 2개)
  5. **VideoNode**: 비디오 생성 노드 (텍스트 + 이미지 3개 프레임 선택)
  6. **ProcessNode**: 성 중 상태 노드 (애니메이션)
  7. **UploadNode**: 업로드 안내 노드 (파일/이미지/비디오)
  8. **ExpandToggle**: 확장/접기 토글 버튼
  9. **MetadataGrid**: 메타데이터 2열 그리드
  10. **MediaUploadArea**: 미디어 업로드 영역 (재사용 가능)

* **최적화 완료사항**:
  - ✅ 중복 함수 제거: `getNodeBadgeStyles`, `getGlassStyles`, `calculateIdInputWidth`를 node-styles.ts로 통합
  - ✅ 하드코딩 제거: VideoNode `rounded` → `NODE_RADIUS.SM`, `NODE_ICON.XL_CLASS` → `NODE_ICON.SIZE_XL_CLASS`
  - ✅ 컴포넌트 통합: UploadNode가 MediaUploadArea를 재사용하도록 리팩토링
  - ✅ MediaUploadArea 확장: `variant`, `icon`, `title` props 추가로 재사용성 향상
  - ✅ 간격 시스템 추가: `NODE_SPACE_Y` (XS/SM/MD) 상수 추가
  - ✅ utils.ts 경량화: 노드 관련 함수를 node-styles.ts로 이동
  - ✅ NodeCard import 최적화: node-styles.ts에서 유틸리티 import
  - ✅ 모든 노드 패딩 축소: `NODE_PADDING.ALL` (6px → 4px) 완전 적용
  - ✅ 메타데이터 확장 영역 간격 통일: `space-y-2` (8px) 표준화
  - ✅ 노드 헤더 높이 축소: `NODE_HEADER.HEIGHT` (44px → 36px) 최적화
  - ✅ 노드 하단 패딩 추가: `pb-1` (4px) 적용으로 컴팩트한 디자인 완성
  - ✅ 믹스노드 세그먼트 기본 크기 축소: 약 70% 축소하여 더 많은 세그먼트 배치 가능
  - ✅ 믹스노드 세그먼트 리스트 최적화: 슬라이더(40px), 썸네일(32px), 아이콘(14px)으로 축소하여 노드 내부 완전 수용
  - ✅ 믹스노드 퍼센트 텍스트 최적화: 12px → 10px로 축소하여 더욱 컴팩트한 레이아웃 완성
  7. **UploadNode**: 업로드 안내 노드
  8. **ExpandToggle**: 확장/접기 토글 버튼
  9. **MetadataGrid**: 메타데이터 2열 그리드
  10. **MediaUploadArea**: 미디어 업로드 영역

* 호버 효과는 데스크톱에서만 적용

### 폼 요소
* 라벨은 항상 입력 필드 위에 배치
* 에러 메시지는 해당 필드 바로 아래 표시
* 필수 필드는 * 표시로 구분

### 타이포그래피
* 제목: 모바일에서 한 줄에 하나씩, 데스크톱에서 더 큰 크기
* 본문: 최대 너비 65ch로 가독성 확보
* 줄 간격: 1.5-1.6 권장

## Agent 패널 디자인 시스템

### Agent 패널 글래스모피즘 스타일
* **테두리**: `border-[0.5px] border-solid` + `borderColor: 'var(--color-glass-border)'`
* **배경**: `backgroundColor: 'var(--color-glass-bg)'`
* **블러**: `backdropFilter: 'blur(var(--blur-glass))'`
* **그림자**: `boxShadow: 'var(--glass-shadow)'`
* **곡률**: `rounded-2xl` (16px)
* **중요**: Help 패널과 동일한 글래스모피즘 스타일 적용

### Agent 패널 배경 및 아이템 스타일
* **AI 메시지 배경**: CSS 변수 `var(--agent-message-bg)` 사용
  - 라이트모드: `rgba(82, 82, 91, 0.15)` (밝은 회색)
  - 다크모드: `rgba(82, 82, 91, 0.3)` (어두운 회색)
  - **사용 예시**: 
    ```tsx
    <div style={{ backgroundColor: 'var(--agent-message-bg)' }}>
      안녕하세요! 무엇을 도와드릴까요?
    </div>
    ```
* **사용자 메시지 배경**: CSS 변수 `var(--agent-user-message-bg)` 사용
  - 라이트모드: `rgba(79, 168, 216, 0.15)` (밝은 파란색)
  - 다크모드: `rgba(79, 168, 216, 0.2)` (파란색)
  - **사용 예시**: 
    ```tsx
    <div style={{ backgroundColor: 'var(--agent-user-message-bg)' }}>
      이미지를 생성해주세요
    </div>
    ```
* **히스토리 아이템 배경**: CSS 변수 `var(--history-item-bg)` 사용
  - 라이트모드: `rgba(82, 82, 91, 0.3)` (회색 - 명확한 대비)
  - 다크모드: `rgba(82, 82, 91, 0.3)` (동일)
  - **사용 예시**: 
    ```tsx
    <div style={{ backgroundColor: 'var(--history-item-bg)' }}>
      <p>이미지 생성 완료</p>
      <p className="text-muted-foreground">2025-10-10 15:30:22</p>
    </div>
    ```
* **코멘트 아이템 배경**: CSS 변수 `var(--comment-item-bg)` 사용
  - 라이트모드: `rgba(79, 168, 216, 0.1)` (매우 밝은 파란색)
  - 다크모드: `rgba(79, 168, 216, 0.15)` (파란색)
  - **사용 예시**: 
    ```tsx
    <div style={{ backgroundColor: 'var(--comment-item-bg)', borderColor: 'var(--color-primary)' }}>
      <div className="flex items-start gap-2">
        <div className="bg-primary rounded-full">⭐</div>
        <p>현재 작업에 이 색상 조합을 추천드립니다</p>
      </div>
    </div>
    ```
* **중요**: 
  - ❌ `bg-[rgba(82,82,91,0.3)]` 하드코딩 금지
  - ✅ `style={{ backgroundColor: 'var(--history-item-bg)' }}` 사용
  - ✅ 라이트/다크모드 자동 대응

### 탭 시스템
* **활성 탭 그라디언트**: CSS 변수 사용
  - `var(--tab-active-gradient-start)` → `var(--tab-active-gradient-end)`
  - 라이트모드: 검은색 계열 (0% → 5% 투명도)
  - 다크모드: 흰색 계열 (0% → 10% 투명도)
* **탭 밑줄**: `bg-primary` (브랜드 컬러 #4fa8d8) 사용
* **활성 탭 텍스트**: `text-foreground`
* **비활성 탭 텍스트**: `text-muted-foreground`

### 아이콘 시스템
* **SVG 아이콘 fill**: CSS 변수 `var(--icon-fill)` 사용
  - 라이트모드: `#333333` (어두운 회색)
  - 다크모드: `#f5f5f5` (밝은 회색)
* **코멘트 별 아이콘**: `bg-primary` 배경 + `currentColor` fill 사용
* **중요**: 하드코딩된 `#F5F5F5` 절대 사용 금지!

### Popover 말풍선 스타일
* **배경**: CSS 변수 `var(--popover-bg)` 사용
  - 라이트모드: `rgba(255, 255, 255, 0.95)` (거의 불투명한 흰색)
  - 다크모드: `rgba(245, 245, 245, 0.05)` (매우 투명한 밝은 색)
* **테두리**: CSS 변수 `var(--popover-border)` 사용
* **그림자**: CSS 변수 `var(--popover-shadow)` 사용
* **버튼 배경**: `var(--popover-button-bg)` / 호버: `var(--popover-button-hover-bg)`
* **아이콘 배경**: `var(--popover-icon-bg)` / 호버: `var(--popover-icon-hover-bg)`
* **SVG 색상**: `currentColor` + `text-foreground` 클래스 사용

### 입력창 스타일
* **배경**: 글래스모피즘 효과 적용
  ```tsx
  style={{
    backgroundColor: 'var(--color-glass-bg)',
    backdropFilter: 'blur(var(--blur-glass))',
    WebkitBackdropFilter: 'blur(var(--blur-glass))',
  }}
  ```
* **호버**: `var(--color-glass-hover-bg)` + `var(--glass-shadow)`
* **중요**: `bg-card` 사용 금지! (불투명)

### 생성하기 버튼 (IconSparkles)
* **기본 상태**: 
  - 배경: `bg-primary` (파란색 #4fa8d8)
  - 텍스트: `text-primary-foreground` (하얀색)
  - 아이콘: `currentColor` 사용하여 자동으로 하얀색
* **호버 상태**: 
  - 배경: `hover:bg-secondary` (회색)
  - 텍스트: `hover:text-secondary-foreground` (검정색)
  - 아이콘: `currentColor`로 자동으로 검정색 전환
* **구현 방법**:
  ```tsx
  <Button 
    className="group bg-primary text-primary-foreground hover:bg-secondary hover:text-secondary-foreground"
  >
    <IconSparkles 
      size={14} 
      className="transition-colors duration-200"
      color="currentColor"
    />
  </Button>
  ```
* **중요**: 
  - ✅ Button의 `text-primary-foreground`와 `hover:text-secondary-foreground`로 제어
  - ✅ IconSparkles는 `fill="currentColor"`로 자동 대응
  - ⚠️ globals.css에 `.bg-primary svg` 예외 규칙 추가됨 (ChatPanel 글래스 아이콘 규칙 무시)

## 접근성 요구사항
* 색상만으로 정보를 전달하지 않음
* 키보드 네비게이션 지원
* 적절한 대비율 유지 (4.5:1 이상)
* 스크린 리더를 위한 적절한 시맨틱 마크업

## 🎨 통합 컬러 시스템 (Integrated Color System)

### 1. 브랜드 & 베이스 컬러 (Brand & Base)

| 이름 | 변수명 | Light Mode | Dark Mode | 설명 |
|------|--------|------------|-----------|------|
| **Primary** | `--primary` | `#4fa8d8` | `#4fa8d8` | 브랜드 메인 컬러 (파란색) |
| **Foreground** | `--foreground` | `#1a1a1a` | `#f5f5f5` | 기본 텍스트 색상 |
| **Background** | `--background` | `#e8e8e8` | `#141415` | 전체 페이지 배경 |
| **Secondary** | `--secondary` | `#f0f0f0` | `#254758` | 보조 배경 (Dark: 어두운 파랑-회색) |
| **Muted** | `--muted` | `#d8d8d8` | `#52525b` | 비활성/보조 요소 배경 |

### 2. 글래스모피즘 시스템 (Glassmorphism)

가장 중요한 UI 스타일입니다. `bg-white/50` 같은 Tailwind 클래스 대신 반드시 아래 CSS 변수를 사용하세요.

| 용도 | 변수명 | Light Mode (값) | Dark Mode (값) |
|------|--------|-----------------|----------------|
| **배경** | `--glass-bg` | `rgba(255, 255, 255, 0.5)` | `rgba(245, 245, 245, 0.05)` |
| **테두리** | `--glass-border` | `rgba(0, 0, 0, 0.15)` | `rgba(163, 163, 163, 0.2)` |
| **그림자** | `--glass-shadow` | `0px 2px 12px 0px rgba(0, 0, 0, 0.1)` | `0px 4px 4px 0px rgba(0, 0, 0, 0.25)` |
| **텍스트** | `--glass-text` | `#1a1a1a` | `#f5f5f5` |
| **아이콘** | `--glass-icon` | `#2a2a2a` | `#f5f5f5` |
| **호버 배경** | `--glass-hover-bg` | `rgba(0, 0, 0, 0.05)` | `rgba(255, 255, 255, 0.08)` |
| **활성 배경** | `--glass-active-bg` | `rgba(0, 0, 0, 0.1)` | `rgba(255, 255, 255, 0.12)` |
| **블러** | `--glass-backdrop` | `12px` | `12px` |

### 3. 컴포넌트별 컬러 (Component Specific)

| 컴포넌트 | 속성 | 변수명 | Light Mode | Dark Mode |
|----------|------|--------|------------|-----------|
| **Input** | 배경 | `--input-bg` | `rgba(255, 255, 255, 0.7)` | `rgba(82, 82, 91, 0.5)` |
| | 테두리 | `--input-border` | `rgba(0, 0, 0, 0.25)` | `rgba(163, 163, 163, 0.3)` |
| **Card** | 배경 | `--card-bg` | `rgba(255, 255, 255, 0.9)` | `rgba(82, 82, 91, 0.3)` |
| **Button** | 호버 배경 | `--button-hover-bg` | `rgba(245, 245, 245, 0.95)` | `rgba(100, 100, 110, 0.6)` |
| **Popover** | 배경 | `--popover-bg` | `rgba(255, 255, 255, 0.95)` | `rgba(245, 245, 245, 0.05)` |
| **Tabs** | 활성 배경 | `--tab-active-bg` | `rgba(0, 0, 0, 0.08)` | `rgba(255, 255, 255, 0.08)` |

### 4. Agent 패널 컬러 (AI Chat)

| 요소 | 변수명 | Light Mode | Dark Mode |
|------|--------|------------|-----------|
| **AI 메시지** | `--agent-message-bg` | `rgba(82, 82, 91, 0.15)` | `rgba(82, 82, 91, 0.3)` |
| **사용자 메시지** | `--agent-user-message-bg` | `rgba(79, 168, 216, 0.15)` | `rgba(79, 168, 216, 0.2)` |
| **히스토리** | `--history-item-bg` | `rgba(82, 82, 91, 0.3)` | `rgba(82, 82, 91, 0.3)` |
| **코멘트** | `--comment-item-bg` | `rgba(79, 168, 216, 0.1)` | `rgba(79, 168, 216, 0.15)` |

### 5. 노드 배지 시스템 (Node Badges)

노드 타입별 식별을 위한 배지 색상입니다.

| 노드 타입 | 배경 변수 (`--node-badge-*-bg`) | 텍스트 변수 (`--node-badge-*-text`) | 계열색 |
|-----------|---------------------------------|-----------------------------------|--------|
| **Text** | `rgba(34, 197, 94, 0.15/0.2)` | `#16a34a` / `#4ade80` | Green |
| **Image** | `rgba(79, 168, 216, 0.15/0.2)` | `#2563eb` / `#60a5fa` | Blue |
| **Video** | `rgba(168, 85, 247, 0.15/0.2)` | `#9333ea` / `#c084fc` | Purple |
| **Process** | `rgba(249, 115, 22, 0.15/0.2)` | `#ea580c` / `#fb923c` | Orange |
| **Mix** | `rgba(236, 72, 153, 0.15/0.2)` | `#db2777` / `#f472b6` | Pink |
| **Member** | `--member-badge-bg` (`#35a9dd`) | `#ffffff` | Sky |

### 6. 노드 그룹핑 컬러 (Node Grouping)

캔버스 그룹핑(`NodeGroupOverlay`)에 사용되는 6가지 고정 색상입니다. 라이트/다크 모드 공통입니다.

| 색상명 | Stroke (테두리) | Fill (배경) |
|--------|----------------|-------------|
| **Yellow** | `rgba(234, 179, 8, 0.6)` | `rgba(234, 179, 8, 0.05)` |
| **Blue** | `rgba(59, 130, 246, 0.6)` | `rgba(59, 130, 246, 0.05)` |
| **Pink** | `rgba(236, 72, 153, 0.6)` | `rgba(236, 72, 153, 0.05)` |
| **Green** | `rgba(34, 197, 94, 0.6)` | `rgba(34, 197, 94, 0.05)` |
| **Purple** | `rgba(168, 85, 247, 0.6)` | `rgba(168, 85, 247, 0.05)` |
| **Orange** | `rgba(249, 115, 22, 0.6)` | `rgba(249, 115, 22, 0.05)` |

### 7. 데이터 시각화 (Charts)

| 차트 | 변수명 | 값 (OKLCH) |
|------|--------|------------|
| **Chart 1** | `--chart-1` | `oklch(0.488 0.243 264.376)` |
| **Chart 2** | `--chart-2` | `oklch(0.696 0.17 162.48)` |
| **Chart 3** | `--chart-3` | `oklch(0.769 0.188 70.08)` |
| **Chart 4** | `--chart-4` | `oklch(0.627 0.265 303.9)` |
| **Chart 5** | `--chart-5` | `oklch(0.645 0.246 16.439)` |

---

## 세그먼테이션 시스템

### 개요
* **경로**: `/components/canvas/segmentation/`
* **목적**: 이미지를 여러 영역으로 분할하고 편집·합성하는 시스템
* **메인 컴포넌트**: `SegmentationPanel`

### 주요 컴포넌트

#### SegmentationPanel (메인 패널)
* 전체화면 오버레이로 표시
* 3가지 모드 관리: viewer, preview, detail
* 글래스모피즘 스타일 적용
* z-index: 50

#### SegmentationViewer (뷰어)
* 원본 이미지 + SVG 오버레이
* 세그먼트 클릭 선택 (Shift/Cmd로 다중 선택)
* 호버 시 하이라이트 (점선 테두리)
* 선택 시 파란색 영역 표시 (30% 투명도)

#### SegmentList (좌측 목록)
* 너비: 320px (w-80)
* 세그먼트 썸네일 44x44px
* 이름 inline 편집
* 즐겨찾기 토글 (Star 아이콘)
* 레이어 번호 표시

#### SegmentProperties (우측 속성)
* 너비: 320px (w-80)
* XY 좌표, 크기, 레이어 표시
* 텍스트 프롬프트 편집 (Textarea)
* "프리뷰 생성" 버튼
* "Mix Node 생성" 버튼

#### PreviewCanvas (임시작업대)
* 드래그 앤 드롭으로 세그먼트 배치
* 10px 그리드 스냅 기능
* Mix / Replace 모드 토글
* 복제, 삭제 버튼
* 배경: 10px 그리드 패턴 (10% 투명도)

#### DetailEditTab (세부편집)
* 2열 그리드 레이아웃 (프리뷰 | 편집)
* 이미지 조정 슬라이더 (밝기, 대비, 채도, 블러)
* LoRA 모델 선택
* 버전 히스토리
* 저장/재생성 버튼

### 타입 시스템
```typescript
interface Segment {
  id: string;
  name: string;
  maskUrl: string;
  thumbnailUrl: string;
  bounds: { x, y, width, height };
  layer: number;
  prompt?: string;
  isSelected: boolean;
  isFavorite: boolean;
}

interface PreviewItem {
  id: string;
  segmentId: string;
  position: { x, y };
  scale: number;
  rotation: number;
  opacity: number;
  zIndex: number;
}
```

### 유틸리티 함수
* `mockSegmentation()`: 모의 세그먼테이션 생성 (AI 연동 전)
* `segmentToPreviewItem()`: 세그먼트 → 프리뷰 아이템 변환
* `snapToGrid()`: 좌표 그리드 스냅 (기본 10px)
* `checkOverlap()`: 세그먼트 겹침 확인

### 디자인 가이드
* **패딩**: `px-12 py-4` (모든 패널 통일)
* **폰트**: `text-xs` (12px) 최소 크기
* **버튼**: `w-7 h-7` (28px)
* **아이콘**: `w-4 h-4` (16px)
* **썸네일**: `w-11 h-11` (44px)
* **간격**: `gap-2` (8px)
* **곡률**: `rounded-2xl` (16px)
* **테두리**: `border-[0.5px]` + `var(--color-glass-border)`

### 중요 사항
* ⚠️ 현재 `mockSegmentation()` 사용 (실제 AI 모델 연동 필요)
* ⚠️ Mix Node 생성 시 캔버스에 노드 추가 로직 구현 필요
* ✅ 모든 CSS 변수 사용 (하드코딩 금지)
* ✅ 라이트/다크모드 자동 대응
* 📅 **마감일**: 2025년 10월 29일

### 사용 예시
```tsx
import { SegmentationPanel } from './segmentation';

const [isSegmentPanelOpen, setIsSegmentPanelOpen] = useState(false);

<SegmentButton
  isActive={isSegmentPanelOpen}
  onClick={() => setIsSegmentPanelOpen(true)}
/>

{isSegmentPanelOpen && (
  <SegmentationPanel
    onClose={() => setIsSegmentPanelOpen(false)}
  />
)}
```

### 시나리오 테스트
메인 페이지 "이어하기" 섹션에서 **"08. Segmentation Workflow"** 클릭 시:
- 원본 이미지 노드 (인테리어 디자인)
- 3개 세그먼트 노드 (소파, 테이블, 벽)
- Mix Node (합성 프롬프트)
- 결과 이미지 노드

자세한 구조는 `/components/canvas/segmentation/ARCHITECTURE.md` 참조

---

## 노드 그룹핑 시스템 (Node Grouping)

### 개요
* **경로**: `/components/canvas/`
* **목적**: 피그마 섹션처럼 여러 노드를 그룹으로 묶어 관리하는 시스템
* **핵심 특징**: 한 노드가 여러 그룹에 동시에 속할 수 있음 (피그마 섹션과 동일)

### 그룹핑 개념

#### 기본 개념
* **그룹 (NodeGroup)**: 여러 노드를 하나로 묶는 논리적 컨테이너
* **다중 소속**: 한 노드는 여러 그룹에 동시에 속할 수 있음
* **시각적 표시**: 
  - 캔버스에 점선 테두리 영역으로 표시 (NodeGroupOverlay)
  - 노드 ID 옆에 색상 점으로 소속 표시 (NodeCard)
* **색상 시스템**: 6가지 색상 (Yellow, Blue, Pink, Green, Purple, Orange)

#### Echo / Insight / Spark 영향력 시스템
그룹 내 노드들의 AI 생성 결과에 영향을 주는 3가지 가중치:

1. **Echo (입력 반영 가중치)**
   - 범위: 0-100
   - 의미: 사용자 입력을 얼마나 그대로 반영할지
   - 높을수록: 입력 텍스트/이미지를 정확하게 모사
   - 낮을수록: AI가 자유롭게 해석

2. **Insight (분석·추론 가중치)**
   - 범위: 0-100
   - 의미: AI 지식과 추론을 얼마나 활용할지
   - 높을수록: AI의 분석력과 지식 활용 강화
   - 낮을수록: 단순하고 직접적인 결과

3. **Spark (창의성 가중치)**
   - 범위: 0-100
   - 의미: 새로운 아이디어를 얼마나 만들어낼지
   - 높을수록: 창의적이고 예상 밖의 결과
   - 낮을수록: 안정적이고 예측 가능한 결과

**기본값**: Echo 50, Insight 50, Spark 50 (균형잡힌 상태)

#### AI 상징 이미지 생성
* **목적**: 그룹 내 이미지들을 AI로 합성하여 대표 이미지 생성
* **선택 시스템**: 최대 3개 이미지를 선택하여 가중치 높게 반영
* **생성 방식**: 선택된 이미지 + Echo/Insight/Spark 가중치로 AI 합성
* **설명 생성**: AI가 그룹의 특성을 분석하여 자동 설명 생성

### 타입 시스템

#### NodeGroup 인터페이스
```typescript
interface NodeGroup {
  id: string;                    // 그룹 고유 ID
  name: string;                  // 그룹 이름
  nodeIds: string[];             // 소속 노드 ID 배열
  color: 'yellow' | 'blue' | 'pink' | 'green' | 'purple' | 'orange';
  
  // Echo/Insight/Spark 시스템
  echo: number;                  // 0-100: 입력 반영 가중치
  insight: number;               // 0-100: 분석·추론 가중치
  spark: number;                 // 0-100: 창의성 가중치
  
  // AI 생성 관련
  symbolImage?: string;          // AI 생성 또는 선택된 대표 이미지 URL
  description?: string;          // AI 생성 그룹 설명
  selectedImageNodeIds?: string[]; // 선택된 이미지 노드 (최대 3개)
  
  // 메타데이터
  createdAt?: number;
  updatedAt?: number;
  bounds?: { x, y, width, height }; // 캔버스 좌표 (자동 계산)
}
```

### 주요 컴포넌트

#### 1. GroupEditDialog (그룹 생성/편집 Dialog)
* **경로**: `/components/canvas/GroupEditDialog.tsx`
* **용도**: 그룹 생성, 편집, 삭제, 노드 추가/제거
* **주요 기능**:
  - 그룹 이름, 색상 선택
  - Echo/Insight/Spark 슬라이더 조정
  - 그룹 이미지 선택 (최대 3개)
  - AI 상징 이미지 생성
  - 그룹 멤버 관리 (노드 추가/제거)
  - 그룹 삭제

**디자인 규칙**:
```tsx
// 기본 정보 섹션
<div className="rounded-2xl p-4 space-y-4" style={{
  backgroundColor: 'var(--color-glass-bg)',
  borderColor: 'var(--color-glass-border)',
  border: '0.5px solid',
}}>
  <Input placeholder="예: Interior Design" />
  
  {/* 색상 선택 버튼 */}
  <div className="flex gap-2 flex-wrap">
    {GROUP_COLORS.map(({ value, color }) => (
      <button
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg border"
        style={{
          backgroundColor: selected ? `${color}20` : 'transparent',
          borderColor: selected ? color : 'var(--color-glass-border)',
        }}
      >
        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: color }} />
      </button>
    ))}
  </div>
</div>

// Echo/Insight/Spark 슬라이더
<div className="space-y-4">
  <div>
    <Label className="flex items-center gap-2 text-xs">
      <Zap className="w-4 h-4 text-yellow-500" />
      Echo (입력 반영)
    </Label>
    <Slider value={[echo]} onValueChange={(v) => setEcho(v[0])} />
    <p className="text-xs text-muted-foreground">
      사용자 입력을 얼마나 그대로 반영할지
    </p>
  </div>
</div>
```

#### 2. NodeGroupOverlay (캔버스 그룹 영역 표시)
* **경로**: `/components/canvas/NodeGroupOverlay.tsx`
* **용도**: 캔버스에 그룹 영역을 점선 테두리로 시각화
* **렌더링 방식**: SVG로 점선 사각형 + 그룹 이름 헤더
* **주요 기능**:
  - 그룹에 속한 노드들의 bounds 자동 계산
  - 점선 테두리 (색상별 구분)
  - 그룹 헤더 (이름 + 편집 버튼)
  - 그룹 토글 필터 (색상별 표시/숨김)

**색상 시스템**:
```typescript
const GROUP_COLORS = {
  yellow: { stroke: 'rgba(234, 179, 8, 0.6)', fill: 'rgba(234, 179, 8, 0.05)' },
  blue: { stroke: 'rgba(59, 130, 246, 0.6)', fill: 'rgba(59, 130, 246, 0.05)' },
  pink: { stroke: 'rgba(236, 72, 153, 0.6)', fill: 'rgba(236, 72, 153, 0.05)' },
  green: { stroke: 'rgba(34, 197, 94, 0.6)', fill: 'rgba(34, 197, 94, 0.05)' },
  purple: { stroke: 'rgba(168, 85, 247, 0.6)', fill: 'rgba(168, 85, 247, 0.05)' },
  orange: { stroke: 'rgba(249, 115, 22, 0.6)', fill: 'rgba(249, 115, 22, 0.05)' },
};
```

**SVG 렌더링**:
```tsx
<svg className="absolute inset-0 pointer-events-none" style={{ overflow: 'visible' }}>
  <rect
    x={bounds.x}
    y={bounds.y}
    width={bounds.width}
    height={bounds.height}
    fill={groupColor.fill}
    stroke={groupColor.stroke}
    strokeWidth="2"
    strokeDasharray="8 4"
    rx="16"
  />
</svg>

{/* 그룹 헤더 (테두리 바깥 상단) */}
<div style={{ 
  left: bounds.x, 
  top: bounds.y - 32,
  backgroundColor: groupColor.stroke 
}}>
  <span className="text-xs font-semibold text-white">{group.name}</span>
</div>
```

#### 3. GroupQuickSelect (빠른 그룹 선택)
* **경로**: `/components/canvas/GroupQuickSelect.tsx`
* **용도**: NodeHeader에서 노드를 빠르게 그룹에 추가/제거
* **위치**: 노드 헤더 우측 (타입 배지 옆)
* **기능**:
  - 색상 점 클릭으로 그룹 토글
  - 소속 그룹은 파란색 체크 표시
  - 미소속 그룹은 회색 점 표시

**디자인**:
```tsx
<Popover>
  <PopoverTrigger>
    <Users className="w-3.5 h-3.5" />
  </PopoverTrigger>
  <PopoverContent className="w-48 p-2">
    {groups.map(group => {
      const isMember = group.nodeIds.includes(nodeId);
      return (
        <button
          onClick={() => isMember ? onRemove(group.id) : onAdd(group.id)}
          className="flex items-center gap-2 w-full px-2 py-1.5 rounded-lg hover:bg-secondary/10"
        >
          <div
            className="w-4 h-4 rounded-full border-2 flex items-center justify-center"
            style={{ 
              borderColor: groupColor,
              backgroundColor: isMember ? groupColor : 'transparent' 
            }}
          >
            {isMember && <Check className="w-3 h-3 text-white" />}
          </div>
          <span className="text-xs">{group.name}</span>
        </button>
      );
    })}
  </PopoverContent>
</Popover>
```

#### 4. NodeCard 색상 점 표시
* **경로**: `/components/canvas/NodeCard.tsx`
* **기능**: 노드 ID 옆에 타입 색상 점 + 그룹 색상 점 표시
* **레이아웃**: `#node-123 🔴🟡🔵` (ID → 타입 점 → 그룹 점들)

**타입 색상 매핑**:
```typescript
const typeColorMap: Record<NodeType, string> = {
  text: '#ef4444',      // 빨강
  image: '#3b82f6',     // 파랑
  video: '#22c55e',     // 초록
  process: '#a855f7',   // 보라
  mix: '#f59e0b',       // 주황
  composition: '#ec4899' // 핑크
};
```

**렌더링**:
```tsx
<span className="flex items-center gap-0.5">
  #{id}
  
  {/* 타입 색상 점 */}
  <span 
    className="w-1.5 h-1.5 rounded-full"
    style={{ backgroundColor: typeColorMap[type] }}
    title={`타입: ${NODE_TYPE_LABELS[type]}`}
  />
  
  {/* 그룹 색상 점들 */}
  {nodeGroups.map(group => (
    <span
      key={group.id}
      className="w-1.5 h-1.5 rounded-full"
      style={{ backgroundColor: groupColorMap[group.color] }}
      title={`그룹: ${group.name}`}
    />
  ))}
</span>
```

#### 5. AIAssistantToolbar (그룹핑 진입점)
* **경로**: `/components/canvas/AIAssistantToolbar.tsx`
* **기능**: 여러 노드 선택 시 "그룹핑" 버튼 제공
* **위치**: 상단 툴바 아래 (z-40)

**사용 흐름**:
```tsx
// CanvasWorkspace.tsx
<AIAssistantToolbar
  isVisible={selectedNodeIds.length > 1}
  selectedNodeCount={selectedNodeIds.length}
  onGroupNodes={() => {
    setEditingGroup(null);
    setIsGroupEditOpen(true);
  }}
/>
```

### 사용 시나리오

#### 시나리오 1: 새 그룹 생성
1. 캔버스에서 여러 노드 선택 (Shift + 클릭 or 박스 선택)
2. AI 질문하기 툴바에서 "그룹핑" 버튼 클릭
3. GroupEditDialog 열림
4. 그룹 이름 입력 (예: "Interior Design")
5. 색상 선택 (예: Blue)
6. Echo/Insight/Spark 슬라이더 조정
7. "그룹 생성" 버튼 클릭
8. 캔버스에 파란색 점선 영역 표시
9. 노드 ID 옆에 파란색 점 표시

#### 시나리오 2: 그룹에 노드 추가
**방법 1: GroupEditDialog에서**
1. 그룹 영역 헤더의 편집 버튼 클릭
2. "선택된 노드 추가" 버튼 클릭
3. 선택된 노드들이 그룹에 추가됨

**방법 2: GroupQuickSelect에서**
1. 노드 헤더의 Users 아이콘 클릭
2. 추가할 그룹의 색상 점 클릭
3. 즉시 그룹에 추가됨

#### 시나리오 3: AI 상징 이미지 생성
1. 그룹 편집 Dialog 열기
2. 그룹 내 이미지 노드 중 최대 3개 선택
3. "AI로 상징 생성" 버튼 클릭
4. AI가 선택된 이미지 + Echo/Insight/Spark 가중치로 합성
5. 대표 이미지 + 설명 자동 생성

#### 시나리오 4: 그룹 필터링
1. NodeGroupOverlay 상단의 색상 필터 클릭
2. 선택된 색상의 그룹만 표시
3. 다른 그룹은 숨김 (점선 영역 제거)

### 단축키

| 단축키 | 기능 |
|--------|------|
| `Ctrl + G` | 선택된 노드로 새 그룹 생성 |
| `Shift + 클릭` | 여러 노드 선택 (그룹핑 준비) |

### 데이터 흐름

```
CanvasWorkspace (상태 관리)
    ├─ groups: NodeGroup[]
    ├─ isGroupEditOpen: boolean
    ├─ editingGroup: NodeGroup | null
    ├─ activeGroupColors: Set<string>
    │
    ├─ handleCreateGroup(name, color, nodeIds, influences)
    ├─ handleUpdateGroup(groupId, updates)
    ├─ handleDeleteGroup(groupId)
    ├─ handleAddNodesToGroup(groupId, nodeIds)
    ├─ handleRemoveNodesFromGroup(groupId, nodeIds)
    └─ handleGenerateSymbol(groupId, imageNodeIds)

NodeGroupOverlay (시각화)
    └─ 각 그룹의 bounds 계산 및 SVG 렌더링

GroupEditDialog (편집 UI)
    ├─ 새 그룹: group=null, selectedNodeIds 사용
    └─ 기존 그룹: group 데이터 편집

NodeCard (색상 점 표시)
    └─ groups.filter(g => g.nodeIds.includes(id))
```

### 디자인 규칙

#### 그룹 색상 팔레트
```tsx
const GROUP_COLORS = [
  { value: 'yellow', label: 'Yellow', color: 'rgb(234, 179, 8)' },
  { value: 'blue', label: 'Blue', color: 'rgb(59, 130, 246)' },
  { value: 'pink', label: 'Pink', color: 'rgb(236, 72, 153)' },
  { value: 'green', label: 'Green', color: 'rgb(34, 197, 94)' },
  { value: 'purple', label: 'Purple', color: 'rgb(168, 85, 247)' },
  { value: 'orange', label: 'Orange', color: 'rgb(249, 115, 22)' },
];
```

#### 크기 및 간격
* 색상 점 크기: `w-1.5 h-1.5` (6px)
* 색상 점 간격: `gap-0.5` (2px)
* 그룹 테두리 두께: `2px`
* 그룹 테두리 점선: `strokeDasharray="8 4"`
* 그룹 헤더 높이: `32px`
* 그룹 곡률: `rx="16"` (16px)

#### CSS 변수
* 그룹 영역은 CSS 변수 없이 직접 색상 값 사용
* 이유: 6가지 색상이 라이트/다크모드에서 동일하게 유지

### 중요 원칙

* ✅ **다중 소속**: 한 노드는 여러 그룹에 속할 수 있음
* ✅ **피그마 섹션 방식**: 그룹은 논리적 컨테이너, 물리적 이동 없음
* ✅ **Echo/Insight/Spark**: 모든 그룹은 3가지 영향력 가중치 보유
* ✅ **AI 상징 이미지**: 최대 3개 이미지 선택 → AI 합성
* ✅ **색상 점 표시**: 노드 ID 옆에 타입 + 그룹 색상 점
* ✅ **점선 테두리**: 캔버스에 그룹 영역 시각화
* ⚠️ **노드 이동 독립**: 그룹에 속해도 노드는 자유롭게 이동 가능
* ⚠️ **자동 bounds 계산**: 그룹 영역은 소속 노드 위치에 따라 자동 조정

### 파일 구조
```
/components/canvas/
  ├── GroupEditDialog.tsx        # 그룹 생성/편집 Dialog
  ├── NodeGroupOverlay.tsx       # 캔버스 그룹 영역 표시
  ├── GroupQuickSelect.tsx       # 빠른 그룹 선택 Popover
  ├── NodeCard.tsx               # 색상 점 표시 (ID 옆)
  ├── AIAssistantToolbar.tsx     # 그룹핑 진입점
  ├── types.ts                   # NodeGroup 타입 정의
  └── CanvasWorkspace.tsx        # 그룹 상태 관리
```

### 향후 확장 가능성
* [ ] 그룹 내 노드 자동 정렬
* [ ] 그룹 복제 기능
* [ ] 그룹 병합/분리 기능
* [ ] 그룹별 프롬프트 일괄 적용
* [ ] 그룹 템플릿 저장/불러오기
* [ ] 그룹 계층 구조 (부모-자식 그룹)

---

## 일반 개발 가이드라인
* 절대 위치 지정보다는 flexbox와 grid를 우선 사용
* 컴포넌트는 재사용 가능하도록 작은 단위로 분리
* 파일 크기를 작게 유지하고 헬퍼 함수는 별도 파일로 분리
* 코드 리팩터링을 통해 깔끔한 코드 유지
* **하드코딩 금지**: 위 CSS 변수 시스템 참고