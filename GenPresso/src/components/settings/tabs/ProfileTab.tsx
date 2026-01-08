import React from "react";
import { User } from "lucide-react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Checkbox } from "../../ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { useLanguage } from "../../../contexts/LanguageContext";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import UserProfileImage from "../../../imports/UserProfileImage";

interface ProfileTabProps {
  onLogout?: () => void;
}

export function ProfileTab({ onLogout }: ProfileTabProps) {
  const { t } = useLanguage();
  
  return (
    <div className="flex flex-col h-full">
      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto px-12 py-4 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-12">
          {/* Left Column: Profile Image */}
          <div className="flex flex-col gap-6">
            <div className="space-y-1">
              <h3 className="font-semibold">{t('settings.profileImage')}</h3>
              <p className="text-xs text-muted-foreground">{t('settings.profileImageDescription')}</p>
            </div>
            
            <div className="flex flex-col items-center gap-4">
              <div className="w-32 h-32">
                <UserProfileImage />
              </div>
              <div className="w-full space-y-2">
                <Button variant="outline" size="sm" className="w-32 mx-auto flex bg-background shadow-sm border-gray-300 dark:border-border">
                  {t('settings.changePhoto')}
                </Button>
                <p className="text-[10px] text-center text-muted-foreground leading-tight">
                  JPG, PNG 업로드<br />
                  (최대 파일 크기 2MB)
                </p>
              </div>
            </div>
          </div>
          
          {/* Right Column: Profile Settings */}
          <div className="space-y-6">
            <div className="space-y-1">
              <h3 className="font-semibold">{t('settings.profileSettings')}</h3>
              <p className="text-xs text-muted-foreground">{t('settings.profileSettingsDescription')}</p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">{t('settings.name')}</Label>
                  <Input id="name" defaultValue="홍길동" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="jobTitle">{t('settings.jobTitle')}</Label>
                  <Input id="jobTitle" defaultValue="Designer" />
                </div>
              </div>

              {/* Added: Industry and Career Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{t('settings.industry')}</Label>
                  <Select defaultValue="industrialDesign">
                    <SelectTrigger>
                      <SelectValue placeholder={t('settings.selectIndustry')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="industrialDesign">{t('settings.industries.industrialDesign')}</SelectItem>
                      <SelectItem value="communicationDesign">{t('settings.industries.communicationDesign')}</SelectItem>
                      <SelectItem value="videoFilm">{t('settings.industries.videoFilm')}</SelectItem>
                      <SelectItem value="architectureSpace">{t('settings.industries.architectureSpace')}</SelectItem>
                      <SelectItem value="threeD">{t('settings.industries.threeD')}</SelectItem>
                      <SelectItem value="creator">{t('settings.industries.creator')}</SelectItem>
                      <SelectItem value="contentsMarketing">{t('settings.industries.contentsMarketing')}</SelectItem>
                      <SelectItem value="developer">{t('settings.industries.developer')}</SelectItem>
                      <SelectItem value="educationResearch">{t('settings.industries.educationResearch')}</SelectItem>
                      <SelectItem value="adPlanning">{t('settings.industries.adPlanning')}</SelectItem>
                      <SelectItem value="other">{t('settings.industries.other')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>{t('settings.career')}</Label>
                  <Select defaultValue="threeSeven">
                    <SelectTrigger>
                      <SelectValue placeholder={t('settings.selectCareer')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="zeroOne">{t('settings.careers.zeroOne')}</SelectItem>
                      <SelectItem value="oneThree">{t('settings.careers.oneThree')}</SelectItem>
                      <SelectItem value="threeSeven">{t('settings.careers.threeSeven')}</SelectItem>
                      <SelectItem value="sevenTen">{t('settings.careers.sevenTen')}</SelectItem>
                      <SelectItem value="tenPlus">{t('settings.careers.tenPlus')}</SelectItem>
                      <SelectItem value="student">{t('settings.careers.student')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">{t('settings.email')}</Label>
                <Input id="email" defaultValue="user@example.com" type="email" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bio">{t('settings.bio')}</Label>
                <textarea 
                  id="bio" 
                  className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                  placeholder={t('settings.bioPlaceholder')}
                />
              </div>

              {/* Added: Marketing Consent Checkbox */}
              <div className="flex items-center space-x-2 pt-1">
                <Checkbox id="marketing" />
                <Label
                  htmlFor="marketing"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {t('settings.marketingConsent')}
                </Label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Footer Area */}
      <div 
        className="shrink-0 z-10 flex items-center justify-between gap-2 py-4 px-6 border-t rounded-b-2xl" 
        style={{ 
          borderColor: 'var(--glass-border)',
          backgroundColor: 'var(--glass-bg)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <div className="absolute inset-0 bg-background/50 -z-10 rounded-b-2xl" />
        <Button 
          variant="destructive" 
          onClick={onLogout}
        >
          {t('nav.logout')}
        </Button>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="bg-background hover:bg-muted"
          >
            {t('common.cancel')}
          </Button>
          <Button>{t('common.save')}</Button>
        </div>
      </div>
    </div>
  );
}
