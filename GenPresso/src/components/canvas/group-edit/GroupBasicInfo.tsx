import { Label } from "../../ui/label";
import { cn } from "../nodes/node-styles";
import { GROUP_COLORS } from "./constants";
import type { NodeGroup } from "../types";
import { useLanguage } from "../../../contexts/LanguageContext";

interface GroupNameFieldProps {
  name: string;
  setName: (name: string) => void;
}

export function GroupNameField({ name, setName }: GroupNameFieldProps) {
  const { t } = useLanguage();
  
  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <Label className="text-base font-semibold">{t('group.nameLabel')}</Label>
        <p className="text-sm text-muted-foreground">{t('group.nameDescription')}</p>
      </div>
      <textarea
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder={t('group.namePlaceholder')}
        className="w-full h-12 resize-none rounded-md border border-input bg-background/50 p-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
        autoFocus
      />
    </div>
  );
}

interface GroupColorSelectorProps {
  color: NodeGroup['color'];
  setColor: (color: NodeGroup['color']) => void;
}

export function GroupColorSelector({ color, setColor }: GroupColorSelectorProps) {
  const { t } = useLanguage();
  
  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <Label className="text-base font-semibold">{t('group.colorLabel')}</Label>
        <p className="text-sm text-muted-foreground">{t('group.colorDescription')}</p>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {GROUP_COLORS.map(({ value, label, color: colorValue }) => {
          const isSelected = color === value;
          return (
            <button
              key={value}
              onClick={() => setColor(value)}
              className={cn(
                "flex items-center gap-2 px-2.5 py-2 rounded-lg border transition-all duration-200 text-left group",
                isSelected 
                  ? "bg-white/10" 
                  : "bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10"
              )}
              style={{
                borderColor: isSelected ? colorValue : undefined,
              }}
            >
              <div 
                className={cn(
                  "w-3.5 h-3.5 rounded-full shrink-0 border border-white/10 shadow-sm transition-transform",
                  isSelected ? "scale-110 ring-2 ring-white/10" : "group-hover:scale-110"
                )} 
                style={{ backgroundColor: colorValue }}
              />
              <span className={cn(
                "text-xs font-medium",
                isSelected ? "text-foreground" : "text-muted-foreground"
              )}>
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

interface GroupBasicInfoProps extends GroupNameFieldProps, GroupColorSelectorProps {}

export function GroupBasicInfo({ name, setName, color, setColor }: GroupBasicInfoProps) {
  return (
    <div className="space-y-6">
      <GroupNameField name={name} setName={setName} />
      <GroupColorSelector color={color} setColor={setColor} />
    </div>
  );
}