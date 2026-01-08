import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { GenerateButton } from "../../ui/generate-button";
import { cn } from "../nodes/node-styles";
import type { NodeGroup } from "../types";
import { GROUP_COLORS } from "./constants";

interface GroupDescriptionProps {
  group: NodeGroup;
  colorData: typeof GROUP_COLORS[0] | undefined;
  isGenerating: boolean;
  onGenerate: () => Promise<void>;
  onUpdate: (description: string) => void;
}

export function GroupDescription({
  group,
  colorData,
  isGenerating,
  onGenerate,
  onUpdate
}: GroupDescriptionProps) {
  const [page, setPage] = useState(0);

  // 현재 설명과 히스토리를 통합하여 표시 목록 생성 (중복 제거)
  const allItems = Array.from(new Set([
    ...(group.description ? [group.description] : []),
    ...(group.descriptionHistory || [])
  ]));

  const hasItems = allItems.length > 0;
  const ITEMS_PER_PAGE = 3;
  const totalPages = hasItems ? Math.ceil(allItems.length / ITEMS_PER_PAGE) : 0;
  const startIdx = page * ITEMS_PER_PAGE;
  const endIdx = startIdx + ITEMS_PER_PAGE;
  const currentPageItems = allItems.slice(startIdx, endIdx);

  return (
    <div className="hidden" />
  );
}
