import React from "react";
import { NODE_PADDING, cn } from "./node-styles";
import { MediaUploadArea } from "./MediaUploadArea";
import { useLanguage } from "../../../contexts/LanguageContext";

export const UploadNode = React.memo(() => {
  const { t } = useLanguage();
  
  return (
    <div className={cn('w-full', NODE_PADDING.ALL)}>
      <MediaUploadArea
        variant="solid"
        icon="plus"
        title=""
        message={t('node.uploadMessage')}
      />
    </div>
  );
});

UploadNode.displayName = "UploadNode";
