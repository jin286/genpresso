import React, { useState, memo, useRef } from "react";
import { motion } from "motion/react";
import { CloseButton } from "../ui/close-button";
import { User, Settings as SettingsIcon, CreditCard, Briefcase, ChevronLeft, ChevronRight } from "lucide-react";
import { CreditChargeDialog } from "../forms/CreditChargeDialog";
import { useLanguage } from "../../contexts/LanguageContext";
import { ProfileTab } from "./tabs/ProfileTab";
import { GeneralTab } from "./tabs/GeneralTab";
import { SubscriptionTab } from "./tabs/SubscriptionTab";
import { CreditTab } from "./tabs/CreditTab";
import { WorkspaceTab } from "./tabs/WorkspaceTab";

export type TabType = "profile" | "general" | "subscription" | "credit" | "workspace";

interface SettingsPanelProps {
  onClose: () => void;
  onLogout?: () => void;
  defaultTab?: TabType;
}

const SettingsPanelComponent = ({ onClose, onLogout, defaultTab = "profile" }: SettingsPanelProps) => {
  const [activeTab, setActiveTab] = useState<TabType>(defaultTab);

  React.useEffect(() => {
    setActiveTab(defaultTab);
  }, [defaultTab]);
  const [showCreditDialog, setShowCreditDialog] = useState(false);
  const { t } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);

  const tabs = [
    { id: "profile" as TabType, label: t('settings.profile'), icon: User },
    { id: "general" as TabType, label: t('settings.general'), icon: SettingsIcon },
    { id: "subscription" as TabType, label: t('settings.subscription'), icon: CreditCard },
    { id: "credit" as TabType, label: t('settings.credit'), icon: CreditCard },
    { id: "workspace" as TabType, label: t('settings.workspace'), icon: Briefcase },
  ];

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = 150;
      if (direction === "left") {
        current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <div className="flex flex-col h-full relative">
        <div className="absolute left-2.5 top-2.5 z-50">
          <CloseButton onClick={onClose} size="sm" />
        </div>

        <div className="flex items-center gap-2 px-12 py-2 border-b" style={{ borderColor: 'var(--glass-border)' }}>
          <SettingsIcon className="w-5 h-5 text-primary" />
          <h2 className="font-semibold">{t('settings.title')}</h2>
        </div>

        <div className="relative px-8 pt-1 group">
          <button 
            onClick={() => scroll("left")}
            className="absolute left-1 top-[45%] -translate-y-1/2 z-10 p-1 rounded-full bg-background/60 border shadow-sm text-muted-foreground hover:text-foreground hover:bg-background transition-all opacity-50 hover:opacity-100 md:hidden"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button 
            onClick={() => scroll("right")}
            className="absolute right-1 top-[45%] -translate-y-1/2 z-10 p-1 rounded-full bg-background/60 border shadow-sm text-muted-foreground hover:text-foreground hover:bg-background transition-all opacity-50 hover:opacity-100 md:hidden"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <div 
            ref={scrollRef}
            className="flex gap-0 overflow-x-auto relative [&::-webkit-scrollbar]:hidden"
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none' 
            }}
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-4 py-1.5 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'text-foreground font-medium'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <span className="text-sm">{tab.label}</span>
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-4 right-4 h-1 bg-primary rounded-lg"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
          <div 
            className="h-1 -mt-1 mx-4 rounded-lg" 
            style={{ backgroundColor: 'var(--glass-border)' }} 
          />
        </div>

        <div className={`flex-1 ${['general', 'profile', 'subscription'].includes(activeTab) ? 'overflow-hidden flex flex-col' : 'overflow-y-auto px-12 py-4'}`}>
          {activeTab === "profile" && <ProfileTab onLogout={onLogout} />}
          {activeTab === "general" && <GeneralTab />}
          {activeTab === "subscription" && <SubscriptionTab />}
          {activeTab === "credit" && <CreditTab onOpenDialog={() => setShowCreditDialog(true)} />}
          {activeTab === "workspace" && <WorkspaceTab />}
        </div>
      </div>

      <CreditChargeDialog 
        isOpen={showCreditDialog} 
        onClose={() => setShowCreditDialog(false)} 
      />
    </>
  );
};

SettingsPanelComponent.displayName = "SettingsPanel";

export const SettingsPanel = memo(SettingsPanelComponent);