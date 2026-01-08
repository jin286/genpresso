import React from "react";
import { User } from "lucide-react";
import { useLanguage } from "../../../contexts/LanguageContext";

/**
 * SideNav 프로필 공통 컴포넌트
 * ExpandedSmallWithClose와 ReducedSmallWithClose에서 공유
 */

export function UserProfileImage() {
  return (
    <div className="relative rounded-full shrink-0 size-[33px] bg-primary/20 flex items-center justify-center" data-name="User Profile Image">
      <User className="w-4 h-4 text-primary" />
    </div>
  );
}

export function Authority() {
  return <></>;
}

export function Name() {
  const { t } = useLanguage();
  return (
    <div className="flex items-start justify-between self-stretch">
      <div className="flex flex-col items-start gap-1 ml-1">
        <div className="flex items-center gap-1.5">
          <span className="text-xs tracking-tight leading-[1] font-semibold" style={{ color: 'var(--color-glass-text)' }}>홍길동</span>
          <span 
            className="inline-flex items-center rounded-full px-1.5 py-0.5 text-[10px] font-medium leading-none border bg-[#4fa8d8] text-white border-[#4fa8d8] dark:bg-[rgba(79,168,216,0.2)] dark:text-[#4fa8d8] dark:border-[rgba(79,168,216,0.2)]"
          >
            Free
          </span>
        </div>
        <span className="text-xs tracking-tight leading-[1] opacity-60" style={{ color: 'var(--color-glass-text)' }}>Designer</span>
      </div>
    </div>
  );
}

export function UserProfileInfo() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="User Profile Info">
      <Name />
    </div>
  );
}

export function ProfileField() {
  return (
    <div className="relative rounded-lg shrink-0 w-full" data-name="Profile Field">
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex gap-1 items-center p-1 relative w-full">
          <UserProfileImage />
          <UserProfileInfo />
        </div>
      </div>
    </div>
  );
}