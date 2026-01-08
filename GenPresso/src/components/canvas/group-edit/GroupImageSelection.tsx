import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ImageWithFallback } from "../../figma/ImageWithFallback";
import type { Node } from "../types";
import { GROUP_COLORS } from "./constants";

interface GroupImageSelectionProps {
  groupNodes: Node[];
  selectedImageIds: string[];
  onToggleSelection: (nodeId: string) => void;
  colorData: typeof GROUP_COLORS[0] | undefined;
}

export function GroupImageSelection({
  groupNodes,
  selectedImageIds,
  onToggleSelection,
  colorData
}: GroupImageSelectionProps) {
  const [imagePage, setImagePage] = useState(0);

  const imageNodes = groupNodes.filter(n => n.type === 'image' && n.imageUrl);
  const hasImages = imageNodes.length > 0;
  const ITEMS_PER_PAGE = 10;
  const totalPages = hasImages ? Math.ceil(imageNodes.length / ITEMS_PER_PAGE) : 0;
  const startIdx = imagePage * ITEMS_PER_PAGE;
  const endIdx = startIdx + ITEMS_PER_PAGE;
  const currentPageItems = hasImages ? imageNodes.slice(startIdx, endIdx) : [];

  return (
    <div className="flex flex-col gap-3 h-full overflow-hidden">
      <div className="space-y-1 shrink-0">
        <h3 className="font-semibold text-base text-foreground">그룹 이미지 선택 ({selectedImageIds.length}/3)</h3>
        <p className="text-sm text-muted-foreground">AI 생성 시 가중치를 높게 반영할 이미지를 최대 3개 선택하세요</p>
      </div>

      <div className="flex-1 overflow-y-auto flex flex-col gap-2">
        {/* 포함된 노드 섹션 - 이전 삭제 요청으로 제거됨 (헤더와 빈 상태만 남음? 아니면 아예 제거?) */}
        {/* 사용자가 직전에 "삭제"라고 하면서 노드 리스트 div를 날렸음. 
            하지만 "포함된 노드" 헤더와 빈 상태 표시는 남아있었음.
            여기서는 "그룹 이미지 선택"이 메인이므로, 이미지 그리드만 보여주는 게 깔끔할 듯.
            하지만 원본 코드 구조를 최대한 유지.
        */}
        
        {/* 선택 가능한 이미지 그리드 */}
        <div className="flex flex-col gap-2 pt-2 shrink-0">
          <div className="flex items-center justify-between h-6">
            <p className="text-xs text-muted-foreground">
              {hasImages ? `선택 가능한 이미지 (${imageNodes.length})` : '선택 가능한 이미지'}
            </p>
            {totalPages > 1 && (
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setImagePage(p => Math.max(0, p - 1))}
                  disabled={imagePage === 0}
                  className="p-1 rounded-lg hover:bg-secondary/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <span className="text-xs text-muted-foreground min-w-[40px] text-center">
                  {imagePage + 1} / {totalPages}
                </span>
                <button
                  onClick={() => setImagePage(p => Math.min(totalPages - 1, p + 1))}
                  disabled={imagePage === totalPages - 1}
                  className="p-1 rounded-lg hover:bg-secondary/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-5 gap-1.5">
            {hasImages ? (
              currentPageItems.map((node) => {
                const isSelected = selectedImageIds.includes(node.id);
                return (
                  <div
                    key={node.id}
                    className="relative group cursor-pointer aspect-square"
                    onClick={() => onToggleSelection(node.id)}
                  >
                    <div
                      className="relative rounded-lg overflow-hidden border-2 transition-all h-full"
                      style={{
                        borderColor: isSelected ? colorData?.color : 'var(--color-glass-border)',
                        opacity: isSelected ? 1 : 0.6,
                      }}
                    >
                      <ImageWithFallback
                        src={node.imageUrl!}
                        alt={node.id}
                        className="w-full h-full object-cover"
                      />
                      {isSelected && (
                        <div
                          className="absolute inset-0 flex items-center justify-center"
                          style={{
                            backgroundColor: `${colorData?.color}40`,
                          }}
                        >
                          <div
                            className="w-3.5 h-3.5 rounded-full flex items-center justify-center text-white"
                            style={{ 
                              backgroundColor: colorData?.color,
                              fontSize: '8px',
                            }}
                          >
                            ✓
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-5 h-20 flex items-center justify-center rounded-lg border border-dashed" style={{
                borderColor: 'var(--color-glass-border)',
              }}>
                <p className="text-xs text-muted-foreground">이미지가 없습니다</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
