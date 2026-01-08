import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "../ui/dialog";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { VisuallyHidden } from "../ui/visually-hidden";

interface SystemPromptDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialPrompt?: string;
  onSave: (prompt: string) => void;
}

export const SystemPromptDialog = ({ open, onOpenChange, initialPrompt = "", onSave }: SystemPromptDialogProps) => {
  const [prompt, setPrompt] = useState(initialPrompt);

  useEffect(() => {
    if (open) setPrompt(initialPrompt);
  }, [open, initialPrompt]);

  const handleSave = () => {
    onSave(prompt);
    onOpenChange(false);
  };

  const handleRestore = () => {
    setPrompt(initialPrompt);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="max-w-xl p-0 gap-0 sm:rounded-xl overflow-hidden border-[0.5px] z-[100]"
        style={{
          backgroundColor: 'var(--color-glass-bg)',
          backdropFilter: 'blur(var(--blur-glass))',
          WebkitBackdropFilter: 'blur(var(--blur-glass))',
          borderColor: 'var(--color-glass-border)',
          boxShadow: 'var(--glass-shadow)',
        }}
      >
        <VisuallyHidden>
          <DialogTitle>시스템 프롬프트 에디터</DialogTitle>
          <DialogDescription>AI 어시스턴트의 행동을 정의하는 시스템 프롬프트를 편집합니다.</DialogDescription>
        </VisuallyHidden>

        {/* Header */}
        <div 
          className="flex items-center justify-between px-6 py-4 border-b"
          style={{ borderColor: 'var(--color-glass-border)' }}
        >
          <h2 className="text-xl font-semibold text-foreground tracking-tight">시스템 프롬프트 에디터</h2>
        </div>

        {/* Body */}
        <div className="p-6">
          <div className="flex justify-between mb-2 items-center">
            <span className="text-sm font-medium text-foreground">System Prompt</span>
            <span className="text-xs text-muted-foreground">{prompt.length} / 500 characters</span>
          </div>
          <div 
            className="border rounded-lg p-1 transition-colors focus-within:border-primary/50"
            style={{ 
              backgroundColor: 'var(--color-glass-bg)',
              borderColor: 'var(--color-glass-border)'
            }}
          >
            <Textarea 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value.slice(0, 500))}
              placeholder="Enter the system prompt that defines the AI assistant's behavior... (Leave empty to use no system prompt)"
              className="min-h-[200px] bg-transparent border-none text-foreground focus-visible:ring-0 resize-none placeholder:text-muted-foreground text-base leading-relaxed"
            />
          </div>
        </div>

        {/* Footer */}
        <div 
          className="flex items-center justify-end gap-2 px-6 py-4 border-t"
          style={{ borderColor: 'var(--color-glass-border)' }}
        >
          <Button 
            variant="ghost" 
            className="h-9 px-4 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/20" 
            onClick={handleRestore}
          >
            Restore
          </Button>
          <Button 
            className="h-9 px-6 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm" 
            onClick={handleSave}
          >
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
