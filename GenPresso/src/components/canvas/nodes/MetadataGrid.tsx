import React, { memo } from "react";
import { NODE_GAP, NODE_TEXT, cn } from "./node-styles";

interface MetadataItem {
  label: string;
  value: string;
}

interface MetadataGridProps {
  items: MetadataItem[];
}

const MetadataGridComponent: React.FC<MetadataGridProps> = ({ items }) => {
  return (
    <div className={cn('grid grid-cols-2', NODE_GAP.LG)}>
      {items.map((item, index) => (
        <div key={index}>
          <p className={cn(NODE_TEXT.XS, 'text-muted-foreground')}>{item.label}</p>
          <p className={cn(NODE_TEXT.XS, 'text-foreground')}>{item.value}</p>
        </div>
      ))}
    </div>
  );
};

MetadataGridComponent.displayName = "MetadataGrid";

export const MetadataGrid = memo(MetadataGridComponent);
