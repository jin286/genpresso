import React, { memo } from "react";
import { Plus } from "lucide-react";
import type { ComposableImage } from "./types";

interface ComposableGalleryProps {
  images: ComposableImage[];
  onAddImage: (image: ComposableImage) => void;
}

const ComposableGalleryComponent: React.FC<ComposableGalleryProps> = ({ images, onAddImage }) => {
  return (
    <div 
      className="w-[280px] border-l flex flex-col"
      style={{ 
        borderColor: 'var(--color-glass-border)',
        backgroundColor: 'var(--color-glass-bg)',
      }}
    >
      <div className="px-4 py-3 border-b" style={{ borderColor: 'var(--color-glass-border)' }}>
        <h3 className="text-xs text-foreground">컴포지블 이미지</h3>
      </div>
      
      <div className="flex-1 overflow-y-auto p-2 grid grid-cols-2 gap-2">
        {images.map((image) => (
          <div
            key={image.id}
            className="group relative rounded-lg overflow-hidden border cursor-pointer"
            style={{ borderColor: 'var(--color-glass-border)' }}
            onClick={() => onAddImage(image)}
          >
            <img 
              src={image.thumbnailUrl} 
              alt={image.name}
              className="w-full aspect-square object-cover"
            />
            
            <div 
              className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-200 flex items-center justify-center"
            >
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 w-11 h-11 rounded-full bg-primary flex items-center justify-center">
                <Plus className="w-5 h-5 text-primary-foreground" />
              </div>
            </div>
            
            <div className="p-1.5">
              <p className="text-xs text-foreground truncate">{image.name}</p>
              <p className="text-xs text-muted-foreground">{image.category}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

ComposableGalleryComponent.displayName = "ComposableGallery";

export const ComposableGallery = memo(ComposableGalleryComponent);
