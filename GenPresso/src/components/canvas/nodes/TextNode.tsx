import React, { useRef, useEffect, useCallback } from "react";
import { Plus } from "lucide-react";
import { Textarea } from "../../ui/textarea";
import { Button } from "../../ui/button";
import { toast } from "sonner@2.0.3";
import { NODE_PADDING, NODE_RADIUS, NODE_BORDER, NODE_GAP, FLEX, INTERACTIVE_STYLES, cn } from "./node-styles";
import { useLanguage } from "../../../contexts/LanguageContext";


interface TextNodeProps {
  content: string;
  onChange: (value: string) => void;
  isOutput?: boolean;
  isSelected?: boolean;
  onTurnIntoImage?: () => void;
  onTurnIntoVideo?: () => void;
  onGenerate?: () => void;
}

export const TextNode = React.memo<TextNodeProps>(({ 
  content, 
  onChange, 
  isOutput = false,
  isSelected = false,
  onTurnIntoImage,
  onTurnIntoVideo,
  onGenerate,
}) => {
  const { t } = useLanguage();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [content]);

  const handleFileClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      toast.success(`파일 선택됨: ${file.name}`);
    }
  }, []);



  return (
    <div className={cn('w-full', NODE_PADDING.ALL, FLEX.COL, NODE_GAP.LG)}>
      <Textarea
        ref={textareaRef}
        placeholder={t('node.enterPrompt')}
        value={content}
        onChange={(e) => onChange(e.target.value)}
        readOnly={isOutput}
        className={cn(
          'w-full min-h-[60px] resize-none overflow-y-auto',
          NODE_RADIUS.SM,
          NODE_BORDER.DEFAULT,
          'border-border focus-visible:ring-0 focus-visible:border-primary/50 text-xs p-2',
          isOutput && 'bg-muted/50 cursor-default'
        )}
      />
      
      {!isOutput && (
        <>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            onChange={handleFileChange}
            className="hidden"
          />

        </>
      )}
    </div>
  );
});

TextNode.displayName = "TextNode";
