import { toast } from "sonner@2.0.3";

export const useClipboard = () => {
  const copyToClipboard = async (text: string, successMessage = "공유 링크가 복사되었습니다.") => {
    try {
      // Try modern Clipboard API
      await navigator.clipboard.writeText(text);
      toast.success(successMessage);
    } catch (err) {
      // Fallback to older method
      try {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        
        if (successful) {
          toast.success(successMessage);
        } else {
          toast.error("링크 복사에 실패했습니다.");
        }
      } catch (fallbackErr) {
        toast.error("링크 복사에 실패했습니다. 브라우저가 지원하지 않습니다.");
      }
    }
  };

  return { copyToClipboard };
};
