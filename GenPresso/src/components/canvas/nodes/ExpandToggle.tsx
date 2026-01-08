import React, { memo } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import {
  NODE_PADDING,
  NODE_ICON,
  NODE_RADIUS,
  FLEX,
  INTERACTIVE_STYLES,
  cn,
} from "./node-styles";
import { useLanguage } from "../../../contexts/LanguageContext";

interface ExpandToggleProps {
  isExpanded: boolean;
  onToggle: () => void;
}

const ExpandToggleComponent: React.FC<ExpandToggleProps> = ({
  isExpanded,
  onToggle,
}) => {
  const { t } = useLanguage();
  
  return (
    <button
      className={cn('w-full', FLEX.CENTER, NODE_PADDING.Y)}
      onClick={onToggle}
      aria-label={isExpanded ? t('node.collapse') : t('node.expand')}
    >
      <span className={cn(
        NODE_RADIUS.FULL,
        'p-1',
        'hover:bg-primary/20',
        INTERACTIVE_STYLES.TRANSITION
      )}>
        {isExpanded ? (
          <ChevronUp className={cn(NODE_ICON.SIZE_LG_CLASS, 'text-foreground')} />
        ) : (
          <ChevronDown className={cn(NODE_ICON.SIZE_LG_CLASS, 'text-foreground')} />
        )}
      </span>
    </button>
  );
};

ExpandToggleComponent.displayName = "ExpandToggle";

export const ExpandToggle = memo(ExpandToggleComponent);
