import React, { useCallback, useMemo, useState } from "react";
import { toast } from "sonner@2.0.3";
import { ChevronLeft, Upload } from "lucide-react";
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
import { CloseButton } from "../ui/close-button";
import { useLanguage } from "../../contexts/LanguageContext";
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

interface HelpPanelProps {
  onClose: () => void;
  onViewChange?: (view: 'menu' | 'feedback') => void;
}

type PanelView = 'menu' | 'feedback';

const HelpPanelComponent = ({ onClose, onViewChange }: HelpPanelProps) => {
  const { t } = useLanguage();
  const [view, setView] = useState<PanelView>('menu');
  
  // Feedback Form State
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  
  // view 변경 시 부모에게 알림
  const handleViewChange = (newView: PanelView) => {
    setView(newView);
    onViewChange?.(newView);
  };
  
  const helpItems = useMemo(() => [
    { 
      iconStroke: <IconStrokeNote />, 
      iconFilled: <IconFilledNote />, 
      label: t('help.feedback'), 
      message: t('help.feedbackMessage') 
    },
    { 
      iconStroke: <IconStrokeService />, 
      iconFilled: <IconFilledService />, 
      label: t('help.helpCenter'), 
      message: t('help.helpCenterMessage') 
    },
    { 
      iconStroke: <IconStrokeArchive />, 
      iconFilled: <IconFilledArchive />, 
      label: t('help.userGuide'), 
      message: t('help.userGuideMessage') 
    },
    { 
      iconStroke: <IconStrokePolicy />, 
      iconFilled: <IconFilledPolicy />, 
      label: t('help.termsOfUse'), 
      message: t('help.termsOfUseMessage') 
    },
    { 
      iconStroke: <IconStrokePolicy />, 
      iconFilled: <IconFilledPolicy />, 
      label: t('help.copyrightPolicy'), 
      message: t('help.copyrightPolicyMessage') 
    },
  ], [t]);

  const handleItemClick = useCallback((message: string, index: number) => {
    // 첫 번째 항목(문의/피드백)은 폼으로 전환
    if (index === 0) {
      handleViewChange('feedback');
      return;
    }
    
    // 나머지는 기존처럼 toast
    toast.success(message);
    onClose();
  }, [onClose]);

  const handleBack = () => {
    handleViewChange('menu');
    // 폼 상태 초기화? 유지? 
    // 보통 뒤로가기 하면 상태를 유지하는 것이 좋음, 필요시 여기서 초기화
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!category || !content) {
      toast.error(t('feedback.fillRequired'));
      return;
    }

    // 실제 제출 로직 (API 연동 등)
    toast.success(t('feedback.submitSuccess'));
    
    // 폼 초기화 및 닫기
    setCategory("");
    setContent("");
    setFile(null);
    onClose();
  };
  
  return (
    <div 
      className={`help-panel relative rounded-2xl border-[0.5px] border-solid transition-all duration-300 ease-in-out flex flex-col ${view === 'feedback' ? 'w-full' : 'w-full'}`}
      style={{
        backdropFilter: 'blur(var(--blur-glass))',
        WebkitBackdropFilter: 'blur(var(--blur-glass))',
        backgroundColor: 'var(--color-glass-bg)',
        borderColor: 'var(--color-glass-border)',
        boxShadow: 'var(--glass-shadow)',
        height: '100%',
        maxHeight: '100%',
      }}
      data-name="HelpPanel"
    >
      {/* 닫기 버튼 (항상 표시) */}
      <div className="absolute right-2.5 top-2.5 z-50">
        <CloseButton size="sm" onClick={onClose} />
      </div>

      <div className="flex flex-col gap-1 p-2.5 overflow-y-auto flex-1">
        {/* 헤더 */}
        <div className="flex items-center gap-1 pl-0.5 pr-1.5 py-0.5">
          {view === 'feedback' && (
            <button 
              onClick={handleBack}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}
          <p className="text-xs leading-none font-semibold text-foreground">
            {view === 'feedback' ? t('help.feedback') : t('help.support')}
          </p>
        </div>
        
        {/* 안내 문구 (피드백 폼일 때만) */}
        {view === 'feedback' && (
          <p className="text-[10px] text-muted-foreground px-1.5 pb-1 leading-tight">
            {t('feedback.titleDescription')}
          </p>
        )}
        
        {/* 구분선 */}
        <div 
          className="border-b border-border mb-1" 
          style={{ 
            width: 'calc(100% + 20px)',
            marginLeft: '-10px',
            marginRight: '-10px'
          }} 
        /> 
        
        {view === 'menu' ? (
          /* 메뉴 리스트 */
          <>
            {helpItems.map((item, index) => (
              <HelpListItem
                key={index}
                iconStroke={item.iconStroke}
                iconFilled={item.iconFilled}
                label={item.label}
                onClick={() => handleItemClick(item.message, index)}
              />
            ))}
          </>
        ) : (
          /* 피드백 폼 */
          <form onSubmit={handleSubmit} className="flex flex-col gap-2 px-1 pt-1 pb-1">
            {/* 카테고리 */}
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground ml-1">
                {t('feedback.category')} <span className="text-red-500">*</span>
              </label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger 
                  className="w-full h-9 text-xs"
                  style={{
                    backgroundColor: 'var(--color-glass-bg)',
                    borderColor: 'var(--color-glass-border)',
                  }}
                >
                  <SelectValue placeholder={t('feedback.selectCategory')} />
                </SelectTrigger>
                <SelectContent className="z-[100]">
                  <SelectItem value="bug">{t('feedback.categoryBug')}</SelectItem>
                  <SelectItem value="feature">{t('feedback.categoryFeature')}</SelectItem>
                  <SelectItem value="inconvenience">{t('feedback.categoryInconvenience')}</SelectItem>
                  <SelectItem value="praise">{t('feedback.categoryPraise')}</SelectItem>
                  <SelectItem value="inquiry">{t('feedback.categoryInquiry')}</SelectItem>
                  <SelectItem value="other">{t('feedback.categoryOther')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* 내용 필드 */}
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground ml-1">
                {t('feedback.contentLabel')} <span className="text-red-500">*</span>
              </label>
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={t('feedback.contentPlaceholder')}
                className="w-full min-h-[80px] text-xs resize-none placeholder:text-[10px] placeholder:opacity-70"
                style={{
                  backgroundColor: 'var(--color-glass-bg)',
                  borderColor: 'var(--color-glass-border)',
                }}
              />
            </div>

            {/* 파일 첨부 */}
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground ml-1">
                {t('feedback.attachFile')}
              </label>
              <div
                className="relative border border-dashed rounded-xl py-4 px-3 text-center cursor-pointer hover:border-primary/50 transition-colors group"
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
                <div className="flex items-center justify-center gap-2 text-muted-foreground group-hover:text-primary transition-colors">
                  <Upload className="w-3.5 h-3.5" />
                  <span className="text-xs">
                    {file ? file.name : t('feedback.dragDropFile')}
                  </span>
                </div>
              </div>
            </div>

            {/* 제출 버튼 */}
            <div className="pt-1">
              <Button
                type="submit"
                className="w-full h-9 bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-medium"
              >
                {t('feedback.submit')}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

HelpPanelComponent.displayName = 'HelpPanel';

const HelpPanel = React.memo(HelpPanelComponent);

export default HelpPanel;