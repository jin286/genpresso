import { memo } from 'react';
import type { SelectionBox as SelectionBoxType } from './types';

interface SelectionBoxProps {
  selectionBox: SelectionBoxType;
  zoom: number;
  panOffset: { x: number; y: number };
}

const SelectionBoxComponent = ({ selectionBox }: SelectionBoxProps) => {
  // 부모 컨테이너에 이미 transform이 적용되어 있으므로 캔버스 좌표를 직접 사용
  const startX = selectionBox.startX;
  const startY = selectionBox.startY;
  const currentX = selectionBox.currentX;
  const currentY = selectionBox.currentY;
  
  return (
    <div
      className="absolute border-2 border-primary bg-primary/10 pointer-events-none"
      style={{
        left: `${Math.min(startX, currentX)}px`,
        top: `${Math.min(startY, currentY)}px`,
        width: `${Math.abs(currentX - startX)}px`,
        height: `${Math.abs(currentY - startY)}px`,
      }}
    />
  );
};

SelectionBoxComponent.displayName = "SelectionBox";

export const SelectionBox = memo(SelectionBoxComponent);
