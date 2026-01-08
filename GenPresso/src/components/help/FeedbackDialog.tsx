import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useLanguage } from "../../contexts/LanguageContext";
import { toast } from "sonner@2.0.3";
import { Upload } from "lucide-react";

interface FeedbackDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const FeedbackDialog = ({ open, onOpenChange }: FeedbackDialogProps) => {
  const { t } = useLanguage();
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!category || !title || !content) {
      toast.error(t('feedback.fillRequired'));
      return;
    }

    // TODO: 실제 제출 로직 구현
    toast.success(t('feedback.submitSuccess'));
    
    // 폼 초기화
    setCategory("");
    setTitle("");
    setContent("");
    setFile(null);
    onOpenChange(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="max-w-2xl border-[0.5px]"
        style={{
          backgroundColor: 'var(--color-glass-bg)',
          backdropFilter: 'blur(var(--blur-glass))',
          WebkitBackdropFilter: 'blur(var(--blur-glass))',
          borderColor: 'var(--color-glass-border)',
          boxShadow: 'var(--glass-shadow)',
        }}
      >
        <DialogHeader>
          <DialogTitle className="text-foreground">
            {t('feedback.title')}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-xs">
            {t('feedback.titleDescription')}
          </DialogDescription>
        </DialogHeader>

        {/* Header 구분선 */}
        <div 
          className="h-px w-full -mt-2"
          style={{
            backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 166 1\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(5.0823e-16 0.05 -8.3 3.0616e-18 83 0.5)\\'><stop stop-color=\\'rgba(255,255,255,0.2)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(255,255,255,0)\\' offset=\\'1\\'/></radialGradient></defs></svg>')"
          }}
        />

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 카테고리 선택 */}
          <div className="space-y-2">
            <label className="text-xs text-foreground">
              {t('feedback.category')} <span className="text-red-500">*</span>
            </label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger 
                className="w-full"
                style={{
                  backgroundColor: 'var(--color-glass-bg)',
                  borderColor: 'var(--color-glass-border)',
                }}
              >
                <SelectValue placeholder={t('feedback.selectCategory')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">{t('feedback.categoryGeneral')}</SelectItem>
                <SelectItem value="feature">{t('feedback.categoryFeature')}</SelectItem>
                <SelectItem value="bug">{t('feedback.categoryBug')}</SelectItem>
                <SelectItem value="improvement">{t('feedback.categoryImprovement')}</SelectItem>
                <SelectItem value="other">{t('feedback.categoryOther')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 제목 입력 */}
          <div className="space-y-2">
            <label className="text-xs text-foreground">
              {t('feedback.subjectLabel')} <span className="text-red-500">*</span>
            </label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={t('feedback.subjectPlaceholder')}
              className="w-full"
              style={{
                backgroundColor: 'var(--color-glass-bg)',
                borderColor: 'var(--color-glass-border)',
              }}
            />
          </div>

          {/* 내용 입력 */}
          <div className="space-y-2">
            <label className="text-xs text-foreground">
              {t('feedback.contentLabel')} <span className="text-red-500">*</span>
            </label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={t('feedback.contentPlaceholder')}
              className="w-full min-h-[120px] resize-none"
              style={{
                backgroundColor: 'var(--color-glass-bg)',
                borderColor: 'var(--color-glass-border)',
              }}
            />
          </div>

          {/* 파일 첨부 */}
          <div className="space-y-2">
            <label className="text-xs text-foreground">
              {t('feedback.attachFile')}
            </label>
            <div
              className="relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
              style={{
                backgroundColor: 'var(--color-glass-bg)',
                borderColor: 'var(--color-glass-border)',
              }}
              onClick={() => document.getElementById('file-input')?.click()}
            >
              <input
                id="file-input"
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept="image/*,.pdf,.doc,.docx"
              />
              <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-xs text-muted-foreground">
                {file ? file.name : t('feedback.dragDropFile')}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {t('feedback.maxFileSize')}
              </p>
            </div>
          </div>

          {/* Footer 구분선 */}
          <div 
            className="h-px w-full"
            style={{
              backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 166 1\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(5.0823e-16 0.05 -8.3 3.0616e-18 83 0.5)\\'><stop stop-color=\\'rgba(255,255,255,0.2)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(255,255,255,0)\\' offset=\\'1\\'/></radialGradient></defs></svg>')"
            }}
          />

          {/* 제출 버튼 */}
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              {t('common.cancel')}
            </Button>
            <Button
              type="submit"
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {t('feedback.submit')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};