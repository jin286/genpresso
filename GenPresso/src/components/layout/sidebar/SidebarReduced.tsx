import React from "react";
import { IconUnifiedArrowDown } from "../../icons";
import { CloseButton } from "../../ui/close-button";
import { useLanguage } from "../../../contexts/LanguageContext";
import { ProfileField } from "../common/SideNavProfileComponents";
import { Separator, QuickActions } from "./SidebarCommon";

// --- Profile Component ---

function ProfileExpandedSmall({ onNotificationClick, onMessageClick }: { onNotificationClick?: () => void; onMessageClick?: () => void }) {
  return (
    <div 
      className="h-[120px] relative rounded-2xl shrink-0 w-full border-[0.5px] border-solid bg-glass-bg border-glass-border shadow-glass-shadow backdrop-blur-glass" 
      data-name="Profile Expanded (Small)"
    >
      <div className="flex flex-col items-center relative size-full">
        <div className="box-border content-stretch flex flex-col gap-1 items-center p-2.5 relative size-full">
          <ProfileField />
          <QuickActions onNotificationClick={onNotificationClick} onMessageClick={onMessageClick} />
        </div>
      </div>
    </div>
  );
}

// --- Expand Button ---

function ArrowDropDownBig() {
  return (
    <div className="relative size-4 transition-all duration-200 hover:scale-110 hover:opacity-80" data-name="Arrow_drop_down_big">
      <IconUnifiedArrowDown size={16} className="text-glass-icon" />
    </div>
  );
}

function ExpandBtn() {
  const { t } = useLanguage();
  return (
    <div className="relative shrink-0 w-full" data-name="Expand Btn">
      <button 
        className="flex flex-row items-center relative size-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
        aria-label={t('nav.expand') || "Expand"}
        type="button"
      >
        <div className="flex items-center justify-center w-full p-0.5 relative">
          <ArrowDropDownBig />
        </div>
      </button>
    </div>
  );
}

// --- Main Component ---

export default function SidebarReduced({ onClose, onNotificationClick, onMessageClick }: { onClose?: () => void; onNotificationClick?: () => void; onMessageClick?: () => void }) {
  const { t } = useLanguage();

  return (
    <div 
      className="relative rounded-2xl size-full bg-glass-bg backdrop-blur-glass" 
      data-name="Sidebar Reduced"
    >
      <div aria-hidden="true" className="absolute border border-solid inset-0 pointer-events-none rounded-2xl border-glass-border shadow-glass-shadow" />
      <div className="flex flex-col items-center relative size-full">
        <div className="box-border content-stretch flex flex-col gap-1 items-center p-2.5 relative size-full">
          {/* Close Button at Top-Left */}
          <div className="absolute left-2.5 top-2.5 z-50">
            <CloseButton
              onClick={(e) => {
                e?.stopPropagation();
                onClose && onClose();
              }}
              ariaLabel={t('nav.closeSidebar')}
              size="sm"
            />
          </div>
          <div className="w-full h-6" />
          
          {/* Profile Section */}
          <ProfileExpandedSmall onNotificationClick={onNotificationClick} onMessageClick={onMessageClick} />
          
          <Separator />
          
          {/* Expand Button */}
          <ExpandBtn />
        </div>
      </div>
    </div>
  );
}