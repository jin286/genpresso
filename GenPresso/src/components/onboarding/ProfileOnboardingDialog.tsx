import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useLanguage } from "../../contexts/LanguageContext";
import { cn } from "../ui/utils";
import { VisuallyHidden } from "../ui/visually-hidden";

// 상수 데이터
const INDUSTRIES = [
  "industrialDesign",
  "communicationDesign",
  "videoFilm",
  "architectureSpace",
  "threeD",
  "contentsMarketing",
  "adPlanning",
  "developer",
  "educationResearch",
  "creator",
  "other"
];

const EXPERIENCE_OPTIONS = [
  { value: "0-1", label: "0–1년" },
  { value: "1-3", label: "1–3년" },
  { value: "3-7", label: "3–7년" },
  { value: "7-10", label: "7–10년" },
  { value: "10+", label: "10년 이상" },
  { value: "student", label: "학생" },
];

interface ProfileOnboardingDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

// 재사용 가능한 선택 버튼 컴포넌트
const SelectionButton = ({ 
  selected, 
  onClick, 
  children 
}: { 
  selected: boolean; 
  onClick: () => void; 
  children: React.ReactNode 
}) => (
  <button
    onClick={onClick}
    className={cn(
      "px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 border backdrop-blur-md",
      selected 
        ? "bg-primary text-primary-foreground shadow-md transform scale-105 border-primary" 
        : "bg-secondary/50 border-border/50 text-muted-foreground hover:bg-secondary hover:text-foreground hover:border-border"
    )}
  >
    {children}
  </button>
);

export function ProfileOnboardingDialog({ isOpen, onClose }: ProfileOnboardingDialogProps) {
  const { t } = useLanguage();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedIndustries, setSelectedIndustries] = useState<Set<string>>(new Set());
  const [selectedExperience, setSelectedExperience] = useState<string | null>(null);
  const [otherInputValue, setOtherInputValue] = useState("");
  
  const showOtherInput = selectedIndustries.has("other");

  // 모달이 닫힐 때 step 초기화
  useEffect(() => {
    if (!isOpen) {
      // 필요한 경우 초기화 로직 추가
    }
  }, [isOpen]);

  const handleToggleIndustry = (key: string) => {
    const newSet = new Set(selectedIndustries);
    if (newSet.has(key)) {
      newSet.delete(key);
    } else {
      newSet.add(key);
    }
    setSelectedIndustries(newSet);
  };

  const handleSubmit = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      localStorage.setItem("user_profile_setup_status", "completed");
      setStep(3);
    }
  };

  const handleSkip = () => {
    localStorage.setItem("user_profile_setup_status", "skipped");
    onClose();
  };

  const title = step === 1 ? t('onboarding.title') : "경력을 선택해주세요";
  const description = step === 1 ? t('onboarding.description') : "해당하는 경력 기간을 선택해주세요.";
  const fieldLabel = step === 1 ? t('onboarding.fieldLabel') : "경력";

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent 
        className="max-w-[640px] w-full h-[470px] p-0 overflow-hidden border shadow-2xl sm:rounded-[24px] [&>button]:hidden"
        style={{
          backgroundColor: 'var(--glass-bg)',
          borderColor: 'var(--glass-border)',
          backdropFilter: 'blur(var(--glass-backdrop))',
          WebkitBackdropFilter: 'blur(var(--glass-backdrop))',
          boxShadow: 'var(--glass-shadow)',
        }}
      >
        <VisuallyHidden>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
        </VisuallyHidden>

        {step === 3 ? (
            // Step 3: 완료 화면
            <div className="flex flex-col items-center justify-center w-full h-full p-8 text-center space-y-10 animate-in fade-in duration-300">
                <div className="space-y-4">
                    <h2 className="text-2xl md:text-3xl font-bold whitespace-pre-wrap leading-tight text-foreground drop-shadow-sm">
                        {t('onboarding.completion.title')}
                    </h2>
                    <p className="text-lg text-muted-foreground whitespace-pre-wrap leading-relaxed">
                        {t('onboarding.completion.description')}
                    </p>
                </div>
                <Button 
                    onClick={onClose}
                    className="w-full max-w-[320px] h-12 text-lg font-medium shadow-xl hover:shadow-primary/20 transition-all bg-primary hover:bg-primary/90 text-primary-foreground border-none rounded-xl"
                >
                    {t('onboarding.completion.button')}
                </Button>
            </div>
        ) : (
            // Step 1 & 2: 입력 화면
            <div className="flex flex-col w-full h-full">
                {/* Scrollable Content Area */}
                <div className="flex-1 overflow-y-auto p-8 md:p-12 flex flex-col items-center text-center space-y-8">
                    {/* 헤더 섹션 */}
                    <div className="space-y-3 pt-4 shrink-0">
                        <h2 className="text-2xl md:text-3xl font-bold whitespace-pre-wrap leading-tight text-foreground drop-shadow-sm">
                            {title}
                        </h2>
                        <p className="text-base text-muted-foreground">
                            {description}
                        </p>
                    </div>

                    {/* 콘텐츠 섹션 */}
                    <div className="w-full space-y-3 flex-1">
                        <p className="text-sm font-semibold text-left text-foreground/90 ml-1">
                            {fieldLabel}
                        </p>
                        <div className="flex flex-wrap gap-2.5 justify-center md:justify-start">
                            {step === 1 ? (
                                INDUSTRIES.map((key) => (
                                    <SelectionButton
                                        key={key}
                                        selected={selectedIndustries.has(key)}
                                        onClick={() => handleToggleIndustry(key)}
                                    >
                                        {key === 'other' ? t('onboarding.otherPlaceholder') : t(`settings.industries.${key}`)}
                                    </SelectionButton>
                                ))
                            ) : (
                                EXPERIENCE_OPTIONS.map((option) => (
                                    <SelectionButton
                                        key={option.value}
                                        selected={selectedExperience === option.value}
                                        onClick={() => setSelectedExperience(option.value)}
                                    >
                                        {option.label}
                                    </SelectionButton>
                                ))
                            )}
                        </div>
                    </div>

                    {/* 기타 입력 필드 */}
                    {step === 1 && showOtherInput && (
                        <div className="w-full animate-in fade-in slide-in-from-top-2 duration-200">
                            <Input 
                                placeholder={t('onboarding.otherPlaceholder')} 
                                value={otherInputValue}
                                onChange={(e) => setOtherInputValue(e.target.value)}
                                className="bg-background/50 border-input text-foreground placeholder:text-muted-foreground h-11 focus:border-primary focus:ring-primary/20 backdrop-blur-sm"
                            />
                        </div>
                    )}
                </div>

                {/* 하단 Footer 영역 */}
                <div 
                    className="shrink-0 w-full flex items-center justify-between px-6 py-3 border-t backdrop-blur-xl"
                    style={{
                        borderColor: 'var(--glass-border)',
                        backgroundColor: 'var(--glass-bg)',
                    }}
                >
                    <button 
                        onClick={step === 1 ? handleSkip : () => setStep(1)}
                        className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-4 py-2 rounded-lg hover:bg-secondary/50"
                    >
                        {step === 1 ? t('onboarding.skip') : (t('common.prev') || "이전")}
                    </button>
                    
                    <Button 
                        onClick={handleSubmit}
                        className="rounded-lg px-8 h-11 text-base font-medium shadow-lg hover:shadow-primary/20 transition-all bg-primary hover:bg-primary/90 text-primary-foreground border-none"
                    >
                        {step === 1 ? t('common.next') : t('onboarding.confirm')}
                    </Button>
                </div>
            </div>
        )}
      </DialogContent>
    </Dialog>
  );
}