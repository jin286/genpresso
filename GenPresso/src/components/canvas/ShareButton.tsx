import React, { memo, useCallback } from "react";
import { Share2 } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner@2.0.3";

interface ShareButtonProps {
  onShare?: () => void;
  className?: string;
}

/**
 * ShareButton - 공유 버튼 컴포넌트
 * 
 * @description
 * 캔버스 화면에서 사용되는 공유 버튼
 * - 호버 시 확대 및 그림자 효과
 * - 클릭 시 공유 링크 복사 토스트 메시지
 * - 일관된 디자인 시스템 적용
 */
function ShareButtonComponent({ onShare, className = "" }: ShareButtonProps) {
  const handleShare = useCallback(() => {
    if (onShare) {
      onShare();
    } else {
      // 기본 동작: 공유 링크 복사 알림
      toast.success("공유 링크가 복사되었습니다");
    }
  }, [onShare]);

  return (
    <Button
      size="sm"
      className={`w-11 h-11 p-0 rounded-full bg-primary/10 text-primary border border-primary/20 backdrop-blur-md hover:bg-primary/20 hover:scale-105 transition-all duration-200 hover:shadow-lg active:scale-95 ${className}`}
      onClick={handleShare}
    >
      <Share2 className="w-4 h-4" />
    </Button>
  );
}

ShareButtonComponent.displayName = "ShareButton";

export const ShareButton = memo(ShareButtonComponent);
