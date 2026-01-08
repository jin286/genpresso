import React, { useState, useCallback } from "react";
import { Star, Check } from "lucide-react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import { ScrollArea } from "../../ui/scroll-area";
import { toast } from "sonner@2.0.3";
import type { Segment } from "./types";
import { useLanguage } from "../../../contexts/LanguageContext";

interface SegmentPropertiesProps {
  selectedSegments: Segment[];
  selectedSegmentIds: string[];
  onNameUpdate: (segmentId: string, newName: string) => void;
  onBatchNameUpdate: (name: string) => void;
  onBatchPromptUpdate: (prompt: string) => void;
  onDeselectSegment: (segmentId: string) => void;
  onPreviewSend: () => void;
  onMixNodeCreate: () => void;
  onGroupCreate: () => void;
}

const SegmentPropertiesComponent = ({
  selectedSegments,
  selectedSegmentIds,
  onNameUpdate,
  onBatchNameUpdate,
  onBatchPromptUpdate,
  onDeselectSegment,
  onPreviewSend,
  onMixNodeCreate,
  onGroupCreate,
}: SegmentPropertiesProps) => {
  const { t } = useLanguage();
  const [editingSegmentId, setEditingSegmentId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState<string>("");

  const handleNameSave = useCallback((segmentId: string, newName: string) => {
    if (!newName.trim()) {
      toast.error(t('segment.nameRequired'));
      setEditingSegmentId(null);
      setEditingName("");
      return;
    }

    onNameUpdate(segmentId, newName.trim());
    setEditingSegmentId(null);
    setEditingName("");
    toast.success(t('segment.nameChanged'));
  }, [onNameUpdate, t]);

  if (selectedSegments.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted/30 flex items-center justify-center">
            <Star className="w-6 h-6 text-muted-foreground" />
          </div>
          <p className="text-base font-semibold text-foreground">
            세그먼트를 선택하세요
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            좌측 리스트 또는 캔버스 클릭
          </p>
        </div>
      </div>
    );
  }

  return (
    <ScrollArea className="flex-1">
      <div className="p-6 space-y-6">
        {selectedSegments.length === 1 ? (
          /* 단일 선택 모드 */
          <>
            {/* 라벨 */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">
                Label
              </label>
              {editingSegmentId === selectedSegments[0].id ? (
                <>
                  <p className="text-xs text-muted-foreground">
                    Enter로 저장 · Esc로 취소
                  </p>
                  <Input
                    autoFocus
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    className="h-10 text-sm border-2 border-primary"
                    placeholder="세그먼트 이름 입력"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleNameSave(selectedSegments[0].id, editingName);
                      } else if (e.key === "Escape") {
                        setEditingSegmentId(null);
                        setEditingName("");
                      }
                    }}
                    onBlur={() => {
                      handleNameSave(selectedSegments[0].id, editingName);
                    }}
                  />
                </>
              ) : (
                <>
                  <p className="text-xs text-muted-foreground">
                    클릭하여 이름 변경
                  </p>
                  <div
                    className="h-10 px-3 py-2 rounded-lg border border-input bg-transparent text-sm cursor-pointer transition-all duration-200 flex items-center hover:border-primary/50 hover:bg-primary/5"
                    onClick={() => {
                      setEditingName(selectedSegments[0].name);
                      setEditingSegmentId(selectedSegments[0].id);
                    }}
                  >
                    <span className="text-foreground">
                      {selectedSegments[0]?.name || "세그먼트 이름"}
                    </span>
                  </div>
                </>
              )}
            </div>

            {/* 프롬프트 */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">
                Prompt
              </label>
              <Textarea
                defaultValue={selectedSegments[0].prompt || ""}
                className="text-sm min-h-[120px] resize-none"
                placeholder="세그먼트 설명 또는 생성 프롬프트..."
                readOnly
              />
            </div>

            <div className="h-px bg-border" />

            {/* 액션 */}
            <div className="space-y-2">
              <Button
                onClick={onPreviewSend}
                className="w-full h-10 gap-2"
                variant="default"
              >
                Preview 보내기
              </Button>

              <Button
                onClick={onMixNodeCreate}
                className="w-full h-10 gap-2"
                variant="secondary"
              >
                Mix Node 생성
              </Button>
            </div>
          </>
        ) : (
          /* 다중 선택 모드 */
          <>
            {/* 선택 개수 요약 */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground">
                {selectedSegments.length}개 세그먼트 선택됨
              </h3>

              {/* 선택된 세그먼트 배지 */}
              <div className="flex flex-wrap gap-2">
                {selectedSegments.map((segment) => (
                  <div
                    key={segment.id}
                    className="inline-flex items-center gap-1 h-7 pl-1.5 pr-1 rounded-lg border border-primary/30 bg-primary/10 text-xs text-foreground"
                  >
                    <span>{segment.name}</span>
                    <button
                      onClick={() => {
                        onDeselectSegment(segment.id);
                        toast.info(t('segment.deselected', { name: segment.name }));
                      }}
                      className="flex items-center justify-center w-3.5 h-3.5 rounded-full hover:bg-primary/30 transition-colors"
                    >
                      <Check className="w-2.5 h-2.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="h-px bg-border" />

            {/* 공통 라벨 */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">
                Label (공통 적용)
              </label>
              <p className="text-xs text-muted-foreground">
                Enter로 모든 세그먼트에 적용
              </p>
              <Input
                placeholder="모든 세그먼트에 적용할 이름"
                className="h-10 text-sm"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const value = (e.target as HTMLInputElement).value;
                    if (value.trim()) {
                      onBatchNameUpdate(value.trim());
                      toast.success(
                        t('segment.batchNameUpdated', { count: selectedSegments.length })
                      );
                      (e.target as HTMLInputElement).value = "";
                    }
                  }
                }}
              />
            </div>

            {/* 공통 프롬프트 */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">
                Prompt (공통 적용)
              </label>
              <p className="text-xs text-muted-foreground">
                Cmd/Ctrl + Enter로 모든 세그먼트에 적용
              </p>
              <Textarea
                placeholder="모든 세그먼트에 적용할 프롬프트"
                className="text-sm min-h-[100px] resize-none"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                    const value = (e.target as HTMLTextAreaElement).value;
                    if (value.trim()) {
                      onBatchPromptUpdate(value.trim());
                      toast.success(
                        t('segment.batchPromptUpdated', { count: selectedSegments.length })
                      );
                      (e.target as HTMLTextAreaElement).value = "";
                    }
                  }
                }}
              />
            </div>

            <div className="h-px bg-border" />

            {/* 일괄 작업 버튼 */}
            <div className="space-y-2">
              <Button
                onClick={onPreviewSend}
                className="w-full h-10 gap-2"
                variant="default"
              >
                Preview 보내기 ({selectedSegments.length}개)
              </Button>

              <Button
                onClick={onMixNodeCreate}
                className="w-full h-10 gap-2"
                variant="secondary"
              >
                Mix Node 생성 ({selectedSegments.length}개)
              </Button>

              <Button
                onClick={onGroupCreate}
                className="w-full h-10 gap-2"
                variant="outline"
              >
                그룹 만들기
              </Button>
            </div>
          </>
        )}
      </div>
    </ScrollArea>
  );
};

SegmentPropertiesComponent.displayName = 'SegmentProperties';

export const SegmentProperties = React.memo(SegmentPropertiesComponent);
