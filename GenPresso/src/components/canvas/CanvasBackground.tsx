import { memo } from 'react';

interface CanvasBackgroundProps {
  zoom: number;
  panOffset: { x: number; y: number };
}

const CanvasBackgroundComponent = ({ zoom, panOffset }: CanvasBackgroundProps) => {
  return (
    <div
      className="absolute inset-0 opacity-30"
      style={{
        backgroundImage: `radial-gradient(circle, var(--color-glass-border) 1px, transparent 1px)`,
        backgroundSize: `${20 * zoom}px ${20 * zoom}px`,
        backgroundPosition: `${panOffset.x}px ${panOffset.y}px`,
      }}
    />
  );
};

CanvasBackgroundComponent.displayName = "CanvasBackground";

export const CanvasBackground = memo(CanvasBackgroundComponent);
