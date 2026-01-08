import React from "react";
import { toast } from "sonner@2.0.3";
import { 
  IconStrokeArchive, 
  IconFilledArchive, 
  IconStrokeService, 
  IconFilledService, 
  IconStrokeNote, 
  IconFilledNote, 
  IconStrokePolicy, 
  IconFilledPolicy 
} from "../icons";
import { HelpListItem } from "../ui/help-list-item";

interface HelpDrawerContentProps {
  onClose: () => void;
}

const helpItems = [
  {
    iconStroke: <IconStrokeArchive />,
    iconFilled: <IconFilledArchive />,
    label: "아카이브",
    message: "아카이브 페이지로 이동합니다."
  },
  {
    iconStroke: <IconStrokeService />,
    iconFilled: <IconFilledService />,
    label: "서비스 사용방법",
    message: "서비스 사용방법 페이지로 이동합니다."
  },
  {
    iconStroke: <IconStrokeNote />,
    iconFilled: <IconFilledNote />,
    label: "릴리즈 노트",
    message: "릴리즈 노트 페이지로 이동합니다."
  },
  {
    iconStroke: <IconStrokePolicy />,
    iconFilled: <IconFilledPolicy />,
    label: "이용약관 및 정책",
    message: "이용약관 및 정책 페이지로 이동합니다."
  }
];

export default function HelpDrawerContent({ onClose }: HelpDrawerContentProps) {
  return (
    <div className="flex flex-col gap-1 p-2.5 pt-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between px-2.5 py-1">
        <p 
          className="text-xs leading-none" 
          style={{ color: 'var(--color-glass-text)' }}
        >
          문의하기
        </p>
      </div>
      
      {/* 구분선 */}
      <div 
        className="h-px w-full" 
        style={{ backgroundColor: 'var(--color-glass-border)' }} 
      />
      
      {/* 도움말 항목들 */}
      {helpItems.map((item, index) => (
        <HelpListItem
          key={index}
          iconStroke={item.iconStroke}
          iconFilled={item.iconFilled}
          label={item.label}
          onClick={() => {
            toast.success(item.message);
            onClose();
          }}
        />
      ))}
    </div>
  );
}
