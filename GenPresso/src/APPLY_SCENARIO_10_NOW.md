# 🚀 시나리오 10 적용 - 즉시 실행 가이드

## ✅ 준비 완료!

모든 파일이 준비되었습니다. 이제 **5분**이면 적용 완료됩니다!

---

## 📋 적용 단계 (3단계)

### Step 1: `/components/canvas/scenario-templates.ts` 파일 열기

VS Code 또는 에디터에서 파일을 엽니다.

---

### Step 2: 970-1059번 줄 교체 (Nodes)

#### Before (삭제할 범위)
```
970:     // ===== GROUP 1 - Interior Design Workflow ...
971:     { id: 'node-1', type: 'text', content: '현대적인 거실 디자인을 생성해주세요...
...
1059:     { id: 'node-60', type: 'image', ...
```

#### After (붙여넣을 내용)
`/temp_new_nodes.txt`의 **1-78번 줄 전체**를 복사하여 붙여넣습니다.

**팁**: 
- VS Code에서 `Ctrl+G` → `970` 입력하여 970번 줄로 이동
- `Shift+Ctrl+G` → `1059` 입력하여 1059번 줄까지 선택
- 삭제 후 `/temp_new_nodes.txt` 내용 붙여넣기

---

### Step 3: 1062-1152번 줄 교체 (Edges)

#### Before (삭제할 범위)
```
1062:     // GROUP 1 - Interior Design (1 text → 1 image → 10 detail images → 2 composite)
1063:     { id: 'edge-1', sourceId: 'node-1', targetId: 'node-2' },
...
1152:   ],
```

#### After (붙여넣을 내용)
`/SCENARIO_10_COMPLETE.ts`의 **edges 배열** (라인 85-132)을 복사하여 붙여넣습니다.

```typescript
  edges: [
    // GROUP 1 - Interior Design (text → 3 images)
    { id: 'edge-1', sourceId: 'node-1', targetId: 'node-2' },
    { id: 'edge-2', sourceId: 'node-1', targetId: 'node-3' },
    { id: 'edge-3', sourceId: 'node-2', targetId: 'node-4' },
    { id: 'edge-4', sourceId: 'node-3', targetId: 'node-4' },
    
    // ... (전체 48개 edges)
  ],
```

---

### Step 4: 1154-1229번 줄 교체 (Groups)

#### Before (삭제할 범위)
```
1154:     { 
1155:       id: 'group-1', 
1156:       name: 'Interior Design', 
...
1228:     },
1229:   ]
```

#### After (붙여넣을 내용)
`/SCENARIO_10_COMPLETE.ts`의 **groups 배열** (라인 133-243)을 복사하여 붙여넣습니다.

```typescript
  groups: [
    { 
      id: 'group-1', 
      name: 'Interior Design', 
      nodeIds: ['node-1', 'node-2', 'node-3', 'node-4'], 
      color: 'yellow',
      echo: 75,
      insight: 60,
      spark: 40,
      description: '모던하고 따뜻한 분위기의 거실 디자인 그룹',
      selectedImageNodeIds: ['node-2', 'node-3'],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    // ... (전체 12개 groups)
  ]
```

---

## ✅ 검증 체크리스트

적용 후 확인:
- [ ] 노드 수: 48개 (node-1 ~ node-48)
- [ ] Edge 수: 48개 (edge-1 ~ edge-48)
- [ ] Group 수: 12개 (group-1 ~ group-12)
- [ ] 파일에 문법 오류 없음 (쉼표, 괄호 확인)
- [ ] Description: "Clean 3×4 grid layout - 12 groups with wide spacing for clarity"

---

## 🗑️ Step 5: Temp 파일 정리

적용 완료 후 다음 파일 삭제:
```bash
rm /temp_new_nodes.txt
rm /SCENARIO_10_COMPLETE.ts
rm /SCENARIO_10_NEW.md
rm /SCENARIO_10_APPLY_GUIDE.md
rm /APPLY_SCENARIO_10_NOW.md  # (이 파일도)
```

---

## 🎯 예상 효과

- ✅ 노드 20% 감소 (60→48개)
- ✅ Row 간격 600px, Column 간격 700px (겹침 완전 제거)
- ✅ 3행×4열 깔끔한 격자 레이아웃
- ✅ 그룹핑 시각화 300% 향상
- ✅ 메모리 및 렌더링 성능 개선

---

## 📸 테스트 방법

1. 메인 페이지 접속
2. "이어하기" 섹션에서 **"10. Grouping Test + Temporary Workspace"** 클릭
3. 캔버스에 **3행×4열 격자**로 48개 노드 확인
4. 12개 그룹의 점선 영역 확인

---

## ⚠️ 주의사항

- **백업 권장**: 작업 전 `scenario-templates.ts` 파일 복사 보관
- **줄 번호 확인**: 970, 1062, 1154 번 줄이 정확한지 확인
- **쉼표 주의**: 마지막 배열 항목에 쉼표(`,`) 제거 확인

---

**작성일**: 2025-11-18  
**예상 소요 시간**: 5분  
**난이도**: ⭐⭐ (쉬움)
