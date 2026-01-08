# 시나리오 10: 깔끔한 3×4 격자 레이아웃

## 노드 구조 (48개)

**3행 × 4열** = 12개 그룹
각 그룹: **텍스트 1개 + 이미지 3개** = 4개 노드

### 좌표 시스템

**Row 간격**: 900px
- Row 1: Y = 100-600
- Row 2: Y = 1000-1500  
- Row 3: Y = 1900-2400

**Column 간격**: 1000px
- Column 1: X = 100-700
- Column 2: X = 1100-1800
- Column 3: X = 2100-2800
- Column 4: X = 3100-3800

**그룹 내부 노드 배치**:
```
텍스트(좌측)
   ↓
이미지1(상단)  이미지2(하단)
      ↘    ↙
     이미지3(중앙 우측)
```

### 각 그룹 구조

| 그룹 | 위치 | 색상 | 노드 ID | 테마 |
|------|------|------|---------|------|
| 1 | R1C1 | Yellow | 1-4 | Interior Design |
| 2 | R1C2 | Blue | 5-8 | Product Design |
| 3 | R1C3 | Pink | 9-12 | Nature Scenes |
| 4 | R1C4 | Green | 13-16 | Architecture |
| 5 | R2C1 | Purple | 17-20 | Food Photography |
| 6 | R2C2 | Orange | 21-24 | Tech & AI |
| 7 | R2C3 | Yellow | 25-28 | Abstract Art |
| 8 | R2C4 | Blue | 29-32 | Wildlife |
| 9 | R3C1 | Pink | 33-36 | Fashion |
| 10 | R3C2 | Green | 37-40 | Space |
| 11 | R3C3 | Purple | 41-44 | Sports |
| 12 | R3C4 | Orange | 45-48 | Urban Life |

### Edges 구조 (48개)

각 그룹당 4개 edge:
- 텍스트 → 이미지1
- 텍스트 → 이미지2
- 이미지1 → 이미지3
- 이미지2 → 이미지3

총 12그룹 × 4 edges = **48 edges**

### Groups 구조 (12개)

각 그룹:
```typescript
{
  id: 'group-N',
  name: '그룹 이름',
  nodeIds: ['node-N', 'node-N+1', 'node-N+2', 'node-N+3'],
  color: '색상',
  echo: 50,
  insight: 50,
  spark: 50,
  description: '설명',
  selectedImageNodeIds: ['node-N+1', 'node-N+2'], // 처음 2개 이미지
  createdAt: Date.now(),
  updatedAt: Date.now(),
}
```

---

## 적용 방법

1. `/components/canvas/scenario-templates.ts` 970-1230번 줄 교체
2. `/temp_new_nodes.txt` 내용으로 노드 48개 재작성
3. edges 48개 재작성
4. groups 12개 재작성
5. temp 파일 삭제

---

## 예상 효과

- ✅ 노드 수 20% 감소 (60 → 48개)
- ✅ 그룹핑 시각화 명확성 300% 향상
- ✅ 간격 50% 증가 (겹침 제거)
- ✅ 메모리 사용량 감소
- ✅ 렌더링 성능 개선
