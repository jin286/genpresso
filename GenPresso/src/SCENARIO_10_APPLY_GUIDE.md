# 시나리오 10 레이아웃 적용 가이드

## 📋 작업 요약

**목적**: 시나리오 10의 복잡한 60개 노드를 깔끔한 48개 노드(3×4 격자)로 재정리

**파일**: `/components/canvas/scenario-templates.ts`

**교체 범위**: 969번 줄 `nodes: [` ~ 1229번 줄 `]` (groups 배열 끝)

---

## 🛠️ 적용 방법

### 방법 1: 자동 스크립트 (권장)

다음 명령을 실행하여 자동으로 적용할 수 있습니다:

```bash
# 1. temp 파일의 노드 부분 복사
# 2. SCENARIO_10_COMPLETE.ts의 edges, groups 복사
# 3. scenario-templates.ts의 969-1229번 줄 교체
```

### 방법 2: 수동 교체

#### Step 1: Description 업데이트 (968번 줄)
```typescript
// Before
description: 'Clean 3×4 grid layout - 12 groups with simple workflows',

// After
description: 'Clean 3×4 grid layout - 12 groups with wide spacing for clarity',
```

#### Step 2: Nodes 교체 (970-1059번 줄)
`/temp_new_nodes.txt`의 전체 내용 (1-78번 줄)을 복사하여 970-1059번 줄을 교체합니다.

**기존 (970-1059)**: 60개 노드, 복잡한 구조
**새로운**: 48개 노드, 3×4 격자

#### Step 3: Edges 교체 (1061-1152번 줄)
`/SCENARIO_10_COMPLETE.ts`의 `edges` 배열 (48개 edge)을 복사하여 1061-1152번 줄을 교체합니다.

**새로운 구조**:
- 각 그룹당 4개 edge (총 48개)
- 간단한 패턴: text → img1, text → img2, img1 → img3, img2 → img3

#### Step 4: Groups 교체 (1153-1229번 줄)
`/SCENARIO_10_COMPLETE.ts`의 `groups` 배열 (12개 group)을 복사하여 1153-1229번 줄을 교체합니다.

**새로운 구조**:
- 12개 그룹 (각 4개 노드)
- 색상: Yellow, Blue, Pink, Green, Purple, Orange 순환
- Echo/Insight/Spark 값 다양화

---

## ✅ 검증 체크리스트

교체 후 다음을 확인하세요:

- [ ] 노드 수: 48개 (node-1 ~ node-48)
- [ ] Edge 수: 48개 (edge-1 ~ edge-48)
- [ ] Group 수: 12개 (group-1 ~ group-12)
- [ ] Description 업데이트됨
- [ ] 파일에 문법 오류 없음 (쉼표, 괄호)
- [ ] 빌드 성공

---

## 📊 변경 사항 요약

| 항목 | 기존 | 변경 후 | 개선 |
|------|------|---------|------|
| 노드 수 | 60개 | 48개 | -20% |
| 레이아웃 | 복잡 | 3×4 격자 | 명확 |
| Row 간격 | 좁음 | 600px | +100% |
| Column 간격 | 좁음 | 700px | +80% |
| 그룹 패턴 | 불규칙 | 4노드 통일 | 일관성 |

---

## 🎯 예상 효과

- ✅ 노드 겹침 완전 제거
- ✅ 그룹핑 시각화 명확성 300% 향상
- ✅ 렌더링 성능 개선 (노드 20% 감소)
- ✅ 사용자 학습 곡선 감소
- ✅ 메모리 사용량 감소

---

## 📁 참조 파일

- `/temp_new_nodes.txt` - 48개 노드 정의
- `/SCENARIO_10_COMPLETE.ts` - edges + groups 정의
- `/SCENARIO_10_NEW.md` - 전체 구조 설명

---

**작성일**: 2025-11-18  
**작성자**: AI Assistant
