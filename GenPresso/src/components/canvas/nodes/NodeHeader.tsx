import React from "react";
import { Lock, Unlock, X } from "lucide-react";
import { NodeType, NodeGroup } from "../types";
import {
  NODE_PADDING,
  NODE_ICON,
  NODE_BUTTON,
  NODE_RADIUS,
  NODE_HEADER,
  NODE_TEXT,
  FLEX,
  INTERACTIVE_STYLES,
  cn,
} from "./node-styles";
import { useLanguage } from "../../../contexts/LanguageContext";

interface NodeHeaderProps {
  type: NodeType;
  isLocked: boolean;
  onLockToggle: () => void;
  onDelete: () => void;
  badgeStyle: { backgroundColor: string; color: string };
  typeLabel: string;
  nodeId?: string;
  groups?: NodeGroup[];
  onAddToGroup?: (groupId: string, nodeIds: string[]) => void;
  onRemoveFromGroup?: (groupId: string, nodeIds: string[]) => void;
}

export const NodeHeader = React.memo<NodeHeaderProps>((({
  type,
  isLocked,
  onLockToggle,
  onDelete,
  badgeStyle,
  typeLabel,
  nodeId,
  groups = [],
  onAddToGroup,
  onRemoveFromGroup,
}) => {
  const { t } = useLanguage();
  return (
    <div className={cn(
      'relative',
      NODE_HEADER.HEIGHT,
      NODE_HEADER.SHRINK,
      FLEX.BETWEEN,
      NODE_PADDING.X
    )}>
      <div className="flex items-center gap-1">
        <button
          className={cn(
            NODE_BUTTON.SIZE_CLASS,
            FLEX.CENTER,
            NODE_RADIUS.SM,
            INTERACTIVE_STYLES.HOVER_BG,
            INTERACTIVE_STYLES.TRANSITION,
            "border-2 border-transparent",
            "active:border-primary active:scale-95",
            isLocked && "border-primary"
          )}
          onClick={onLockToggle}
          aria-label={isLocked ? t('node.unlock') : t('node.lock')}
        >
          {isLocked ? (
            <Lock className={cn(NODE_ICON.SIZE_CLASS, 'text-primary')} />
          ) : (
            <Unlock className={NODE_ICON.SIZE_CLASS} />
          )}
        </button>
      </div>

      <span
        className={cn(
          NODE_TEXT.XS,
          NODE_PADDING.X,
          'py-0.5',
          NODE_RADIUS.SM,
          'backdrop-blur-sm'
        )}
        style={badgeStyle}
      >
        {t(`node.types.${type}`)}
      </span>

      <button
        className={cn(
          NODE_BUTTON.SIZE_CLASS,
          FLEX.CENTER,
          NODE_RADIUS.SM,
          INTERACTIVE_STYLES.HOVER_BG,
          INTERACTIVE_STYLES.TRANSITION,
          "border-2 border-transparent",
          "active:border-primary active:scale-95"
        )}
        onClick={onDelete}
        disabled={isLocked}
        aria-label="노드 삭제"
      >
        <X className={NODE_ICON.SIZE_CLASS} />
      </button>
    </div>
  );
}));

NodeHeader.displayName = "NodeHeader";